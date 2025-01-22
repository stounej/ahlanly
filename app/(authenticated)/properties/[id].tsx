import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

const ApartmentDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();

  const apartment = {
    title: 'Appartement T2 - Vue sur la mer',
    description:
      'Un magnifique appartement avec une vue imprenable sur la mer. Idéal pour des vacances relaxantes.',
    price: 120,
    rooms: 2,
    size: '50m²',
    location: 'Essaouira, Maroc',
    availability: true,
    photos: [
      'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg',
      'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg',
      'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg',
    ],
    furniture: [
      { id: '1', name: 'Lit double', description: 'Confortable pour 2 personnes.' },
      { id: '2', name: 'Table à manger', description: 'Pour 4 personnes.' },
      { id: '3', name: 'Canapé', description: 'Grand canapé en cuir.' },
      { id: '4', name: 'Armoire', description: 'Armoire spacieuse en bois massif.' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Galerie de photos */}
      <ScrollView horizontal pagingEnabled style={styles.photoGallery}>
        {apartment.photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.photo} />
        ))}
      </ScrollView>

      {/* Informations de l'appartement */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{apartment.title}</Text>
        <Text style={styles.location}>{apartment.location}</Text>
        <Text style={styles.price}>Prix : {apartment.price} €/nuit</Text>
        <Text style={styles.description}>{apartment.description}</Text>
        <Text style={styles.info}>Nombre de pièces : {apartment.rooms}</Text>
        <Text style={styles.info}>Taille : {apartment.size}</Text>
        <Text style={styles.info}>
          Disponibilité : {apartment.availability ? 'Oui' : 'Non'}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`../(modals)/equipments/${id}`)}
        >
          <Text style={styles.buttonText}>Voir les meubles</Text>
        </TouchableOpacity>
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photoGallery: {
    height: 300,
    marginBottom: 10,
  },
  photo: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
    marginRight: 5,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  actionsContainer: {
    padding: 15,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  furnitureItem: {
    marginBottom: 15,
    width: '100%',
  },
  furnitureName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  furnitureDescription: {
    fontSize: 14,
    color: '#555',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApartmentDetails;
