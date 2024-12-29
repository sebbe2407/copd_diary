import React from 'react';
import { format } from 'date-fns';

interface Props {
  value: string;
  onChange: (date: string) => void;
  label: string;
}

export function DatePicker({ value, onChange, label }: Props) {
  return (
    <div>
      <label className="block text-gray-700 text-lg mb-2" htmlFor="date">
        {label}
      </label>
      <input
        type="date"
        id="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border rounded-lg text-lg"
        max={format(new Date(), 'yyyy-MM-dd')}
        required
      />
    </div>
  );
}