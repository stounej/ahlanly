import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const DiscountsPage = () => {
  const [weeklyDiscount, setWeeklyDiscount] = useState('11');
  const [monthlyDiscount, setMonthlyDiscount] = useState('30');

  const handleWeeklyDiscountChange = (text) => {
    setWeeklyDiscount(text);
  };

  const handleMonthlyDiscountChange = (text) => {
    setMonthlyDiscount(text);
  };

  const handleSubmit = () => {
    // Vous pouvez ajouter ici le code pour appliquer ou sauvegarder les réductions
    console.log('Réduction à la semaine:', weeklyDiscount + '%');
    console.log('Réduction au mois:', monthlyDiscount + '%');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajoutez des réductions</Text>
      <Text style={styles.subtitle}>
        Faites sortir votre logement du lot pour obtenir des réservations plus rapidement et recevoir vos premières évaluations.
      </Text>

      <View style={styles.discountSection}>
        <Text style={styles.discountLabel}>20% - Promotion Nouvelles annonces</Text>
        <Text style={styles.description}>Proposez une réduction de 20 % sur vos 3 premières réservations</Text>
      </View>

      <View style={styles.discountSection}>
        <Text style={styles.discountLabel}>Réduction à la semaine</Text>
        <Text style={styles.description}>Pour les séjours de 7 nuits ou plus</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weeklyDiscount}
          onChangeText={handleWeeklyDiscountChange}
          placeholder="Réduction à la semaine en %"
        />
      </View>

      <View style={styles.discountSection}>
        <Text style={styles.discountLabel}>Réduction au mois</Text>
        <Text style={styles.description}>Pour les séjours de 28 nuits ou plus</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={monthlyDiscount}
          onChangeText={handleMonthlyDiscountChange}
          placeholder="Réduction au mois en %"
        />
      </View>

      <Text style={styles.note}>Une seule réduction sera appliquée par séjour.</Text>
      <Button title="En savoir plus" onPress={() => console.log('Plus d\'informations sur les réductions')} />

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
  discountSection: {
    marginBottom: 20,
  },
  discountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  note: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
  submitButton: {
    marginTop: 20,
  },
});

export default DiscountsPage;
