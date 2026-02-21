'use client';

import React from 'react';
import { ScamMessage } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { Button } from '@/components/ui/Button';

interface MessageItemProps {
  message: ScamMessage;
  onDelete: (id: string) => void;
  onAnalyze: (id: string) => void;
}

export function MessageItem({ message, onDelete, onAnalyze }: MessageItemProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-start gap-4">
        <ScoreGauge score={message.score} size="md" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {message.senderName}
              </span>
              {message.senderUsername && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  @{message.senderUsername}
                </span>
              )}
              {message.classification && (
                <Badge classification={message.classification} />
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(message.timestamp)}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-wrap break-words">
            {message.text}
          </p>
          
          {message.analysis && (
            <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
              {message.analysis}
            </p>
          )}
          
          <div className="flex gap-2">
            {!message.isAnalyzed && (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => onAnalyze(message.id)}
              >
                Analyze
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(message.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
