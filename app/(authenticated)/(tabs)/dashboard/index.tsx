import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Add these interfaces at the top of the file after imports
interface Tip {
  id: string;
  text: string;
}

interface Task {
  id: string;
  title: string;
  date: string;
}

interface Review {
  id: string;
  guest: string;
  comment: string;
  rating: number;
}

interface Reservation {
  id: string;
  guest: string;
  property: string;
  date: string;
}

interface AnalyticsButton {
  id: string;
  title: string;
}

const Dashboard = () => {
  const navigation = useNavigation();

  // Dummy Data
  const stats = [
    { id: '1', title: 'Total Bookings', value: '24' },
    { id: '2', title: 'Revenue', value: '$1,200' },
    { id: '3', title: 'Upcoming Bookings', value: '5' },
  ];

  const tips = [
    { id: '1', text: 'Add more photos to your listings.' },
    { id: '2', text: 'Improve your response rate to guest inquiries.' },
    { id: '3', text: 'Consider dynamic pricing for better revenue.' },
  ];

  const tasks = [
    { id: '1', title: 'Clean Apartment', date: '2023-10-12' },
    { id: '2', title: 'Maintenance Check', date: '2023-10-15' },
    { id: '3', title: 'Restock Supplies', date: '2023-10-18' },
  ];

  const reviews = [
    { id: '1', guest: 'John Doe', comment: 'Great place!', rating: 5 },
    { id: '2', guest: 'Jane Smith', comment: 'Very clean and cozy.', rating: 4 },
    { id: '3', guest: 'Alice Johnson', comment: 'Amazing view!', rating: 5 },
  ];

  const upcomingReservations = [
    { id: '1', guest: 'John Doe', property: 'Cozy Apartment', date: '2023-10-15' },
    { id: '2', guest: 'Jane Smith', property: 'Luxury Villa', date: '2023-10-20' },
    { id: '3', guest: 'Alice Johnson', property: 'Beach House', date: '2023-10-25' },
  ];

  const analyticsButtons = [
    { id: '1', title: 'Revenue' },
    { id: '2', title: 'Occupancy Rate' },
    { id: '3', title: 'Guest Ratings' },
  ];

  // Render Stats
  const renderStats = () => (
    <View style={styles.statsContainer}>
      {stats.map((item) => (
        <View key={item.id} style={styles.statCard}>
          <Text style={styles.statValue}>{item.value}</Text>
          <Text style={styles.statTitle}>{item.title}</Text>
        </View>
      ))}
    </View>
  );

  // Render Tips
  const renderTips = ({ item }: { item: Tip }) => (
    <View style={styles.tipCard}>
      <Text style={styles.tipText}>{item.text}</Text>
    </View>
  );

  // Render Tasks
  const renderTasks = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>{item.date}</Text>
    </View>
  );

  // Render Reviews
  const renderReviews = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewGuest}>{item.guest}</Text>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewRating}>Rating: {item.rating}/5</Text>
    </View>
  );

  // Render Upcoming Reservations
  const renderUpcomingReservations = ({ item }: { item: Reservation }) => (
    <View style={styles.reservationCard}>
      <Text style={styles.reservationGuest}>{item.guest}</Text>
      <Text style={styles.reservationProperty}>{item.property}</Text>
      <Text style={styles.reservationDate}>{item.date}</Text>
    </View>
  );

  // Render Analytics Buttons
  const renderAnalyticsButtons = ({ item }: { item: AnalyticsButton }) => (
    <TouchableOpacity style={styles.analyticsButton}>
      <Text style={styles.analyticsButtonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity >
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      {renderStats()}

       {/* Analytics Buttons */}
       <View style={styles.section}>
        <FlatList
          data={analyticsButtons}
          keyExtractor={(item) => item.id}
          renderItem={renderAnalyticsButtons}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Tasks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTasks}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

 {/* Upcoming Reservations Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Reservations</Text>
          <Text style={styles.reservationCount}>{upcomingReservations.length} Reservations</Text>
        </View>
        <FlatList
          data={upcomingReservations}
          keyExtractor={(item) => item.id}
          renderItem={renderUpcomingReservations}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* AI Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Tips</Text>
        <FlatList
          data={tips}
          keyExtractor={(item) => item.id}
          renderItem={renderTips}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Guest Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guest Reviews</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReviews}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
    </ScrollView>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    fontSize: 24,
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
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  reservationCount: {
    fontSize: 16,
    color: '#666666',
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    fontSize: 16,
    color: '#333333',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  taskDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewGuest: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  reviewRating: {
    fontSize: 14,
    color: '#1E90FF',
    marginTop: 8,
  },
  reservationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  reservationDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  analyticsButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyticsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Dashboard;