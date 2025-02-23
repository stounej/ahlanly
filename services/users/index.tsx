import supabase from '../../supabaseClient';

  interface User {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string;
    phone?: string;
    role: 'owner' | 'manager' | 'staff';
    created_at: string;
    last_sign_in_at?: string;
    rating: number,
    is_active: boolean,
    date_of_birth: Date,
    country: string,
    postal_code: string,
    city: string,
    address: string,
    

  }

export type { User };

export const UsersService = {
  getAll: async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data as User[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as User;
  },

  create: async (newUser: Omit<User, 'id' | 'created_at' | 'last_sign_in_at'>) => {
    const { data, error } = await supabase
      .from('Users')
      .insert([newUser])
      .select();
    if (error) throw error;
    return data[0] as User;
  },

  getCurrentUser: async () => {
    const { data: { User }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return User;
  }
}; 