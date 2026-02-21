'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface DashboardHeaderProps {
  onClearAll: () => void;
}

export function DashboardHeader({ onClearAll }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          TICS.ai
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Analyze suspicious messages from Telegram
        </p>
      </div>
      <div className="flex gap-2">
        <Link href="/settings">
          <Button variant="secondary">Settings</Button>
        </Link>
        <Button variant="danger" onClick={onClearAll}>
          Clear All
        </Button>
      </div>
    </div>
  );
}
