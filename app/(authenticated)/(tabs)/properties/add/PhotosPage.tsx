import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import usePropertyStore from '@/app/store/addProperty';
import { ScrollView } from 'react-native-gesture-handler';

import { propertiesService } from '@/services';

interface PhotosEditorProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
  onCloseEditor: (message?: string) => void;
  isEditMode: boolean;
}

interface PhotoActionsMenuProps {
  onMenuAction: () => void;
}

const PhotosEditor: React.FC<PhotosEditorProps> = ({ 
  onPreviousStep, 
  onNextStep, 
  isEditMode, 
  onCloseEditor 
}) => {
  const { setCurrentProperty, property } = usePropertyStore();
  const [currentPhotos, setCurrentPhotos] = useState([...property.property_images || []]);
  const { showActionSheetWithOptions } = useActionSheet();

  const PHOTO_ACTIONS = {
    DELETE: 'Supprimer',
    MOVE_FORWARD: 'Déplacer en avant',
    MOVE_BACKWARD: 'Déplacer en arrière',
    CANCEL: 'Annuler'
  };

  
 


  const showPhotoContextMenu = (photoIndex: number) => {
    const actionOptions = [
      PHOTO_ACTIONS.DELETE, 
      PHOTO_ACTIONS.MOVE_FORWARD, 
      PHOTO_ACTIONS.MOVE_BACKWARD, 
      PHOTO_ACTIONS.CANCEL
    ];
    
    showActionSheetWithOptions({
      options: actionOptions,
      cancelButtonIndex: 3,
      destructiveButtonIndex: 0,
      tintColor: '#007BFF',
    }, (selectedIndex) => {
      switch(selectedIndex) {
        case 0: 
          removePhoto(photoIndex);
          break;
        case 1: 
          repositionPhoto(photoIndex, 'forward');
          break;
        case 2: 
          repositionPhoto(photoIndex, 'backward');
          break;
      }
    });
  };

  const removePhoto = (targetIndex: number) => {
    setCurrentPhotos(previousPhotos => 
      previousPhotos.filter((_, index) => index !== targetIndex)
    );
  };

  const repositionPhoto = (currentIndex: number, direction: 'forward' | 'backward') => {
    const newPosition = direction === 'forward' ? currentIndex - 1 : currentIndex + 1;
    
    setCurrentPhotos(previousPhotos => {
      const updatedPhotos = [...previousPhotos];
      if (newPosition >= 0 && newPosition < updatedPhotos.length) {
        [updatedPhotos[currentIndex], updatedPhotos[newPosition]] = 
          [updatedPhotos[newPosition], updatedPhotos[currentIndex]];
      }
      return updatedPhotos;
    });
  };

  const requestMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Autorisez l\'accès à votre bibliothèque média');
      return false;
    }
    return true;
  };

  const openImagePicker = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        selectionLimit: 10 - currentPhotos.length,
      });

      if (!pickerResult.canceled) {
        const newPhotos = pickerResult.assets.map(asset => ({
          image_url: asset.uri, 
          caption: ''
        }));
        setCurrentPhotos(prev => [...prev, ...newPhotos]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Échec du chargement des images');
    }
  };

  const handleAddPhotos = async () => {
    const hasPermission = await requestMediaPermissions();
    if (hasPermission) {
      await openImagePicker();
    }
  };

  const validatePhotoSelection = () => {
    if (currentPhotos.length < 5) {
      Alert.alert('Photos insuffisantes', 'Sélectionnez au moins 5 photos');
      return false;
    }
    return true;
  };

  const proceedToNextStep = () => {
    if (!validatePhotoSelection()) return;
    setCurrentProperty({ property_images: currentPhotos });
    onNextStep();
  };

  const calculateImageChanges = (originalImages: any[], modifiedImages: any[]) => {
    const originalIds = new Set(originalImages.map(img => img.id));
    const modifiedIds = new Set(modifiedImages.map(img => img.id));

    return {
      newImages: modifiedImages.filter(img => !originalIds.has(img.id)),
      removedImages: originalImages.filter(img => !modifiedIds.has(img.id))
    };
  };

  const savePhotoChanges = async () => {    
    const imageChanges = calculateImageChanges(
      property.property_images, 
      currentPhotos
    );
    
    if (imageChanges.newImages.length > 0 || imageChanges.removedImages.length > 0) {
      try {
        await propertiesService.updateImages(property.id, imageChanges);
        setCurrentProperty({ property_images: currentPhotos });
        onCloseEditor('Modifications des photos enregistrées');
      } catch (error) {
        Alert.alert('Erreur', 'Échec de la mise à jour des photos');
      }
    }
  };

  const renderPrimaryPhoto = useCallback(() => (
    <View style={styles.mainPhotoContainer}>
      <Image 
        source={{ uri: currentPhotos[0].image_url }} 
        style={styles.mainPhoto} 
      />
      <PhotoActionsButton onMenuAction={() => showPhotoContextMenu(0)} />
    </View>
  ), [currentPhotos]);

  const renderPhotoGrid = useCallback(() => (
    <View style={styles.gridContainer}>
      {currentPhotos.slice(1).map((photo, index) => (
        <View key={`grid-photo-${index}`} style={styles.gridPhotoContainer}>
          <Image source={{ uri: photo.image_url }} style={styles.gridPhoto} />
          <PhotoActionsButton onMenuAction={() => showPhotoContextMenu(index + 1)} />
        </View>
      ))}
    </View>
  ), [currentPhotos]);

  const PhotoActionsButton: React.FC<PhotoActionsMenuProps> = React.memo(({ onMenuAction }) => (
    <TouchableOpacity 
      style={styles.photoMenuButton} 
      onPress={onMenuAction}
    >
      <Ionicons name="ellipsis-horizontal" size={20} color="white" />
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>📷 Galerie photo</Text>
        <Text style={styles.subtitle}>
          {`Ajoutez au minimum 5 photos de qualité (${currentPhotos.length}/10)`}
        </Text>

        {currentPhotos.length > 0 ? (
          <>
            {renderPrimaryPhoto()}
            {renderPhotoGrid()}
          </>
        ) : (
          <PhotoUploadPrompt onPress={handleAddPhotos} />
        )}
      </ScrollView>

      <PhotoUploadButton onPress={handleAddPhotos} />

      {!isEditMode ? (
        <NavigationFooter
          backButtonText="Retour"
          forwardButtonText="Suivant"
          onBack={onPreviousStep}
          onForward={proceedToNextStep}
          isForwardDisabled={currentPhotos.length < 1}
        />
      ) : (
        <NavigationFooter
          backButtonText="Fermer"
          forwardButtonText="Enregistrer"
          onBack={() => onCloseEditor()}
          onForward={savePhotoChanges}
          isForwardDisabled={currentPhotos.length < 1}
        />
      )}
    </View>
  );
};

