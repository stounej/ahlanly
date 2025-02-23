import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

interface Property {
  id: string;
  title: string;
  city: string;
  description: string;
  property_images: { image_url: string }[];
}

interface CustomPropertyPickerProps {
  properties: Property[];
  onValueChange: (value: string) => void;
  selectedValue: string;
}

const CustomPropertyPicker = ({
  properties,
  onValueChange,
  selectedValue,
}: CustomPropertyPickerProps) => {
  const [selectedProperty, setSelectedProperty] = useState<string>(selectedValue);

  // Gérer la sélection d'une propriété
  const handleSelect = (propertyId: string) => {
    setSelectedProperty(propertyId);
    onValueChange(propertyId);
  };

  return (
    <View style={styles.pickerContainer}>
      {/* Afficher la propriété sélectionnée */}
      <TouchableOpacity
        style={styles.selectedItem}
        onPress={() => console.log('Ouvrir le menu')}
      >
        <View style={styles.itemContent}>
          {properties.find((p) => p.id === selectedProperty)?.property_images?.[0]?.image_url && (
            <Image
              source={{
                uri: properties.find((p) => p.id === selectedProperty)?.property_images?.[0]?.image_url,
              }}
              style={styles.propertyImage}
            />
          )}
          <Text style={styles.selectedText}>
            {selectedProperty
              ? properties.find((p) => p.id === selectedProperty)?.title || 'Propriété inconnue'
              : 'Sélectionnez un bien'}
          </Text>
        </View>
        <FontAwesome5 name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {/* Menu déroulant personnalisé */}
      <View style={styles.menuContainer}>
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedProperty === item.id && styles.selectedMenuItem,
              ]}
              onPress={() => handleSelect(item.id)}
            >
              {/* Image de la propriété */}
              <Image
                source={{ uri: item.property_images?.[0]?.image_url }}
                style={styles.propertyImage}
              />

              {/* Détails de la propriété */}
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyTitle}>{item.title}</Text>
                <Text style={styles.propertyCity}>{item.city}</Text>
                <Text style={styles.propertyDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  propertyImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  menuContainer: {
    maxHeight: 200, // Limiter la hauteur du menu
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedMenuItem: {
    backgroundColor: '#f0f8ff', // Couleur de fond pour l'élément sélectionné
  },
  propertyDetails: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  propertyCity: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  propertyDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    maxWidth: '80%',
  },
});

export default CustomPropertyPicker;