import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

/**
 * Get user's timezone or default to UTC
 */
export function getUserTimezone(): string {
  if (typeof Intl !== 'undefined') {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return 'UTC';
}

/**
 * Convert a date to user's local timezone
 */
export function toLocalTimezone(date: Date, tz: string = getUserTimezone()): Date {
  return utcToZonedTime(date, tz);
}

/**
 * Convert a local date to UTC
 */
export function toUTC(date: Date, tz: string = getUserTimezone()): Date {
  return zonedTimeToUtc(date, tz);
}

/**
 * Format date in a specific timezone
 */
export function formatInTimezone(
  date: Date,
  formatStr: string,
  tz: string = getUserTimezone()
): string {
  return formatInTimeZone(date, tz, formatStr);
}

