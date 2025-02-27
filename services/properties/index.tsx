import supabase from '../../supabaseClient';
import { BookingSetting } from '../bookingsettings';
import { CalendarEvent } from '../calendar';
import { Equipment } from '../equipment';
import { HouseRule } from '../houserules';
import { Review } from '../reviews';
import { Task } from '../tasks';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';

export enum RentType {
  NIGHT = 'night',
  MONTHLY = 'monthly'
}

export enum PropertyStyle {
  PRIVATE_ROOM = 'private_room',
  ENTIRE_PROPERTY = 'entire_property',
  HOSTEL = 'hostel'
}

export interface Property {
  id: string;
  title: string;
  description: string;
  available: boolean;
  city: string;
  price: number;
  address: string;
  country: string;
  zip_code: string;
  address_complement?: string;
  number_of_rooms: number;
  number_of_beds: number;
  number_of_bathrooms: number;
  max_guests: number;
  additional_info?: string;
  property_type?: string;
  rent_type: RentType;
  property_style: PropertyStyle;
  created_at: Date;
  updated_at: Date;
  bookingsetting: BookingSetting[];
  houserule: HouseRule[];
  tasks: Task[];
  review: Review;
  equipment: Equipment[]
  calendarEvent: CalendarEvent;
  property_images: any[]
}

export const propertiesService = {
  getAll: async () => {    
    let { data, error } = await supabase.from('properties').select('*, tasks(*, task_categories(*)), property_images(*)');
    if (error) throw error; 
    
   
    return data as Property[];
  },
  getJustProperties: async () => {    
    let { data, error } = await supabase.from('properties').select('id, title, city, property_images(image_url, id, path)');

    if (error) throw error; 
    
   
    return data as Property[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*, property_images(id, image_url, path), tasks(id, property_id, title, description, due_date, recurrence, status, auto_after, auto_before,\
         task_categories(name, icon_library, icon_name))')
      .eq('id', id)
      .single();      
      
    if (error) throw error;
    return data as Property;
  },

    create: async (newProperty: Omit<Property, 'id'>) => {
      const {property_images, equipment, tasks, ...filtered_properties} = newProperty
      try {
        // Compression et upload des images
        const compressedImageUris = await Promise.all(
          property_images.map(async (img) => {
            // Compression de l'image
           
            const compressedImage = await manipulateAsync(
              img.uri,
              [{ resize: { width: 1080 } }], // Redimensionnement tout en gardant le ratio
              { compress: 0.8, format: SaveFormat.JPEG } // Compression à 80% qualité
            ); 
            
            // Génération d'un nom de fichier unique
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
            const arraybuffer = await fetch(compressedImage.uri).then((res) => res.arrayBuffer())

            // Upload vers Supabase Storage
            const { data: storageData, error: storageError } = await supabase.storage
              .from('ahlanly_public')
              .upload(fileName, arraybuffer,
                {
                  contentType: 'image/jpeg',
                }
              );
              
            if (storageError) throw storageError;

            // Récupération du lien public
            const { data: { publicUrl } } = supabase.storage
              .from('ahlanly_public')
              .getPublicUrl(storageData.path);
            return {publicUrl, path: storageData.path};
          })
        );
      const { data: propertyData, error: propertyError} = await supabase
        .from('properties')
        .insert([filtered_properties])
        .select();
      if (propertyError) throw propertyError;  
      
      const { data: imagesData, error: imageError } = await supabase
        .from('property_images')
        .insert(compressedImageUris.map((uri) => ({
          property_id: propertyData[0].id,
          image_url: uri, 
          path: uri.path
        })))
        .select();

      if (imageError) throw imageError;
      
      return propertyData[0] as Property;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
    },


   updateImages: async (propertyId, images) => {

    const addedImages = images.addedImages
    const deletedImages = images.deletedImages

    try{
       if(addedImages.length > 0){
       const compressedImageUris = await Promise.all(
        addedImages.map(async (img) => {
          const compressedImage = await manipulateAsync(
            img.image_url,
            [{ resize: { width: 1080 } }], // Redimensionnement tout en gardant le ratio
            { compress: 0.8, format: SaveFormat.JPEG } // Compression à 80% qualité
          ); 
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
          const arraybuffer = await fetch(compressedImage.uri).then((res) => res.arrayBuffer())

          // Upload vers Supabase Storage
          const { data: storageData, error: storageError } = await supabase.storage
            .from('ahlanly_public')
            .upload(fileName, arraybuffer,
              {
                contentType: 'image/jpeg',
              }
            );
            
          if (storageError) throw storageError;

          // Récupération du lien public
          const { data: { publicUrl } } = supabase.storage
            .from('ahlanly_public')
            .getPublicUrl(storageData.path);
          return {publicUrl, path: storageData.path};
        })
      );
      
      const { data: imagesData, error: imageError } = await supabase
        .from('property_images')
        .insert(compressedImageUris.map((uri) => ({
          property_id: propertyId,
          image_url: uri.publicUrl,
          path: uri.path
        })))
        .select();

      if (imageError) throw imageError;

    }

  
    if(deletedImages.length > 0){      
      const { data, error } = await supabase
      .storage
      .from('ahlanly_public')
      .remove(deletedImages.map((d:any) => d.path));

        const { data: imagesData, error: imageError } = await supabase
        .from('property_images')
        .delete()
        .eq('id',deletedImages.map((d:any) => d.id) )
        .select();
  }
    }
    catch(err){
      console.log(err); 
    }
    },

    update_title: async(propertyId, title) => {
      const { data: imagesData, error: imageError } = await supabase
      .from('properties')
      .update({title: title})
      .eq('id', propertyId)
    },

    update_description: async(propertyId, description) => {
      const { data: imagesData, error: imageError } = await supabase
      .from('properties')
      .update({description: description})
      .eq('id', propertyId)
    },

    // update_description: async(propertyId, description) => {
    //   const { data: imagesData, error: imageError } = await supabase
    //   .from('properties')
    //   .update({description: description})
    //   .eq('id', propertyId)
    // }
  }; 