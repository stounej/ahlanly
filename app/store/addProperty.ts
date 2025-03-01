

import { Property } from '@/services';
import { create } from 'zustand';

interface PropertyStore {
  property: Property; // Use the Property interface defined earlier
  setCurrentProperty: (property: Partial<Property>) => void;
}

const usePropertyStore = create<PropertyStore>((set) => ({
  property: {
    // equipmentByCategory: {
    //   Cuisine: [
    //     { id: 1, name: 'Cafetière Nespresso' },
    //     { id: 2, name: 'Lave-vaisselle' },
    //     { id: 3, name: 'Micro-ondes' }
    //   ],
    //   Salon: [
    //     { id: 4, name: 'TV 4K 55"' },
    //     { id: 5, name: 'PS5' },
    //     { id: 6, name: 'Canapé convertible' }
    //   ]
    // },
    // bookingsetting: [
    //   { type: 'Arrivée', value: '15:00' },
    //   { type: 'Départ', value: '11:00' },
    //   { type: 'Annulation', value: 'Flexible' }
    // ],
    // houserule: [
    //   { id: 1, title: 'Pas de fête' },
    //   { id: 2, title: 'Non-fumeur' },
    //   { id: 3, title: 'Animaux interdits' }
    // ] 

  } as Property, // Initialize with the Property type
  setCurrentProperty: (property) => set((state: PropertyStore) => ({
    property: { ...state.property, ...property }
  })),
}));

export default usePropertyStore; 