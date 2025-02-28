import usePropertyStore from '@/app/store/addProperty';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface PricePageProps {
  onPrev: () => void; // Define the type for onPrev
  onNext: () => void; // Define the type for onNext
}

const PricePage: React.FC<PricePageProps> = ({ onPrev, onNext }) => {
  const {setProperty, property} = usePropertyStore()

  const [pricePerNight, setPricePerNight] = useState(property?.price);
  const [priceToPay, setPriceToPay] = useState(56);
  const [priceInput, setPriceInput] = useState(property.price?.toString());

  const handleNextButton = () => {
    setProperty({price: Number(priceInput)})
    onNext()
  }

  const handlePriceChange = (text: string) => {
    // Check that the entered value is numeric
    if (/^\d*\.?\d*$/.test(text)) { // Allow decimal numbers
      setPriceInput(text);
    }
  };

  const handleSubmit = () => {
    const numericPrice = parseFloat(priceInput); // Convert string to number
    setPricePerNight(numericPrice);
    setPriceToPay(numericPrice + 9); // Example of adding for the traveler's price
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Fixez votre prix</Text>
      <Text style={styles.subtitle}>Vous pouvez le modifier à tout moment.</Text>

      {/* Scrollable Content for Price Input */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Prix par nuit</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={priceInput}
            onChangeText={handlePriceChange}
            placeholder="Prix en €"
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Prix à payer par le voyageur</Text>
          <Text style={styles.priceAmount}>{priceToPay} €</Text>
        </View>
        <View style={styles.similarSection}>
          <Text style={styles.similarTitle}>Logements similaires entre 43 € et 56 €</Text>
        </View>
        <TouchableOpacity style={styles.infoButton} onPress={() => console.log('Tarification info')}>
          <Text style={styles.infoButtonText}>En savoir plus sur la tarification</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer with Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => priceInput ? handleNextButton() : null} style={[styles.nextButton, !priceInput && styles.disabledNextButton]}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 80 + 16, // Ajuster cet espace pour éviter que le footer masque le contenu
  },
  priceSection: {
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  similarSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  similarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  infoButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
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
  disabledNextButton: {
    backgroundColor: '#d3d3d3', // Couleur grise pour désactiver le bouton
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PricePage;