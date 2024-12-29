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

export function SymptomsChart({ data, timeRange }: Props) {
  const filteredData = filterDataByTimeRange(data, timeRange);

  return (
    <div className="glass-card rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-medium text-gray-900">Symptoms History</h2>
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
                domain={[0, 3]} 
                ticks={[0, 1, 2, 3]} 
                label={{ value: 'Severity', angle: -90, position: 'insideLeft', fill: '#666' }}
                stroke="#999"
                tick={{ fill: '#666' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="symptoms.cough"
                stroke="#dc2626"
                strokeWidth={2}
                name="Cough"
                dot={{ r: 2, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="symptoms.breathlessness"
                stroke="#9333ea"
                strokeWidth={2}
                name="Breathlessness"
                dot={{ r: 2, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="symptoms.sputum"
                stroke="#ea580c"
                strokeWidth={2}
                name="Sputum"
                dot={{ r: 2, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}