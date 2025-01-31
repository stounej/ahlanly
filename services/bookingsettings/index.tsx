import supabase from '../../supabaseClient';

export interface BookingSetting {
  id: string;
  propertyId: string;
  minStayDays: number;
  maxStayDays: number;
  advanceBookingDays: number;
  checkInTime: string;
  checkOutTime: string;
  instantBooking: boolean;
  cancellation_policy: string;
}

export const bookingsettingsService = {
  getAll: async () => {
    const { data, error } = await supabase.from('booking_settings').select('*');
    if (error) throw error;
    return data as BookingSetting[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('booking_settings')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as BookingSetting;
  },

  create: async (newSetting: Omit<BookingSetting, 'id'>) => {
    const { data, error } = await supabase
      .from('booking_settings')
      .insert([newSetting])
      .select();
    if (error) throw error;
    return data[0] as BookingSetting;
  }
}; 