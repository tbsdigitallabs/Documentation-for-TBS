# Setup Google Cloud Secrets from secrets.json
# This script reads secrets.json and creates/updates secrets in Google Cloud Secret Manager

param(
    [string]$ProjectId = "learninglab-478822",
    [string]$SecretsFile = "secrets.json"
)

Write-Host "Setting up Google Cloud Secrets from $SecretsFile..." -ForegroundColor Green

# Check if secrets file exists (check both project root and workspace root)
$secretsPath = Join-Path $PSScriptRoot $SecretsFile
$workspaceRoot = Split-Path $PSScriptRoot -Parent
$workspaceSecretsPath = Join-Path $workspaceRoot $SecretsFile

if (Test-Path $secretsPath) {
    # Found in project root
    $secretsPath = $secretsPath
}
elseif (Test-Path $workspaceSecretsPath) {
    # Found in workspace root
    $secretsPath = $workspaceSecretsPath
    Write-Host "Found $SecretsFile in workspace root" -ForegroundColor Cyan
}
else {
    Write-Host "Error: $SecretsFile not found at:" -ForegroundColor Red
    Write-Host "  - $secretsPath" -ForegroundColor Yellow
    Write-Host "  - $workspaceSecretsPath" -ForegroundColor Yellow
    Write-Host "Please create $SecretsFile in one of these locations." -ForegroundColor Yellow
    exit 1
}

# Read secrets JSON
try {
    $secrets = Get-Content $secretsPath | ConvertFrom-Json
    Write-Host "Found secrets file with $($secrets.PSObject.Properties.Count) secrets" -ForegroundColor Cyan
}
catch {
    Write-Host "Error: Failed to parse $SecretsFile. Please ensure it's valid JSON." -ForegroundColor Red
    exit 1
}

# Required secrets
$requiredSecrets = @(
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET", 
    "NEXTAUTH_SECRET",
    "DATABASE_URL"
)

# Check for required secrets
$missing = @()
foreach ($secret in $requiredSecrets) {
    if (-not $secrets.PSObject.Properties.Name -contains $secret) {
        $missing += $secret
    }
}

if ($missing.Count -gt 0) {
    Write-Host "Warning: Missing required secrets: $($missing -join ', ')" -ForegroundColor Yellow
}

# Create or update each secret
# Convert secret names from UPPER_SNAKE_CASE to lowercase-with-hyphens for Google Cloud naming
function Convert-SecretName {
    param([string]$Name)
    # Convert GOOGLE_CLIENT_ID -> google-client-id
    return $Name.ToLower() -replace '_', '-'
}

foreach ($property in $secrets.PSObject.Properties) {
    $originalName = $property.Name
    $secretName = Convert-SecretName -Name $originalName
    $secretValue = $property.Value
    
    Write-Host "`nProcessing secret: $originalName -> $secretName" -ForegroundColor Cyan
    
    # Check if secret exists
    $exists = gcloud secrets describe $secretName --project=$ProjectId 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Secret exists, updating..." -ForegroundColor Yellow
        # Update existing secret
        echo -n $secretValue | gcloud secrets versions add $secretName --data-file=- --project=$ProjectId
    }
    else {
        Write-Host "  Creating new secret..." -ForegroundColor Green
        # Create new secret
        echo -n $secretValue | gcloud secrets create $secretName --data-file=- --project=$ProjectId
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Success" -ForegroundColor Green
    }
    else {
        Write-Host "  ✗ Failed" -ForegroundColor Red
    }
}

# Grant Cloud Run service account access to secrets
Write-Host "`nGranting Cloud Run service account access to secrets..." -ForegroundColor Cyan

$serviceAccount = "learninglab-run@$ProjectId.iam.gserviceaccount.com"
$projectNumber = gcloud projects describe $ProjectId --format="value(projectNumber)" 2>&1

if ($projectNumber) {
    $computeServiceAccount = "$projectNumber-compute@developer.gserviceaccount.com"
    
    foreach ($property in $secrets.PSObject.Properties) {
        $originalName = $property.Name
        $secretName = Convert-SecretName -Name $originalName
        Write-Host "  Granting access to $secretName..." -ForegroundColor Yellow
        
        # Grant access to Cloud Run service account
        gcloud secrets add-iam-policy-binding $secretName `
            --member="serviceAccount:$serviceAccount" `
            --role="roles/secretmanager.secretAccessor" `
            --project=$ProjectId 2>&1 | Out-Null
        
        # Also grant to compute service account (for Cloud Run)
        gcloud secrets add-iam-policy-binding $secretName `
            --member="serviceAccount:$computeServiceAccount" `
            --role="roles/secretmanager.secretAccessor" `
            --project=$ProjectId 2>&1 | Out-Null
    }
    
    Write-Host "  ✓ Access granted" -ForegroundColor Green
}

Write-Host "`n✓ Secrets setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Update Cloud Run service to use secrets:" -ForegroundColor White
Write-Host "   Run: .\update-cloud-run-secrets.ps1" -ForegroundColor Gray
Write-Host "   Or manually:" -ForegroundColor Gray
Write-Host "   gcloud run services update learninglab --region=australia-southeast1 --project=$ProjectId --update-secrets=`"GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest,DATABASE_URL=database-url:latest`"" -ForegroundColor Gray
Write-Host "`nNote: Secret names are converted from UPPER_SNAKE_CASE to lowercase-with-hyphens" -ForegroundColor Cyan

