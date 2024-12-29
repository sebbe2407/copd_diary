import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, ReferenceLine, ReferenceArea, Brush, Cell } from 'recharts';
import { HealthData } from '../types/health';
import { TimeRange } from '../types/timeRange';
import { TimeRangeSelector } from './TimeRangeSelector';
import { filterDataByTimeRange } from '../utils/timeRangeFilter';
import { getHydrocortisoneChanges, getHydrocortisonePeriods } from '../utils/hydrocortisone';
import { getSprayBarColor } from '../utils/chartColors';
import { CustomTooltip } from './CustomTooltip';

interface Props {
  data: HealthData[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function HealthChart({ data, timeRange, onTimeRangeChange }: Props) {
  const filteredData = filterDataByTimeRange(data, timeRange);
  const connectNulls = true;
  const statusChanges = getHydrocortisoneChanges(filteredData).filter(change => change.type === 'start');
  const periods = getHydrocortisonePeriods(filteredData);

  return (
    <div className="glass-card rounded-2xl shadow-sm mb-6 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">Peak Flow History</h2>
          <TimeRangeSelector timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />
        </div>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={filteredData}
              margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              
              {periods.map((period, index) => (
                <ReferenceArea
                  key={`area-${period.start}-${period.end}-${index}`}
                  x1={period.start}
                  x2={period.end}
                  fill="#ef4444"
                  fillOpacity={0.15}
                />
              ))}

              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('de-DE')}
                stroke="#999"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                domain={[150, 600]} 
                label={{ value: 'Peak Flow (L/min)', angle: -90, position: 'insideLeft', fill: '#666' }}
                stroke="#999"
                tick={{ fill: '#666' }}
              />
              <YAxis
                yAxisId="spray"
                orientation="right"
                domain={[0, 10]}
                hide={true}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {statusChanges.map((change, index) => (
                <ReferenceLine
                  key={`line-${change.date}-${index}`}
                  x={change.date}
                  stroke="#6366f1"
                  strokeDasharray="3 3"
                  label={{
                    value: "💊",
                    position: 'top',
                    fill: '#6366f1',
                    fontSize: 20,
                    offset: 10
                  }}
                />
              ))}

              <Bar
                yAxisId="spray"
                dataKey="spray"
                name="Spray Usage"
                maxBarSize={20}
                radius={[2, 2, 0, 0]}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getSprayBarColor(entry.spray)} />
                ))}
              </Bar>
              <Line
                type="monotone"
                dataKey="peakFlow"
                stroke="#2563eb"
                strokeWidth={2}
                name="Peak Flow"
                dot={{ r: 2, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 4, strokeWidth: 2 }}
                connectNulls={connectNulls}
              />
              
              <Brush
                dataKey="date"
                height={30}
                stroke="#2563eb"
                fill="#dbeafe"
                tickFormatter={(date) => new Date(date).toLocaleDateString('de-DE')}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}