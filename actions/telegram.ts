'use server';

import { addNewMessage } from './messages';
import { TelegramMessage } from '@/types';

export async function handleTelegramWebhook(payload: TelegramMessage) {
  const text = payload.text;
  
  if (!text) {
    return { success: false, error: 'No text in message' };
  }

  const senderName = payload.from 
    ? `${payload.from.first_name || ''} ${payload.from.last_name || ''}`.trim() || 'Unknown'
    : 'Unknown';
  
  const senderUsername = payload.from?.username;
  const chatId = payload.chat.id;

  const message = await addNewMessage(
    text,
    payload.message_id,
    senderName,
    senderUsername,
    chatId
  );
  
  return {
    success: true,
    messageId: message.id,
  };
}

export async function setWebhook(url: string, botToken: string) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

export async function getWebhookInfo(botToken: string) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getWebhookInfo`
    );
    
    return await response.json();
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}
