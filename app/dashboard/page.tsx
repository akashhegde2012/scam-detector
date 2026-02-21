'use client';

import { useMessages } from '@/hooks/useMessages';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { MessageList } from '@/components/dashboard/MessageList';

export default function DashboardPage() {
  const { messages, stats, filter, setFilter, isLoading, refresh } = useMessages();

  const handleDelete = async (id: string) => {
    await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
    refresh();
  };

  const handleAnalyze = async (id: string) => {
    await fetch(`/api/analyze?id=${id}`, { method: 'POST' });
    refresh();
  };

  const handleClearAll = async () => {
    if (confirm('Are you sure you want to delete all messages?')) {
      await fetch('/api/messages?action=clear', { method: 'DELETE' });
      refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <DashboardHeader onClearAll={handleClearAll} />
        
        <StatsCards stats={stats} isLoading={isLoading} />
        
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            onDelete={handleDelete}
            onAnalyze={handleAnalyze}
          />
        </div>
      </div>
    </div>
  );
}
