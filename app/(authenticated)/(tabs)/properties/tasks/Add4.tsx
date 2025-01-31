import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons, Entypo, Feather } from "@expo/vector-icons";

const EquipmentsPage = () => {
  const [selectedEquipments, setSelectedEquipments] = useState([]);

  const toggleEquipment = (equipment) => {
    if (selectedEquipments.includes(equipment)) {
      setSelectedEquipments(selectedEquipments.filter((item) => item !== equipment));
    } else {
      setSelectedEquipments([...selectedEquipments, equipment]);
    }
  };

  const renderEquipment = (icon, name) => (
    <TouchableOpacity
      key={name}
      style={styles.equipmentItem}
      onPress={() => toggleEquipment(name)}
    >
      <View style={styles.iconWrapper}>{icon}</View>
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Indiquez aux voyageurs quels sont les équipements de votre logement</Text>
      <Text style={styles.subtitle}>
        Vous pourrez ajouter des équipements une fois votre annonce publiée.
      </Text>

      <Text style={styles.sectionTitle}>Qu'en est-il de ces équipements préférés des voyageurs ?</Text>
      {renderRow([
        { icon: <Ionicons name="wifi" size={24} color="#007BFF" />, name: "Wifi" },
        { icon: <Feather name="tv" size={24} color="#007BFF" />, name: "Télévision" },
      ])}
      {renderRow([
        { icon: <MaterialIcons name="kitchen" size={24} color="#007BFF" />, name: "Cuisine" },
        { icon: <FontAwesome5 name="soap" size={24} color="#007BFF" />, name: "Lave-linge" },
      ])}
      {renderRow([
        { icon: <MaterialIcons name="local-parking" size={24} color="#007BFF" />, name: "Parking gratuit sur place" },
        { icon: <MaterialIcons name="local-parking" size={24} color="#007BFF" />, name: "Parking payant sur place" },
      ])}
      {renderRow([
        { icon: <Ionicons name="snow" size={24} color="#007BFF" />, name: "Climatisation" },
        { icon: <Ionicons name="desktop" size={24} color="#007BFF" />, name: "Espace de travail dédié" },
      ])}

      <Text style={styles.sectionTitle}>Possédez-vous des équipements hors du commun ?</Text>
      {renderRow([
        { icon: <MaterialIcons name="pool" size={24} color="#007BFF" />, name: "Piscine" },
        { icon: <FontAwesome5 name="hot-tub" size={24} color="#007BFF" />, name: "Jacuzzi" },
      ])}
      {renderRow([
        { icon: <Entypo name="tree" size={24} color="#007BFF" />, name: "Patio" },
        { icon: <MaterialIcons name="outdoor-grill" size={24} color="#007BFF" />, name: "Barbecue" },
      ])}
      {renderRow([
        { icon: <MaterialIcons name="restaurant" size={24} color="#007BFF" />, name: "Espace repas en plein air" },
        { icon: <FontAwesome5 name="fire" size={24} color="#007BFF" />, name: "Brasero" },
      ])}
      {renderRow([
        { icon: <Ionicons name="game-controller" size={24} color="#007BFF" />, name: "Billard" },
        { icon: <FontAwesome5 name="fireplace" size={24} color="#007BFF" />, name: "Cheminée" },
      ])}
      {renderRow([
        { icon: <FontAwesome5 name="piano" size={24} color="#007BFF" />, name: "Piano" },
        { icon: <MaterialIcons name="fitness-center" size={24} color="#007BFF" />, name: "Appareils de fitness" },
      ])}
      {renderRow([
        { icon: <MaterialIcons name="waves" size={24} color="#007BFF" />, name: "Accès au lac" },
        { icon: <Ionicons name="water" size={24} color="#007BFF" />, name: "Accès à la plage" },
      ])}

      <Text style={styles.sectionTitle}>Possédez-vous ces équipements de sécurité ?</Text>
      {renderRow([
        { icon: <MaterialIcons name="smoke-free" size={24} color="#007BFF" />, name: "Détecteur de fumée" },
        { icon: <FontAwesome5 name="first-aid" size={24} color="#007BFF" />, name: "Kit de premiers secours" },
      ])}
      {renderRow([
        { icon: <MaterialIcons name="fire-extinguisher" size={24} color="#007BFF" />, name: "Extincteur" },
        { icon: <MaterialIcons name="carbon-monoxide" size={24} color="#007BFF" />, name: "Détecteur de monoxyde de carbone" },
      ])}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  equipmentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  iconWrapper: {
    marginRight: 10,
  },
  equipmentName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default EquipmentsPage;
