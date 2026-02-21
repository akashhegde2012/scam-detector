import { NextRequest, NextResponse } from 'next/server';
import { handleTelegramWebhook } from '@/actions/telegram';
import { TelegramMessage } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.message as TelegramMessage | undefined;
    
    if (!message) {
      return NextResponse.json({ error: 'No message found' }, { status: 400 });
    }
    
    const result = await handleTelegramWebhook(message);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}
