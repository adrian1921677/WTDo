'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@wtdo/shared';
import type { Reminder } from '@prisma/client';

interface ReminderWithStatus extends Reminder {
  status: 'PENDING' | 'SENT' | 'SNOOZED' | 'CANCELED';
}

export default function DashboardPage() {
  const [reminders, setReminders] = useState<ReminderWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchReminders();
    // Poll every 10 seconds
    const interval = setInterval(fetchReminders, 10000);
    return () => clearInterval(interval);
  }, []);

  async function fetchReminders() {
    try {
      const res = await fetch('/api/reminders');
      if (res.ok) {
        const data = await res.json();
        setReminders(data.reminders || []);
      }
    } catch (error) {
      console.error('Failed to fetch reminders:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSnooze(id: string) {
    if (processing) return;
    setProcessing(id);

    try {
      const res = await fetch(`/api/reminders/${id}/snooze`, {
        method: 'POST',
      });

      if (res.ok) {
        await fetchReminders();
      }
    } catch (error) {
      console.error('Failed to snooze:', error);
    } finally {
      setProcessing(null);
    }
  }

  async function handleDone(id: string) {
    if (processing) return;
    setProcessing(id);

    try {
      const res = await fetch(`/api/reminders/${id}/done`, {
        method: 'POST',
      });

      if (res.ok) {
        await fetchReminders();
      }
    } catch (error) {
      console.error('Failed to mark done:', error);
    } finally {
      setProcessing(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const upcomingReminders = reminders.filter(
    (r) => r.status === 'PENDING' && new Date(r.dueAt) > new Date()
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl p-8">
        <header className="mb-12">
          <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-5xl font-bold text-transparent">
            WTDU Dashboard
          </h1>
          <p className="mt-4 text-gray-400">
            Manage your smart reminders
          </p>
        </header>

        <div className="space-y-6">
          {upcomingReminders.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-gray-800/50 p-12 text-center backdrop-blur">
              <p className="text-gray-500">No upcoming reminders</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="group rounded-xl border border-gray-800 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="mb-4">
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {reminder.title}
                    </h3>
                    {reminder.note && (
                      <p className="mb-3 text-sm text-gray-400">{reminder.note}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-purple-400">
                        📅 {formatDate(new Date(reminder.dueAt))}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleSnooze(reminder.id)}
                      disabled={processing === reminder.id}
                      className="flex-1 rounded-lg bg-purple-600/20 px-4 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-600/30 disabled:opacity-50"
                    >
                      {processing === reminder.id ? '...' : 'Snooze 10m'}
                    </button>
                    <button
                      onClick={() => handleDone(reminder.id)}
                      disabled={processing === reminder.id}
                      className="flex-1 rounded-lg bg-pink-600/20 px-4 py-2 text-sm font-medium text-pink-400 transition-colors hover:bg-pink-600/30 disabled:opacity-50"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
