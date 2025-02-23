import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface ImportOptionsScreenProps {
  setStep: (step: number) => void; // Define the type for setStep
}

const ImportOptionsScreen: React.FC<ImportOptionsScreenProps> = ({ setStep }) => {
  const importOptions = [
    {
      id: 'manual',
      title: "Création Manuelle",
      icon: <Feather name="edit-3" size={28} color="#2A7FDE" />,
      description: "Ajoutez votre bien étape par étape"
    },
    {
      id: 'ai',
      title: "Assistant IA",
      icon: <MaterialIcons name="smart-toy" size={28} color="#2A7FDE" />,
      description: "Décrivez votre bien par voix ou chat"
    },
    {
      id: 'platforms',
      title: "Import depuis Plateforme",
      icon: <FontAwesome5 name="airbnb" size={28} color="#2A7FDE" />,
      description: "Airbnb, Booking.com, Vrbo"
    },
    {
      id: 'csv',
      title: "Import Fichier CSV",
      icon: <Feather name="file-text" size={28} color="#2A7FDE" />,
      description: "Importez depuis un tableur"
    }
  ];

  const handleSelect = (optionId: string) => {
    setStep(0);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Ajouter un nouveau bien</Text>
        <Text style={styles.subTitle}>Choisissez votre méthode d'importation</Text>

        {importOptions.map((option) => (
          <TouchableOpacity 
            key={option.id}
            style={styles.card}
            onPress={() => handleSelect(option.id)}
            activeOpacity={0.9}
          >
            <View style={styles.iconContainer}>
              {option.icon}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{option.title}</Text>
              <Text style={styles.cardDescription}>{option.description}</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: '#E8F2FF',
    borderRadius: 12,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ImportOptionsScreen;