import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    await prisma.reminder.update({
      where: { id },
      data: { status: 'SENT' },
    });

    log.info({ reminderId: id }, 'Reminder marked as done');

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    log.error({ error }, 'Failed to mark reminder as done');
    return NextResponse.json(
      { error: 'Failed to mark reminder as done', requestId },
      { status: 500 }
    );
  }
}

