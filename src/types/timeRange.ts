export type TimeRange = '1w' | '1m' | '3m' | '1y' | 'all';

export const timeRangeLabels: Record<TimeRange, string> = {
  '1w': '1 Week',
  '1m': '1 Month',
  '3m': '3 Months',
  '1y': '1 Year',
  'all': 'All'
};