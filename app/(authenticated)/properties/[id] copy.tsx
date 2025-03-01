  import React, { useCallback, useEffect, useRef, useState } from 'react';
  import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
  import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
  import { propertiesService, Property, Task } from '@/services';
  import { useFocusEffect, useLocalSearchParams,  } from 'expo-router';
  import AddProperty from '../(tabs)/properties/add';
import usePropertyStore from '@/app/store/addProperty';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';

  type ChildRef = {
    handlePresentModalPress: () => void;
  };

  const AppartementDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const childRef = useRef<ChildRef>(null);
    const [step, setStep] = useState(0);
    const { setCurrentProperty, property } = usePropertyStore();
    let isMounted = true;

    const handleEdit = (s: number) => {
      if (childRef.current) {
        childRef.current.handlePresentModalPress();
      }    
      setStep(s)
    };

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true; // Simple flag pour vérifier le montage
    
        const fetchData = async () => {
          try {
            const property_db = await propertiesService.getById(id);
            
            if (isActive && property_db) { // Ne met à jour que si le composant est monté
              setCurrentProperty(property_db);
            }
          } catch (error) {
            console.error("Fetch error:", error);
          }
        };
    
        fetchData();
    
        return () => {
          isActive = false; // Désactive les mises à jour post-démontage
        };
      }, [id]) // ✅ Se déclenche uniquement quand l'id change
    );



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
      <View  style={[styles.section]}>
        {renderSectionHeader('Photos', () => handleEdit(5))}
        <FlashList 
        horizontal
        data={property?.property_images}
        renderItem={({item}) => (
          <View style={styles.imageWrapper}>
          <Image  source={{ uri: item.image_url }} style={styles.propertyImage} 
                    contentFit="cover"
            />
          </View>
        )}
        estimatedItemSize={200}

        
        
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
              
              <InfoItem label="Titre" value={property.title} step={6}/>
              <InfoItem label="Description" value={property.description} step={7}/>
              <InfoItem label="Type de bien" value={property.property_style} step={1}/>
              <InfoItem label="Type de location" value={property.rent_type} />
              <InfoItem label="Statut" value={property.available ? 'Disponible' : 'Occupé'} />
              <InfoItem label="Adresse" value={property.address} step={2}/>
              <InfoItem label="Prix/nuit" value={`€${property.price}`} step={8}/>
              <View style={{ 
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginVertical: 8
}}>
        <View style={{ width: '48%' }}>
          <InfoItem label="Pièces" value={property.number_of_rooms} />
        </View>
        <View style={{ width: '48%' }}>
          <InfoItem label="Lits" value={property.number_of_beds} step={3}/>
        </View>
        <View style={{ width: '48%' }}>
          <InfoItem label="Salles de bain" value={property.number_of_bathrooms} />
        </View>
        <View style={{ width: '48%' }}>
          <InfoItem label="Voyageurs max" value={property.max_guests} />
        </View>
      </View>
              <InfoItem label="Style" value={property.property_type} step={0}/>
            </View>
          </View>

          {/* Equipments Section */}
          {/* <View style={styles.section}>
            {renderSectionHeader('Équipements', () => handleEdit(4))}
            {Object.entries(property?.equipmentByCategory).map(([category, items]) => 
              renderEquipmentCategory(category, items)
            )}
          </View> */}

          {/* Tasks Section */}
          <View style={styles.section}>
            {renderSectionHeader('Tâches', () => handleEdit(9))}
            {property?.tasksByCategory?.map((category) => (
              <View key={category.name} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                {category.items.map(renderTaskItem)}

              </View>
            ))}
          </View>

          {/* Booking Settings */}
          {/* <View style={styles.section}>
            {renderSectionHeader('Paramètres Réservation', () => console.log('Edit Booking'))}
            <View style={styles.bookingSettings}>
              {property?.bookingsetting?.map((setting, index) => (
                <View key={index} style={styles.settingItem}>
                  <Text style={styles.settingLabel}>{setting.type}:</Text>
                  <Text style={styles.settingValue}>{setting.value}</Text>
                </View>
              ))}
            </View>
          </View> */}

          {/* House Rules */}
          {/* <View style={styles.section}>
            {renderSectionHeader('Règlement Intérieur', () => console.log('Edit Rules'))}
            <View style={styles.rulesContainer}>
              {property?.houserule?.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <Ionicons name="alert-circle" size={18} color="#FF6B6B" />
                  <Text style={styles.ruleText}>{rule.title}</Text>
                </View>
              ))}
            </View>
          </View> */}
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
  imageWrapper: { // Nouveau conteneur
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 200,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    paddingHorizontal: 16,
    height: 220
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
    height: 200, // Hauteur explicite

  },
  propertyImage: {
    flex: 1,
    width: 200,
    backgroundColor: '#0553',
    height: 250
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