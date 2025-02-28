import supabase from '../../supabaseClient';

export interface EquipmentCategory {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
}
// Interface pour Equipment
export interface Equipment {
  id: string;
  name: string;
  propertyId: string;
  category: string;
  quantity: number;
  description?: string;
  status: 'Operational' | 'Broken' | 'Under Maintenance';
  purchaseDate?: string;
  warrantyExpiration?: string;
  purchaseLink?: string;
  contactPerson?: string;
  contactPhone?: string;
  maintenanceSchedule?: string;
  locationInProperty?: string;
  equipment_categories: EquipmentCategory
  createdAt?: string;
  updatedAt?: string;
  icon?: string
}

export const equipmentService = {
  getAll: async () => {
    const { data, error } = await supabase.from('equipment').select('*, equipment_categories(*)');
    if (error) throw error;
    return data as Equipment[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Equipment;
  },

  create: async (newEquipment: Omit<Equipment, 'id'>) => {
    const { data, error } = await supabase
      .from('equipment')
      .insert([newEquipment])
      .select();
    if (error) throw error;
    return data[0] as Equipment;
  },

  update: async (id: string, updates: Partial<Equipment>) => {
    const { data, error } = await supabase
      .from('equipment')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la mise à jour de l\'équipement:', error);
      throw error;
    }

    return data as Equipment;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression de l\'équipement:', error);
      throw error;
    }
  }
};


