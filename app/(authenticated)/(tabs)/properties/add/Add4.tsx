import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons, FontAwesome5, Ionicons, Entypo, Feather } from '@expo/vector-icons';

const EquipmentsPage = ({ onPrev, onNext }) => {
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [animationValues, setAnimationValues] = useState({});

  const toggleEquipment = (equipment) => {
    const isSelected = selectedEquipments.includes(equipment);
    if (isSelected) {
      setSelectedEquipments(selectedEquipments.filter((item) => item !== equipment));
    } else {
      setSelectedEquipments([...selectedEquipments, equipment]);
    }

    // Animation
    if (!animationValues[equipment]) {
      setAnimationValues((prev) => ({
        ...prev,
        [equipment]: new Animated.Value(1),
      }));
    }
    const animationValue = animationValues[equipment];
    if (animationValue) {
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(animationValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const renderEquipment = (icon, name) => (
    <TouchableOpacity
      key={name}
      style={[
        styles.equipmentItem,
        selectedEquipments.includes(name) && styles.selectedEquipmentItem,
      ]}
      onPress={() => toggleEquipment(name)}
    >
      <Animated.View style={{ transform: [{ scale: animationValues[name] || 1 }] }}>
        <View style={styles.iconWrapper}>{icon}</View>
      </Animated.View>
      <Text style={styles.equipmentName}>{name}</Text>
      {selectedEquipments.includes(name) && (
        <Ionicons name="checkmark-circle" size={20} color="#007BFF" />
      )}
    </TouchableOpacity>
  );

  const renderRow = (equipments) => (
    <View style={styles.row}>
      {equipments.map(({ icon, name }) => renderEquipment(icon, name))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 + 16 }]}>
        <Text style={styles.title}>Indiquez aux voyageurs quels sont les équipements de votre logement</Text>
        <Text style={styles.subtitle}>
          Vous pourrez ajouter des équipements une fois votre annonce publiée.
        </Text>
        <Text style={styles.sectionTitle}>Qu'en est-il de ces équipements préférés des voyageurs ?</Text>
        {renderRow([
          { icon: <Ionicons name="wifi" size={24} color="#000" />, name: "Wifi" },
          { icon: <Feather name="tv" size={24} color="#000" />, name: "Télévision" },
        ])}
        {renderRow([
          { icon: <MaterialIcons name="kitchen" size={24} color="#000" />, name: "Cuisine" },
          { icon: <FontAwesome5 name="soap" size={24} color="#000" />, name: "Lave-linge" },
        ])}
        {renderRow([
          { icon: <MaterialIcons name="local-parking" size={24} color="#000" />, name: "Parking gratuit sur place" },
          { icon: <MaterialIcons name="local-parking" size={24} color="#000" />, name: "Parking payant sur place" },
        ])}
        {renderRow([
          { icon: <Ionicons name="snow" size={24} color="#000" />, name: "Climatisation" },
          { icon: <Ionicons name="desktop" size={24} color="#000" />, name: "Espace de travail dédié" },
        ])}
        <Text style={styles.sectionTitle}>Possédez-vous des équipements hors du commun ?</Text>
        {renderRow([
          { icon: <MaterialIcons name="pool" size={24} color="#000" />, name: "Piscine" },
          { icon: <FontAwesome5 name="hot-tub" size={24} color="#000" />, name: "Jacuzzi" },
        ])}
        {renderRow([
          { icon: <Entypo name="tree" size={24} color="#000" />, name: "Patio" },
          { icon: <MaterialIcons name="outdoor-grill" size={24} color="#000" />, name: "Barbecue" },
        ])}
        {renderRow([
          { icon: <MaterialIcons name="restaurant" size={24} color="#000" />, name: "Espace repas en plein air" },
          { icon: <FontAwesome5 name="fire" size={24} color="#000" />, name: "Brasero" },
        ])}
        {renderRow([
          { icon: <Ionicons name="game-controller" size={24} color="#000" />, name: "Billard" },
          { icon: <FontAwesome5 name="fireplace" size={24} color="#000" />, name: "Cheminée" },
        ])}
        {renderRow([
          { icon: <FontAwesome5 name="piano" size={24} color="#000" />, name: "Piano" },
          { icon: <MaterialIcons name="fitness-center" size={24} color="#000" />, name: "Appareils de fitness" },
        ])}
        {renderRow([
          { icon: <MaterialIcons name="waves" size={24} color="#000" />, name: "Accès au lac" },
          { icon: <Ionicons name="water" size={24} color="#000" />, name: "Accès à la plage" },
        ])}
        <Text style={styles.sectionTitle}>Possédez-vous ces équipements de sécurité ?</Text>
        {renderRow([
          { icon: <MaterialIcons name="smoke-free" size={24} color="#000" />, name: "Détecteur de fumée" },
          { icon: <FontAwesome5 name="first-aid" size={24} color="#000" />, name: "Kit de premiers secours" },
        ])}
        {renderRow([
          { icon: <MaterialIcons name="fire-extinguisher" size={24} color="#000" />, name: "Extincteur" },
          { icon: <MaterialIcons name="carbon-monoxide" size={24} color="#000" />, name: "Détecteur de monoxyde de carbone" },
        ])}
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  selectedEquipmentItem: {
    backgroundColor: '#e0f7fa', // Couleur de fond différente pour les éléments sélectionnés
  },
  iconWrapper: {
    marginRight: 10,
  },
  equipmentName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
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

export default EquipmentsPage;