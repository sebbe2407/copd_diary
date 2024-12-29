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

export function SymptomButtonGroup({ label, value, onChange }: Props) {
  return (
    <div>
      <label className="block text-gray-700 text-lg mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        {severityOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all
              ${value === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}