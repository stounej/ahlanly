import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SectionList } from 'react-native';
import { BottomSheetSectionList, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { tasksService, TaskStatus } from '@/services/tasks';
import ManageTasks from '.';

type ChildRef = {
  handlePresentModalPress: () => void;
};

interface ShowTasksProps {
  categories: Array<{
    id: string;
    name: string;
    icon_library: string;
    icon_name: string;
    tasks: Array<{
      id: string;
      title: string;
      status: 'pending' | 'completed';
      due_date?: string;
      collaborator?: { full_name: string };
      properties?: Array<{ id: string; title: string; property_images: Array<{ image_url: string }> }>;
    }>;
  }>;
}

type IconLibrary = keyof typeof IconComponents;

const IconComponents = {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
};

const ShowTasks: React.FC<ShowTasksProps> = ({ categories, selectedCateg, propertyId }) => {

  const childRef = useRef<ChildRef>(null);
  const [categs, setCategs] = useState<any>(categories)

  const handleAddTask = () => {
    childRef.current?.handlePresentModalPress();
  };

  const toggleTaskCompletion = async (taskId: string, categoryId: string) => {
    try {      
      // Crée une copie profonde des catégories pour éviter les mutations directes
      const updatedCategories = categs.map((category:any) => {
        if (category.id !== categoryId) return category;
  
        // Met à jour les tâches de la catégorie concernée
        const updatedTasks = category.tasks.map((task: any) => {
          if (task.id !== taskId) return task;
          
          // Calcule le nouveau statut
          const newStatus = task.status === 'completed' ? 'pending' : 'completed';
          
          return {
            ...task,
            status: newStatus
          };
        });
  
        return {
          ...category,
          tasks: updatedTasks
        };
      });
  
      // Optimistic update avant la requête API
      setCategs(updatedCategories);
  
      // Trouve la tâche à jour pour l'envoi à l'API
      const targetCategory = updatedCategories.find((c:any) => c.id === categoryId);
      const targetTask = targetCategory?.tasks.find((t:any) => t.id === taskId);
  
      if (!targetTask) {
        throw new Error('Task not found');
      }
  
      // Envoi de la requête API avec le statut actualisé
      await tasksService.update(taskId, targetTask.status);
  
    } catch (error) {
      // Rollback en cas d'erreur
      console.error('Error updating task:', error);
      setCategs((prev:any) => [...prev]);
    }
  };

  const renderIcon = (iconLibrary: IconLibrary, iconName: string) => {
    const IconComponent = IconComponents[iconLibrary];
    return IconComponent ? (
      <IconComponent name={iconName} size={24} color="#2D3436" />
    ) : (
      <MaterialIcons name="error-outline" size={24} color="#e74c3c" />
    );
  };

  const sections = categs.map((category:any) => ({
    id: category.id,
    title: category.name,
    icon: category.icon_name,
    iconLibrary: category.icon_library as IconLibrary,
    data: category.tasks,
  })).filter((section:any) => section.data.length > 0);

  const renderTaskItem = ({ item, section }: { item: any, section:any }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <TouchableOpacity
         onPress={() => toggleTaskCompletion(item.id, section.id)}
          style={styles.statusButton}
        >
          <Icon
            name={item.status === 'completed' ? 'check-circle' : 'circle-thin'}
            size={24}
            color={item.status === 'completed' ? '#4CAF50' : '#ccc'}
          />
        </TouchableOpacity>

        <Text style={[styles.taskTitle, item.status === 'completed' && styles.completedTask]}>
          {item.title}
        </Text>

        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskFooter}>
        <View style={styles.footerItem}>
          <Icon name="user" size={14} color="#666" />
          <Text style={styles.footerText}>
            {item.collaborator?.full_name || 'Non assigné'}
          </Text>
        </View>

        {item.due_date && (
          <View style={styles.footerItem}>
            <Icon name="calendar" size={14} color="#666" />
            <Text style={styles.footerText}>
              {new Date(item.due_date).toLocaleDateString()}
            </Text>
          </View>
        )}

        {item.properties?.length > 0 && (
          <TouchableOpacity style={styles.footerItem}>
            <Icon name="building" size={14} color="#666" />
            <Text style={styles.footerText}>
              {item.properties.length} propriété(s)
            </Text>
          </TouchableOpacity>
        )}
              

      </View>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View style={styles.sectionHeader}>
      {renderIcon(section.iconLibrary, section.icon)}
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
       <BottomSheetSectionList
       scrollEnabled
       scrollToOverflowEnabled
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
    

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <ManageTasks ref={childRef} step={1} propertyId={propertyId}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
    color: '#2d3436',
  },
  taskCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusButton: {
    marginRight: 12,
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    color: '#2d3436',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editButton: {
    padding: 4,
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
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  addButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
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
});

export default ShowTasks;