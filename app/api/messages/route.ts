import { NextRequest, NextResponse } from 'next/server';
import { getMessages, getMessageStats, deleteMessageById, clearAll } from '@/actions/messages';
import { MessageFilter } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filter = (searchParams.get('filter') || 'all') as MessageFilter;
  
  const messages = await getMessages(filter);
  const stats = await getMessageStats();
  
  return NextResponse.json({ messages, stats });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  
  if (action === 'clear') {
    await clearAll();
    return NextResponse.json({ success: true });
  }
  
  const id = searchParams.get('id');
  if (id) {
    const success = await deleteMessageById(id);
    return NextResponse.json({ success });
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
