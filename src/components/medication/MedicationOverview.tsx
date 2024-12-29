import React, { useState } from 'react';
import { CurrentWeekSchedule } from './CurrentWeekSchedule';
import { MedicationHistory } from './MedicationHistory';
import { MedicationForm } from './MedicationForm';
import { Plus } from 'lucide-react';
import { MedicationSchedule } from '../../types/medication';

export function MedicationOverview() {
  const [showForm, setShowForm] = useState(false);
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);

  const handleAddSchedule = (schedule: MedicationSchedule) => {
    setSchedules(prev => [...prev, schedule]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Medication Current Week</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Medication
          </button>
        </div>

        {showForm && (
          <MedicationForm
            onSubmit={handleAddSchedule}
            onCancel={() => setShowForm(false)}
          />
        )}

        <CurrentWeekSchedule schedules={schedules} />
      </div>

      <div className="glass-card rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Medication History</h2>
        <MedicationHistory 
          schedules={schedules}
          selectedWeek={selectedWeek}
          onSelectWeek={setSelectedWeek}
        />
      </div>
    </div>
  );
}