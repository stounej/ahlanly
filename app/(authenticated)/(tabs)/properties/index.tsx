import { propertiesService, Property } from '@/services';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AddPropertyModal from './add';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ManageTasksModal from './tasks';
import { TaskCategory, tasksService } from '@/services/tasks';
import Loading from '@/components/Loading';
import { Image } from 'expo-image';


type ModalHandles = {
  handlePresentModalPress: () => void;
};

const PropertiesScreen = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [taskCategories, setTaskCategories] = useState<TaskCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>([]);
  const addPropertyModalRef = useRef<ModalHandles>(null);
  const manageTasksModalRef = useRef<ModalHandles>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddPropertyPress = () => {
    addPropertyModalRef.current?.handlePresentModalPress();
  };

  const handleCategoryPress = (category: TaskCategory) => {
    setSelectedCategory(category);
    manageTasksModalRef.current?.handlePresentModalPress(); 
  };

  useFocusEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResponse, propertiesResponse] = await Promise.all([
          tasksService.getTaskCategories(),
          propertiesService.getAll()
        ]);
        
        setTaskCategories(categoriesResponse);
        setProperties(propertiesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  });

  const renderPropertyItem = ({ item: property }: { item: Property }) => (
    <TouchableOpacity 
      style={styles.propertyCard} 
      onPress={() => router.push(`/properties/${property.id}`)}
    >
      <Image 
        source={{ uri: property.property_images[0]?.image_url }} 
        style={styles.propertyImage} 
        contentFit="cover"
      />
      <View style={[
        styles.availabilityBadge, 
        property.available ? styles.availableBadge : styles.unavailableBadge
      ]} />

      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{property.title}</Text>
        <Text style={styles.propertyDescription} numberOfLines={2}>
          {property.description}
        </Text>
      </View>

      <View style={styles.taskIconsContainer}>
        {property.tasks.map((task, index) => (
          <View key={index} style={styles.taskIconWrapper}>
            {renderTaskCategoryIcon(
              task.task_categories.icon_library, 
              task.task_categories.icon_name, 
              15
            )}
          </View>
        ))}
      </View>

      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>Note : </Text>
        <Text style={styles.ratingStars}>★★★★☆</Text>
        <Text style={styles.ratingValue}>{property.review?.rating || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.screenContainer}>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <View style={styles.headerSection}>
            <ScrollView 
              horizontal 
              style={styles.categoriesScrollView}
              contentContainerStyle={styles.categoriesContainer}
              showsHorizontalScrollIndicator={false}
            >
              {taskCategories.map((category, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                >
                  {renderTaskCategoryIcon(category.icon_library, category.icon_name, 22)}
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                  <Text style={styles.taskProgress}>
                    {category.tasks.filter(t => t.status === 'completed').length}
                    /{category.tasks.length}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                onPress={handleAddPropertyPress} 
                style={styles.primaryButton}
              >
                <Text style={styles.buttonText}> Ajouter un bien</Text>
              </TouchableOpacity>
              <View style={styles.secondaryButtons}>
                <TouchableOpacity style={styles.iconButton}>
                  <FontAwesome5 name="filter" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Feather name="upload" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            data={properties}
            keyExtractor={(property) => property.id}
            renderItem={renderPropertyItem}
            contentContainerStyle={styles.propertiesList}
            ListHeaderComponent={<View style={styles.listHeaderSpacer} />}
            showsVerticalScrollIndicator={false}
          />

          <AddPropertyModal ref={addPropertyModalRef} />
          <ManageTasksModal ref={manageTasksModalRef} selectedCategory={selectedCategory} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#ffffff',
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoriesScrollView: {
    height: 100,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryCard: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 100,
    height: 80,
    justifyContent: 'space-between',
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a237e',
    textAlign: 'center',
  },
  taskProgress: {
    fontSize: 10,
    color: '#3949ab',
    fontWeight: '500',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  propertiesList: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  listHeaderSpacer: {
    height: 200,
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  propertyImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  availabilityBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: 20,
    right: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  availableBadge: {
    backgroundColor: '#4caf50',
  },
  unavailableBadge: {
    backgroundColor: '#f44336',
  },
  propertyInfo: {
    marginBottom: 12,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a237e',
    marginBottom: 4,
  },
  propertyDescription: {
    fontSize: 14,
    color: '#546e7a',
    lineHeight: 20,
  },
  taskIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  taskIconWrapper: {
    padding: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#546e7a',
  },
  ratingStars: {
    fontSize: 14,
    color: '#ffd700',
    marginHorizontal: 4,
  },
  ratingValue: {
    fontSize: 14,
    color: '#546e7a',
    fontWeight: '600',
  },
});

export default PropertiesScreen;