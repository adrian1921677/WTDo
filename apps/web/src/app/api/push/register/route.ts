import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { createRequestLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

const RegisterRequestSchema = {
  platform: '',
  token: '',
};

export async function POST(request: NextRequest) {
  const requestId = uuidv4();
  const log = createRequestLogger(requestId);

  try {
    const userId = getUserId();
    const body = await request.json();
    const { platform, token } = { ...RegisterRequestSchema, ...body };

    if (!platform || !token) {
      return NextResponse.json(
        { error: 'Platform and token required', requestId },
        { status: 400 }
      );
    }

    // Upsert device token
    await prisma.deviceToken.upsert({
      where: { token },
      update: {
        userId,
        platform,
      },
      create: {
        userId,
        platform,
        token,
      },
    });

    log.info({ userId, platform }, 'Device token registered');

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    log.error({ error }, 'Failed to register device token');
    return NextResponse.json(
      { error: 'Failed to register device token', requestId },
      { status: 500 }
    );
  }
}
