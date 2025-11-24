# Quick Auto-Deployment Setup

## ⚡ Fast Setup (2 Steps)

### Step 1: Connect GitHub (Browser Required)
**Link:** https://console.cloud.google.com/cloud-build/triggers/connect?project=learninglab-478822

1. Click "GitHub (Cloud Build GitHub App)"
2. Authorize Google Cloud Build
3. Select: `tbsdigitallabs/Documentation-for-TBS`
4. Click "Connect"

### Step 2: Create Trigger
**Link:** https://console.cloud.google.com/cloud-build/triggers/add?project=learninglab-478822

**Fill in:**
- **Name:** `learninglab-auto-deploy`
- **Event:** `Push to a branch`
- **Branch:** `^master$`
- **Configuration:** `Cloud Build configuration file (yaml or json)`
- **Location:** `ai-training-platform/cloudbuild.yaml`
- **Full Path (from repo root):** `Documentation-for-TBS/ai-training-platform/cloudbuild.yaml`
- Click **"Create"**

## ✅ Done!

Now every `git push origin master` will automatically deploy to Cloud Run.

**Monitor deployments:**
- Builds: https://console.cloud.google.com/cloud-build/builds?project=learninglab-478822
- Service: https://console.cloud.google.com/run?project=learninglab-478822

