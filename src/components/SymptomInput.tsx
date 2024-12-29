import React from 'react';
import { SeverityLevel } from '../types/health';

interface Props {
  label: string;
  value: SeverityLevel;
  onChange: (value: SeverityLevel) => void;
}

const severityOptions = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Mild' },
  { value: 2, label: 'Moderate' },
  { value: 3, label: 'Severe' },
] as const;

export function SymptomInput({ label, value, onChange }: Props) {
  return (
    <div>
      <label className="block text-gray-700 text-lg mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as SeverityLevel)}
        className="w-full p-3 border rounded-lg text-lg"
      >
        {severityOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.value})
          </option>
        ))}
      </select>
    </div>
  );
}