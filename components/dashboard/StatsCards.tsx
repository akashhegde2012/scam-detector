'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { MessageStats } from '@/types';

interface StatsCardsProps {
  stats: MessageStats;
  isLoading?: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards = [
    { label: 'Total', value: stats.total, color: 'text-gray-900 dark:text-gray-100' },
    { label: 'Safe', value: stats.safe, color: 'text-green-600 dark:text-green-400' },
    { label: 'Suspicious', value: stats.suspicious, color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Scam', value: stats.scam, color: 'text-red-600 dark:text-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.label} className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
          <p className={`text-2xl font-bold ${card.color}`}>
            {isLoading ? '-' : card.value}
          </p>
        </Card>
      ))}
    </div>
  );
}
