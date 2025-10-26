import { chrono } from 'chrono-node';
import type { ParsedCommand } from '../types';
import { ParsedCommandSchema } from '../types';

/**
 * Parse natural language text to extract reminder information
 */
export function parseNaturalReminder(text: string): ParsedCommand {
  const parser = chrono.casual;
  const results = parser.parse(text);

  if (results.length === 0) {
    // No date found, assume current time + 1 hour
    const scheduledAt = new Date(Date.now() + 60 * 60 * 1000);
    return ParsedCommandSchema.parse({
      text: text.trim(),
      scheduledAt,
      confidence: 0.5,
    });
  }

  const result = results[0];
  const scheduledAt = result.start.date();
  
  // Extract the reminder text by removing the parsed date/time parts
  let reminderText = text;
  
  // Remove the matched date text
  if (result.text) {
    reminderText = text.replace(result.text, '').trim();
  }
  
  // If no text remains, use a default
  if (!reminderText) {
    reminderText = 'Reminder';
  }

  return ParsedCommandSchema.parse({
    text: reminderText,
    scheduledAt,
    confidence: 0.8,
  });
}

