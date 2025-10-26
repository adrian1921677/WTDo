# WTDo Mobile App

Expo React Native mobile application with voice recording and notifications.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Update `app.json` with your Expo project ID if needed.

3. Start development server:
```bash
pnpm dev
```

## Features

- Expo Router for navigation
- Voice recording with permissions
- Push notifications
- Local notification scheduling
- Natural language parsing

## Components

- `RecordButton` - Long-press to record voice input
- `TextCommandInput` - Natural language text input

## API Integration

The app connects to the web backend at `http://localhost:3000` by default. Update this in `src/services/api.ts` or via environment variables.

