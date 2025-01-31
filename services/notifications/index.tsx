import supabase from '../../supabaseClient';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  created_at: string;
}

export const notificationsService = {
  getAll: async () => {
    const { data, error } = await supabase.from('notifications').select('*');
    if (error) throw error;
    return data as Notification[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Notification;
  },

  create: async (newNotification: Omit<Notification, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('notifications')
      .insert([newNotification])
      .select();
    if (error) throw error;
    return data[0] as Notification;
  }
}; 