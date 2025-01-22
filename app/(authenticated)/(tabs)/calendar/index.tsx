import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Calendar, useDateRange } from "@marceloterreiro/flash-calendar";

interface Apartment {
  id: string;
  name: string;
  image: string;
}

const App = () => {
  const apartments = [
    { id: '1', name: 'Appartement 1', image: 'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg' },
    { id: '2', name: 'Appartement 2', image: 'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg' },
    { id: '3', name: 'Appartement 3', image: 'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg' },
    // Ajoutez ici d'autres appartements
  ];

  const {
    calendarActiveDateRanges,
    onCalendarDayPress,
  } = useDateRange();

  const renderApartmentItem = ({ item }: { item: Apartment }) => (
    <View style={styles.apartmentItem}>
      <Image source={{ uri: item.image }} style={styles.apartmentImage} />
      <Text style={styles.apartmentName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Liste des appartements (35%) */}
      <View style={styles.apartmentListContainer}>
        <FlatList
          data={apartments}
          renderItem={renderApartmentItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.apartmentList}
        />
      </View>
      
      {/* Composant de calendrier (65%) */}
      <View style={styles.calendarContainer}>
        <Calendar.List
          calendarActiveDateRanges={calendarActiveDateRanges}
          onCalendarDayPress={onCalendarDayPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  apartmentListContainer: {
    flex: 0.3,  // 35% de la hauteur de l'écran
    marginBottom: 20, // Espacement entre la liste et le calendrier
  },
  apartmentList: {
    height: '100%',
  },
  apartmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
  },
  apartmentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  apartmentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContainer: {
    flex: 0.65,  // 65% de la hauteur de l'écran
  },
});

export default App;
