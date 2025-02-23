import supabase from '../../supabaseClient';
import { Property } from '../properties';
import { User } from '../users';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export interface TaskCategory {
  id: string;
  name: string;
  default_priority: number;
  icon_library: string,
  icon_name: string,
  created_at: Date;
  tasks: Task[]
}

export interface Task {
  id: string;
  property_id: string;
  category_id: string;
  title: string;
  description?: string;
  due_date: Date;
  user_id: string;
  recurrence?: any; // JSONB
  priority: number;
  auto_after: boolean,
  auto_before: boolean,
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
  task_categories: TaskCategory;
  properties: Property,
  userr: User
}


export const tasksService = {
  getAll: async () => {
    const { data, error } = await supabase.from('tasks')
    .select('id, status, due_date, title, \
      task_categories(name, id, icon_library, icon_name),\
       properties(title, description, property_images(image_url))');
    console.log(error);
    console.log('data');
    console.log(data);

    if (error) throw error;
    return data as Task[];
  },
  update: async (taskId, taskStatus) => {
    
      const { data, error } = await supabase
        .from('tasks')
        .update({ status: taskStatus })
        .eq('id', taskId)
        .single();
        console.log('error');
      console.log(error);
      
      if (error) throw error;
      return data as Task;

  },
  getTaskCategories: async () => {
    const { data, error } = await supabase.from('task_categories')
    .select('id, name, icon_library, icon_name, \
      tasks(id, status)');
    if (error) throw error;
    return data as TaskCategory[];
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

  create: async (newTask: Task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select();
      console.log(error);
      
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