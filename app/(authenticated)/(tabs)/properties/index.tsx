import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

export default function Properties() {
  const [searchText, setSearchText] = useState('');
  const apartments = [
    {
      id: 1,
      name: 'Appartement T2',
      rooms: 2,
      furniture: 5,
      reservations: 3,
      available: true,
    },
    {
      id: 2,
      name: 'Studio Meublé',
      rooms: 1,
      furniture: 3,
      reservations: 1,
      available: false,
    },
    // Ajoutez plus de données d'exemple
  ];

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un appartement"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.buttonText}>Filtrer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.buttonText}>Trier</Text>
        </TouchableOpacity>
      </View>

      {/* Boutons d'actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Ajouter un appartement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.buttonText}>Exporter la liste</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statsButton}>
          <Text style={styles.buttonText}>Voir les statistiques</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des appartements */}
      <FlatList
        data={apartments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.apartmentCard}>
            <Image source={{ uri: 'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg' }} style={styles.apartmentImage} />
            <Text style={styles.apartmentName}>{item.name}</Text>
            <Text style={styles.apartmentDetails}>
              {item.rooms} pièces, {item.furniture} meubles
            </Text>
            <Text style={styles.apartmentDetails}>
              {item.reservations} réservations
            </Text>
            <Text style={styles.apartmentDetails}>
              {item.available ? 'Disponible' : 'Non disponible'}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.buttonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push(`/properties/${item.id}`)} style={styles.detailsButton}>
                <Text style={styles.buttonText}>Voir détails</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  filterButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
  },
  sortButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  exportButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  statsButton: {
    backgroundColor: '#17A2B8',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  apartmentCard: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  apartmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  apartmentDetails: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  apartmentImage: { width: '100%', height: 150, borderRadius: 10 },
  deleteButton: {
    backgroundColor: '#DC3545',
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  detailsButton: {
    backgroundColor: '#17A2B8',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
