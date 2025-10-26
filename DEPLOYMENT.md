# Deployment Guide

## Overview
WTDU consists of:
- **Web App**: Next.js 15 on Vercel/Railway
- **Mobile App**: Expo managed workflow
- **Database**: Neon Postgres
- **Scheduling**: QStash (Upstash)

## Prerequisites
- Neon database account
- QStash token (optional, logs in dev mode)
- OpenAI API key (for Whisper STT)
- Expo account for push notifications

## Step 1: Database Setup

1. Create a Neon Postgres database
2. Copy connection string to `DATABASE_URL`
3. Run migrations:
   ```bash
   cd apps/web
   pnpm db:migrate
   pnpm db:seed
   ```

## Step 2: Environment Variables

### Web App (`apps/web/.env.production`)
```env
DATABASE_URL="postgresql://..."
QSTASH_TOKEN="..."
OPENAI_API_KEY="..." # Optional
EXPO_ACCESS_TOKEN="..." # Optional
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="..."
LOG_LEVEL="info"
NODE_ENV="production"
```

## Step 3: Deploy Web App

### Option A: Vercel
```bash
cd apps/web
vercel
```

### Option B: Railway
1. Create new project
2. Connect GitHub repo
3. Set build command: `cd apps/web && pnpm install && pnpm build`
4. Set start command: `cd apps/web && pnpm start`
5. Add environment variables

## Step 4: Deploy Mobile App

1. Update API URL in `apps/mobile/src/services/api.ts` or via env
2. Build:
   ```bash
   cd apps/mobile
   eas build --platform all
   ```
3. Submit to stores:
   ```bash
   eas submit
   ```

## Step 5: QStash Configuration

1. Create QStash endpoint in Upstash dashboard
2. Set up webhook URL: `https://your-domain.com/api/reminders/send`
3. Test with smoke tests

## Testing

Run smoke tests from `scripts/smoke.http` to verify endpoints.

