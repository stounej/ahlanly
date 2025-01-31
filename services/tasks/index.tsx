import supabase from '../../supabaseClient';

export interface Task {
  id: string;
  title: string;
  date: string;
  propertyId: string;
  reservationId?: string;
  completed: boolean;
}

export const tasksService = {
  getAll: async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) throw error;
    return data as Task[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Task;
  },

  create: async (newTask: Omit<Task, 'id'>) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select();
    if (error) throw error;
    return data[0] as Task;
  },

  getByPropertyId: async (propertyId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('propertyId', propertyId);
    if (error) throw error;
    return data as Task[];
  },

  getByReservationId: async (reservationId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('reservationId', reservationId);
    if (error) throw error;
    return data as Task[];
  }
}; 