import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { formatDate } from '@wtdo/shared';
import { fetchReminders } from '../src/services/api';
import { registerForPush } from '../src/services/push';
import { requestNotifications } from '../src/utils/permissions';
import type { Reminder } from '@wtdo/shared';

export default function HomeScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadReminders();
    setupNotifications();
  }, []);

  async function setupNotifications() {
    await requestNotifications();
    const token = await registerForPush();
    console.log('Push token:', token);
  }

  async function loadReminders() {
    try {
      const data = await fetchReminders();
      setReminders(data);
    } catch (error) {
      console.error('Failed to load reminders:', error);
    } finally {
      setLoading(false);
    }
  }

  const upcomingReminders = reminders
    .filter((r) => !r.isCompleted && new Date(r.scheduledAt) > new Date())
    .slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WTDo</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/create')}
        >
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Reminders</Text>

        {loading ? (
          <Text style={styles.emptyText}>Loading...</Text>
        ) : upcomingReminders.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming reminders</Text>
        ) : (
          upcomingReminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderCard}>
              <Text style={styles.reminderText}>{reminder.text}</Text>
              <Text style={styles.reminderDate}>
                {formatDate(new Date(reminder.scheduledAt))}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  createButtonText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  reminderCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  reminderDate: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

