import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import usePropertyStore from '@/app/store/addProperty';
import { Equipment, equipmentService } from '@/services';

interface EquipmentsPageProps {
  onPrev: () => void;
  onNext: () => void;
}

// Define the type for the icon components
const IconComponents = {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
};

// Define the type for the keys of the IconComponents
type IconLibrary = keyof typeof IconComponents;

const EquipmentsPage: React.FC<EquipmentsPageProps> = ({ onPrev, onNext }) => {
  const { setProperty, property } = usePropertyStore();
  const [selectedEquipments, setSelectedEquipments] = useState<Equipment[]>(property.equipment || []);
  const [animationValues, setAnimationValues] = useState<Record<string, Animated.Value>>({});
  const [equipmentByCategory, setEquipmentByCategory] = useState<Record<string, Equipment[]>>({});

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const equipmentList = await equipmentService.getAll();
        
        const grouped = groupEquipmentByCategory(equipmentList);
        setEquipmentByCategory(grouped);
      } catch (error) {
        console.error("Erreur de chargement des équipements:", error);
      }
    };

    loadEquipment();
  }, []);

  const groupEquipmentByCategory = (equipmentList: Equipment[]) => {
    return equipmentList.reduce((acc, equipment) => {
      const categoryName = equipment.equipment_categories?.name || 'Autre';
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(equipment);
      return acc;
    }, {} as Record<string, Equipment[]>);
  };

  const handleNextButton = () => {
    setProperty({ equipment: selectedEquipments });
    onNext();
  };

  const toggleEquipment = (equipment: Equipment) => {
    setSelectedEquipments(prev => {
      const newSelection = prev.includes(equipment)
        ? prev.filter(e => e.id !== equipment.id)
        : [...prev, equipment];
      handleAnimation(equipment.id);
      return newSelection;
    });
  };

  const handleAnimation = (equipmentId: string) => {
    if (!animationValues[equipmentId]) {
      setAnimationValues(prev => ({
        ...prev,
        [equipmentId]: new Animated.Value(1)
      }));
    }

    const animValue = animationValues[equipmentId] || new Animated.Value(1);
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();
  };

  const renderIcon = (iconLibrary: IconLibrary, iconName: string) => {
    const IconComponent = IconComponents[iconLibrary];

    return IconComponent ? (
      <IconComponent name={iconName} size={24} color="#2D3436" />
    ) : (
      <MaterialIcons name="error-outline" size={24} color="#e74c3c" />
    );
  };

  const chunkArray = (array: Equipment[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Équipements du logement</Text>
        <Text style={styles.subtitle}>
          Sélectionnez les équipements disponibles dans votre propriété
        </Text>

        {Object.entries(equipmentByCategory).map(([categoryName, equipments]) => (
          <View key={categoryName}>
            <Text style={styles.sectionTitle}>{categoryName}</Text>
            {chunkArray(equipments, 2).map((row, index) => (
              <View key={index} style={styles.row}>
                {row.map(equipment => (
                  <TouchableOpacity
                    key={equipment.id}
                    style={[
                      styles.equipmentCard,
                      selectedEquipments.includes(equipment) && styles.selectedEquipmentCard,
                    ]}
                    onPress={() => toggleEquipment(equipment)}
                  >
                    <Animated.View 
                      style={{ 
                        transform: [{ 
                          scale: animationValues[equipment.id]?.interpolate({
                            inputRange: [1, 1.2],
                            outputRange: [1, 1.2]
                          }) || 1 
                        }] 
                      }}
                    >
                      <View style={styles.iconContainer}>
                        {renderIcon(
                          equipment.icon ? (equipment.icon.split(':')[0] as IconLibrary) : 'Ionicons',
                          equipment.icon ? equipment.icon.split(':')[1] : 'default-icon-name'
                        )}
                      </View>
                    </Animated.View>
                    <Text style={styles.equipmentName}>{equipment.name}</Text>
                    {selectedEquipments.includes(equipment) && (
                      <Ionicons 
                        name="checkmark-circle" 
                        size={20} 
                        color="#007BFF" 
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onPrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextButton} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginVertical: 16,
    paddingLeft: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  equipmentCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedEquipmentCard: {
    borderWidth: 2,
    borderColor: '#007BFF',
    backgroundColor: '#F0F8FF',
  },
  iconContainer: {
    marginRight: 12,
  },
  equipmentName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  checkIcon: {
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  navButton: {
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  navButtonText: {
    color: '#007BFF',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EquipmentsPage;