import { Property } from '@/services';
import { create } from 'zustand';

interface PropertiesStore {
  properties: Property[];
  addProperty: (property: Property) => void;
  setProperty: (id: string, update: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  resetProperties: () => void;
}

const usePropertyStore = create<PropertiesStore>((set) => ({
  properties: [],

  addProperty: (property) => set((state) => ({
    properties: [...state.properties, property]
  })),

  setProperty: (id, update) => set((state) => ({
    properties: state.properties.map(p => 
      p.id === id ? { ...p, ...update } : p
    )
  })),

  deleteProperty: (id) => set((state) => ({
    properties: state.properties.filter(p => p.id !== id)
  })),

  resetProperties: () => set({ properties: [] }),
}));

export default usePropertyStore; 