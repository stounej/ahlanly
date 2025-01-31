import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const PropertyDetails = ({ onNext, onPrev }) => {
  const [travelers, setTravelers] = useState(4);
  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Titre */}
        <Text style={styles.title}>Donnez les informations principales concernant votre logement</Text>
        <Text style={styles.subtitle}>
          Vous pourrez ajouter d'autres informations plus tard, comme les types de lit.
        </Text>

        {/* Section des compteurs */}
        <View style={styles.item}>
          <Text style={styles.label}>Voyageurs</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => decrement(setTravelers, travelers)}
            >
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.value}>{travelers}</Text>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => increment(setTravelers, travelers)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Chambres</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => decrement(setRooms, rooms)}
            >
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.value}>{rooms}</Text>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => increment(setRooms, rooms)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Lits</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => decrement(setBeds, beds)}
            >
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.value}>{beds}</Text>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => increment(setBeds, beds)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Salles de bain</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => decrement(setBathrooms, bathrooms)}
            >
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.value}>{bathrooms}</Text>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => increment(setBathrooms, bathrooms)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons at the bottom */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff', // Pour éviter que le footer soit transparent lors du défilement
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  navButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PropertyDetails;