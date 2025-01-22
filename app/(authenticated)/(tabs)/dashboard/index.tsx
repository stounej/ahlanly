import { TabBarIcon } from '@/components/TabBarIcon';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function Page() {
  const reservations = [
    { id: 1, client: 'Alice Dupont', duration: '3 jours', photo: 'https://cdn-icons-png.flaticon.com/512/5969/5969433.png' },
    { id: 2, client: 'Jean Martin', duration: '1 semaine', photo: 'https://cdn-icons-png.flaticon.com/512/5969/5969433.png' },
    { id: 3, client: 'Sophie Durand', duration: '2 jours', photo: 'https://cdn-icons-png.flaticon.com/512/5969/5969433.png' },
  ];

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.dateText}>18 January 2025</Text>
            <Text style={styles.dayText}>Saturday</Text>
          </View>
          <View style={styles.icons}> 
            <TouchableOpacity style={styles.icon}>
            <TabBarIcon name="bell" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
            <TabBarIcon name="user" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <ScrollView horizontal style={styles.quickActions}>
        {/* Ajouter un appartement */}
        <TouchableOpacity style={styles.card}>
        <TabBarIcon name="home" style={styles.icon} />
          <Text style={styles.cardText}>Ajouter un appartement</Text>
        </TouchableOpacity>

        {/* Ajouter un meuble */}
        <TouchableOpacity style={styles.card}>
          <TabBarIcon name="couch" style={styles.icon} />
          <Text style={styles.cardText}>Ajouter un meuble</Text>
        </TouchableOpacity>

        {/* Voir les suggestions */}
        <TouchableOpacity style={styles.card}>
          <TabBarIcon name="lightbulb" style={styles.icon} />
            <Text style={styles.cardText}>Voir les suggestions</Text>
          </TouchableOpacity>
      </ScrollView>
        </View>

        {/* Reservations */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Mes réservations</Text>
          <ScrollView horizontal style={styles.reservationList}>
            {reservations.map((reservation) => (
              <View key={reservation.id} style={styles.reservationCard}>
                <Image source={{ uri: reservation.photo }} style={styles.clientPhoto} />
                <Text style={styles.clientName}>{reservation.client}</Text>
                <Text style={styles.duration}>{reservation.duration}</Text>
                <TouchableOpacity style={styles.contactButton}>
                  <Text style={styles.contactButtonText}>Contacter</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
          {/* Apartments List */}
          <View style={styles.apartmentListContainer}>
          <Text style={styles.sectionTitle}>Mes appartements</Text>
          <View style={styles.apartmentCard}>
            <Image source={{ uri:'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg' }} style={styles.apartmentImage} />
            <Text style={styles.apartmentName}>Appartement 1</Text>
            <Text style={styles.apartmentDesc}>Description courte...</Text>
          </View>
          <View style={styles.apartmentCard}>
            <Image source={{ uri:'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg' }} style={styles.apartmentImage} />
            <Text style={styles.apartmentName}>Appartement 1</Text>
            <Text style={styles.apartmentDesc}>Description courte...</Text>
          </View>
          <View style={styles.apartmentCard}>
            <Image source={{ uri:'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg' }} style={styles.apartmentImage} />
            <Text style={styles.apartmentName}>Appartement 1</Text>
            <Text style={styles.apartmentDesc}>Description courte...</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flex: 1, paddingHorizontal: 20 },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: { fontSize: 14, color: '#888', marginBottom: -7, marginTop: 8 },
  dayText: { fontSize: 20, fontWeight: 'bold' },
  icons: { flexDirection: 'row' },
  icon: { marginHorizontal: 10, alignSelf: 'center', marginBottom: 5, marginTop: 5 },

  /* Section Titles */
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },

  /* Quick Actions */
  quickActionsContainer: { marginBottom: 20 },
  quickActions: { flexDirection: 'row' },
  card: {
    padding: 20,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: 130,
  },

  /* Reservations */
  reservationList: { flexDirection: 'row' },
  reservationCard: {
    width: 150,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  clientPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  clientName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  duration: { fontSize: 14, color: '#666', marginBottom: 10 },
  contactButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  contactButtonText: { color: '#fff', fontSize: 14 },
/* Apartments List */
apartmentListContainer: { marginBottom: 20 },
apartmentCard: {
  marginBottom: 15,
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
},
apartmentImage: { width: '100%', height: 150, borderRadius: 10 },
apartmentName: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
apartmentDesc: { fontSize: 14, color: '#666' },
cardText: {
  textAlign: 'center',
  fontSize: 14,
  fontWeight: '500',
},
});
