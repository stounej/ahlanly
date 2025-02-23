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

interface ConfirmAddressProps {
  onNext: () => void;
  onPrev: () => void;
}

const ConfirmAddress: React.FC<ConfirmAddressProps> = ({ onNext, onPrev }) => {
  const { setProperty, property } = usePropertyStore();
  const [address, setAddress] = useState({
    ...property
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleChange = (field: keyof typeof address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextButton = () => {
    setProperty({
      ...address,
    });
    onNext();
  };

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
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onPrev}
          style={[styles.button, styles.backButton]}
        >
          <Text >Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextButton}
          style={[styles.button, styles.nextButton]}
        >
          <Text >Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: 'white' },
  button: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  backButton: { backgroundColor: '#F8F9FA', marginRight: 10 },
  nextButton: { backgroundColor: '#007BFF', marginLeft: 10 }
});

export default ConfirmAddress;