import React, { useState } from 'react';
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
import Villa from '@/app/buttons/properties/villa';
import usePropertyStore from '@/app/store/addProperty';

interface ChooseTypeProps {
  onNext: () => void; // Define the type for onNext
}

const ChooseType: React.FC<ChooseTypeProps> = ({ onNext }) => {
  const {setProperty, property} = usePropertyStore()
  const [selectedType, setSelectedType] = useState(property?.property_type);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleNextButton = () => {
    setProperty({property_type: selectedType})
    onNext()
  }

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
          <AppartementButton onPressB={() => handleTypeSelect('appartement')} isSelected={selectedType === 'appartement'} />
          <Hotel onPressB={() => handleTypeSelect('hotel')} isSelected={selectedType === 'hotel'} />
          <Villa onPressB={() => handleTypeSelect('villa')} isSelected={selectedType === 'villa'} />
          <Riad onPressB={() => handleTypeSelect('riad')} isSelected={selectedType === 'riad'} />
          <ChambreButton onPressB={() => handleTypeSelect('maisonhotes')} isSelected={selectedType === 'maisonhotes'} />
          <MaisonButton onPressB={() => handleTypeSelect('maison')} isSelected={selectedType === 'maison'} />
          <Cabane onPressB={() => handleTypeSelect('cabane')} isSelected={selectedType === 'cabane'} />
          <Ferme onPressB={() => handleTypeSelect('ferme')} isSelected={selectedType === 'ferme'} />
          <Tente onPressB={() => handleTypeSelect('tente')} isSelected={selectedType === 'tente'} />
          <Caravane onPressB={() => handleTypeSelect('caravane')} isSelected={selectedType === 'caravane'} />
          </View>
        </View>
      </ScrollView>

      {/* Footer with Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={handleNextButton} 
          style={[styles.nextButton, !selectedType && styles.disabledNextButton]}
          disabled={!selectedType}
        >
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
    padding: 5,
  },
  header: {
    marginBottom: 10,
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
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
  disabledNextButton: {
    backgroundColor: '#d3d3d3', // Couleur grise pour désactiver le bouton
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChooseType;