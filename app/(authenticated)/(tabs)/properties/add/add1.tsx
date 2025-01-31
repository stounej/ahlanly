import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const AddStep1 = ({ onNext, onPrev }) => {
  const handleSelectOption = (option) => {
    console.log(`Selected: ${option}`);
  };

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
          {/* Option 1 */}
          <TouchableOpacity style={styles.option} onPress={() => handleSelectOption('Un logement entier')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="home" size={24} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>Un logement entier</Text>
              <Text style={styles.optionSubtitle}>
                Les voyageurs disposent du logement dans son intégralité.
              </Text>
            </View>
          </TouchableOpacity>
          {/* Option 2 */}
          <TouchableOpacity style={styles.option} onPress={() => handleSelectOption('Une chambre')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="door-front" size={24} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>Une chambre</Text>
              <Text style={styles.optionSubtitle}>
                Les voyageurs ont leur propre chambre dans un logement et ont accès à des espaces partagés.
              </Text>
            </View>
          </TouchableOpacity>
          {/* Option 3 */}
          <TouchableOpacity style={styles.option} onPress={() => handleSelectOption('Une chambre partagée')}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="users" size={24} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>Une chambre partagée</Text>
              <Text style={styles.optionSubtitle}>
                Les voyageurs dorment dans une chambre partagée dans une auberge de jeunesse gérée par un professionnel.
              </Text>
            </View>
          </TouchableOpacity>
          {/* Vous pouvez ajouter d'autres options ici */}
        </View>
      </ScrollView>

      {/* Footer with Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={styles.nextButton}>
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
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 60, // Ajuster cet espace pour éviter que le footer masque le contenu
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
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6b6b6b',
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
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddStep1;