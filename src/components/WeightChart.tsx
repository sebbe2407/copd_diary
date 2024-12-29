import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HealthData } from '../types/health';
import { TimeRange } from '../types/timeRange';
import { filterDataByTimeRange } from '../utils/timeRangeFilter';
import { CustomTooltip } from './CustomTooltip';

interface Props {
  data: HealthData[];
  timeRange: TimeRange;
}

export function WeightChart({ data, timeRange }: Props) {
  const filteredData = filterDataByTimeRange(data, timeRange);
  const connectNulls = true;

  return (
    <div className="glass-card rounded-2xl shadow-sm mb-6 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-medium text-gray-900">Weight History</h2>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('de-DE')}
                stroke="#999"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                domain={[50, 80]}
                ticks={[50, 55, 60, 65, 70, 75, 80]}
                label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', fill: '#666' }}
                stroke="#999"
                tick={{ fill: '#666' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#16a34a"
                strokeWidth={2}
                name="Weight"
                dot={{ r: 2, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 4, strokeWidth: 2 }}
                connectNulls={connectNulls}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}