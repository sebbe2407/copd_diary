import { HealthData } from '../types/health';

export interface StatusChange {
  date: string;
  type: 'start' | 'end';
}

export interface HydrocortisonePeriod {
  start: string;
  end: string;
}

export function getHydrocortisoneChanges(data: HealthData[]): StatusChange[] {
  return data.reduce((changes, entry, index, arr) => {
    if (index === 0) return changes;
    const prev = arr[index - 1];
    
    // Detect change from None to Pred50
    if (prev.hydrocortisone === null && entry.hydrocortisone === "Pred50") {
      changes.push({ date: entry.date, type: 'start' });
    }
    // Detect change from Pred50 to None
    else if (prev.hydrocortisone === "Pred50" && entry.hydrocortisone === null) {
      changes.push({ date: entry.date, type: 'end' });
    }
    
    return changes;
  }, [] as StatusChange[]);
}

export function getHydrocortisonePeriods(data: HealthData[]): HydrocortisonePeriod[] {
  const changes = getHydrocortisoneChanges(data);
  const periods: HydrocortisonePeriod[] = [];
  
  for (let i = 0; i < changes.length - 1; i++) {
    if (changes[i].type === 'start' && changes[i + 1].type === 'end') {
      periods.push({
        start: changes[i].date,
        end: changes[i + 1].date
      });
    }
  }
  
  // Handle case where the last period hasn't ended
  if (changes.length > 0 && changes[changes.length - 1].type === 'start') {
    periods.push({
      start: changes[changes.length - 1].date,
      end: data[data.length - 1].date // Use the last available date
    });
  }
  
  return periods;
}