const PhotoUploadPrompt: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity 
    style={styles.emptyState} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons name="cloud-upload" size={60} color="#007BFF" />
    <Text style={styles.emptyStateTitle}>Ajouter des photos</Text>
    <Text style={styles.emptyStateText}>Formats supportés : JPG, PNG</Text>
  </TouchableOpacity>
);

const PhotoUploadButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={styles.addButton}
    activeOpacity={0.7}
  >
    <Ionicons name="add-circle" size={24} color="white" />
  </TouchableOpacity>
);

const NavigationFooter: React.FC<{
  backButtonText: string;
  forwardButtonText: string;
  onBack: () => void;
  onForward: () => void;
  isForwardDisabled?: boolean;
}> = ({ backButtonText, forwardButtonText, onBack, onForward, isForwardDisabled }) => (
  <View style={styles.footer}>
    <FooterActionButton 
      text={backButtonText} 
      onPress={onBack} 
      isSecondary={true} 
    />
    <FooterActionButton 
      text={forwardButtonText} 
      onPress={onForward} 
      isSecondary={false}
      isDisabled={isForwardDisabled}
    />
  </View>
);

const FooterActionButton: React.FC<{
  text: string;
  onPress: () => void;
  isSecondary?: boolean;
  isDisabled?: boolean;
}> = ({ text, onPress, isSecondary, isDisabled }) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[
      styles.footerButton, 
      isSecondary && styles.secondaryButton,
      isDisabled && styles.disabledButton
    ]}
    disabled={isDisabled}
  >
    <Text style={[
      styles.footerButtonText, 
      isSecondary && styles.secondaryButtonText
    ]}>
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
    width: '100%'
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
    paddingHorizontal: 6,
  },
  addButton: {
    width: 70,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    bottom: 80,
    borderRadius: 15,
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

export default PhotosEditor;