import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DescriptionPage = ({ onPrev, onNext }) => {
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
      {/* Header */}
      <Text style={styles.title}>Créez votre description</Text>
      <Text style={styles.subtitle}>
        Racontez ce qui rend votre logement unique.
      </Text>

      {/* Scrollable Content for Description Input */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
      </ScrollView>

      {/* Footer with Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => description ? onNext() : null} style={[styles.nextButton, !description && styles.disabledNextButton]}>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  counter: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
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

export default DescriptionPage;