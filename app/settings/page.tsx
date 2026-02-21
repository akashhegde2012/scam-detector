'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const [botToken, setBotToken] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [isSettingWebhook, setIsSettingWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  const handleSetWebhook = async () => {
    if (!botToken || !webhookUrl) {
      setWebhookStatus('Please provide both bot token and webhook URL');
      return;
    }

    setIsSettingWebhook(true);
    setWebhookStatus(null);

    try {
      const response = await fetch('/api/webhook/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botToken, webhookUrl }),
      });

      const data = await response.json();
      setWebhookStatus(data.ok ? 'Webhook set successfully!' : `Error: ${data.description}`);
    } catch (error) {
      setWebhookStatus('Failed to set webhook');
    } finally {
      setIsSettingWebhook(false);
    }
  };

  const handleSaveEnv = async () => {
    await fetch('/api/settings/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ geminiKey }),
    });
    alert('Settings saved! Restart the server to apply changes.');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Configure your Telegram bot and AI
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Telegram Bot Configuration
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Bot Token"
              type="password"
              placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
            />
            <Input
              label="Webhook URL"
              placeholder="https://your-domain.com/api/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleSetWebhook} 
                disabled={isSettingWebhook}
              >
                {isSettingWebhook ? 'Setting...' : 'Set Webhook'}
              </Button>
              {webhookStatus && (
                <span className={`text-sm ${webhookStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {webhookStatus}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get your bot token from @BotFather on Telegram
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              AI Configuration
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Gemini API Key"
              type="password"
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get your API key from Google AI Studio. Score: 0-30 = Safe, 31-60 = Suspicious, 61-100 = Scam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              How to Use
            </h2>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <ol className="list-decimal list-inside space-y-2">
              <li>Create a bot via @BotFather on Telegram</li>
              <li>Set your webhook URL above</li>
              <li>Add your Gemini API key</li>
              <li>Forward suspicious messages to your bot</li>
              <li>View analyzed messages on the dashboard</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
