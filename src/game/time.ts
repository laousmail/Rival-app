import { GameRuleError } from './errors.ts'

const CALENDAR_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * Local calendar helpers. The engine never treats a timer as the truth.
 * Day boundaries follow the player's local timezone.
 */

export function assertTimestamp(value: number): void {
  if (!Number.isFinite(value)) throw new GameRuleError('Time must be a real timestamp')
}

export function calendarDate(timestamp: number): string {
  assertTimestamp(timestamp)
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseCalendarDate(date: string): Date {
  const match = CALENDAR_DATE.exec(date)
  if (!match) throw new GameRuleError('Battle date must be YYYY-MM-DD')
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(year, month - 1, day)
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
    throw new GameRuleError('Battle date must be a real calendar day')
  }
  return parsed
}

/** First instant of the next local day. Rival XP for a finished day freezes here. */
export function startOfNextDay(date: string): number {
  const parsed = parseCalendarDate(date)
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate() + 1).getTime()
}

/** Whole local days from `earlier` to `later`. Negative when `later` comes first. */
export function daysBetween(earlier: string, later: string): number {
  const ms = parseCalendarDate(later).getTime() - parseCalendarDate(earlier).getTime()
  return Math.round(ms / 86_400_000)
}
