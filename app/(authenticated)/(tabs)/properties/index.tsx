import { propertiesService, Property } from '@/services';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import AddProperty from './add';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ManageTasks from './tasks';

const Properties = () => {
  type ChildRef = {
    handlePresentModalPress: () => void;
  };
  const [properties, setProperties] = useState<Property[]>([]);
  const childRef = useRef<ChildRef>(null);
  const childRef2 = useRef<ChildRef>(null);

  const handlePress = () => {
    if (childRef.current) {
      childRef.current.handlePresentModalPress();
    }
  };
  const handlePress2 = () => {
    if (childRef2.current) {
      childRef2.current.handlePresentModalPress();
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const props = await propertiesService.getAll();     
      setProperties(props);
    };
    fetchProperties();
  }, []);

  // Render Property Item
  const renderProperty = ({ item }: { item: Property }) => (
    <TouchableOpacity style={styles.propertyCard} onPress={() => router.push(`/properties/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      {/* Point de disponibilité */}
      <View style={[styles.availabilityDot, item.available ? styles.dotAvailable : styles.dotUnavailable]} />

      <View style={styles.propertyDetails}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyStatus}>
          {item.available ? 'Disponible' : 'Non disponible'}
        </Text>
        <Text style={styles.propertyBookings}>
          Réservations ce mois: {item.bookings_this_month}
        </Text>
        <Text style={styles.propertyTasks}>Tâches: {item.task.map(el => el.title).join(', ')}</Text>
        <Text style={styles.propertyDescription}>{item.description}</Text>
      </View>

      {/* Icônes des tâches */}
      <View style={styles.tasksContainer}>
        {item.task.map((task, index) => (
          <View key={index} style={styles.taskIcon}>
            {getTaskIcon(task.title)}
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

  const getTaskIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'nettoyage':
        return <MaterialIcons name="cleaning-services" size={18} color="#333" />;
      case 'réparations':
        return <Feather name="tool" size={18} color="#333" />;
      case 'peinture':
        return <Feather name="tool" size={18} color="#333" />;
      default:
        return <Feather name="check" size={18} color="#333" />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="analytics" size={18} color="#333" />
          <Text style={styles.buttonText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather name="upload" size={18} color="#333" />
          <Text style={styles.buttonText}>Exporter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather name="upload" size={18} color="#333" />
          <Text style={styles.buttonText}>Exporter</Text>
        </TouchableOpacity>
      </View>
      {/* Task Cards */}
      <ScrollView horizontal style={styles.taskScrollContainer} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.smallTaskCard} onPress={handlePress2}>
        <Feather name="tool" size={18} color="#333" />
          <Text style={styles.smallTaskTitle}>Nettoyage</Text>
          <Text style={styles.smallTaskCount}>5/6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallTaskCard}>
        <Feather name="tool" size={18} color="#333" />
          <Text style={styles.smallTaskTitle}>Réparations</Text>
          <Text style={styles.smallTaskCount}>2/4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallTaskCard}>
        <Feather name="tool" size={18} color="#333" />
          <Text style={styles.smallTaskTitle}>Nettoyage</Text>
          <Text style={styles.smallTaskCount}>5/6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallTaskCard}>
        <Feather name="tool" size={18} color="#333" />
          <Text style={styles.smallTaskTitle}>Nettoyage</Text>
          <Text style={styles.smallTaskCount}>5/6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallTaskCard}>
        <Feather name="tool" size={18} color="#333" />
          <Text style={styles.smallTaskTitle}>Nettoyage</Text>
          <Text style={styles.smallTaskCount}>5/6</Text>
        </TouchableOpacity>
        {/* Ajouter d'autres tâches ici si nécessaire */}
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handlePress} style={styles.addButton}>
          <Text style={styles.addButtonText}>Ajouter un appartement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={18} color="#333" />
          <Text style={styles.buttonText}>Filtrer</Text>
        </TouchableOpacity>
      </View>
      {/* Properties List */}
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={renderProperty}
      />
      <AddProperty ref={childRef} />
      <ManageTasks ref={childRef2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskScrollContainer: {
    flexDirection: 'row',
    height: 18
  },
  smallTaskCard: {
    backgroundColor: '#e0e0e0', // Couleur grise plus claire
    padding: 10, // Réduire le padding pour rendre les cartes plus petites
    borderRadius: 10, // Rayon arrondi légèrement réduit
    alignItems: 'center',
    marginRight: 5,
    width: 100, // Fixer une largeur pour chaque carte
    height: 75
  },
  smallTaskTitle: {
    fontSize: 14, // Taille du texte réduite
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallTaskCount: {
    fontSize: 14, // Taille du texte réduite
    color: '#2c3e50',
    textAlign: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Augmenter l'espace entre les sections
  },
  taskTitle: {
    fontSize: 18, // Augmenter la taille du texte
    fontWeight: 'bold',
  },
  propertyCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    position: 'relative', // Pour positionner les éléments absolument
  },
  propertyImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    position: 'relative', // Pour positionner les éléments absolument
  },
  availabilityDot: {
    width: 16, // Augmenter la taille du point
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    right: 10,
    shadowColor: '#000', // Ajouter une ombre
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Pour Android
    borderWidth: 2, // Ajouter une bordure blanche
    borderColor: '#fff',
  },
  dotAvailable: {
    backgroundColor: '#4caf50', // Couleur verte plus vive
  },
  dotUnavailable: {
    backgroundColor: '#f44336', // Couleur rouge plus vive
  },
  propertyDetails: {
    marginTop: 10,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyStatus: {
    fontSize: 14,
    color: 'green',
  },
  propertyBookings: {
    fontSize: 14,
    color: '#2980b9',
  },
  propertyTasks: {
    fontSize: 14,
    color: '#c0392b',
  },
  propertyDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingStars: {
    fontSize: 14,
    color: '#f1c40f',
    marginLeft: 5,
  },
  ratingValue: {
    fontSize: 14,
    marginLeft: 5,
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    flex: 8.5,
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    flex: 1.5,
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligne à la fin de la ligne
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginLeft: 10, // Espacement entre les boutons
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  tasksContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  taskIcon: {
    marginLeft: 5,
  },
});

export default Properties;