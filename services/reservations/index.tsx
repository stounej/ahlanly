import supabase from '../../supabaseClient';

export interface Reservation {
  id: string;
  guest: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: string;
  contact: string;
}

export type { Reservation };

export const reservationsService = {
  getAll: async () => {
    const { data, error } = await supabase.from('reservations').select('*');
    if (error) throw error;
    return data as Reservation[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Reservation;
  },

  create: async (newReservation: Omit<Reservation, 'id'>) => {
    const { data, error } = await supabase
      .from('reservations')
      .insert([newReservation])
      .select();
    if (error) throw error;
    return data[0] as Reservation;
  }
}; 