import axios from 'axios';
import Constants from 'expo-constants';
import type { Reminder } from '@wtdo/shared';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchReminders(): Promise<Reminder[]> {
  const response = await api.get('/api/reminders');
  return response.data.reminders || [];
}

export async function createReminder(input: {
  title: string;
  note?: string;
  dueAt: string;
  timezone?: string;
}): Promise<Reminder> {
  const response = await api.post('/api/reminders', input);
  return response.data;
}

export async function parseText(text: string, timezone?: string): Promise<{
  title: string;
  when: string;
  timezone: string;
}> {
  const response = await api.post('/api/parse', { text, timezone });
  return response.data;
}

export async function parseTextAndCreateReminder(
  text: string,
  timezone = 'Europe/Berlin'
): Promise<Reminder> {
  // Parse the text
  const parsed = await parseText(text, timezone);
  
  // Create the reminder
  const reminder = await createReminder({
    title: parsed.title,
    dueAt: parsed.when,
    timezone: parsed.timezone,
  });
  
  return reminder;
}

export async function registerPushToken(platform: 'ios' | 'android' | 'web', token: string) {
  await api.post('/api/push/register', { platform, token });
}
