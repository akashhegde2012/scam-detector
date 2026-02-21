'use server';

import { revalidatePath } from 'next/cache';
import { ScamMessage, MessageFilter, MessageStats, Classification } from '@/types';
import { addMessage, getAllMessages, updateMessage, deleteMessage, clearAllMessages } from '@/lib/store';
import { analyzeText } from '@/lib/minmax';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export async function getMessages(filter: MessageFilter = 'all'): Promise<ScamMessage[]> {
  const messages = getAllMessages();
  
  if (filter === 'all') {
    return messages;
  }
  
  return messages.filter(m => m.classification === filter);
}

export async function getMessageStats(): Promise<MessageStats> {
  const messages = getAllMessages();
  
  return {
    total: messages.length,
    safe: messages.filter(m => m.classification === 'safe').length,
    suspicious: messages.filter(m => m.classification === 'suspicious').length,
    scam: messages.filter(m => m.classification === 'scam').length,
  };
}

export async function addNewMessage(
  text: string,
  telegramMessageId: number,
  senderName: string,
  senderUsername?: string,
  chatId?: number
): Promise<ScamMessage> {
  const message: ScamMessage = {
    id: generateId(),
    telegramMessageId,
    text,
    senderName,
    senderUsername,
    chatId: chatId || 0,
    score: null,
    classification: null,
    analysis: null,
    timestamp: Date.now(),
    isAnalyzed: false,
  };
  
  addMessage(message);
  revalidatePath('/dashboard');
  
  return message;
}

export async function analyzeMessage(id: string): Promise<ScamMessage | null> {
  const message = getAllMessages().find(m => m.id === id);
  
  if (!message) {
    return null;
  }
  
  const result = await analyzeText(message.text);
  
  const updated = updateMessage(id, {
    score: result.score,
    classification: result.classification,
    analysis: result.analysis,
    isAnalyzed: true,
  });
  
  revalidatePath('/dashboard');
  
  return updated || null;
}

export async function deleteMessageById(id: string): Promise<boolean> {
  const result = deleteMessage(id);
  revalidatePath('/dashboard');
  return result;
}

export async function clearAll(): Promise<void> {
  clearAllMessages();
  revalidatePath('/dashboard');
}

export async function analyzeNewMessage(id: string): Promise<ScamMessage | null> {
  return analyzeMessage(id);
}
