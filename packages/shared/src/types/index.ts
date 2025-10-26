import { z } from 'zod';

export const ReminderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  text: z.string(),
  scheduledAt: z.date(),
  isCompleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Reminder = z.infer<typeof ReminderSchema>;

export const CreateReminderInputSchema = z.object({
  text: z.string().min(1),
  scheduledAt: z.string().or(z.date()),
});

export type CreateReminderInput = z.infer<typeof CreateReminderInputSchema>;

export const ParsedCommandSchema = z.object({
  text: z.string(),
  scheduledAt: z.date(),
  confidence: z.number().min(0).max(1),
});

export type ParsedCommand = z.infer<typeof ParsedCommandSchema>;

