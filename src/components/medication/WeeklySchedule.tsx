import React from 'react';
import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { MedicationSchedule } from '../../types/medication';
import { Clock, Sun, Moon } from 'lucide-react';

interface Props {
  schedule: MedicationSchedule;
}

export function WeeklySchedule({ schedule }: Props) {
  const days = eachDayOfInterval({
    start: parseISO(schedule.weekStart),
    end: parseISO(schedule.weekEnd),
  });

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">{schedule.name}</h3>
        <p className="text-sm text-gray-600">
          Week of {format(parseISO(schedule.weekStart), 'MMM d, yyyy')}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Time</th>
              {days.map(day => (
                <th
                  key={day.toISOString()}
                  className="px-4 py-3 text-center text-sm font-medium text-gray-500"
                >
                  {format(day, 'EEE')}
                  <br />
                  {format(day, 'd')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Morning
                </div>
              </td>
              {days.map(day => (
                <td key={day.toISOString()} className="px-4 py-3 text-center">
                  {schedule.schedule.morning}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Noon
                </div>
              </td>
              {days.map(day => (
                <td key={day.toISOString()} className="px-4 py-3 text-center">
                  {schedule.schedule.noon}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Evening
                </div>
              </td>
              {days.map(day => (
                <td key={day.toISOString()} className="px-4 py-3 text-center">
                  {schedule.schedule.evening}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}