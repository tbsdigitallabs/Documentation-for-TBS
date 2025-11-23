# Update Cloud Run service to use secrets from Secret Manager

param(
    [string]$ProjectId = "learninglab-478822",
    [string]$ServiceName = "learninglab",
    [string]$Region = "australia-southeast1"
)

Write-Host "Updating Cloud Run service to use secrets..." -ForegroundColor Green

# Build secrets string
$secrets = @(
    "GOOGLE_CLIENT_ID=google-client-id:latest",
    "GOOGLE_CLIENT_SECRET=google-client-secret:latest",
    "NEXTAUTH_SECRET=nextauth-secret:latest",
    "DATABASE_URL=database-url:latest"
)

$secretsString = $secrets -join ","

Write-Host "Updating service with secrets..." -ForegroundColor Cyan
gcloud run services update $ServiceName `
    --region=$Region `
    --project=$ProjectId `
    --update-secrets=$secretsString `
    --update-env-vars "NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com,NODE_ENV=production"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Service updated successfully!" -ForegroundColor Green
    Write-Host "Service URL: " -NoNewline
    gcloud run services describe $ServiceName --region=$Region --project=$ProjectId --format="value(status.url)" | Write-Host -ForegroundColor Cyan
} else {
    Write-Host "`n✗ Failed to update service" -ForegroundColor Red
}

