import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createRequestLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const requestId = uuidv4();
  const log = createRequestLogger(requestId);

  try {
    const formData = await request.formData();
    const audio = formData.get('audio') as File;

    if (!audio) {
      return NextResponse.json(
        { error: 'Audio file required', requestId },
        { status: 400 }
      );
    }

    // Use OpenAI Whisper if available
    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const transcription = await openai.audio.transcriptions.create({
        file: audio,
        model: 'whisper-1',
      });

      log.info('Transcription completed via OpenAI');

      return NextResponse.json({ 
        text: transcription.text,
        requestId,
      });
    }

    // Fallback demo response
    log.info('[DEV] Whisper mock - returning demo text');
    
    return NextResponse.json({ 
      text: 'morgen 8 uhr zahnarzt',
      requestId,
    });
  } catch (error) {
    log.error({ error }, 'Failed to transcribe audio');
    return NextResponse.json(
      { error: 'Failed to transcribe audio', requestId },
      { status: 500 }
    );
  }
}

