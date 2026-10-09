import { describe, expect, it } from 'vitest'
import { GameRuleError } from './errors.ts'
import { at } from './fixtures.ts'
import { calendarDate, daysBetween, startOfNextDay } from './time.ts'

describe('calendar time', () => {
  it('counts local calendar days', () => {
    expect(calendarDate(at(2026, 10, 8, 23, 59))).toBe('2026-10-08')
    expect(calendarDate(at(2026, 10, 9, 0, 0))).toBe('2026-10-09')
    expect(daysBetween('2026-10-08', '2026-10-09')).toBe(1)
    expect(daysBetween('2026-10-08', '2026-10-11')).toBe(3)
    expect(startOfNextDay('2026-10-08')).toBe(at(2026, 10, 9))
  })

  it('rejects a date that is not a real day', () => {
    expect(() => startOfNextDay('2026-02-31')).toThrow(GameRuleError)
    expect(() => daysBetween('2026-10-8', '2026-10-09')).toThrow(GameRuleError)
  })
})
