

import { Property } from '@/services';
import { create } from 'zustand';

interface PropertyStore {
  property: Property; // Use the Property interface defined earlier
  setCurrentProperty: (property: Partial<Property>) => void;
}

const usePropertyStore = create<PropertyStore>((set) => ({
  property: {} as Property, // Initialize with the Property type
  setCurrentProperty: (property) => set((state: PropertyStore) => ({
    property: { ...state.property, ...property }
  })),
}));

export default usePropertyStore; 