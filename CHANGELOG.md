# WTDU Changelog

## [0.1.0] - 2024-01-19 - MVP Launch

### ✨ Features

#### Shared Package
- Natural language parsing with chrono-node
- German/English support: "morgen 8 uhr zahnarzt"
- Date normalization and timezone helpers
- Vitest unit tests for parsing logic

#### Web App (Next.js 15)
- Complete Prisma schema with User, Reminder, DeviceToken
- QStash integration for smart scheduling
- Expo push notification support
- OpenAI Whisper STT integration
- Centralized logging with request IDs

**API Routes:**
- `POST /api/parse` - Parse natural language to structured reminder
- `GET /api/reminders` - List all pending reminders
- `POST /api/reminders` - Create new reminder with auto-scheduling
- `POST /api/reminders/send` - QStash webhook to send reminders
- `POST /api/reminders/[id]/snooze` - Snooze for 10 minutes
- `POST /api/reminders/[id]/done` - Mark as done
- `POST /api/push/register` - Register device for push
- `POST /api/stt/whisper` - Speech-to-text transcription

**Dashboard:**
- Futuristic dark UI with gradient accents
- Live polling every 10 seconds
- Snooze and Done actions
- Responsive grid layout

#### Mobile App (Expo)
- Expo Router navigation
- RecordButton with long-press to record
- Whisper STT integration
- TextCommandInput for natural text
- Push notification registration
- Complete API client

**Components:**
- `RecordButton` - Voice recording with STT
- `TextCommandInput` - Natural language text input

#### DevOps
- Turborepo build pipeline
- pnpm workspaces
- ESLint + Prettier configured
- Vitest test framework
- Smoke tests in `.http` format
- TypeScript strict mode

### 📝 Documentation

- Complete setup guide (SETUP_COMPLETE.md)
- Deployment instructions (DEPLOYMENT.md)
- API smoke tests (scripts/smoke.http)
- README with quick start

### 🔧 Development Experience

- Auto-rebuild shared package
- Hot reload for web and mobile
- Request ID tracking for debugging
- Dev mode fallbacks (console.log scheduling)
- Centralized error handling

### 🎯 Production Ready

- Database migrations with Prisma
- Seed data for testing
- Environment-based config
- QStash integration for scheduling
- Expo push notifications
- OpenAI Whisper for STT

---

**Built with:** Next.js 15, Expo, Prisma, Turborepo, pnpm
**AI Integration:** OpenAI Whisper, QStash scheduling, chrono-node parsing

