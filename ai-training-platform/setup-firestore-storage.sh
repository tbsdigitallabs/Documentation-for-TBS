#!/bin/bash
# Setup script for Firestore and Cloud Storage
# Run this once to set up the infrastructure

set -e

PROJECT_ID="learninglab-478822"
BUCKET_NAME="learninglab-storage"
REGION="us-central1"
SERVICE_ACCOUNT="learninglab-run@learninglab-478822.iam.gserviceaccount.com"

echo "Setting up Firestore and Cloud Storage for $PROJECT_ID..."

# Step 1: Enable APIs
echo "Enabling required APIs..."
gcloud services enable firestore.googleapis.com --project=$PROJECT_ID
gcloud services enable storage.googleapis.com --project=$PROJECT_ID

# Step 2: Create Firestore database (if not exists)
echo "Checking Firestore database..."
if ! gcloud firestore databases list --project=$PROJECT_ID --format="value(name)" | grep -q "default"; then
  echo "Creating Firestore database..."
  gcloud firestore databases create --location=$REGION --project=$PROJECT_ID
else
  echo "Firestore database already exists"
fi

# Step 3: Create Cloud Storage bucket (if not exists)
echo "Checking Cloud Storage bucket..."
if ! gsutil ls -b gs://$BUCKET_NAME 2>/dev/null; then
  echo "Creating Cloud Storage bucket..."
  gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$BUCKET_NAME
else
  echo "Cloud Storage bucket already exists"
fi

# Keep bucket private - images are served through authenticated API route
echo "Bucket will remain private - images served through authenticated API"

# Step 4: Grant Firestore permissions to service account
echo "Granting Firestore permissions to service account..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/datastore.user" \
  --condition=None

# Step 5: Grant Storage Object Admin role
echo "Granting Storage Object Admin role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/storage.objectAdmin" \
  --condition=None

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Deploy the application (code changes are ready)"
echo "2. Test by uploading a profile image"
echo "3. Verify data in Firestore Console: https://console.cloud.google.com/firestore?project=$PROJECT_ID"
echo "4. Verify images in Cloud Storage: https://console.cloud.google.com/storage/browser/$BUCKET_NAME?project=$PROJECT_ID"

