import React, { useState } from 'react';
import { format } from 'date-fns';
import { DatePicker } from './DatePicker';
import { SymptomButtonGroup } from './SymptomButtonGroup';
import { HealthData, Symptoms, SeverityLevel } from '../types/health';

interface Props {
  onSubmit: (data: HealthData) => Promise<void>;
}

const HYDROCORTISONE_OPTIONS = ['None', 'Pred50'] as const;
type HydrocortisoneOption = typeof HYDROCORTISONE_OPTIONS[number];

export function DataEntry({ onSubmit }: Props) {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [spray, setSpray] = useState('0');
  const [peakFlow, setPeakFlow] = useState('');
  const [weight, setWeight] = useState('');
  const [hydrocortisone, setHydrocortisone] = useState<HydrocortisoneOption>('None');
  const [symptoms, setSymptoms] = useState<Symptoms>({
    cough: 0,
    breathlessness: 0,
    sputum: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateSymptom = (key: keyof Symptoms) => (value: SeverityLevel) => {
    setSymptoms(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const healthData: HealthData = {
        id: crypto.randomUUID(),
        date,
        spray: Number(spray),
        peakFlow: peakFlow ? Number(peakFlow) : 0,
        weight: weight ? Number(weight) : null,
        hydrocortisone: hydrocortisone === 'None' ? null : hydrocortisone,
        symptoms,
        medications: []
      };

      await onSubmit(healthData);
      
      // Reset form
      setSpray('0');
      setPeakFlow('');
      setWeight('');
      setHydrocortisone('None');
      setSymptoms({ cough: 0, breathlessness: 0, sputum: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-medium text-gray-900">New Health Entry</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Required Information</h3>
          
          <DatePicker
            value={date}
            onChange={setDate}
            label="Date"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="spray">
              Spray Usage (0-10)
            </label>
            <input
              id="spray"
              type="number"
              min="0"
              max="10"
              value={spray}
              onChange={(e) => setSpray(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Optional Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="peakFlow">
              Peak Flow (L/min)
            </label>
            <input
              id="peakFlow"
              type="number"
              min="0"
              max="500"
              value={peakFlow}
              onChange={(e) => setPeakFlow(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="weight">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="hydrocortisone">
              Hydrocortisone
            </label>
            <select
              id="hydrocortisone"
              value={hydrocortisone}
              onChange={(e) => setHydrocortisone(e.target.value as HydrocortisoneOption)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
            >
              {HYDROCORTISONE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Symptoms</h4>
            <SymptomButtonGroup
              label="Cough"
              value={symptoms.cough}
              onChange={updateSymptom('cough')}
            />
            <SymptomButtonGroup
              label="Shortness of Breath"
              value={symptoms.breathlessness}
              onChange={updateSymptom('breathlessness')}
            />
            <SymptomButtonGroup
              label="Sputum (Ejection)"
              value={symptoms.sputum}
              onChange={updateSymptom('sputum')}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}