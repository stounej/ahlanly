import supabase from '../../supabaseClient';
import { BookingSetting } from '../bookingsettings';
import { CalendarEvent } from '../calendar';
import { Equipment } from '../equipment';
import { HouseRule } from '../houserules';
import { Review } from '../reviews';
import { Task } from '../tasks';

interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
  available: boolean;
  city: string;
  price: string;
  number_of_rooms: number;
  additional_info: string;
  type_de_logement: string;
  nombre_de_voyageurs: number;
  emplacement: string;
  bookingsetting: BookingSetting[];
  houserule: HouseRule[];
  conditionsAnnulation: string;
  bookings_this_month: number;
  task: Task[];
  review: Review;
  calendarEvent: CalendarEvent;
  availableUntil: string;
  equipment: Equipment[]
  
}

export type { Property };

export const propertiesService = {
  getAll: async () => {    
    let { data, error } = await supabase.from('property').select('*, task(*), review(*)');
    if (error) throw error; 
   
    return data as Property[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('property')
      .select('*, task(*), review(*), houserule(*), bookingsetting(*), equipment(*)')
      .eq('id', id)
      .single();
      console.log(data);
      console.log(error);

      
    if (error) throw error;
    return data as Property;
  },

  create: async (newProperty: Omit<Property, 'id'>) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([newProperty])
      .select();
    if (error) throw error;
    return data[0] as Property;
  }
}; 