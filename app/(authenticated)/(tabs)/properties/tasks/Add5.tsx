import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = () => {
    // Logic to add a photo
    console.log("Add photo button clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajoutez quelques photos de votre appartement</Text>
      <Text style={styles.subtitle}>
        Pour commencer, vous aurez besoin de 5 photos. Vous pourrez en ajouter d'autres ou faire des modifications plus tard.
      </Text>

      <View style={styles.photosContainer}>
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image source={{ uri: photo.uri }} style={styles.photo} />
            </View>
          ))
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={handleAddPhoto}>
            <Ionicons name="camera" size={40} color="#007BFF" />
            <Text style={styles.addButtonText}>Ajouter des photos</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
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
  photosContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  photoWrapper: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButtonText: {
    marginTop: 10,
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "500",
  },
});

export default PhotosPage;