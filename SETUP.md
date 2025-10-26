# Setup-Anleitung

Diese Anleitung hilft dir, das WTDo Monorepo einzurichten.

## Voraussetzungen

- Node.js 18+ und pnpm installiert
- Neon Postgres Account (kostenlos auf [neon.tech](https://neon.tech))

## Installation

1. **Dependencies installieren**:
```bash
pnpm install
```

2. **Shared Package bauen**:
```bash
pnpm --filter @wtdo/shared build
```

## Web App Setup

1. **Environment File erstellen**:
```bash
cd apps/web
cp env.example.txt .env.local
```

2. **Database URL konfigurieren**:
Öffne `.env.local` und aktualisiere die `DATABASE_URL` mit deiner Neon Postgres Verbindung.

3. **Datenbank initialisieren**:
```bash
pnpm prisma migrate dev
```

4. **Prisma Client generieren**:
```bash
pnpm prisma generate
```

5. **Development Server starten**:
```bash
pnpm dev
```

Die Web App läuft auf: http://localhost:3000

## Mobile App Setup

1. **Expo installieren** (falls nicht vorhanden):
```bash
npm install -g expo-cli
```

2. **Environment File erstellen**:
```bash
cd apps/mobile
cp env.example.txt .env
```

3. **Development Server starten**:
```bash
pnpm dev
```

Scanne den QR Code mit der Expo Go App (iOS/Android).

## Auth Setup (Optional)

### NextAuth
Füge folgende Umgebungsvariablen zu `apps/web/.env.local` hinzu:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dein-geheimer-schlüssel
```

### Clerk
Für Clerk-Integration:
1. Erstelle einen Clerk Account auf [clerk.com](https://clerk.com)
2. Füge deine Keys zu `apps/web/.env.local` hinzu
3. Setze `AUTH_PROVIDER=clerk`

## Verfügbare Commands

### Root Level
- `pnpm dev` - Startet alle Apps in Development Mode
- `pnpm build` - Baut alle Apps
- `pnpm lint` - Führt Linting aus
- `pnpm test` - Führt Tests aus

### Package-spezifisch
- `pnpm --filter @wtdo/shared dev` - Startet nur Shared Package
- `pnpm --filter @wtdo/web dev` - Startet nur Web App
- `pnpm --filter @wtdo/mobile dev` - Startet nur Mobile App

## Troubleshooting

### "Module nicht gefunden" Fehler
Bauen Sie das shared Package neu:
```bash
pnpm --filter @wtdo/shared build
```

### Prisma Client Fehler
```bash
cd apps/web
pnpm prisma generate
```

### pnpm Workspace Issues
```bash
rm -rf node_modules **/node_modules
pnpm install
```

## Nächste Schritte

1. Füge echte Speech-to-Text Integration hinzu (z.B. OpenAI Whisper)
2. Implementiere NextAuth/Clerk Sessions
3. Erstelle Expo Assets (Icon, Splash Screen)
4. Füge Tests hinzu
5. Setup CI/CD Pipeline

