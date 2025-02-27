import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import usePropertyStore from '@/app/store/addProperty';
import { ScrollView } from 'react-native-gesture-handler';
import { propertiesService } from '@/services';

interface PhotosPageProps {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  isEdit: boolean
}

interface PhotoMenuButtonProps {
  onPress: () => void;
}

const PhotosPage: React.FC<PhotosPageProps> = ({ onPrev, onNext, isEdit, onClose }) => {
  const { setProperty, property } = usePropertyStore();
  const [photos, setPhotos] = useState([...property.property_images || []]);
  const { showActionSheetWithOptions } = useActionSheet();
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleMenuPress = (index: number) => {
    const options = ['Supprimer', 'Déplacer en avant', 'Déplacer en arrière', 'Annuler'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      tintColor: '#007BFF',
      textStyle: { fontFamily: 'System' },
    }, (selectedIndex) => {
      if (selectedIndex === 0) handleDeletePhoto(index);
      if (selectedIndex === 1) handleMovePhoto(index, 'forward');
      if (selectedIndex === 2) handleMovePhoto(index, 'backward');
    });
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 0.8, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleMovePhoto = (index : number, direction: any) => {
    const newPhotos = [...photos];
    const newIndex = direction === 'forward' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < photos.length) {
      [newPhotos[index], newPhotos[newIndex]] = [newPhotos[newIndex], newPhotos[index]];
      setPhotos(newPhotos);
    }
  };

  const handleAddPhoto = async () => {
    animateButton();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission requise', 'Veuillez autoriser l\'accès à votre galerie');

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        selectionLimit: 10 - photos.length,
      });

      if (!result.canceled) {
        setPhotos(prev => [...prev, ...result.assets.map(a => ({ image_url: a.uri, caption: '' }))]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les photos');
    }
  };

  const handleNextButton = () => {
    if (photos.length < 1) {
      return Alert.alert('Photos manquantes', 'Veuillez ajouter au moins 5 photos');
    }
    setProperty({ property_images: photos });
    onNext();
  };

  const renderMainPhoto = () => (
    <View style={styles.mainPhotoContainer}>
      <Image source={{ uri: photos[0].image_url }} style={styles.mainPhoto} />
      <PhotoMenuButton onPress={() => handleMenuPress(0)} />
    </View>
  );

  interface ImageItem {
    id: string;
    image_url: string;
  }
  
  function getImageChanges(previousImages: ImageItem[], currentImages: ImageItem[]) {
    // Création de Sets pour les IDs
    const previousIds = new Set(previousImages.map(img => img.id));
    const currentIds = new Set(currentImages.map(img => img.id));
  
    // Images ajoutées = présentes dans current mais pas dans previous
    const addedImages = currentImages.filter(img => !previousIds.has(img.id));
  
    // Images supprimées = présentes dans previous mais pas dans current
    const deletedImages = previousImages.filter(img => !currentIds.has(img.id));
  
    return { addedImages, deletedImages };
  }

  const renderGridPhotos = () => (
    <View style={styles.gridContainer}>
      {photos.slice(1).map((photo, index) => (
        <View key={`photo-${index + 1}`} style={styles.gridPhotoContainer}>
          <Image source={{ uri: photo.image_url }} style={styles.gridPhoto} />
          <PhotoMenuButton onPress={() => handleMenuPress(index + 1)} />
        </View>
      ))}
    </View>
  );

  const PhotoMenuButton: React.FC<PhotoMenuButtonProps> = ({ onPress }) => (
    <TouchableOpacity style={styles.photoMenuButton} onPress={onPress}>
      <Ionicons name="ellipsis-horizontal" size={20} color="white" />
    </TouchableOpacity>
  );

  const submitEdit   =  async ()  => {    
    const changes = getImageChanges(property.property_images,photos)
    await propertiesService.updateImages(property.id, changes)
    setProperty({ property_images: photos });
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>📷 Galerie photo</Text>
        <Text style={styles.subtitle}>Ajoutez au minimum 5 photos de qualité ({photos.length}/10)</Text>

        {photos.length > 0 ? (
          <>
            {renderMainPhoto()}
            {renderGridPhotos()}
          </>
        ) : (
          <TouchableOpacity 
            style={styles.emptyState} 
            onPress={handleAddPhoto}
            activeOpacity={0.7}
          >
            <Ionicons name="cloud-upload" size={60} color="#007BFF" />
            <Text style={styles.emptyStateTitle}>Ajouter des photos</Text>
            <Text style={styles.emptyStateText}>Formats supportés : JPG, PNG</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View >
        <TouchableOpacity 
          onPress={handleAddPhoto}
          style={[styles.addButtonInner, styles.addButton]}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.addButtonText}>Ajouter des photos</Text>
        </TouchableOpacity>
      </View>

     {!isEdit ?  <View style={styles.footer}>
        <FooterButton text="Retour" onPress={onPrev} secondary={true} />
        <FooterButton text="Suivant" onPress={handleNextButton} disabled={photos.length < 1} secondary={false} />
      </View>
      :
      <View style={styles.footer}>
      <FooterButton text="Fermer" onPress={onClose} secondary={true} />
      <FooterButton text="Enregistrer" onPress={() => submitEdit()} disabled={photos.length < 1} secondary={false} />
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
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 150,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  emptyState: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,123,255,0.05)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007BFF',
    borderStyle: 'dashed',
    padding: 20,
  },
  emptyStateTitle: {
    marginTop: 20,
    color: '#007BFF',
    fontSize: 20,
    fontWeight: '600',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
  mainPhotoContainer: {
    aspectRatio: 4/3,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  mainPhoto: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e9ecef',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridPhotoContainer: {
    width: '48%',
    aspectRatio: 4/3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    elevation: 1,
  },
  gridPhoto: {
    width: '100%',
    height: '100%',
  },
  photoMenuButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 8,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    bottom: 100
  },
  addButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  addButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
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
  disabledButton: {
    backgroundColor: '#ced4da',
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
});

export default PhotosPage;