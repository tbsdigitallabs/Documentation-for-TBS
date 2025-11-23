---
title: G OO GL E A UT H T RO UB LE SH OO TI NG
description: Documentation for G OO GL E A UT H T RO UB LE SH OO TI NG
last_updated: 2025-11-23
author: TBS Digital Labs
category: General
---
# Google Auth Troubleshooting Guide

## Common Issues and Fixes

### Issue 1: Wrong Client ID or Secret

**Problem:** Using credentials from the wrong Google Cloud project.

**Solution:**
1. Verify you're using the correct Client ID:
   - **Production**: `180424126672-apvmt8evgneepbu2iaebijv1ko3jean1.apps.googleusercontent.com`
   - **Legacy (old)**: `847745245279-al0k7miipvk31p148t44m2etkochuik8.apps.googleusercontent.com`

2. Get the matching Client Secret:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to: **APIs & Services** → **Credentials**
   - Find the OAuth 2.0 Client ID: `180424126672-apvmt8evgneepbu2iaebijv1ko3jean1`
   - Click to view details and copy the **Client Secret**
   - Update your `.env.local` file

### Issue 2: Redirect URI Not Configured

**Problem:** Google OAuth redirect URI doesn't match what's configured in Google Cloud Console.

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, ensure you have:
   - For local development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://learninglab.tbsdigitallabs.com/api/auth/callback/google`
5. Click **Save**

### Issue 3: NEXTAUTH_URL Mismatch

**Problem:** `NEXTAUTH_URL` doesn't match the actual URL you're accessing.

**Solution:**
- For local development: `NEXTAUTH_URL=http://localhost:3000`
- For production: `NEXTAUTH_URL=https://learninglab.tbsdigitallabs.com`
- **Important:** No trailing slash!

### Issue 4: Email Domain Restriction

**Problem:** Your email domain isn't allowed.

**Solution:**
The app only allows:
- `@thebigsmoke.com.au`
- `@tbsdigitallabs.com.au`

If you're using a different email, you'll get an "Access Denied" error.

### Issue 5: Missing NEXTAUTH_SECRET

**Problem:** `NEXTAUTH_SECRET` is not set or invalid.

**Solution:**
1. Generate a new secret:
   ```bash
   openssl rand -base64 32
   ```
2. Add to `.env.local`:
   ```
   NEXTAUTH_SECRET=your_generated_secret_here
   ```
3. Restart your dev server

## Quick Checklist

Before reporting an issue, verify:

- [ ] `.env.local` file exists in `ai-training-platform/` directory
- [ ] `GOOGLE_CLIENT_ID` matches the production Client ID
- [ ] `GOOGLE_CLIENT_SECRET` matches the Client ID (from same Google Cloud project)
- [ ] `NEXTAUTH_URL` matches your current URL (no trailing slash)
- [ ] `NEXTAUTH_SECRET` is set and valid
- [ ] Redirect URI is configured in Google Cloud Console
- [ ] You're using an allowed email domain
- [ ] Dev server has been restarted after changing `.env.local`

## Testing Steps

1. **Check environment variables are loaded:**
   ```bash
   # In your terminal, from ai-training-platform directory
   node -e "require('dotenv').config({ path: '.env.local' }); console.log('Client ID:', process.env.GOOGLE_CLIENT_ID)"
   ```

2. **Clear browser cache and cookies** for localhost:3000

3. **Try the dev skip auth** (if in development):
   - Click "Skip Auth (Dev Only)" button
   - This bypasses Google OAuth to test if the issue is with Google or NextAuth

4. **Check browser console** for errors:
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

5. **Check server logs:**
   - Look at your terminal where `npm run dev` is running
   - Check for error messages

## Getting the Correct Client Secret

If you need to retrieve the Client Secret:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `learninglab-478822` (or the project that has the Client ID)
3. Navigate to: **APIs & Services** → **Credentials**
4. Find: `180424126672-apvmt8evgneepbu2iaebijv1ko3jean1`
5. Click to view
6. Copy the **Client Secret** (it starts with `GOCSPX-`)
7. Update `.env.local`

**Note:** If you don't have access to Google Cloud Console, ask someone with access to provide the Client Secret.

## Still Not Working?

If you've checked everything above and it's still not working:

1. **Share the exact error message** you're seeing
2. **Check the browser console** for JavaScript errors
3. **Check the server logs** for backend errors
4. **Verify the redirect URI** in Google Cloud Console matches exactly (including http vs https)
5. **Try incognito/private browsing** to rule out browser cache issues


