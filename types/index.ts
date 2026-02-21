export type Classification = 'safe' | 'suspicious' | 'scam';

export interface TelegramMessage {
  message_id: number;
  from?: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
  };
  chat: {
    id: number;
    type: string;
  };
  text?: string;
  date: number;
}

export interface ScamMessage {
  id: string;
  telegramMessageId: number;
  text: string;
  senderName: string;
  senderUsername?: string;
  chatId: number;
  score: number | null;
  classification: Classification | null;
  analysis: string | null;
  timestamp: number;
  isAnalyzed: boolean;
}

export interface MessageStats {
  total: number;
  safe: number;
  suspicious: number;
  scam: number;
}

export type MessageFilter = 'all' | Classification;

export interface AnalyzeResult {
  score: number;
  classification: Classification;
  analysis: string;
}
