  import React, { useEffect, useRef, useState } from 'react';
  import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
  import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
  import { propertiesService, Property, Task } from '@/services';
  import { useLocalSearchParams,  } from 'expo-router';
  import AddProperty from '../(tabs)/properties/add';
import usePropertyStore from '@/app/store/addProperty';

  type ChildRef = {
    handlePresentModalPress: () => void;
  };

  const AppartementDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const childRef = useRef<ChildRef>(null);
    const [step, setStep] = useState(0);
    const { setCurrentProperty, property } = usePropertyStore();



    const [appartement, setAppartment] = useState<Property>({
      ...property,
      equipmentByCategory: {
        Cuisine: [
          { id: 1, name: 'Cafetière Nespresso' },
          { id: 2, name: 'Lave-vaisselle' },
          { id: 3, name: 'Micro-ondes' }
        ],
        Salon: [
          { id: 4, name: 'TV 4K 55"' },
          { id: 5, name: 'PS5' },
          { id: 6, name: 'Canapé convertible' }
        ]
      },
      bookingsetting: [
        { type: 'Arrivée', value: '15:00' },
        { type: 'Départ', value: '11:00' },
        { type: 'Annulation', value: 'Flexible' }
      ],
      houserule: [
        { id: 1, title: 'Pas de fête' },
        { id: 2, title: 'Non-fumeur' },
        { id: 3, title: 'Animaux interdits' }
      ] 
    });

    const handleEdit = (s: number) => {
      if (childRef.current) {
        childRef.current.handlePresentModalPress();
      }    
      setStep(s)
    };

    useEffect(()=>{
      const fetchData = async () => {
        const property =  await propertiesService.getById(id)
        if (property) {
          const grouped = property.tasks.reduce((acc, task) => {
            const categoryName = task.task_categories?.name || 'Autre';
            if (!acc[categoryName]) acc[categoryName] = {name: categoryName, items: []};
            acc[categoryName].items.push(task as Task);
            return acc;
          }, {} as Record<string, Task[]>);
          
          setAppartment(prev => ({
            ...prev,
            ...property,
            tasksByCategory: Object.values(grouped)
          }));

          setCurrentProperty(
            {
              ...property
            }
          )
          
        }
      }
      fetchData()

    }, [])



    // Render Section Header
    const renderSectionHeader = (title: string, onEdit: () => void) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onEdit}>
          <MaterialCommunityIcons name="pencil-box" size={29} color="#1E90FF" />
        </TouchableOpacity>
      </View>
    );

    // Render Photo Gallery
    const renderPhotos = () => (
      <View style={styles.section}>
        {renderSectionHeader('Photos', () => handleEdit(5))}
        <FlatList
          horizontal
          data={appartement.property_images}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item.image_url }} style={styles.photo} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photoContainer}
        />
      </View>
    );
    const InfoItem = ({ label, value, step }: { label: string; value: any, step:number}) => (
      <View style={styles.infoItem}>
        <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || '-'}</Text>
        </View>
       { step>=0 && (<TouchableOpacity onPress={() => handleEdit(step)}>
            <MaterialCommunityIcons name="pencil-box" size={29} color="#1E90FF" />
          </TouchableOpacity>)}
  
      </View>
    );

    // Render Equipment Category
    const renderEquipmentCategory = (category: string, items: any[]) => (
      <View style={styles.categoryContainer} key={category}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <View style={styles.equipmentGrid}>
          {items.map((item, index) => (
            <View key={index} style={styles.equipmentItem}>
              <Ionicons name="checkbox-outline" size={18} color="#1E90FF" />
              <Text style={styles.equipmentText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    );

    // Render Task Item
    const renderTaskItem = (item: any) => (
      <View key={item.id} style={styles.taskItem}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskFrequency}>{item.frequency}</Text>
        </View>
        <Text style={styles.taskCollaborator}>Responsable: {item.collaborator}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Photo Gallery */}
          {renderPhotos()}

          {/* Basic Information Section */}
          <View style={styles.section}>
            
            <View style={styles.infoGrid}>
              
              <InfoItem label="Titre" value={appartement.title} step={6}/>
              <InfoItem label="Description" value={appartement.description} step={7}/>
              <InfoItem label="Type de bien" value={appartement.property_style} step={1}/>
              <InfoItem label="Type de location" value={appartement.rent_type} />
              <InfoItem label="Statut" value={appartement.available ? 'Disponible' : 'Occupé'} />
              <InfoItem label="Adresse" value={appartement.address} step={2}/>
              <InfoItem label="Prix/nuit" value={`€${appartement.price}`} step={8}/>
              <View style={{ 
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginVertical: 8
}}>
        <View style={{ width: '48%' }}>
          <InfoItem label="Pièces" value={appartement.number_of_rooms} />
        </View>
        <View style={{ width: '48%' }}>
          <InfoItem label="Lits" value={appartement.number_of_beds} step={3}/>
        </View>
        <View style={{ width: '48%' }}>
          <InfoItem label="Salles de bain" value={appartement.number_of_bathrooms} />
        </View>
        <View style={{ width: '48%' }}>
          <InfoItem label="Voyageurs max" value={appartement.max_guests} />
        </View>
      </View>
              <InfoItem label="Style" value={appartement.property_type} step={0}/>
            </View>
          </View>

          {/* Equipments Section */}
          <View style={styles.section}>
            {renderSectionHeader('Équipements', () => handleEdit(4))}
            {Object.entries(appartement.equipmentByCategory).map(([category, items]) => 
              renderEquipmentCategory(category, items)
            )}
          </View>

          {/* Tasks Section */}
          <View style={styles.section}>
            {renderSectionHeader('Tâches', () => handleEdit(9))}
            {appartement.tasksByCategory?.map((category) => (
              <View key={category.name} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                {category.items.map(renderTaskItem)}

              </View>
            ))}
          </View>

          {/* Booking Settings */}
          <View style={styles.section}>
            {renderSectionHeader('Paramètres Réservation', () => console.log('Edit Booking'))}
            <View style={styles.bookingSettings}>
              {appartement.bookingsetting?.map((setting, index) => (
                <View key={index} style={styles.settingItem}>
                  <Text style={styles.settingLabel}>{setting.type}:</Text>
                  <Text style={styles.settingValue}>{setting.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* House Rules */}
          <View style={styles.section}>
            {renderSectionHeader('Règlement Intérieur', () => console.log('Edit Rules'))}
            <View style={styles.rulesContainer}>
              {appartement.houserule?.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <Ionicons name="alert-circle" size={18} color="#FF6B6B" />
                  <Text style={styles.ruleText}>{rule.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Fixed Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.footerButton}
            onPress={() => console.log('Bloquer une date')}
          >
            <Text style={styles.footerButtonText}>Bloquer une date</Text>
          </TouchableOpacity>
        </View>
        <AddProperty ref={childRef} step={step} isEdit={true}/>
      </View>
    );
  };

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  photoContainer: {
    paddingVertical: 16,
  },
  photo: {
    width: 280,
    height: 200,
    borderRadius: 12,
    marginRight: 16,
    resizeMode: 'cover',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    width: '100%'

  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  categoryContainer: {
    marginVertical: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  equipmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    minWidth: '45%',
  },
  equipmentText: {
    fontSize: 14,
    color: '#4B5563',
  },
  taskItem: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  taskFrequency: {
    fontSize: 14,
    color: '#6B7280',
  },
  taskCollaborator: {
    fontSize: 14,
    color: '#6B7280',
  },
  bookingSettings: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#4B5563',
  },
  settingValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  rulesContainer: {
    gap: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ruleText: {
    fontSize: 16,
    color: '#4B5563',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppartementDetails;