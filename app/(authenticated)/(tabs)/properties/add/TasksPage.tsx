import { ScrollView } from 'react-native-gesture-handler';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import ManageTasks from '../tasks';
import usePropertyStore from '@/app/store/addProperty';
import { tasksService, Task } from '@/services';

type ChildRef = {
  handlePresentModalPress: () => void;
};

interface TasksPageProps {
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

const TasksPage: React.FC<TasksPageProps> = ({ onPrev, onNext }) => {
  const { setProperty, property } = usePropertyStore();
  const [selectedTasks, setSelectedTasks] = useState<Task[]>(property.tasks || []);
  const [tasksByCategory, setTasksByCategory] = useState<Record<string, Task[]>>({});
  const childRef = useRef<ChildRef>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await tasksService.getAll()      
      if (data) {
        const grouped = data.reduce((acc, task) => {
          const categoryName = task.task_categories?.name || 'Autre';
          if (!acc[categoryName]) acc[categoryName] = [];
          acc[categoryName].push(task as Task);
          return acc;
        }, {} as Record<string, Task[]>);
        
        setTasksByCategory(grouped);
      }
    };

    loadTasks();
  }, []);
  
  const handleAddTask = () => {
    if (childRef.current) {
      childRef.current.handlePresentModalPress();
    }
  };

  const handleNextButton = () => {
    setProperty({ tasks: selectedTasks });
    onNext();
  };

  const handleTaskToggle = (task: Task) => {
    setSelectedTasks(prev => 
      prev.includes(task) 
        ? prev.filter(t => t.id !== task.id) 
        : [...prev, task]
    );
  };

  const renderIcon = (iconLibrary: IconLibrary, iconName: string) => {
    const IconComponent = IconComponents[iconLibrary];

    return IconComponent ? (
      <IconComponent name={iconName} size={24} color="#007BFF" />
    ) : null;
  };

  const renderTaskSection = (categoryName: string, tasks: Task[]) => {
    const category = tasks[0]?.task_categories;
    
    return (
      <View style={styles.section} key={categoryName}>
        <View style={styles.sectionHeader}>
          {category && renderIcon(category.icon_library as IconLibrary, category.icon_name)}
          <Text style={styles.sectionTitle}>{categoryName}</Text>
        </View>
        {tasks.map(task => (
          <TouchableOpacity 
            key={task.id} 
            style={styles.taskItem} 
            onPress={() => handleTaskToggle(task)}
          >
            <Checkbox 
              value={selectedTasks.includes(task)} 
              onValueChange={() => handleTaskToggle(task)} 
            />
            <Text style={[styles.taskLabel, selectedTasks.includes(task) && styles.selectedTask]}>
              {task.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez les tâches initiales</Text>
      <Text style={styles.subtitle}>
        Indiquez les tâches à effectuer avant l'arrivée des clients.
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.entries(tasksByCategory).map(([categoryName, tasks]) => 
          renderTaskSection(categoryName, tasks)
        )}
        {/* Add Task Button */}
        <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
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
        <TouchableOpacity onPress={() => selectedTasks.length > 0 ? handleNextButton() : null} style={[styles.nextButton, selectedTasks.length === 0 && styles.disabledNextButton]}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
      <ManageTasks step={1} ref={childRef} hideAppartment={true} />
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
    paddingVertical: 10,
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