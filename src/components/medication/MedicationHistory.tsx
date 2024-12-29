import React from 'react';
import { format, parseISO } from 'date-fns';
import { MedicationSchedule } from '../../types/medication';
import { WeeklySchedule } from './WeeklySchedule';
import { ChevronRight } from 'lucide-react';

interface Props {
  schedules: MedicationSchedule[];
  selectedWeek: string | null;
  onSelectWeek: (weekStart: string | null) => void;
}

export function MedicationHistory({ schedules, selectedWeek, onSelectWeek }: Props) {
  // Group schedules by week
  const weeklySchedules = schedules.reduce((acc, schedule) => {
    const weekStart = schedule.weekStart;
    if (!acc[weekStart]) {
      acc[weekStart] = [];
    }
    acc[weekStart].push(schedule);
    return acc;
  }, {} as Record<string, MedicationSchedule[]>);

  const weeks = Object.keys(weeklySchedules).sort().reverse();

  if (weeks.length === 0) {
    return (
      <p className="text-gray-600 text-center py-8">
        No medication history available yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {weeks.map(weekStart => {
        const isSelected = selectedWeek === weekStart;
        const schedules = weeklySchedules[weekStart];
        const formattedDate = format(parseISO(weekStart), 'MMM d, yyyy');

        return (
          <div key={weekStart} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => onSelectWeek(isSelected ? null : weekStart)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium text-gray-900">Week of {formattedDate}</h3>
                <p className="text-sm text-gray-600">
                  {schedules.length} medication{schedules.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isSelected ? 'rotate-90' : ''
                }`}
              />
            </button>
            
            {isSelected && (
              <div className="border-t border-gray-200">
                {schedules.map(schedule => (
                  <WeeklySchedule key={schedule.id} schedule={schedule} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}