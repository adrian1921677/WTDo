import { NextRequest, NextResponse } from 'next/server';
import { parseNaturalReminder } from '@wtdo/shared';
import { createRequestLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const requestId = uuidv4();
  const log = createRequestLogger(requestId);

  try {
    const body = await request.json();
    const { text, timezone = 'Europe/Berlin' } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required', requestId },
        { status: 400 }
      );
    }

    const parsed = parseNaturalReminder(text);

    return NextResponse.json({
      title: parsed.text,
      when: parsed.scheduledAt.toISOString(),
      timezone: timezone,
      parsed: {
        confidence: parsed.confidence,
      },
      requestId,
    });
  } catch (error) {
    log.error({ error }, 'Failed to parse');
    return NextResponse.json(
      { error: 'Failed to parse text', requestId },
      { status: 500 }
    );
  }
}
