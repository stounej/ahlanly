import { Reservation } from '@/services';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For the select list
import ReservationBottomSheet from '../../(modals)/reservations/reservationBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Calendar, useDateRange } from "@marceloterreiro/flash-calendar";


const Calendrier = () => {
  // Dummy Data
  const [showReservation, setShowReservation] = useState(true);

  const appartements = [
    {
      id: '1',
      title: 'Cozy Apartment',
      thumbnail: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      title: 'Luxury Villa',
      thumbnail: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      title: 'Beach House',
      thumbnail: 'https://via.placeholder.com/100',
    },
  ];

  const [selectedAppartement, setSelectedAppartement] = useState(appartements[0].id);
  const [hasReservation, setHasReservation] = useState(true); // Change to false if no reservation
  const {
    calendarActiveDateRanges,
    onCalendarDayPress,
    // Also available for your convenience:
    // dateRange, // { startId?: string, endId?: string }
    // isDateRangeValid, // boolean
    // onClearDateRange, // () => void
  } = useDateRange();
  // Dummy Reservation Data
  const reservation: Reservation = {
    id: '1',
    guest: 'John Doe',
    property: 'Cozy Apartment',
    checkIn: '2023-10-15',
    checkOut: '2023-10-20',
    status: 'Confirmed',
    price: '$500',
    contact: '+212 6 12 34 56 78'
  };

  return (
    <View style={styles.container}>
      {/* Select List */}
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={selectedAppartement}
          onValueChange={(itemValue) => setSelectedAppartement(itemValue)}
          style={styles.picker}
        >
          {appartements.map((appartement) => (
            <Picker.Item
              key={appartement.id}
              label={appartement.title}
              value={appartement.id}
            />
          ))}
        </Picker>
        <Image
          source={{ uri: appartements.find((a) => a.id === selectedAppartement)?.thumbnail || appartements[0].thumbnail }}
          style={styles.thumbnail}
        />
      </View>

      {/* Calendrier View */}
      <Calendar.List
      calendarActiveDateRanges={calendarActiveDateRanges}
      onCalendarDayPress={onCalendarDayPress}
    />

      {/* Footer Modal (Conditional) */}
      {showReservation && (
          <ReservationBottomSheet
            reservation={reservation}
            onClose={() => setShowReservation(false)}
          />
      )}
    </View>
      

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  picker: {
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 16,
  },
  calendrierContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendrierPlaceholder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Calendrier;