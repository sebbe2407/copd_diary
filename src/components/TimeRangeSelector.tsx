import React from 'react';
import { TimeRange, timeRangeLabels } from '../types/timeRange';

interface Props {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function TimeRangeSelector({ timeRange, onTimeRangeChange }: Props) {
  return (
    <div className="flex gap-1">
      {(Object.entries(timeRangeLabels) as [TimeRange, string][]).map(([range, label]) => (
        <button
          key={range}
          onClick={() => onTimeRangeChange(range)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            timeRange === range
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100/70 text-gray-600 hover:bg-gray-200/70'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}