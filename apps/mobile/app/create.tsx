import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { formatDate } from '@wtdo/shared';
import { RecordButton } from '../src/components/RecordButton';
import { TextCommandInput } from '../src/components/TextCommandInput';
import { parseTextAndCreateReminder, registerForPush } from '../src/services/api';

export default function CreateScreen() {
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState<{ text: string; scheduledAt: Date } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleParse(input: string) {
    setLoading(true);
    try {
      const result = await parseTextAndCreateReminder(input);
      setParsed({ text: result.title, scheduledAt: new Date(result.dueAt) });
    } catch (error) {
      console.error('Failed to parse:', error);
      Alert.alert('Error', 'Failed to parse reminder');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!parsed) {
      // Reminder was already created in handleParse
      router.back();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Reminder</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Type or speak your reminder</Text>
          <TextCommandInput
            value={text}
            onChangeText={setText}
            onSubmit={handleParse}
            placeholder="e.g., Call mom tomorrow at 3pm"
          />
        </View>

        <View style={styles.section}>
          <RecordButton
            onRecordComplete={(text) => {
              handleParse(text);
            }}
          />
        </View>

        {parsed && (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>Preview</Text>
            <Text style={styles.previewText}>{parsed.text}</Text>
            <Text style={styles.previewDate}>
              {formatDate(parsed.scheduledAt)}
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.submitButtonText}>
                {submitting ? 'Creating...' : 'Create Reminder'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  preview: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  previewDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

