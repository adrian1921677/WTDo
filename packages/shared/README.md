# @wtdo/shared

Shared TypeScript types and utilities for WTDo app.

## Installation

```bash
pnpm add @wtdo/shared
```

## Usage

```typescript
import { parseNaturalReminder, type Reminder } from '@wtdo/shared';

const parsed = parseNaturalReminder('Call mom tomorrow at 3pm');
console.log(parsed.scheduledAt); // Date object
console.log(parsed.text); // "Call mom"
```

