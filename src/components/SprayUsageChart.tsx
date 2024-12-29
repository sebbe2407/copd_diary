import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HealthData } from '../types/health';
import { TimeRange } from '../types/timeRange';
import { filterDataByTimeRange } from '../utils/timeRangeFilter';
import { getSprayBarColor } from '../utils/chartColors';
import { CustomTooltip } from './CustomTooltip';

interface Props {
  data: HealthData[];
  timeRange: TimeRange;
}

export function SprayUsageChart({ data, timeRange }: Props) {
  const filteredData = filterDataByTimeRange(data, timeRange);

  return (
    <div className="glass-card rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-medium text-gray-900">Daily Spray Usage</h2>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString('de-DE')}
                stroke="#999"
                tick={{ fill: '#666' }}
              />
              <YAxis
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
                label={{ value: 'Sprays Used', angle: -90, position: 'insideLeft', fill: '#666' }}
                stroke="#999"
                tick={{ fill: '#666' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="spray"
                radius={[4, 4, 0, 0]}
                name="Spray Usage"
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getSprayBarColor(entry.spray)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}