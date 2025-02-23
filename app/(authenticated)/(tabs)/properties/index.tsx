import { propertiesService, Property } from '@/services';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import AddProperty from './add';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ManageTasks from './tasks';
import { TaskCategory, tasksService } from '@/services/tasks';
import Loading from '@/components/Loading';


const Properties = () => {
  type ChildRef = {
    handlePresentModalPress: () => void;
  };
  const [properties, setProperties] = useState<Property[]>([]);
  const [taskCategories, setTaskCategories] = useState<TaskCategory[]>([]);
  const [selectedCateg, setSelectedCateg] = useState<TaskCategory>([]);
  const childRef = useRef<ChildRef>(null);
  const childRef2 = useRef<ChildRef>(null);
  const [loading, setLoading] = useState(true)

  const handlePress = () => {
    childRef.current?.handlePresentModalPress();
  };

  const handlePress2 = (categ : TaskCategory) => {
    setSelectedCateg(categ)
    childRef2.current?.handlePresentModalPress();
  };

  useEffect(() => {
    const fetchData = async () => {
      const t = await tasksService.getTaskCategories();     
      setTaskCategories(t);
      const p = await propertiesService.getAll();     
      setProperties(p);
      setLoading(false)
    };
    fetchData();
  }, []);

  const renderProperty = ({ item }: { item: Property }) => (
    <TouchableOpacity style={styles.propertyCard} onPress={() => router.push(`/properties/${item.id}`)}>
      <Image source={{ uri: item.property_images[0]?.image_url }} style={styles.propertyImage} />
      <View style={[styles.availabilityDot, item.available ? styles.dotAvailable : styles.dotUnavailable]} />

      <View style={styles.propertyDetails}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyDescription}>{item.description}</Text>
      </View>

      <View style={styles.tasksContainer}>
        {item.tasks.map((task, index) => (
          <View key={index} style={styles.taskIcon}>
            {renderIcon(task.task_categories.icon_library, task.task_categories.icon_name, 15)}
          </View>
        ))}
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating: </Text>
        <Text style={styles.ratingStars}>★★★★☆</Text>
        <Text style={styles.ratingValue}>{item.review?.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderIcon = (iconLibrary: string, iconName: string, size: number) => {
    const IconComponent = {
      Ionicons,
      MaterialIcons,
      FontAwesome5,
      Feather
    }[iconLibrary as keyof typeof IconComponents];

    return IconComponent ? (
      <IconComponent name={iconName} size={size} />
    ) : null;
  };

  return (
    <View style={styles.container}>
    {loading ? (
      <Loading  loading/>
    ) : (
      <>
        <View style={styles.headerContainer}>
          <ScrollView 
            horizontal 
            style={styles.taskScrollContainer}
            contentContainerStyle={styles.taskScrollContent}
            showsHorizontalScrollIndicator={false}
          >
            {taskCategories.map((categ, index) => (
              <TouchableOpacity key={index} style={styles.smallTaskCard}
                onPress={() => handlePress2(categ)}>
                {renderIcon(categ.icon_library, categ.icon_name, 20)}
                <Text style={styles.smallTaskTitle}>{categ.name}</Text>
                <Text style={styles.smallTaskCount}>
                  {categ.tasks.filter(c => c.status === 'completed').length}
                  /
                  {categ.tasks.length}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
  
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={handlePress} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter un appartement</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <FontAwesome5 name="filter" size={28} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Feather name="upload" size={30} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Liste avec padding pour l'en-tête fixe */}
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={renderProperty}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={<View style={styles.listHeader} />}
        />
  
        <AddProperty ref={childRef} />
        <ManageTasks ref={childRef2} selectedCateg={selectedCateg} />
      </>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  listHeader: {
    height: 220, // Doit correspondre au paddingTop
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    marginLeft: 8,
  },
  taskScrollContainer: {
    marginTop: 15,
    height: 90,
  },
  taskScrollContent: {
    paddingVertical: 8,
  },
  smallTaskCard: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    width: 100,
    height: 80,
    justifyContent: 'center',
  },
  smallTaskTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  smallTaskCount: {
    fontSize: 12,
    color: '#2c3e50',
    textAlign: 'center',
  },
  addButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterButton: {
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  propertyImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  availabilityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: 18,
    right: 18,
    borderWidth: 2,
    borderColor: '#fff',
  },
  dotAvailable: {
    backgroundColor: '#4caf50',
  },
  dotUnavailable: {
    backgroundColor: '#f44336',
  },
  propertyDetails: {
    marginBottom: 12,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  propertyDescription: {
    fontSize: 14,
    color: '#666',
  },
  tasksContainer: {
    flexDirection: 'row',
  },
  taskIcon: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginRight: 7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  ratingStars: {
    fontSize: 14,
    color: '#ffd700',
    marginHorizontal: 4,
  },
  ratingValue: {
    fontSize: 14,
    color: '#666',
  },
});

export default Properties;