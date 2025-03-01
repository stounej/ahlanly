import usePropertyStore from '@/app/store/addProperty';
import { propertiesService } from '@/services';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface PricePageProps {
  onPrev: () => void; // Define the type for onPrev
  onNext: () => void; // Define the type for onNext
  onCloseEditor: () => void;
  isEditMode: boolean;
}

const PricePage: React.FC<PricePageProps> = ({ onPrev, onNext, onCloseEditor, isEditMode }) => {
  const {setCurrentProperty, property} = usePropertyStore()

  const [priceToPay, setPriceToPay] = useState(56);
  const [priceInput, setPriceInput] = useState(property.price?.toString());

  const handleNextButton = () => {
    setCurrentProperty({price: Number(priceInput)})
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
    setPriceToPay(numericPrice + 9); // Example of adding for the traveler's price
  };

  
  const submitEdit   =  async ()  => {   
    if (priceInput) {
      setCurrentProperty({ price: Number(priceInput)
       });
      //const newProperty = {...property, property_style: selectedOption}
      propertiesService.update_price(property.id, priceInput).then(()=> {
        onCloseEditor('Vos modification sont enregistrées')
        
      })
      //setProperty(property.id, newProperty)
    }

  }


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

      {!isEditMode ?  <View style={styles.footer}>
        <FooterButton text="Retour" onPress={onPrev} secondary={true} />
        <FooterButton text="Suivant" onPress={handleNextButton} disabled={!priceInput} secondary={false} />
      </View>
      :
      <View style={styles.footer}>
      <FooterButton text="Fermer" onPress={() => onCloseEditor()} secondary={true} />
      <FooterButton text="Enregistrer" onPress={() => submitEdit()} disabled={!priceInput} secondary={false} />
    </View>}
    </View>
  );
};

const FooterButton: React.FC<{ text: string; onPress: () => void; secondary?: boolean; disabled?: boolean }> = ({ text, onPress, secondary, disabled }) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[styles.footerButton, secondary && styles.secondaryButton]}
    disabled={disabled}
  >
    <Text style={[styles.footerButtonText, secondary && styles.secondaryButtonText]}>
      {text}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  footerButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    minWidth: 170,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#e9ecef',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#495057',
  },
  disabledButtonText: {
    color: '#868e96',
  },
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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