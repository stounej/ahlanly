import usePropertyStore from '@/app/store/addProperty';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface PropertyDetailsProps {
  onPrev: () => void;
  onNext: () => void;
}

interface PropertyDetails {
  max_guests: number;
  number_of_rooms: number;
  number_of_beds: number;
  number_of_bathrooms: number;
  // Add any other properties that are part of propertyDetails
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ onPrev, onNext }) => {
  const { setProperty, property } = usePropertyStore();
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    max_guests: property?.max_guests || 4,
    number_of_rooms: property?.number_of_rooms || 1,
    number_of_beds: property?.number_of_beds || 1,
    number_of_bathrooms: property?.number_of_bathrooms || 1,
  });

  const handleNextButton = () => {
    setProperty({...propertyDetails})
    onNext()
  }
  const adjustCount = (field: keyof PropertyDetails, amount: number) => {
    setPropertyDetails(prev => ({
      ...prev,
      [field]: Math.max(prev[field] + amount, 1)
    }));
  };

  const CounterItem = ({ label, value, field }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={[
            styles.counterButton, 
            value === 1 && styles.disabledButton
          ]}
          onPress={() => adjustCount(field, -1)}
          disabled={value === 1}>
          <Text style={[
            styles.buttonText, 
            value === 1 && styles.disabledText
          ]}>−</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => adjustCount(field, 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Détails de votre logement</Text>
        <Text style={styles.subtitle}>
          Définissez les capacités de base de votre hébergement
        </Text>

        <CounterItem
          label="Voyageurs maximum"
          value={propertyDetails.max_guests}
          field="max_guests"
        />
        <CounterItem
          label="Chambres"
          value={propertyDetails.number_of_rooms}
          field="number_of_rooms"
        />
        <CounterItem
          label="Lits"
          value={propertyDetails.number_of_beds}
          field="number_of_beds"
        />
        <CounterItem
          label="Salles de bain"
          value={propertyDetails.number_of_bathrooms}
          field="number_of_bathrooms"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={onPrev} 
          style={[styles.button, styles.backButton]}>
          <Text style={styles.buttonTextSecondary}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleNextButton} 
          style={[styles.button, styles.nextButton]}>
          <Text style={styles.buttonTextPrimary}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 32,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  disabledText: {
    color: '#BDBDBD',
  },
  counterValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    minWidth: 40,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#F1F3F5',
  },
  nextButton: {
    backgroundColor: '#007BFF',
  },
  buttonTextPrimary: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#007BFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PropertyDetails;