import { describe, it, expect } from 'vitest';
import { parseNaturalReminder } from '../parseNaturalReminder';

describe('parseNaturalReminder', () => {
  it('should parse German natural language reminder', () => {
    const result = parseNaturalReminder('morgen 8 uhr zahnarzt');
    
    expect(result.text.trim().toLowerCase()).toBe('zahnarzt');
    expect(result.scheduledAt).toBeInstanceOf(Date);
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should extract date and strip time words', () => {
    const result = parseNaturalReminder('Call mom tomorrow at 3pm');
    
    expect(result.text.trim().toLowerCase()).not.toContain('tomorrow');
    expect(result.text.trim().toLowerCase()).not.toContain('3pm');
    expect(result.text.trim().toLowerCase()).toContain('mom');
    expect(result.scheduledAt).toBeInstanceOf(Date);
  });

  it('should handle timezone-aware parsing', () => {
    const result = parseNaturalReminder('Erinnere mich übermorgen 14 Uhr an Meeting');
    
    expect(result.text.trim().toLowerCase()).not.toContain('übermorgen');
    expect(result.text.trim().toLowerCase()).not.toContain('14 uhr');
    expect(result.scheduledAt).toBeInstanceOf(Date);
  });

  it('should provide fallback for text without dates', () => {
    const result = parseNaturalReminder('Just a reminder text');
    
    // Should have a scheduled date even without date words
    expect(result.scheduledAt).toBeInstanceOf(Date);
    expect(result.text.length).toBeGreaterThan(0);
  });

  it('should return high confidence for clear date/time expressions', () => {
    const result = parseNaturalReminder('Call dentist in 2 hours');
    
    expect(result.scheduledAt).toBeInstanceOf(Date);
    expect(result.confidence).toBeGreaterThan(0.5);
  });
});

