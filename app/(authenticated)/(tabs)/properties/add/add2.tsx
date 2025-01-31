import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConfirmAddress = ({ onNext, onPrev }) => {
  const handleLocationDetect = () => {
    // Logique pour détecter la localisation via GPS
    console.log('Détecter la localisation');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirmez votre adresse</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Pays/Région */}
        <TextInput
          style={styles.input}
          placeholder="Pays/région"
          value="France"
        />
        {/* Adresse */}
        <TextInput
          style={styles.input}
          placeholder="Bâtiment, appartement, résidence, étage (si applicable)"
        />
        <TextInput
          style={styles.input}
          placeholder="Nom du bâtiment (si applicable)"
        />
        <TextInput
          style={styles.input}
          placeholder="Numéro et libellé de voie"
          value="42 Allée du Haut Poitou"
        />
        <TextInput style={styles.input} placeholder="Code postal" value="86360" />
        <TextInput
          style={styles.input}
          placeholder="Commune"
          value="Chasseneuil-du-Poitou"
        />

        {/* Lien cliquable pour activer le GPS */}
        <TouchableOpacity
          style={styles.locationLinkContainer}
          onPress={handleLocationDetect}
        >
          <Ionicons name="location-sharp" size={18} color="#007BFF" />
          <Text style={styles.locationLinkText}>
            Activer le GPS pour détecter la localisation
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer with Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNext()} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  locationLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  locationLinkText: {
    color: '#007BFF',
    fontSize: 16,
    marginLeft: 8,
    textDecorationLine: 'underline', // Soulignement du texte pour indiquer que c'est un lien cliquable
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
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
    backgroundColor: 'black',
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

export default ConfirmAddress;