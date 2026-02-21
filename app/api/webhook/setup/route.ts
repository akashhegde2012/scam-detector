import { NextRequest, NextResponse } from 'next/server';
import { setWebhook } from '@/actions/telegram';

export async function POST(request: NextRequest) {
  try {
    const { botToken, webhookUrl } = await request.json();
    
    if (!botToken || !webhookUrl) {
      return NextResponse.json({ ok: false, description: 'Missing bot token or webhook URL' }, { status: 400 });
    }
    
    const result = await setWebhook(webhookUrl, botToken);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
