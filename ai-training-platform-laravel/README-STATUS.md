# Laravel Backend - Status

## Current Status: ARCHIVED / UNUSED

This Laravel backend implementation is **not currently in use**.

The active application is the Next.js frontend (`ai-training-platform/`) which uses:
- JWT-based authentication (no database)
- NextAuth for session management
- No backend API required

## History

This directory contains a PHP/Laravel rewrite attempt that was created as an alternative implementation. It is preserved for historical reference but is not part of the active deployment.

## If You Need This

If you plan to use a Laravel backend in the future:
1. Review the implementation in this directory
2. Update dependencies (`composer install`)
3. Configure database connection
4. Integrate with the Next.js frontend

## Current Active Stack

- **Frontend**: Next.js 15 (TypeScript)
- **Authentication**: NextAuth with JWT
- **Database**: None (JWT-based sessions)
- **Deployment**: Google Cloud Run

