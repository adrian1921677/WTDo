import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { enqueueAt } from '@/lib/qstash';
import { createRequestLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

const CreateReminderSchema = z.object({
  title: z.string().min(1),
  note: z.string().optional(),
  dueAt: z.string(),
  timezone: z.string().optional(),
  repeatRule: z.string().optional(),
  createdFrom: z.string().optional(),
});

// GET /api/reminders
export async function GET(request: NextRequest) {
  const requestId = uuidv4();
  const log = createRequestLogger(requestId);

  try {
    const userId = getUserId();

    const reminders = await prisma.reminder.findMany({
      where: { 
        userId,
        status: 'PENDING',
      },
      orderBy: { dueAt: 'asc' },
    });

    return NextResponse.json({ reminders, requestId });
  } catch (error) {
    log.error({ error }, 'Failed to fetch reminders');
    return NextResponse.json(
      { error: 'Failed to fetch reminders', requestId },
      { status: 500 }
    );
  }
}

// POST /api/reminders
export async function POST(request: NextRequest) {
  const requestId = uuidv4();
  const log = createRequestLogger(requestId);

  try {
    const userId = getUserId();
    const body = await request.json();
    
    const data = CreateReminderSchema.parse(body);
    const dueAt = new Date(data.dueAt);

    // If due time is in the past, set to 60s from now
    const finalDueAt = dueAt < new Date() ? new Date(Date.now() + 60000) : dueAt;

    const reminder = await prisma.reminder.create({
      data: {
        userId,
        title: data.title,
        note: data.note,
        dueAt: finalDueAt,
        timezone: data.timezone || 'Europe/Berlin',
        repeatRule: data.repeatRule,
        createdFrom: data.createdFrom || 'api',
        status: 'PENDING',
      },
    });

    // Enqueue reminder job
    try {
      await enqueueAt({
        runAtISO: finalDueAt.toISOString(),
        url: '/api/reminders/send',
        body: { id: reminder.id },
      });
      log.info({ reminderId: reminder.id, dueAt: finalDueAt }, 'Reminder enqueued');
    } catch (error) {
      log.warn({ error }, 'Failed to enqueue reminder');
    }

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    log.error({ error }, 'Failed to create reminder');
    return NextResponse.json(
      { error: 'Failed to create reminder', requestId },
      { status: 500 }
    );
  }
}
