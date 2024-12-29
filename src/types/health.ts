import { Comment } from './comment';

export interface HealthData {
  id: string;
  date: string;
  peakFlow: number;
  weight: number | null;
  spray: number;
  hydrocortisone: string | null;
  symptoms: Symptoms;
  medications: Medication[];
  comments?: Comment[];
}

export interface Symptoms {
  cough: SeverityLevel;
  breathlessness: SeverityLevel;
  sputum: SeverityLevel;
}

export type SeverityLevel = 0 | 1 | 2 | 3;

export interface Medication {
  name: string;
  dosage: string;
  timeTaken: string;
}