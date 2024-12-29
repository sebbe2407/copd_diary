import { TimeRange } from '../types/timeRange';
import { HealthData } from '../types/health';

export function filterDataByTimeRange(data: HealthData[], timeRange: TimeRange) {
  if (timeRange === 'all') return data;
  
  const cutoffDate = new Date();
  switch (timeRange) {
    case '1w':
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      break;
    case '1m':
      cutoffDate.setMonth(cutoffDate.getMonth() - 1);
      break;
    case '3m':
      cutoffDate.setMonth(cutoffDate.getMonth() - 3);
      break;
    case '1y':
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
      break;
  }

  // Sort data by date before filtering
  return data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(entry => new Date(entry.date) >= cutoffDate);
}