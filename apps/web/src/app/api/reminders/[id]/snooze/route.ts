import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enqueueAt } from '@/lib/qstash';
import { createRequestLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requestId = uuidv4();
  const log = createRequestLogger(requestId);

  try {
    const { id } = params;

    const reminder = await prisma.reminder.findUnique({
      where: { id },
    });

    if (!reminder) {
      return NextResponse.json(
        { error: 'Reminder not found', requestId },
        { status: 404 }
      );
    }

    // Snooze for 10 minutes
    const snoozedUntil = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.reminder.update({
      where: { id },
      data: {
        dueAt: snoozedUntil,
        status: 'SNOOZED',
      },
    });

    // Re-enqueue
    await enqueueAt({
      runAtISO: snoozedUntil.toISOString(),
      url: '/api/reminders/send',
      body: { id },
    });

    log.info({ reminderId: id, snoozedUntil }, 'Reminder snoozed');

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    log.error({ error }, 'Failed to snooze reminder');
    return NextResponse.json(
      { error: 'Failed to snooze reminder', requestId },
      { status: 500 }
    );
  }
}

