# Auto-Deployment Setup Guide

## Quick Setup (Web Console - Recommended)

### Step 1: Connect GitHub Repository

1. Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers?project=learninglab-478822)
2. Click **"Connect Repository"**
3. Select **GitHub (Cloud Build GitHub App)**
4. Authorize Google Cloud Build to access your GitHub account
5. Select repository: **tbsdigitallabs/Documentation-for-TBS**
6. Click **"Connect"**

### Step 2: Create Trigger

1. Click **"Create Trigger"**
2. Fill in the form:
   - **Name**: `learninglab-auto-deploy`
   - **Event**: `Push to a branch`
   - **Branch**: `^master$` (regex pattern)
   - **Configuration**: `Cloud Build configuration file (yaml or json)`
   - **Location**: `ai-training-platform/cloudbuild.yaml`
   - **Service account**: Leave default (Cloud Build service account)
3. Click **"Create"**

### Step 3: Test

Push a commit to master branch:
```bash
git push origin master
```

Check deployment status:
- [Cloud Build History](https://console.cloud.google.com/cloud-build/builds?project=learninglab-478822)
- [Cloud Run Services](https://console.cloud.google.com/run?project=learninglab-478822)

---

## Alternative: CLI Setup (After GitHub is Connected)

If you've already connected the repository via web console, you can create the trigger via CLI:

```bash
gcloud builds triggers create github \
  --name=learninglab-auto-deploy \
  --repo-name=Documentation-for-TBS \
  --repo-owner=tbsdigitallabs \
  --branch-pattern='^master$' \
  --build-config=ai-training-platform/cloudbuild.yaml \
  --region=australia-southeast1
```

---

## What Happens on Each Push

1. **GitHub** pushes to `master` branch
2. **Cloud Build** detects the push
3. **Cloud Build** runs `cloudbuild.yaml`:
   - Builds Docker image
   - Pushes to Container Registry
   - Deploys to Cloud Run
4. **Cloud Run** serves new version

---

## Troubleshooting

### Trigger Not Firing
- Check GitHub connection is active
- Verify branch pattern matches (use `^master$` not `master`)
- Check Cloud Build logs for errors

### Build Fails
- Check Cloud Build logs: `gcloud builds list --limit=5`
- Verify secrets exist in Secret Manager
- Check `cloudbuild.yaml` path is correct

### Deployment Fails
- Verify Cloud Build service account has `roles/run.admin`
- Check service account permissions
- Verify region matches (`australia-southeast1`)

---

## Manual Deployment (If Needed)

If auto-deployment isn't working, deploy manually:

```bash
cd ai-training-platform
gcloud builds submit --config cloudbuild.yaml
```

Or use direct Cloud Run deployment:

```bash
gcloud run deploy learninglab \
  --source . \
  --region australia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NODE_ENV=production,NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com" \
  --set-secrets "GOOGLE_CLIENT_ID=google-client-id:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest,NEXTAUTH_SECRET=nextauth-secret:latest"
```

