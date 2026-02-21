import React from 'react';
import { Classification } from '@/types';

interface BadgeProps {
  classification: Classification;
}

export function Badge({ classification }: BadgeProps) {
  const styles = {
    safe: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    suspicious: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    scam: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const labels = {
    safe: 'Safe',
    suspicious: 'Suspicious',
    scam: 'Scam',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[classification]}`}>
      {labels[classification]}
    </span>
  );
}
