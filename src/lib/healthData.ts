import { supabase } from './supabase';
import { HealthData } from '../types/health';

export async function fetchHealthData(userId: string): Promise<HealthData[]> {
  try {
    console.log('Fetching health data for user:', userId);
    
    const { data, error } = await supabase
      .from('health_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (error) {
      console.error('Supabase error fetching health data:', error);
      throw new Error(error.message);
    }

    if (!data) {
      console.log('No health data found');
      return [];
    }

    console.log('Successfully fetched health data:', data.length, 'entries');
    return data.map(entry => ({
      id: entry.id,
      date: entry.date,
      spray: entry.spray,
      peakFlow: entry.peak_flow,
      weight: entry.weight,
      hydrocortisone: entry.hydrocortisone,
      symptoms: entry.symptoms || { cough: 0, breathlessness: 0, sputum: 0 },
      medications: []
    }));
  } catch (error) {
    console.error('Error in fetchHealthData:', error);
    throw error;
  }
}

export async function addHealthEntry(userId: string, data: HealthData): Promise<void> {
  try {
    console.log('Adding health entry:', { userId, data });
    
    const { error } = await supabase
      .from('health_entries')
      .insert({
        user_id: userId,
        date: data.date,
        spray: data.spray,
        peak_flow: data.peakFlow,
        weight: data.weight,
        hydrocortisone: data.hydrocortisone,
        symptoms: data.symptoms
      });

    if (error) {
      console.error('Supabase error adding health entry:', error);
      if (error.code === '23505') {
        throw new Error('An entry for this date already exists.');
      }
      throw new Error(error.message);
    }

    console.log('Successfully added health entry');
  } catch (error) {
    console.error('Error in addHealthEntry:', error);
    throw error;
  }
}

export async function deleteHealthEntry(userId: string, entryId: string): Promise<void> {
  try {
    console.log('Deleting health entry:', { userId, entryId });

    const { error } = await supabase
      .from('health_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', userId);

    if (error) {
      console.error('Supabase error deleting health entry:', error);
      throw new Error(error.message);
    }

    console.log('Successfully deleted health entry');
  } catch (error) {
    console.error('Error in deleteHealthEntry:', error);
    throw error;
  }
}