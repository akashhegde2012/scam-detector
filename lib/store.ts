import { ScamMessage } from '@/types';

const messages: Map<string, ScamMessage> = new Map();

export function addMessage(message: ScamMessage): void {
  messages.set(message.id, message);
}

export function getMessage(id: string): ScamMessage | undefined {
  return messages.get(id);
}

export function updateMessage(id: string, updates: Partial<ScamMessage>): ScamMessage | undefined {
  const message = messages.get(id);
  if (!message) return undefined;
  
  const updated = { ...message, ...updates };
  messages.set(id, updated);
  return updated;
}

export function getAllMessages(): ScamMessage[] {
  return Array.from(messages.values()).sort((a, b) => b.timestamp - a.timestamp);
}

export function deleteMessage(id: string): boolean {
  return messages.delete(id);
}

export function clearAllMessages(): void {
  messages.clear();
}

export function getMessageCount(): number {
  return messages.size;
}
