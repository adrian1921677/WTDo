# WTDo Web App

Next.js 15 web application with App Router, NextAuth/Clerk, and Prisma.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy environment file:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your Neon Postgres connection string.

4. Run database migrations:
```bash
pnpm prisma migrate dev
```

5. Start development server:
```bash
pnpm dev
```

## API Routes

- `POST /api/reminders` - Create a new reminder
- `GET /api/reminders` - Get all reminders
- `POST /api/parse` - Parse natural language text
- `POST /api/push/register` - Register push notification token

