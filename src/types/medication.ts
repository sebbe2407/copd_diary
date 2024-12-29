export interface MedicationSchedule {
  id: string;
  name: string;
  weekStart: string;
  weekEnd: string;
  schedule: DailyDoses;
}

export interface DailyDoses {
  morning: number;
  noon: number;
  evening: number;
}

export interface MedicationEntry {
  id: string;
  scheduleId: string;
  date: string;
  taken: {
    morning: boolean;
    noon: boolean;
    evening: boolean;
  };
}