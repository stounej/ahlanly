import supabase from '../../supabaseClient';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'safety' | 'luxury' | 'outdoor';
  description?: string;
}

export const amenitiesService = {
  getAll: async () => {
    const { data, error } = await supabase.from('amenities').select('*');
    if (error) throw error;
    return data as Amenity[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('amenities')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Amenity;
  },

  create: async (newAmenity: Omit<Amenity, 'id'>) => {
    const { data, error } = await supabase
      .from('amenities')
      .insert([newAmenity])
      .select();
    if (error) throw error;
    return data[0] as Amenity;
  }
}; 