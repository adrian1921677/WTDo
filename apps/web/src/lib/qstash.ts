import { Client } from '@upstash/qstash';

let qstashClient: Client | null = null;

if (process.env.QSTASH_TOKEN) {
  qstashClient = new Client({
    token: process.env.QSTASH_TOKEN,
  });
}

interface EnqueueOptions {
  runAtISO: string;
  url: string;
  body: Record<string, unknown>;
}

export async function enqueueAt(options: EnqueueOptions): Promise<void> {
  const { runAtISO, url, body } = options;

  if (!qstashClient) {
    console.log(`[DEV] Would enqueue job to ${url} at ${runAtISO}`, body);
    return;
  }

  try {
    const absoluteUrl = url.startsWith('http') ? url : `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${url}`;
    
    await qstashClient.publishJSON({
      url: absoluteUrl,
      body,
      scheduleFor: new Date(runAtISO).getTime(),
    });

    console.log(`✅ Enqueued job to ${absoluteUrl} at ${runAtISO}`);
  } catch (error) {
    console.error('❌ Failed to enqueue job:', error);
    throw error;
  }
}

