import React from 'react';
import { MedicationSchedule } from '../../types/medication';
import { startOfWeek, format } from 'date-fns';

interface Props {
  schedules: MedicationSchedule[];
}

export function CurrentWeekSchedule({ schedules }: Props) {
  const today = new Date();
  const currentWeekStart = format(startOfWeek(today), 'yyyy-MM-dd');
  
  const currentWeekSchedules = schedules.filter(
    schedule => schedule.weekStart === currentWeekStart
  );

  if (currentWeekSchedules.length === 0) {
    return (
      <p className="text-gray-600 text-center py-8">
        No medication schedules for this week. Add one using the button above.
      </p>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-sm font-medium text-gray-500">Medication</th>
            <th className="text-right py-3 text-sm font-medium text-gray-500">Schedule</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {currentWeekSchedules.map(schedule => (
            <tr key={schedule.id}>
              <td className="py-3 text-gray-900">{schedule.name}</td>
              <td className="py-3 text-right text-gray-900">
                {`${schedule.schedule.morning}-${schedule.schedule.noon}-${schedule.schedule.evening}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}