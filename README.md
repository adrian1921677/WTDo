# WTDU - Futuristic Reminder App

A complete end-to-end MVP reminder app with natural language processing, speech-to-text, and smart scheduling.

## 🏗️ Architecture

```
WTDU/
├── packages/
│   └── shared/     # TypeScript library (chrono-node, zod, date-fns)
├── apps/
│   ├── web/        # Next.js 15 + Prisma + Tailwind
│   └── mobile/     # Expo React Native
└── scripts/
    └── smoke.http  # API smoke tests
```

## 🚀 Quick Start

```bash
# Install all dependencies
pnpm install

# Build shared package
pnpm --filter @wtdo/shared build

# Setup database (apps/web)
cd apps/web
cp env.example.txt .env.local
# Edit DATABASE_URL in .env.local

pnpm db:push
pnpm db:seed

# Start all apps
cd ../..
pnpm dev
```

## ✨ Features

### Natural Language Processing
- Parse reminders in German/English: "morgen 8 uhr zahnarzt"
- Automatic date/time extraction with chrono-node
- Timezone-aware scheduling

### Web Dashboard
- Futuristic dark UI with live updates
- Snooze (10 min) and Done actions
- Real-time reminder list

### Mobile App
- Voice recording with Whisper STT
- Text input with natural parsing
- Push notification registration
- Expo Router navigation

### API Routes
- `POST /api/parse` - Parse natural language
- `POST /api/reminders` - Create reminder
- `GET /api/reminders` - List pending
- `POST /api/reminders/[id]/snooze` - Snooze 10 min
- `POST /api/reminders/[id]/done` - Mark done
- `POST /api/push/register` - Register device
- `POST /api/stt/whisper` - Speech-to-text

### Smart Scheduling
- QStash integration for delayed jobs
- Automatic re-enqueue for recurring
- Push notifications via Expo

## 🧪 Testing

```bash
# Run shared package tests
pnpm --filter @wtdo/shared test

# Run smoke tests (see scripts/smoke.http)
# Use VS Code REST Client extension
```

## 📱 Mobile Setup

```bash
cd apps/mobile

# Create .env
echo 'API_URL=http://localhost:3000' > .env

# Start Expo
pnpm dev
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup guide.

## 📚 Documentation

- [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) - Complete setup instructions
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment
- [scripts/smoke.http](./scripts/smoke.http) - API examples

## 🛠️ Tech Stack

- **Build**: Turborepo, pnpm workspaces
- **Web**: Next.js 15, Prisma, Neon Postgres, Tailwind
- **Mobile**: Expo, Expo Router, Expo Notifications
- **AI**: OpenAI Whisper (STT), QStash (scheduling)
- **Tests**: Vitest, smoke.http

## 🎯 Production Checklist

- [ ] Add real auth (Auth.js/Clerk)
- [ ] Configure QSTASH_TOKEN
- [ ] Add OPENAI_API_KEY for Whisper
- [ ] Setup Expo push certificates
- [ ] Deploy to Vercel + Expo EAS
- [ ] Add rrule for recurring reminders

---

Built with ❤️ using Next.js 15, Expo, and Turborepo
