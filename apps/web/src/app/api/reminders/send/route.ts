import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPushToUser } from '@/lib/push';
import { enqueueAt } from '@/lib/qstash';
import { createRequestLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

interface SendRequest {
  id: string;
}

export async function POST(request: NextRequest) {
  const requestId = uuidv4();
  const log = createRequestLogger(requestId);

  try {
    const body: SendRequest = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Reminder ID required', requestId },
        { status: 400 }
      );
    }

    const reminder = await prisma.reminder.findUnique({
      where: { id },
    });

    if (!reminder) {
      return NextResponse.json(
        { error: 'Reminder not found', requestId },
        { status: 404 }
      );
    }

    // Send push notification
    await sendPushToUser({
      userId: reminder.userId,
      message: reminder.title,
      data: { reminderId: id },
    });

    // Handle repeat rule if present
    if (reminder.repeatRule) {
      // TODO: Implement proper rrule parsing
      const nextDue = new Date(new Date(reminder.dueAt).getTime() + 24 * 60 * 60 * 1000); // +24h for now
      
      await prisma.reminder.update({
        where: { id },
        data: { dueAt: nextDue },
      });

      await enqueueAt({
        runAtISO: nextDue.toISOString(),
        url: '/api/reminders/send',
        body: { id },
      });

      log.info({ reminderId: id, nextDue }, 'Requeued recurring reminder');
    } else {
      // Mark as sent
      await prisma.reminder.update({
        where: { id },
        data: { status: 'SENT' },
      });
    }

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    log.error({ error }, 'Failed to send reminder');
    return NextResponse.json(
      { error: 'Failed to send reminder', requestId },
      { status: 500 }
    );
  }
}

