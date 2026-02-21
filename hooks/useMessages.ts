'use client';

import { useState, useEffect, useCallback } from 'react';
import { ScamMessage, MessageFilter, MessageStats } from '@/types';

export function useMessages() {
  const [messages, setMessages] = useState<ScamMessage[]>([]);
  const [stats, setStats] = useState<MessageStats>({ total: 0, safe: 0, suspicious: 0, scam: 0 });
  const [filter, setFilter] = useState<MessageFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`/api/messages?filter=${filter}&t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  return {
    messages,
    stats,
    filter,
    setFilter,
    isLoading,
    refresh: fetchMessages,
  };
}
