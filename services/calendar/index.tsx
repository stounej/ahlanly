import supabase from '../../supabaseClient';

export interface CalendarEvent {
  id: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  type: 'reservation' | 'blocked' | 'maintenance';
  title: string;
  description?: string;
}

export const calendarService = {
  getAll: async () => {
    const { data, error } = await supabase.from('calendar_events').select('*');
    if (error) throw error;
    return data as CalendarEvent[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as CalendarEvent;
  },

  create: async (newEvent: Omit<CalendarEvent, 'id'>) => {
    const { data, error } = await supabase
      .from('calendar_events')
      .insert([newEvent])
      .select();
    if (error) throw error;
    return data[0] as CalendarEvent;
  },

  getByPropertyId: async (propertyId: string) => {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('propertyId', propertyId);
    if (error) throw error;
    return data as CalendarEvent[];
  }
}; 