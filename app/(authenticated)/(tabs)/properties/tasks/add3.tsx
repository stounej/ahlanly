import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PropertyDetails = ({onNext}) => {
  const [travelers, setTravelers] = useState(4);
  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  return (
    <View style={styles.container}>
      {/* Barre supérieure */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>Des questions ?</Text>
      </View>

      {/* Titre */}
      <Text style={styles.title}>Donnez les informations principales concernant votre logement</Text>
      <Text style={styles.subtitle}>
        Vous pourrez ajouter d'autres informations plus tard, comme les types de lit.
      </Text>

      {/* Section des compteurs */}
      <View style={styles.item}>
        <Text style={styles.label}>Voyageurs</Text>
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => decrement(setTravelers, travelers)}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{travelers}</Text>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => increment(setTravelers, travelers)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Chambres</Text>
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => decrement(setRooms, rooms)}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{rooms}</Text>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => increment(setRooms, rooms)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Lits</Text>
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => decrement(setBeds, beds)}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{beds}</Text>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => increment(setBeds, beds)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Salles de bain</Text>
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => decrement(setBathrooms, bathrooms)}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{bathrooms}</Text>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => increment(setBathrooms, bathrooms)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bouton suivant */}
      <TouchableOpacity style={styles.nextButton} onPress={()=> onNext()}>
        <Text style={styles.nextButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PropertyDetails;
