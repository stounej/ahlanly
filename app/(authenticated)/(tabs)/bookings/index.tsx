import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { bookingsService, Booking } from '@/services';

const Reservations = () => {
  // Dummy Data
  const [reservations, setReservations] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchBookings = async () => {
      const props = await bookingsService.getAll();     
      setReservations(props);
      console.log(props);
      
    };

    fetchBookings();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showTasks, setShowTasks] = useState<string | null>(null);

 

  // Render Reservation Item
  const renderReservation = ({ item }: { item: Booking }) => (
    <View style={styles.reservationCard}>
      {/* Client Thumbnail */}
      {/* <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} /> */}

      {/* Reservation Details */}
      <View style={styles.reservationDetails}>
        {/* <Text style={styles.reservationGuest}>{item.guest}</Text> */}
        {/* <Text style={styles.reservationProperty}>{item.property}</Text> */}
        <Text style={styles.reservationDates}>{item.check_in} - {item.check_out}</Text>
        <Text style={[styles.reservationStatus, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
        <Text style={styles.reservationPrice}>{item.total_price}</Text>

        {/* Show Tasks Button */}
        <TouchableOpacity
          style={styles.showTasksButton}
          onPress={() => setShowTasks(showTasks === item.id ? null : item.id)}
        >
          <Text style={styles.showTasksButtonText}>
            {showTasks === item.id ? 'Hide Tasks' : 'Show Tasks'}
          </Text>
        </TouchableOpacity>

        {/* Tasks List (Conditional) */}
        {/* {showTasks === item.id && (
          <View style={styles.tasksContainer}>
            {item.tasks.map((task, index) => (
              <Text key={index} style={styles.taskText}>- {task}</Text>
            ))}
          </View>
        )} */}
      </View>
    </View>
  );

  // Get Status Color
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return '#32CD32'; // Green
      case 'pending':
        return '#FFA500'; // Orange
      case 'cancelled':
        return '#FF4444'; // Red
      default:
        return '#666666'; // Gray
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Réservations</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{reservations.length}</Text>
          <Text style={styles.statTitle}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$2500</Text>
          <Text style={styles.statTitle}>Revenue</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statTitle}>Upcoming</Text>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <View style={styles.filterOptions}>
        <TouchableOpacity
          style={[styles.filterOption, filterStatus === 'All' && styles.activeFilter]}
          onPress={() => setFilterStatus('All')}
        >
          <Text style={styles.filterOptionText}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterOption, filterStatus === 'Confirmed' && styles.activeFilter]}
          onPress={() => setFilterStatus('Confirmed')}
        >
          <Text style={styles.filterOptionText}>Confirmé</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterOption, filterStatus === 'Pending' && styles.activeFilter]}
          onPress={() => setFilterStatus('Pending')}
        >
          <Text style={styles.filterOptionText}>En attente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterOption, filterStatus === 'Cancelled' && styles.activeFilter]}
          onPress={() => setFilterStatus('Cancelled')}
        >
          <Text style={styles.filterOptionText}>Annulé</Text>
        </TouchableOpacity>
      </View>

      {/* Reservations List */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservation}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  statTitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeFilter: {
    backgroundColor: '#1E90FF',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  reservationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  reservationDetails: {
    flex: 1,
  },
  reservationGuest: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  reservationProperty: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  reservationDates: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  reservationStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  reservationPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 8,
  },
  showTasksButton: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  showTasksButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tasksContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  taskText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
});

export default Reservations;