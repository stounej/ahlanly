import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaisonButton from '@/app/buttons/properties/maison'; // Assurez-vous d'importer vos composants de boutons correctement
import AppartementButton from '@/app/buttons/properties/appartment';
import ChambreButton from '@/app/buttons/properties/chambrehote';
import Cabane from '@/app/buttons/properties/cabane';
import Caravane from '@/app/buttons/properties/caravane';
import Ferme from '@/app/buttons/properties/Ferme';
import Tente from '@/app/buttons/properties/tente';
import Hotel from '@/app/buttons/properties/hotel';
import Riad from '@/app/buttons/properties/riad';

const ChooseType = ({ onNext }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choisissez votre type de logement</Text>
      </View>

      {/* Main Content with Scrollable Options */}
      <ScrollView contentContainerStyle={styles.mainContent}>
        <Text style={styles.subtitle}>
          Quel type de logement sera à la disposition des voyageurs ?
        </Text>
        {/* Options Container */}
        <View style={styles.optionsContainer}>
          <View style={styles.buttons}>
            <MaisonButton />
            <AppartementButton />
            <ChambreButton />
            <Cabane />
            <Caravane />
            <Ferme />
            <Tente />
            <Hotel />
            <Riad />
          </View>
        </View>
      </ScrollView>

      {/* Footer with Next Button */}
      <View style={styles.footer}>
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
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 80, // Ajuster cet espace pour éviter que le footer masque le contenu
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    width: '30%',
    margin: 10,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  nextButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    width: '90%', // Largeur ajustée pour mieux s'adapter au conteneur
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChooseType;