import { format, eachDayOfInterval, parse, isValid } from 'date-fns';
import { HealthData } from '../types/health';

function interpolateValue(before: number | null, after: number | null): number | null {
  if (before === null || after === null) return null;
  return (before + after) / 2;
}

function findNearestValues(data: HealthData[], date: Date) {
  const timestamp = date.getTime();
  
  let beforeValue = null;
  let afterValue = null;
  
  for (const entry of data) {
    const entryDate = new Date(entry.date).getTime();
    if (entryDate <= timestamp) {
      beforeValue = entry;
    } else {
      afterValue = entry;
      break;
    }
  }
  
  return { beforeValue, afterValue };
}

export function formatChartData(data: HealthData[]) {
  if (!data.length) return [];
  
  // Sort data by date
  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get date range
  const startDate = new Date(sortedData[0].date);
  const endDate = new Date(sortedData[sortedData.length - 1].date);

  // Generate all dates in range
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });

  // Create continuous data array
  return allDates.map(date => {
    const existingEntry = sortedData.find(entry => 
      new Date(entry.date).toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );

    if (existingEntry) {
      return {
        ...existingEntry,
        date: format(date, 'yyyy-MM-dd')
      };
    }

    // Find nearest values for interpolation
    const { beforeValue, afterValue } = findNearestValues(sortedData, date);
    
    // Interpolate values
    const weight = beforeValue?.weight && afterValue?.weight
      ? interpolateValue(beforeValue.weight, afterValue.weight)
      : null;

    return {
      date: format(date, 'yyyy-MM-dd'),
      peakFlow: beforeValue?.peakFlow || null,
      weight,
      symptoms: {
        cough: beforeValue?.symptoms.cough || 0,
        breathlessness: beforeValue?.symptoms.breathlessness || 0,
        sputum: beforeValue?.symptoms.sputum || 0
      }
    };
  });
}