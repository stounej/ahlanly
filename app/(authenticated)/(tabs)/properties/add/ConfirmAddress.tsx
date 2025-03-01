import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import usePropertyStore from '@/app/store/addProperty';
import { propertiesService } from '@/services';

interface ConfirmAddressProps {
  onNext: () => void;
  onPrev: () => void;
  onCloseEditor: () => void;
  isEditMode: boolean;
}

const ConfirmAddress: React.FC<ConfirmAddressProps> = ({ onNext, onPrev, onCloseEditor, isEditMode  }) => {
  const { setCurrentProperty, property } = usePropertyStore();
  const [address, setAddress] = useState({
    ...property
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleChange = (field: keyof typeof address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextButton = () => {
    setCurrentProperty({
      ...address,
    });
    onNext();
  };

  const submitEdit   =  async ()  => {   
    if (address.address !== property.address
      ||
      address.zip_code !== property.zip_code
      ||
      address.country !== property.country
      ||
      address.city !== property.city
      ||
      address.address_complement !== property.address_complement

    ) {
      setCurrentProperty({ address: address.address,
                          zip_code: address.zip_code,
                          country: address.country,
                          city: address.city,
                          address_complement: address.address_complement
       });
      //const newProperty = {...property, property_style: selectedOption}
      propertiesService.update_address(property.id, address).then(()=> {
        onCloseEditor('Vos modification sont enregistrées')
        
      })
      //setProperty(property.id, newProperty)
    }

  }

  const handleLocationDetect = async () => {
    try {
      setIsLocating(true);

      // Étape 1 : Obtenir les permissions de localisation
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', "L'accès à la localisation est nécessaire pour détecter votre position.");
        return;
      }

      // Étape 2 : Obtenir les coordonnées GPS actuelles
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;      

      // Étape 3 : Convertir les coordonnées en adresse via une API de géocodage inversé
      const addressFromGPS = await reverseGeocode(latitude, longitude);

      // Mettre à jour les champs d'adresse
      setAddress({
        ...address,
        address: addressFromGPS.address || '',
        zip_code: addressFromGPS.zip_code || '',
        city: addressFromGPS.city || '',
        country: addressFromGPS.country || 'France',
      });
    } catch (error) {
      console.error('Erreur lors de la détection de la position :', error);
      Alert.alert('Erreur', "Impossible de détecter votre position. Veuillez réessayer.");
    } finally {
      setIsLocating(false);
    }
  };

  /**
   * Effectue un géocodage inversé pour convertir les coordonnées en adresse.
   * @param {number} latitude - Latitude des coordonnées GPS.
   * @param {number} longitude - Longitude des coordonnées GPS.
   * @returns {Promise<{address: string, zip_code: string, city: string, country: string}>}
   */
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0', // Replace "YourAppName" with your app's name
          },
        }
      );
      const data = await response.json();

      // Extract address information from the response
      const addressData = data?.address || {};
      return {
        address: `${addressData.road || ''} ${addressData.house_number || ''}`.trim(),
        zip_code: addressData.postcode || '',
        city: addressData.city || addressData.town || addressData.village || '',
        country: addressData.country || 'France',
      };
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      throw new Error("Unable to retrieve the address from GPS coordinates.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirmation d'adresse</Text>
      </View>

      {/* Main Content with Scrollable Options */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Section Adresse */}
        <View style={styles.section}>
          <Text >Adresse principale</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Pays/Région</Text>
            <TextInput
              style={styles.input}
              value={address.country}
              onChangeText={(text) => handleChange('country', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Numéro et libellé de voie</Text>
            <TextInput
              style={styles.input}
              value={address.address}
              onChangeText={(text) => handleChange('address', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Informations complémentaires</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Code d'entrée, étage..."
              value={address.address_complement}
              onChangeText={(text) => handleChange('address_complement', text)}
              multiline
            />
          </View>
          <View >
            <View style={[styles.inputContainer, { flex: 2, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Code postal</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={address.zip_code}
                onChangeText={(text) => handleChange('zip_code', text)}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 5 }]}>
              <Text style={styles.inputLabel}>Ville</Text>
              <TextInput
                style={styles.input}
                value={address.city}
                onChangeText={(text) => handleChange('city', text)}
              />
            </View>
          </View>
        </View>

        {/* GPS Button */}
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={handleLocationDetect}
          disabled={isLocating}
        >
          <Ionicons
            name="location-sharp"
            size={20}
            color={isLocating ? '#666' : '#007BFF'}
          />
          <Text style={[styles.gpsButtonText, { color: isLocating ? '#666' : '#007BFF' }]}>
            {isLocating ? 'Détection en cours...' : 'Utiliser ma position actuelle'}
          </Text>
          {isLocating && <ActivityIndicator size="small" color="#666" style={styles.loader} />}
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      {!isEditMode ?  <View style={styles.footer}>
        <FooterButton text="Retour" onPress={onPrev} secondary={true} />
        <FooterButton text="Suivant" onPress={handleNextButton} disabled={!address} secondary={false} />
      </View>
      :
      <View style={styles.footer}>
      <FooterButton text="Fermer" onPress={() => onCloseEditor()} secondary={true} />
      <FooterButton text="Enregistrer" onPress={() => submitEdit()} disabled={!address} secondary={false} />
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
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ECECEC' },
  headerTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#1A1A1A' },
  scrollContainer: { flexGrow: 1, padding: 20, paddingBottom: 80 },
  section: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 20 },
  inputContainer: { marginBottom: 16 },
  inputLabel: { fontSize: 14, color: '#666', marginBottom: 8 },
  input: { height: 50, borderWidth: 1, borderColor: '#ECECEC', borderRadius: 8, paddingHorizontal: 16 },
  gpsButton: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 8, backgroundColor: 'white' },
  gpsButtonText: { fontSize: 16, marginLeft: 12, fontWeight: '500' },
  loader: { marginLeft: 8 },
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
  },  button: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  backButton: { backgroundColor: '#F8F9FA', marginRight: 10 },
  nextButton: { backgroundColor: '#007BFF', marginLeft: 10 }
});

export default ConfirmAddress;