'use client';

import React from 'react';
import { MessageFilter } from '@/types';

interface FilterBarProps {
  activeFilter: MessageFilter;
  onFilterChange: (filter: MessageFilter) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters: { value: MessageFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'safe', label: 'Safe' },
    { value: 'suspicious', label: 'Suspicious' },
    { value: 'scam', label: 'Scam' },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
