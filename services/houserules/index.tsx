import supabase from '../../supabaseClient';

interface HouseRule {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  icon?: string;
  mandatory: boolean;
}

export type { HouseRule };  // Export type separately

export const houserulesService = {
  getAll: async () => {
    const { data, error } = await supabase.from('house_rules').select('*');
    if (error) throw error;
    return data as HouseRule[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('house_rules')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as HouseRule;
  },

  create: async (newRule: Omit<HouseRule, 'id'>) => {
    const { data, error } = await supabase
      .from('house_rules')
      .insert([newRule])
      .select();
    if (error) throw error;
    return data[0] as HouseRule;
  }
}; 