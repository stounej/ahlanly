import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomSheetSectionList, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Task, tasksService } from '@/services';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ManageTasks from '.';
import { TaskStatus } from '@/services/tasks';

type ChildRef = {
  handlePresentModalPress: () => void;
};

interface ShowTasksProps {
  selectedCateg?: { id: string; name: string };
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

const ShowTasks: React.FC<ShowTasksProps> = ({ selectedCateg }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { dismissAll } = useBottomSheetModal();
  const childRef = useRef<ChildRef>(null);

  const handlePress = () => {
    childRef.current?.handlePresentModalPress();
  };

  const fetchTasks = useCallback(async () => {
    try {
      const tasks = await tasksService.getAll();
      setTasks(tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      // Ensure the new status matches the TaskStatus type
      const newStatus: TaskStatus = task.status === TaskStatus.COMPLETED ? TaskStatus.PENDING : TaskStatus.COMPLETED;

      await tasksService.update(taskId, newStatus);
      setTasks(prev => 
        prev.map(t => 
          t.id === taskId ? { ...t, status: newStatus as TaskStatus } : t
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const groupedTasks = tasks?.reduce((acc, task) => {
    try {
      const category = task.task_categories || {};
      const categoryId = category.id || 'uncategorized';
      const categoryName = category.name || 'Non catégorisé';
      const categoryColor =  '#cccccc';      
      if (!acc[categoryId]) {
        acc[categoryId] = {
          title: categoryName,
          color: categoryColor,
          icon: category.icon_name || 'question-circle',
          iconLibrary: category.icon_library || 'FontAwesome',
          data: [],
        };
      }
      
      if (task.properties) {
        acc[categoryId].data.push(task);
      }
      
      return acc;
    } catch (e) {
      console.error('Error processing task:', task, e);
      return acc;
    }
  }, {} as { [key: string]: { 
    title: string; 
    color: string; 
    icon: string; 
    iconLibrary: string; 
    data: Task[] 
  }}) || {};
  

  const sections = Object.values(groupedTasks)
    .filter(section => section.data.length > 0)
    .map(section => ({
      ...section,
      data: section.data || [],
    }))
    .sort((a, b) => {
      if (a?.title === selectedCateg?.name) return -1;
      if (b?.title === selectedCateg?.name) return 1;
      return a?.title.localeCompare(b?.title);
    });
    ;

  const handleEditTask = () => {
    
  }
  const renderIcon = (iconLibrary: IconLibrary, iconName: string) => {
    const IconComponent = IconComponents[iconLibrary];

    return IconComponent ? (
      <IconComponent name={iconName} size={24} color="#2D3436" />
    ) : (
      <MaterialIcons name="error-outline" size={24} color="#e74c3c" />
    );
  };


  const renderTaskItem = ({ item }: { item: Task }) => {
    
    return (
      <View style={styles.taskCard}>
        {/* Bouton d'édition */}
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditTask()}
        >
          <Icon name="pencil" size={16} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.taskContent}
          onPress={() => toggleTaskCompletion(item.id)}
        >
          {/* En-tête de la tâche */}
          <View style={styles.taskHeader}>
            <Text style={[styles.taskTitle, item.status === 'completed' && styles.completedTask]}>
              {item?.title}
            </Text>
          </View>

          {/* Propriété associée */}
          {item.properties && (
            <View style={styles.propertyContainer}>
              {item.properties.property_images?.[0]?.image_url && (
                <Image 
                  source={{ uri: item.properties.property_images[0].image_url }} 
                  style={styles.propertyImage} 
                />
              )}
              <Text style={styles.propertyTitle}>{item.properties?.title}</Text>
            </View>
          )}

          {/* Collaborateurs et date */}
          <View style={styles.taskFooter}>
            <View style={styles.collaboratorsContainer}>
              <Icon name="user" size={14} color="#666" />
              <Text style={styles.collaboratorsText}>
                {'Non assigné'}
              </Text>
            </View>
            
            {item.due_date && (
              <View style={styles.dateContainer}>
                <Icon name="calendar" size={14} color="#666" />
                <Text style={styles.dueDateText}>
                  {new Date(item.due_date).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>

          {/* Statut */}
          <Icon
            name={item.status === 'completed' ? 'check-circle' : 'circle-thin'}
            size={24}
            color={item.status === 'completed' ? '#4CAF50' : '#ccc'}
            style={styles.statusIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: typeof sections[0] }) => (
    <View style={[styles.sectionHeader, { backgroundColor: section.color + '20' }]}>
      {renderIcon(section.iconLibrary as IconLibrary, section.icon)}
      <Text style={[styles.sectionTitle, { color: section.color }]}>
        {section?.title}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Icon name="spinner" size={24} color="#666" />
        <Text style={styles.loadingText}>Chargement des tâches...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Bouton de fermeture */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => dismissAll()}
      >
        <Icon name="times" size={30} color="grey" />
       
      </TouchableOpacity>

      {/* Liste des tâches */}
      <BottomSheetSectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="check-circle" size={48} color="#e0e0e0" />
            <Text style={styles.emptyText}>Aucune tâche à afficher</Text>
          </View>
        }
      />

      {/* Bouton d'ajout fixé */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handlePress()}
      >
        <Icon name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Nouvelle tâche</Text>
      </TouchableOpacity>
      <ManageTasks ref={childRef} step={1}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 38,
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  taskContent: {
    padding: 16,
  },
  editButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
    padding: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 10
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 20,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  propertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  propertyTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  collaboratorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collaboratorsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  statusIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 35,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  closeButton: {
    position: 'absolute',
    left: 5,
    top: 2,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#888',
    marginTop: 16,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
});

export default ShowTasks;