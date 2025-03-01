  import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
  import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
  import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
  import { propertiesService, Property, Task, tasksService } from '@/services';
  import { useFocusEffect, useLocalSearchParams,  } from 'expo-router';
  import AddProperty from '../(tabs)/properties/add';
import usePropertyStore from '@/app/store/addProperty';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Snackbar } from 'react-native-paper';

  type ChildRef = {
    handlePresentModalPress: () => void;
    closeModalPress: () => void;
  };

  type ModalHandles = {
    handlePresentModalPress: () => void;
  };
  const AppartementDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const childRef = useRef<ChildRef>(null);
    const [step, setStep] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<TaskCategory>([]);
    const { setCurrentProperty, property } = usePropertyStore();
    const [message, setMessage] = useState<string>()
    const [visible, setVisible] = useState(false)
    const timeoutRef = useRef<number | null>(null); // Timeout ID
    const manageTasksModalRef = useRef<ModalHandles>(null);


    const propertyImages = useMemo(() => 
      property?.property_images || [], 
      [property?.property_images]
    );

    const handleCategoryPress = (category: TaskCategory) => {
      setSelectedCategory(category);
      manageTasksModalRef.current?.handlePresentModalPress(); 
    };
    useFocusEffect(
      React.useCallback(() => {
        let isActive = true; // Simple flag pour vérifier le montage
    
        const fetchData = async () => {
          try {
            const property_db = await propertiesService.getById(id);
            
            if ( property_db) { // Ne met à jour que si le composant est monté
              const grouped = await tasksService.getTaskCategoriesByProperty(id)
             
              setCurrentProperty({
                ...property_db,
                tasksByCategory: Object.values(grouped)
              });
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
    const renderTaskItem = (item: any) => (
      <View key={item.id} style={styles.taskItem}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskFrequency}>{item.frequency}</Text>
        </View>
        <Text style={styles.taskCollaborator}>Responsable: {item.collaborator}</Text>
      </View>
    );
    const renderSectionHeader = (title: string, onEdit: () => void) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onEdit}>
          <MaterialCommunityIcons name="pencil-box" size={29} color="#1E90FF" />
        </TouchableOpacity>
      </View>
    );
    // Optimisation 2: Callback stable pour les interactions
    const handleEditStable = useCallback((s: number) => {
      childRef.current?.handlePresentModalPress();
      setStep(s);
    }, []);

    const handleCloseModal = (msg : string) => {
      
      childRef.current?.closeModalPress();
      setMessage(msg)
      setVisible(true)
      
   // Nettoyage du timeout précédent
   if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  // Nouveau timeout pour cacher après 4 secondes
  timeoutRef.current = window.setTimeout(() => {
    setVisible(false);
  }, 4000);
};
  
    // Optimisation 3: Composant mémoïsé pour les éléments de liste
    const RenderImageItem = useCallback(({ item }: { item: any }) => (
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.propertyImage}
          contentFit="cover"
          transition={250}
          recyclingKey={item.image_url}
        />
      </View>
    ), []);

    // Nettoyage au démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const renderTaskCategoryIcon = (iconLibrary: string, iconName: string, size: number) => {
    const IconComponent = {
      Ionicons,
      MaterialIcons,
      FontAwesome5,
      Feather
    }[iconLibrary as keyof typeof IconComponent];

    return IconComponent ? (
      <IconComponent name={iconName} size={size} color="#2c3e50" />
    ) : null;
  };
  
    // Optimisation 4: Mémoïsation des en-têtes de section
    const MemoizedSectionHeader = useMemo(() => 
      renderSectionHeader('Photos', () => handleEditStable(5)),
      [handleEditStable]
    );
  
    // Optimisation 5: Composant InfoItem mémoïsé
    const MemoizedInfoItem = React.memo(({ label, value, step, icon }: { 
      label: string; 
      value: any;
      step: number, 
      icon: boolean
    }) => (
      <View style={styles.infoItem}>
        <View >
        
          <Text style={styles.infoLabel}>{label}</Text>
      <View >
        <View style={{ flexDirection: 'row',}} >
        {icon && 
        ( value === 'hostel' ? <FontAwesome5 style={styles.iconContainer} name="users" size={20} color={'#007BFF'} />
        : <MaterialIcons style={styles.iconContainer}  name={value === 'private_room' ? "door-front" : 'home'} size={24} color={ '#007BFF'} />)
      }
            <Text style={styles.infoValue}>{value || '-'}</Text>

        </View>
      </View>
         
        </View>
        {step >= 0 && (
          <TouchableOpacity onPress={() => handleEditStable(step)}>
            <MaterialCommunityIcons name="pencil-box" size={29} color="#1E90FF" />
          </TouchableOpacity>
        )}
      </View>
    ));
  
    // Optimisation 6: Décomposition des sections clés
    const renderPhotoSection = () => (
      <View style={styles.section}>
        {MemoizedSectionHeader}
        <FlashList
          horizontal
          data={propertyImages}
          renderItem={RenderImageItem}
          estimatedItemSize={250}
          keyExtractor={(item) => item.image_url}
          estimatedListSize={{ height: 250, width: Dimensions.get('window').width }}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  
    const renderDetailsGrid = () => (
      <View style={styles.infoGrid}>
        <MemoizedInfoItem label="Titre" value={property?.title} step={6} />
        <MemoizedInfoItem label="Description" value={property.description} step={7} />
        <MemoizedInfoItem label="Type de bien" value={property.property_style} step={1} icon/>
        <MemoizedInfoItem label="Type de location" value={property.rent_type} />
        <MemoizedInfoItem label="Style" value={property.property_type} step={0}/>
        <MemoizedInfoItem label="Statut" value={property.available ? 'Disponible' : 'Occupé'} />
        <MemoizedInfoItem label="Adresse" value={property.address} step={2}/>
        <MemoizedInfoItem label="Prix/nuit" value={`€${property.price}`} step={8} icon/>
        <View style={{ 
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginVertical: 8
}}>
        <View style={{ width: '48%' }}>
          <MemoizedInfoItem label="Pièces" value={property.number_of_rooms} />
        </View>
        <View style={{ width: '48%' }}>
          <MemoizedInfoItem label="Lits" value={property.number_of_beds} step={3}/>
        </View>
        <View style={{ width: '48%' }}>
          <MemoizedInfoItem label="Salles de bain" value={property.number_of_bathrooms} />
        </View>
        <View style={{ width: '48%' }}>
          <MemoizedInfoItem label="Voyageurs max" value={property.max_guests} />
        </View>
      </View>
       {/* Tasks Section */}
       <View style={styles.section}>
            {renderSectionHeader('Tâches', () => {})}
            <ScrollView 
              horizontal 
              style={styles.categoriesScrollView}
              contentContainerStyle={styles.categoriesContainer}
              showsHorizontalScrollIndicator={false}
            >
              {property.tasksByCategory?.map((category, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                >
                  {renderTaskCategoryIcon(category.icon_library, category.icon_name, 22)}
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                  <Text style={styles.taskProgress}>
                    {category?.tasks?.filter(t => t.status === 'completed').length}
                    /{category?.tasks?.length}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

          </View>




        {/* ... autres InfoItem restent similaires avec MemoizedInfoItem ... */}
      </View>
    );
  
    return (
      <View style={styles.container}>
        <ScrollView
        contentContainerStyle={styles.scrollContent}
          // windowSize={5}
        >
          {renderPhotoSection()}
          <View style={styles.section}>
            {renderDetailsGrid()}
          </View>
        
  
        {/* Footer reste inchangé */}
        <AddProperty ref={childRef} step={step } isEditMode={true} handleCloseModal={handleCloseModal}/>
        <Snackbar
        visible={visible}
        onDismiss={()=>{}}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {message}
      </Snackbar>
      </ScrollView>
      </View>
    );
  };
 

const styles = StyleSheet.create({
  imageWrapper: { // Nouveau conteneur
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderRadius: 20,
  },
  categoriesScrollView: {
    height: 100,
  },
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
  categoryCard: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 115,
    height: 100,
    justifyContent: 'space-between',
  },
  taskProgress: {
    fontSize: 11,
    color: '#3949ab',
    fontWeight: '500',
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
    width: 280,
    backgroundColor: '#0553',
    height: 150,
    borderRadius: 12,
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
  iconContainer: {
    marginRight: 16,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  categoryContainer: {
    marginVertical: 0,
  },
  categoryTitle: {
    fontSize: 13,
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