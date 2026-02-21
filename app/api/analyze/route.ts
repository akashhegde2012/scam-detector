import { NextRequest, NextResponse } from 'next/server';
import { analyzeMessage } from '@/actions/messages';

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 });
    }
    
    const result = await analyzeMessage(id);
    
    if (!result) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
