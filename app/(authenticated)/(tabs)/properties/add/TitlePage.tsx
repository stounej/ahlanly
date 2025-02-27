import usePropertyStore from '@/app/store/addProperty';
import usePropertiesStore from '@/app/store/properties';

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

interface TitlePageProps {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  isEdit: boolean
}

const TitlePage: React.FC<TitlePageProps> = ({ onPrev, onNext, onClose, isEdit }) => {
  const {setCurrentProperty, property} = usePropertyStore()
  const {setProperty} = usePropertiesStore()

  const [title, setTitle] = useState(property?.title);

  const handleNextButton = () => {
    setCurrentProperty({title: title})
    onNext()
  }
  const submitEdit   =  async ()  => {    
    setCurrentProperty({ title: title });
    const newProperty = {...property, title}
    setProperty(property.id, newProperty)
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>À présent, donnez un titre à votre annonce</Text>
      <Text style={styles.subtitle}>
        Les titres courts sont généralement les plus efficaces. Ne vous inquiétez pas, vous pourrez toujours le modifier plus tard.
      </Text>

      {/* Scrollable Content for Title Input */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          style={styles.input}
          placeholder="Saisissez le titre de votre annonce"
          value={title}
          onChangeText={setTitle}
          multiline
        />
      </ScrollView>

      {/* Footer with Navigation Buttons */}
      {!isEdit ?  <View style={styles.footer}>
        <FooterButton text="Retour" onPress={onPrev} secondary={true} />
        <FooterButton text="Suivant" onPress={handleNextButton} disabled={!title} secondary={false} />
      </View>
      :
      <View style={styles.footer}>
      <FooterButton text="Fermer" onPress={onClose} secondary={true} />
      <FooterButton text="Enregistrer" onPress={() => submitEdit()} disabled={!title} secondary={false} />
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
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
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    minHeight: 100,
    backgroundColor: '#f9f9f9',
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

export default TitlePage;