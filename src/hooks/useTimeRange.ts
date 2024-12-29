import { useState } from 'react';
import { TimeRange } from '../types/timeRange';
import { HealthData } from '../types/health';
import { filterDataByTimeRange } from '../utils/timeRangeFilter';

export function useTimeRange(data: HealthData[]) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1m');
  const filteredData = filterDataByTimeRange(data, timeRange);
  
  return {
    timeRange,
    setTimeRange,
    filteredData
  };
}