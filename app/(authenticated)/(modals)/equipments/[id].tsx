import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const FurnitureByRoom = () => {
  // Exemple de données initiales
  const [rooms, setRooms] = useState([
    {
      id: '1',
      name: 'Salon',
      furniture: [
        { id: '1-1', name: 'Canapé' },
        { id: '1-2', name: 'Table basse' },
      ],
    },
    {
      id: '2',
      name: 'Chambre',
      furniture: [
        { id: '2-1', name: 'Lit double' },
        { id: '2-2', name: 'Armoire' },
      ],
    },
    {
      id: '3',
      name: 'Cuisine',
      furniture: [
        { id: '3-1', name: 'Réfrigérateur' },
        { id: '3-2', name: 'Table à manger' },
      ],
    },
  ]);

  // Ajouter une pièce
  const addRoom = () => {
    const newRoom = {
      id: String(rooms.length + 1),
      name: `Nouvelle pièce ${rooms.length + 1}`,
      furniture: [],
    };
    setRooms([...rooms, newRoom]);
  };

  // Supprimer une pièce
  const deleteRoom = (roomId: string) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer cette pièce ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: () => setRooms(rooms.filter((room) => room.id !== roomId)),
        },
      ],
    );
  };

  // Ajouter un meuble à une pièce
  const addFurniture = (roomId: string) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        const newFurniture = {
          id: `${roomId}-${room.furniture.length + 1}`,
          name: `Nouveau meuble ${room.furniture.length + 1}`,
        };
        return { ...room, furniture: [...room.furniture, newFurniture] };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  // Supprimer un meuble
  const deleteFurniture = (roomId: string, furnitureId: string) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          furniture: room.furniture.filter((item) => item.id !== furnitureId),
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  // Modifier une pièce ou un meuble (logique simplifiée)
  const editItem = (type: string, roomId: string, itemId: string) => {
    Alert.alert('Modification', `Modifier ${type} ${itemId} dans ${roomId}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item: room }) => (
          <View style={styles.roomContainer}>
            {/* Nom de la pièce */}
            <View style={styles.roomHeader}>
              <Text style={styles.roomTitle}>{room.name}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editItem('Pièce', room.id, room.name)}
                >
                  <Text style={styles.buttonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteRoom(room.id)}
                >
                  <Text style={styles.buttonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Liste des meubles */}
            <FlatList
              data={room.furniture}
              keyExtractor={(item) => item.id}
              renderItem={({ item: furniture }) => (
                <View style={styles.furnitureItem}>
                  <Text style={styles.furnitureName}>{furniture.name}</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => editItem('Meuble', room.id, furniture.id)}
                    >
                      <Text style={styles.buttonText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteFurniture(room.id, furniture.id)}
                    >
                      <Text style={styles.buttonText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            {/* Ajouter un meuble */}
            <TouchableOpacity
              style={styles.addFurnitureButton}
              onPress={() => addFurniture(room.id)}
            >
              <Text style={styles.addButtonText}>Ajouter un meuble</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Ajouter une pièce */}
      <TouchableOpacity style={styles.addRoomButton} onPress={addRoom}>
        <Text style={styles.addButtonText}>Ajouter une pièce</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  roomContainer: { marginBottom: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  roomHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roomTitle: { fontSize: 18, fontWeight: 'bold' },
  furnitureItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  furnitureName: { fontSize: 16 },
  actionButtons: { flexDirection: 'row' },
  editButton: { backgroundColor: '#007BFF', padding: 5, borderRadius: 5, marginHorizontal: 5 },
  deleteButton: { backgroundColor: '#FF4D4D', padding: 5, borderRadius: 5, marginHorizontal: 5 },
  buttonText: { color: '#fff' },
  addFurnitureButton: { marginTop: 10, backgroundColor: '#28a745', padding: 10, borderRadius: 5, alignItems: 'center' },
  addRoomButton: { marginTop: 20, backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default FurnitureByRoom;
