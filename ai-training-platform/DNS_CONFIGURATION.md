# DNS Configuration for learninglab.tbsdigitallabs.com

## For IT Team - DNS Records Required

### Step 1: Create Domain Mapping in Google Cloud Console

**Action Required:** Domain mapping must be created in Google Cloud Console first to get the DNS records.

1. Go to: https://console.cloud.google.com/run?project=learninglab-478822
2. Click on the `learninglab` service
3. Go to **"Manage Custom Domains"** tab
4. Click **"Add Mapping"**
5. Enter: `learninglab.tbsdigitallabs.com`
6. Click **"Continue"**
7. Google will provide DNS records (A records with IP addresses)

### Step 2: DNS Records to Configure

After creating the domain mapping in Google Cloud Console, you'll receive a **CNAME record**.

**Provide these to your IT team:**

```
Type: CNAME
Name: learninglab
Value: ghs.googlehosted.com
TTL: 3600 (or default)
```

**Example format:**
```
learninglab.tbsdigitallabs.com.  CNAME  ghs.googlehosted.com
```

**Note:** Some configurations may show A records with IP addresses instead. Use whatever DNS record type Google Cloud Console displays.

### Step 3: Verification

After DNS is configured:
- DNS propagation: 5-60 minutes (can take up to 48 hours)
- Google will automatically provision SSL certificate
- Test: `https://learninglab.tbsdigitallabs.com`

### Current Service Information

- **Service URL**: `https://learninglab-180424126672.australia-southeast1.run.app`
- **Project**: `learninglab-478822`
- **Region**: `australia-southeast1` (Sydney, Australia)
- **Service Name**: `learninglab`

### Important Notes

1. **Do NOT** point the domain to the service URL directly - use the DNS record from the domain mapping
2. **CNAME record** pointing to `ghs.googlehosted.com` is the standard configuration (some setups may use A records)
3. SSL certificate is automatically provisioned by Google once DNS resolves correctly
4. The domain mapping must be created in Google Cloud Console first to get the correct DNS record
5. Use the exact DNS record type and value shown in the Google Cloud Console

### Access Permissions

If you're unable to create the domain mapping in Google Cloud Console, you may need additional permissions.

#### Required Permissions

To create domain mappings, you need one of these roles:
- **Cloud Run Admin** (`roles/run.admin`)
- **Cloud Run Developer** (`roles/run.developer`) 
- **Project Owner** (`roles/owner`)
- **Project Editor** (`roles/editor`)

#### Granting Access

**Option 1: Via Google Cloud Console**
1. Go to: https://console.cloud.google.com/iam-admin/iam?project=learninglab-478822
2. Click **"Grant Access"** or find the user
3. Add role: **"Cloud Run Admin"** or **"Cloud Run Developer"**
4. Click **"Save"**

**Option 2: Via Command Line (if you have Project Owner access)**
```bash
# Grant Cloud Run Admin role
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member="user:EMAIL@tbsdigitallabs.com.au" \
  --role="roles/run.admin"

# Or grant Cloud Run Developer role (more limited)
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member="user:EMAIL@tbsdigitallabs.com.au" \
  --role="roles/run.developer"
```

**Option 2: Grant to Service Account (for automated deployments)**
```bash
gcloud projects add-iam-policy-binding learninglab-478822 \
  --member="serviceAccount:SERVICE_ACCOUNT@learninglab-478822.iam.gserviceaccount.com" \
  --role="roles/run.admin"
```

#### Alternative: Request Domain Mapping Creation

If you cannot be granted access, you can request that someone with the appropriate permissions creates the domain mapping:

1. **Requestor provides:**
   - Domain name: `learninglab.tbsdigitallabs.com`
   - Service name: `learninglab`
   - Region: `australia-southeast1` (Sydney, Australia)
   - Project: `learninglab-478822`

2. **Admin creates mapping:**
   - Follows Step 1 instructions above
   - Shares the DNS records (A record IPs) with you
   - You provide those to IT team

#### Checking Current Permissions

To check what permissions you have:
```bash
gcloud projects get-iam-policy learninglab-478822 \
  --flatten="bindings[].members" \
  --filter="bindings.members:user:YOUR_EMAIL@tbsdigitallabs.com.au" \
  --format="table(bindings.role)"
```

Or check in Console: https://console.cloud.google.com/iam-admin/iam?project=learninglab-478822

### Contact

If you need the exact IP addresses, they will be available in the Google Cloud Console after creating the domain mapping, or contact the project administrator.

**For permission issues:** Contact the project owner or someone with Project Owner/Editor role to grant Cloud Run Admin or Developer permissions.

