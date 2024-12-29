import React, { useState } from 'react';
import { MedicationSchedule } from '../../types/medication';
import { startOfWeek, endOfWeek, format } from 'date-fns';

interface Props {
  onSubmit: (schedule: MedicationSchedule) => void;
  onCancel: () => void;
}

export function MedicationForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState('');
  const [morning, setMorning] = useState('0');
  const [noon, setNoon] = useState('0');
  const [evening, setEvening] = useState('0');
  
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const schedule: MedicationSchedule = {
      id: crypto.randomUUID(),
      name,
      weekStart: format(weekStart, 'yyyy-MM-dd'),
      weekEnd: format(weekEnd, 'yyyy-MM-dd'),
      schedule: {
        morning: parseInt(morning),
        noon: parseInt(noon),
        evening: parseInt(evening),
      },
    };
    
    onSubmit(schedule);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medication Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Morning Dose
          </label>
          <input
            type="number"
            min="0"
            value={morning}
            onChange={(e) => setMorning(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Noon Dose
          </label>
          <input
            type="number"
            min="0"
            value={noon}
            onChange={(e) => setNoon(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Evening Dose
          </label>
          <input
            type="number"
            min="0"
            value={evening}
            onChange={(e) => setEvening(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          Add Schedule
        </button>
      </div>
    </form>
  );
}