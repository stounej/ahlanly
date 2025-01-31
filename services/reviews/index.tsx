import supabase from '../../supabaseClient';

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  created_at: string;
  cleanliness: number;
  communication: number;
  checkIn: number;
  accuracy: number;
  location: number;
  value: number;
}

export const reviewsService = {
  getAll: async () => {
    const { data, error } = await supabase.from('reviews').select('*');
    if (error) throw error;
    return data as Review[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Review;
  },

  create: async (newReview: Omit<Review, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert([newReview])
      .select();
    if (error) throw error;
    return data[0] as Review;
  }
}; 