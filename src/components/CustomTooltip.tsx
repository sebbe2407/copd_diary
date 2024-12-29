import React from 'react';
import { TooltipProps } from 'recharts';

export function CustomTooltip({ active, payload, label }: TooltipProps<any, any>) {
  if (!active || !payload) return null;

  const date = new Date(label).toLocaleDateString('de-DE');

  return (
    <div className="glass-card p-3 shadow-lg rounded-lg border border-gray-100">
      <p className="font-medium text-gray-900 mb-2">{date}</p>
      {payload.map((item: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: item.color }}>
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}