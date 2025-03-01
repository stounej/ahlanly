import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import usePropertyStore from '@/app/store/addProperty';
import { propertiesService } from '@/services';

interface ChooseStyleProps {
  onNext: () => void;
  onPrev: () => void;
  onCloseEditor: () => void;
  isEditMode: boolean;
}

const ChooseStyle: React.FC<ChooseStyleProps> = ({ onNext, onPrev,onCloseEditor, isEditMode }) => {
  const {setCurrentProperty, property} = usePropertyStore()
  const [selectedOption, setSelectedOption] = useState(property?.property_style);
  const scaleValue = new Animated.Value(1);
  const borderColor = new Animated.Value(0);


  const handleNextButton = () => {
    setCurrentProperty({property_style: selectedOption})
    onNext()
  }

  const submitEdit   =  async ()  => {   
    if (selectedOption !== property.title) {
      setCurrentProperty({ property_style: selectedOption });
      //const newProperty = {...property, property_style: selectedOption}
      propertiesService.update_property_style(property.id, selectedOption).then(()=> {
        onCloseEditor('Vos modification sont enregistrées')
        
      })
      //setProperty(property.id, newProperty)
    }

  }

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.97,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const borderInterpolation = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e6e6e6', '#007BFF'],
  });

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const OptionCard = ({ icon, title, subtitle, optionName }: { 
    icon: React.ReactNode; 
    title: string; 
    subtitle: string; 
    optionName: string;
  }) => (
    <AnimatedTouchable
      style={[
        styles.option,
        {
          borderColor: selectedOption === optionName ? '#007BFF' : '#e6e6e6',
          backgroundColor: selectedOption === optionName ? '#F0F8FF' : 'white',
          transform: [{ scale: scaleValue }],
        },
      ]}
      onPress={() => handleSelectOption(optionName)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
      {selectedOption === optionName && (
        <MaterialIcons 
          name="check-circle" 
          size={24} 
          color="#007BFF" 
          style={styles.checkIcon} 
        />
      )}
    </AnimatedTouchable>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Type de logement</Text>
        <Text style={styles.subtitle}>
          Sélectionnez le type d'hébergement que vous proposez
        </Text>

        <OptionCard
          icon={<MaterialIcons name="home" size={24} color={selectedOption === 'entire_property' ? '#007BFF' : '#333'} />}
          title="Un logement entier"
          subtitle="Les voyageurs disposent du logement dans son intégralité."
          optionName="entire_property"
        />

        <OptionCard
          icon={<MaterialIcons name="door-front" size={24} color={selectedOption === 'private_room' ? '#007BFF' : '#333'} />}
          title="Une chambre"
          subtitle="Chambre privée avec accès aux espaces partagés"
          optionName="private_room"
        />

        <OptionCard
          icon={<FontAwesome5 name="users" size={20} color={selectedOption === 'hostel' ? '#007BFF' : '#333'} />}
          title="Chambre partagée"
          subtitle="Espace commun dans une auberge professionnelle"
          optionName="hostel" // change
        />
      </ScrollView>

     {/* Footer with Navigation Buttons */}
     {!isEditMode ?  <View style={styles.footer}>
        <FooterButton text="Retour" onPress={onPrev} secondary={true} />
        <FooterButton text="Suivant" onPress={handleNextButton} disabled={!selectedOption} secondary={false} />
      </View>
      :
      <View style={styles.footer}>
      <FooterButton text="Fermer" onPress={() => onCloseEditor()} secondary={true} />
      <FooterButton text="Enregistrer" onPress={() => submitEdit()} disabled={!selectedOption} secondary={false} />
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
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    position: 'relative',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1a1a1a',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6b6b6b',
    lineHeight: 20,
  },
  checkIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
  },
  navButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: '#cce0ff',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ChooseStyle;