

import { Property } from '@/services';
import { create } from 'zustand';

interface PropertyStore {
  property: Property; // Use the Property interface defined earlier
  setProperty: (property: Partial<Property>) => void;
}

const usePropertyStore = create<PropertyStore>((set) => ({
  property: {} as Property, // Initialize with the Property type
  setProperty: (property) => set((state: PropertyStore) => ({
    property: { ...state.property, ...property }
  })),
}));

export default usePropertyStore; 