# Setup script for Firestore and Cloud Storage (PowerShell)
# Run this once to set up the infrastructure

$PROJECT_ID = "learninglab-478822"
$BUCKET_NAME = "learninglab-storage"
$REGION = "us-central1"
$SERVICE_ACCOUNT = "learninglab-run@learninglab-478822.iam.gserviceaccount.com"

Write-Host "Setting up Firestore and Cloud Storage for $PROJECT_ID..." -ForegroundColor Cyan

# Step 1: Enable APIs
Write-Host "`nEnabling required APIs..." -ForegroundColor Yellow
gcloud services enable firestore.googleapis.com --project=$PROJECT_ID
gcloud services enable storage.googleapis.com --project=$PROJECT_ID

# Step 2: Create Firestore database (if not exists)
Write-Host "`nChecking Firestore database..." -ForegroundColor Yellow
$firestoreExists = gcloud firestore databases list --project=$PROJECT_ID --format="value(name)" | Select-String -Pattern "default"
if (-not $firestoreExists) {
  Write-Host "Creating Firestore database..." -ForegroundColor Green
  gcloud firestore databases create --location=$REGION --project=$PROJECT_ID
} else {
  Write-Host "Firestore database already exists" -ForegroundColor Green
}

# Step 3: Create Cloud Storage bucket (if not exists)
Write-Host "`nChecking Cloud Storage bucket..." -ForegroundColor Yellow
$bucketExists = gsutil ls -b "gs://$BUCKET_NAME" 2>$null
if (-not $bucketExists) {
  Write-Host "Creating Cloud Storage bucket..." -ForegroundColor Green
  gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION "gs://$BUCKET_NAME"
} else {
  Write-Host "Cloud Storage bucket already exists" -ForegroundColor Green
}

# Keep bucket private - images are served through authenticated API route
Write-Host "Bucket will remain private - images served through authenticated API" -ForegroundColor Green

# Step 4: Grant Firestore permissions to service account
Write-Host "`nGranting Firestore permissions to service account..." -ForegroundColor Yellow
gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:$SERVICE_ACCOUNT" `
  --role="roles/datastore.user"

# Step 5: Grant Storage Object Admin role
Write-Host "`nGranting Storage Object Admin role..." -ForegroundColor Yellow
gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:$SERVICE_ACCOUNT" `
  --role="roles/storage.objectAdmin"

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy the application (code changes are ready)" -ForegroundColor White
Write-Host "2. Test by uploading a profile image" -ForegroundColor White
Write-Host "3. Verify data in Firestore Console: https://console.cloud.google.com/firestore?project=$PROJECT_ID" -ForegroundColor Cyan
Write-Host "4. Verify images in Cloud Storage: https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID" -ForegroundColor Cyan

