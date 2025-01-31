import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const PricePage = () => {
  const [pricePerNight, setPricePerNight] = useState('47');
  const [priceToPay, setPriceToPay] = useState(56);
  const [priceInput, setPriceInput] = useState('47');

  const handlePriceChange = (text) => {
    setPriceInput(text);
  };

  const handleSubmit = () => {
    setPricePerNight(priceInput);
    setPriceToPay(parseInt(priceInput) + 9); // Exemple d'ajout pour le prix du voyageur
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fixez votre prix</Text>
      <Text style={styles.subtitle}>Vous pouvez le modifier à tout moment.</Text>

      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>Prix par nuit</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={priceInput}
          onChangeText={handlePriceChange}
          placeholder="Prix en €"
        />
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>Prix à payer par le voyageur</Text>
        <Text style={styles.priceAmount}>{priceToPay} €</Text>
      </View>

      <View style={styles.similarSection}>
        <Text style={styles.similarTitle}>Logements similaires entre 43 € et 56 €</Text>
      </View>

      <Button title="En savoir plus sur la tarification" onPress={() => console.log('Tarification info')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
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
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
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
    borderRadius: 5,
  },
  similarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  submitButton: {
    marginTop: 20,
  },
});

export default PricePage;
