# Cloud Build Trigger Service Account

## Service Account to Use

**Service Account Email:**
```
180424126672@cloudbuild.gserviceaccount.com
```

**Full Format:**
```
PROJECT_NUMBER@cloudbuild.gserviceaccount.com
```

Where `PROJECT_NUMBER` = `180424126672` for project `learninglab-478822`

---

## When Creating the Trigger Manually

In the Cloud Build trigger creation form:

### Option 1: Cloud Build Service Account (RECOMMENDED)
1. **Service Account** field:
   - Look for: `Cloud Build service account (default)`
   - Or: `180424126672@cloudbuild.gserviceaccount.com`
   - ✅ Already has all required permissions

### Option 2: Use learninglab-run Service Account
If the Cloud Build service account is not available in the dropdown:

1. **Service Account** field:
   - Select: `learninglab-run@learninglab-478822.iam.gserviceaccount.com`

2. **Then grant required permissions:**
```bash
# Grant Cloud Run Admin
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member='serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com' \
  --role='roles/run.admin'

# Grant Service Account User
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member='serviceAccount:learninglab-run@learninglab-478822.iam.gserviceaccount.com' \
  --role='roles/iam.serviceAccountUser'
```

**Note:** `learninglab-run@` already has `roles/secretmanager.secretAccessor` ✅

---

## Verify Permissions

Check current permissions:
```bash
gcloud projects get-iam-policy learninglab-478822 \
  --flatten='bindings[].members' \
  --filter='bindings.members:serviceAccount:180424126672@cloudbuild.gserviceaccount.com' \
  --format='table(bindings.role)'
```

---

## If Secret Access is Needed

If the trigger needs to access Secret Manager, grant permission:
```bash
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member="serviceAccount:180424126672@cloudbuild.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## Quick Reference

**Trigger Configuration:**
- **Name:** `learninglab-auto-deploy`
- **Service Account:** `180424126672@cloudbuild.gserviceaccount.com` (or default)
- **Event:** Push to branch `^master$`
- **Config File:** `ai-training-platform/cloudbuild.yaml`
- **Full Path:** `Documentation-for-TBS/ai-training-platform/cloudbuild.yaml` (from repo root)

