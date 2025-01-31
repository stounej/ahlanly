
import Checkbox from 'expo-checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

const TasksPage = ({ onPrev, onNext }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleTaskToggle = (task) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter(item => item !== task));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const renderTaskSection = (sectionTitle, tasks, IconComponent) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <IconComponent name='add' size={24} color="#007BFF" />
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </View>
      {tasks.map((task, index) => (
        <TouchableOpacity key={index} style={styles.taskItem} onPress={() => handleTaskToggle(task)}>
          <Checkbox value={selectedTasks.includes(task)} onValueChange={() => handleTaskToggle(task)} />
          <Text style={[styles.taskLabel, selectedTasks.includes(task) && styles.selectedTask]}>
            {task}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Sélectionnez les tâches initiales</Text>
      <Text style={styles.subtitle}>
        Indiquez les tâches à effectuer avant l'arrivée des clients.
      </Text>

      {/* Scrollable Content for Task Selection */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cleaning Section */}
        {renderTaskSection(
          'Nettoyage',
          [
            'Aspirer le sol',
            'Passer la serpillière',
            'Laver les draps',
            'Nettoyer la salle de bain',
          ],
          Ionicons
        )}

        {/* Maintenance Section */}
        {renderTaskSection(
          'Maintenance',
          [
            'Vérifier les équipements électriques',
            'Vérifier les appareils ménagers',
            'Vérifier les serrures et portes'
          ],
          MaterialIcons
        )}

        {/* Safety Section */}
        {renderTaskSection(
          'Sécurité',
          [
            'Vérifier les détecteurs de fumée',
          ],
          FontAwesome5
        )}

        {/* Hospitality Section */}
        {renderTaskSection(
          'Hospitalité',
          [
            'Préparer le kit de bienvenue',
            'Vérifier la disponibilité des fournitures',
            'Préparer les instructions pour les voyageurs'
          ],
          Feather
        )}


        {/* Add Task Button */}
        <TouchableOpacity style={styles.addTaskButton} onPress={() => console.log('Ajouter une tâche personnalisée')}>
          <Text style={styles.addTaskButtonText}>+ Ajouter une tâche personnalisée</Text>
        </TouchableOpacity>
        {/* Custom Rules Link */}
        <TouchableOpacity style={styles.customRulesLink} onPress={() => console.log('Personnaliser les règles de tâches')}>
          <Text style={styles.customRulesText}>Personnaliser les règles de tâches automatiques pour chaque réservation</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Footer with Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectedTasks.length > 0 ? onNext() : null} style={[styles.nextButton, selectedTasks.length === 0 && styles.disabledNextButton]}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 80 + 16, // Ajuster cet espace pour éviter que le footer masque le contenu
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  taskLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  selectedTask: {
    textDecorationLine: 'underline',
    color: '#007BFF',
  },
  customRulesLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  customRulesText: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  addTaskButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  addTaskButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff', // Pour éviter que le footer soit transparent lors du défilement
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  navButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  disabledNextButton: {
    backgroundColor: '#d3d3d3', // Couleur grise pour désactiver le bouton
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TasksPage;