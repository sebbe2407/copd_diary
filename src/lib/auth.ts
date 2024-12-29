import { supabase } from './supabase';

export async function ensureProfile(userId: string, email: string) {
  try {
    // First check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ id: userId, email })
        .single();

      if (insertError) {
        console.error('Error creating profile:', insertError);
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error in ensureProfile:', error);
    throw error;
  }
}