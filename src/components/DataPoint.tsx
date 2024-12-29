import React from 'react';
import { format } from 'date-fns';
import { DeleteEntryButton } from './DeleteEntryButton';
import { HealthData } from '../types/health';

interface Props {
  data: HealthData;
  onDelete: (id: string) => Promise<void>;
}

export function DataPoint({ data, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 group">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {format(new Date(data.date), 'MMM d, yyyy')}
        </span>
        <span className="text-sm">
          Peak Flow: {data.peakFlow}
        </span>
        <span className="text-sm">
          Spray: {data.spray}
        </span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <DeleteEntryButton onDelete={() => onDelete(data.id)} />
      </div>
    </div>
  );
}