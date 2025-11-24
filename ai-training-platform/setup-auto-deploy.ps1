# Setup Auto-Deployment for Cloud Run
# This script helps set up automatic deployment from GitHub to Cloud Run

Write-Host "Setting up auto-deployment..." -ForegroundColor Cyan

$PROJECT_ID = "learninglab-478822"
$REGION = "australia-southeast1"
$SERVICE_NAME = "learninglab"
$BRANCH = "master"
$CONFIG_PATH = "ai-training-platform/cloudbuild.yaml"

Write-Host "`nStep 1: Enable required APIs..." -ForegroundColor Yellow
gcloud services enable cloudbuild.googleapis.com --project=$PROJECT_ID
gcloud services enable run.googleapis.com --project=$PROJECT_ID
gcloud services enable containerregistry.googleapis.com --project=$PROJECT_ID

Write-Host "`nStep 2: Grant Cloud Build service account permissions..." -ForegroundColor Yellow
$PROJECT_NUMBER = (gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
$SERVICE_ACCOUNT = "$PROJECT_NUMBER@cloudbuild.gserviceaccount.com"

# Grant Cloud Run Admin role to Cloud Build service account
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SERVICE_ACCOUNT" `
    --role="roles/run.admin"

# Grant Service Account User role
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SERVICE_ACCOUNT" `
    --role="roles/iam.serviceAccountUser"

Write-Host "`nStep 3: Create Cloud Build Trigger..." -ForegroundColor Yellow
Write-Host "`nNOTE: You need to connect your GitHub repository first via the web console:" -ForegroundColor Yellow
Write-Host "1. Go to: https://console.cloud.google.com/cloud-build/triggers?project=$PROJECT_ID" -ForegroundColor Cyan
Write-Host "2. Click 'Connect Repository'" -ForegroundColor Cyan
Write-Host "3. Select GitHub and authorize" -ForegroundColor Cyan
Write-Host "4. Select repository: tbsdigitallabs/Documentation-for-TBS" -ForegroundColor Cyan
Write-Host "`nAfter connecting, run this command to create the trigger:" -ForegroundColor Yellow
Write-Host "`ngcloud builds triggers create github \`" -ForegroundColor Green
Write-Host "  --name=learninglab-auto-deploy \`" -ForegroundColor Green
Write-Host "  --repo-name=Documentation-for-TBS \`" -ForegroundColor Green
Write-Host "  --repo-owner=tbsdigitallabs \`" -ForegroundColor Green
Write-Host "  --branch-pattern='^master$' \`" -ForegroundColor Green
Write-Host "  --build-config=$CONFIG_PATH \`" -ForegroundColor Green
Write-Host "  --region=$REGION" -ForegroundColor Green

Write-Host "`nAlternatively, create the trigger via web console:" -ForegroundColor Yellow
Write-Host "https://console.cloud.google.com/cloud-build/triggers/add?project=$PROJECT_ID" -ForegroundColor Cyan
Write-Host "`nConfiguration:" -ForegroundColor Yellow
Write-Host "  - Name: learninglab-auto-deploy" -ForegroundColor White
Write-Host "  - Event: Push to a branch" -ForegroundColor White
Write-Host "  - Branch: ^master$" -ForegroundColor White
Write-Host "  - Configuration: Cloud Build configuration file" -ForegroundColor White
Write-Host "  - Location: $CONFIG_PATH" -ForegroundColor White

Write-Host "`nDone! After setting up the trigger, every push to master will automatically deploy." -ForegroundColor Green

