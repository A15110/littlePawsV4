import { isWithinInterval, parseISO } from 'date-fns';

export const HOLIDAY_PERIODS = [
  { start: '2024-08-30', end: '2024-09-02', name: 'Labor Day Weekend' },
  { start: '2024-11-28', end: '2024-12-01', name: 'Thanksgiving' },
  { start: '2024-12-21', end: '2025-01-01', name: 'Christmas & New Year' },
  { start: '2025-01-17', end: '2025-01-20', name: 'MLK Weekend' },
  { start: '2025-02-14', end: '2025-02-17', name: 'Valentine\'s Weekend' },
  { start: '2025-05-23', end: '2025-05-26', name: 'Memorial Day Weekend' },
  { start: '2025-06-19', end: '2025-06-22', name: 'Juneteenth Weekend' },
  { start: '2025-07-04', end: '2025-07-06', name: 'Independence Day Weekend' },
  { start: '2025-08-29', end: '2025-09-01', name: 'Labor Day Weekend' }
];

export function isHoliday(date: Date): boolean {
  return HOLIDAY_PERIODS.some(period => 
    isWithinInterval(date, {
      start: parseISO(period.start),
      end: parseISO(period.end)
    })
  );
}

export function getHolidayPeriod(date: Date) {
  return HOLIDAY_PERIODS.find(period =>
    isWithinInterval(date, {
      start: parseISO(period.start),
      end: parseISO(period.end)
    })
  );
}