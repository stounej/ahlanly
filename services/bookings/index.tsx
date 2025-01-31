import supabase from '../../supabaseClient';
import { Property } from '../properties';
import { Task } from '../tasks';
import { User } from '../users';

export interface Booking {
  id: string;
  property_id: Property;
  guest_id: User[];
  check_in: string;
  check_out: string;
  number_of_guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  total_price: number,
  currency: string,
  created_at: string;
  task: Task[],
}

export const bookingsService = {
  getAll: async () => {
    const { data, error } = await supabase.from('booking').select('*, task(*)');
    console.log(error);
    
    if (error) throw error;
    return data as Booking[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Booking;
  },

  create: async (newBooking: Omit<Booking, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([newBooking])
      .select();
    if (error) throw error;
    return data[0] as Booking;
  }
}; 