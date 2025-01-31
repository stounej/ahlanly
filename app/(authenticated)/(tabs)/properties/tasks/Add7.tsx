import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';

const DescriptionPage = () => {
  const [description, setDescription] = useState('');
  const [remainingChars, setRemainingChars] = useState(500);

  const handleDescriptionChange = (text) => {
    setDescription(text);
    setRemainingChars(500 - text.length);
  };

  const handleSubmit = () => {
    // Vous pouvez ajouter ici le code pour envoyer la description
    console.log('Description:', description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créez votre description</Text>
      <Text style={styles.subtitle}>
        Racontez ce qui rend votre logement unique.
      </Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={6}
        maxLength={500}
        placeholder="Détendez-vous, vous ne manquerez pas de place dans ce logement spacieux."
        value={description}
        onChangeText={handleDescriptionChange}
      />
      <Text style={styles.counter}>{remainingChars} caractères restants</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  counter: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
});

export default DescriptionPage;
