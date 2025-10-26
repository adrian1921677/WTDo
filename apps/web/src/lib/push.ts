import { prisma } from './prisma';

interface SendPushOptions {
  userId: string;
  message: string;
  data?: Record<string, unknown>;
}

export async function sendPushToUser(options: SendPushOptions): Promise<void> {
  const { userId, message, data } = options;

  // Get user's device tokens
  const deviceTokens = await prisma.deviceToken.findMany({
    where: { userId },
  });

  if (deviceTokens.length === 0) {
    console.log(`No device tokens for user ${userId}`);
    return;
  }

  // Expo Push API
  if (!process.env.EXPO_ACCESS_TOKEN) {
    console.log(`[DEV] Would send push to ${deviceTokens.length} devices:`, { userId, message, data });
    return;
  }

  try {
    const tokens = deviceTokens.map((dt) => ({
      to: dt.token,
      sound: 'default',
      title: 'Reminder',
      body: message,
      data,
    }));

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(tokens),
    });

    if (!response.ok) {
      throw new Error(`Failed to send push: ${response.statusText}`);
    }

    console.log(`✅ Sent push to ${deviceTokens.length} devices for user ${userId}`);
  } catch (error) {
    console.error('❌ Failed to send push:', error);
    throw error;
  }
}

