import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

const SecurityInfoPage = () => {
  const [cameraChecked, setCameraChecked] = useState(false);
  const [sonometerChecked, setSonometerChecked] = useState(false);
  const [weaponsChecked, setWeaponsChecked] = useState(false);

  const handleSubmit = () => {
    console.log('Caméra de surveillance extérieure:', cameraChecked);
    console.log('Sonmètre présent:', sonometerChecked);
    console.log('Présence d\'armes:', weaponsChecked);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Indiquez les informations liées à la sécurité</Text>
      <Text style={styles.subtitle}>Votre logement possède-t-il ces éléments ?</Text>

      <View style={styles.checkboxSection}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={cameraChecked}
            onValueChange={setCameraChecked}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Présence d'une caméra de surveillance à l'extérieur</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={sonometerChecked}
            onValueChange={setSonometerChecked}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Présence d'un sonomètre</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={weaponsChecked}
            onValueChange={setWeaponsChecked}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Une ou plusieurs armes sont présentes dans le logement</Text>
        </View>
      </View>

      <Text style={styles.note}>Choses importantes à savoir</Text>
      <Text style={styles.noteText}>
        Les caméras de surveillance qui filment des espaces intérieurs ne sont pas autorisées, même si elles sont éteintes.
        La présence de caméras de surveillance situées à l'extérieur du logement doit être clairement communiquée.
      </Text>

      <Text style={styles.noteText}>
        Assurez-vous de respecter la législation locale et de prendre connaissance de la Politique de non-discrimination d'Airbnb
        ainsi que des informations concernant les frais applicables aux voyageurs et aux hôtes.
      </Text>

    </ScrollView>
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
  checkboxSection: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
  note: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default SecurityInfoPage;
