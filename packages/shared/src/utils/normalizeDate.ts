import { format, isValid, parse } from 'date-fns';

/**
 * Normalize date input to a consistent format
 */
export function normalizeDate(date: Date | string | number): Date {
  if (date instanceof Date) {
    return isValid(date) ? date : new Date();
  }
  
  if (typeof date === 'string') {
    const parsed = new Date(date);
    return isValid(parsed) ? parsed : new Date();
  }
  
  if (typeof date === 'number') {
    return isValid(new Date(date)) ? new Date(date) : new Date();
  }
  
  return new Date();
}

/**
 * Format date for display
 */
export function formatDate(date: Date, formatStr: string = 'PPP'): string {
  try {
    return format(date, formatStr);
  } catch {
    return date.toLocaleString();
  }
}

