import { parse, format } from 'date-fns';

export interface RawHealthData {
  date: string;
  year: string;
  peakFlow: string;
  cough: string;
  breathlessness: string;
  sputum: string;
  weight?: string;
}

export const parseCSVData = (csvString: string): RawHealthData[] => {
  const lines = csvString.split('\n');
  return lines.slice(1).map(line => {
    const [date, year, peakFlow, cough, breathlessness, sputum, weight] = line.split(';');
    return {
      date,
      year,
      peakFlow,
      cough,
      breathlessness,
      sputum,
      weight
    };
  });
};

export const formatHealthData = (rawData: RawHealthData[]) => {
  return rawData.map(entry => ({
    date: format(parse(entry.date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
    peakFlow: entry.peakFlow ? parseInt(entry.peakFlow) : null,
    weight: entry.weight ? parseFloat(entry.weight.replace(',', '.')) : null,
    symptoms: {
      cough: parseInt(entry.cough),
      breathlessness: parseInt(entry.breathlessness),
      sputum: parseInt(entry.sputum)
    }
  }));
};