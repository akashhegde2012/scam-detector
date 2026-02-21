'use client';

import React from 'react';
import { ScamMessage } from '@/types';
import { MessageItem } from './MessageItem';
import { MessageItemSkeleton } from '@/components/ui/Skeleton';

interface MessageListProps {
  messages: ScamMessage[];
  isLoading?: boolean;
  onDelete: (id: string) => void;
  onAnalyze: (id: string) => void;
}

export function MessageList({ messages, isLoading, onDelete, onAnalyze }: MessageListProps) {
  if (isLoading) {
    return (
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(3)].map((_, i) => (
          <MessageItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No messages yet. Forward a message to your Telegram bot to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onDelete={onDelete}
          onAnalyze={onAnalyze}
        />
      ))}
    </div>
  );
}
