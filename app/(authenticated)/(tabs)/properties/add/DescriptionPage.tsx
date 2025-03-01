import usePropertyStore from '@/app/store/addProperty';
import { propertiesService } from '@/services';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface DescriptionPageProps {
  onPrev: () => void;
  onNext: () => void;
  onCloseEditor: (message?: string) => void;
  isEditMode: boolean;
}

const DescriptionPage: React.FC<DescriptionPageProps> = ({ onPrev, onNext, onCloseEditor, isEditMode }) => {
  const {setCurrentProperty, property} = usePropertyStore()
  const [description, setDescription] = useState(property.description);
  const [remainingChars, setRemainingChars] = useState(500);


  const handleNextButton = () => {
    setCurrentProperty({description})
    onNext()
  }

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    setRemainingChars(500 - text.length);
  };

  const submitEdit   =  async ()  => {   
    if (description !== property.description) {
      setCurrentProperty({ description: description });
      const newProperty = {...property, description}
      propertiesService.update_description(property.id, description).then(()=> {
        onCloseEditor('Vos modification sont enregistrées')
      })
    }

  }

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

      {!isEditMode ?  <View style={styles.footer}>
        <FooterButton text="Retour" onPress={onPrev} secondary={true} />
        <FooterButton text="Suivant" onPress={handleNextButton} disabled={!description} secondary={false} />
      </View>
      :
      <View style={styles.footer}>
      <FooterButton text="Fermer" onPress={() => onCloseEditor()} secondary={true} />
      <FooterButton text="Enregistrer" onPress={() => submitEdit()} disabled={!description} secondary={false} />
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

export default DescriptionPage;