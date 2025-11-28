# Use Node.js 20 LTS
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
# Install git for version calculation
RUN apk add --no-cache git
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Accept build arguments for environment variables needed during build
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_APP_URL

# Set them as environment variables for the build process
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# Calculate git revision count and set as env var before build
# This ensures git count is available during npm run build (next.config.ts reads it)
RUN GIT_COUNT=$(git rev-list --count HEAD 2>/dev/null || echo "0") && \
    echo "Git revision count: $GIT_COUNT" && \
    export GIT_REVISION_COUNT=$GIT_COUNT && \
    GIT_REVISION_COUNT=$GIT_COUNT npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Next.js standalone mode creates server.js in the root
CMD ["node", "server.js"]

