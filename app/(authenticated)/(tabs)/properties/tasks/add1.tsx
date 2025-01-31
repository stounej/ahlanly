import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const apartments = [
  {
    id: '1',
    title: 'Appartement 1',
    photo: 'https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU', // URL de l'image
    tasks: [
      { id: '1', name: 'Nettoyage', completed: false },
      { id: '2', name: 'Réparation', completed: true },
    ],
  },
  {
    id: '2',
    title: 'Appartement 2',
    photo: 'https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU', // URL de l'image
    tasks: [
      { id: '1', name: 'Nettoyage', completed: false },
      { id: '3', name: 'Jardinage', completed: false },
    ],
  },
];

const ShowTasks = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [apartmentsData, setApartmentsData] = useState(apartments);

  const bottomSheetRef = useRef(null);

  const toggleTaskCompletion = (apartmentId, taskId) => {
    setApartmentsData((prevApartments) =>
      prevApartments.map((apartment) =>
        apartment.id === apartmentId
          ? {
              ...apartment,
              tasks: apartment.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : apartment
      )
    );
  };

  const getTaskApartments = (taskName) => {
    let taskApartments = [];
    apartmentsData.forEach((apartment) => {
      const task = apartment.tasks.find((t) => t.name === taskName);
      if (task) {
        taskApartments.push({
          ...apartment,
          task: task,
        });
      }
    });
    return taskApartments;
  };

  const renderApartmentItem = ({ item }) => (
      <View style={styles.buttonsContainer}>
        {/* Bouton 1 (Crayon d'édition) */}
        <TouchableOpacity style={[styles.editButton]}>
          <Icon name="pencil" size={20} color="#000" />
        </TouchableOpacity>

        {/* Bouton 2 (Appartement Item) */}
        <TouchableOpacity
          style={[styles.button, styles.apartmentItem]}
          onPress={() => toggleTaskCompletion(item.id, item.task.id)}
        >
          <Image source={{ uri: item.photo }} style={styles.apartmentPhoto} />
          <Text style={item.task.completed ? styles.completedTaskTitle : styles.taskTitle}>
            {item.title}
          </Text>
          <Icon
            name={item.task.completed ? 'check' : 'clock-o'}
            size={20}
            color={item.task.completed ? 'green' : 'orange'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
  );

  const renderTaskItem = ({ item }) => {
    const taskApartments = getTaskApartments(item.name);
    const allCompleted = taskApartments.every((apartment) => apartment.task.completed);

    return (
      <View style={styles.taskContainer}>
        <Text style={allCompleted ? styles.completedTaskTitle : styles.taskTitle}>{item.name}</Text>
        <FlatList
          data={taskApartments}
          renderItem={renderApartmentItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const getAllTasks = () => {
    let allTasks = [];
    apartmentsData.forEach((apartment) => {
      apartment.tasks.forEach((task) => {
        if (!allTasks.some((t) => t.name === task.name)) {
          allTasks.push(task);
        }
      });
    });
    return allTasks;
  };

  const handleSnapPress = (index) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  return (
      
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Toutes les tâches</Text>
          <FlatList
            data={getAllTasks()}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  
  sheetContent: {
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskContainer: {
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  completedTaskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: 'gray',
    marginBottom: 10,
  },
  apartmentItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderEndEndRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    width: '80%',

  },
  apartmentPhoto: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  task: {
    fontSize: 16,
    flex: 1,
    
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    
  },
  button: {
    height: 80,
    alignItems: 'center',
  },
  editButton: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    backgroundColor: '#f0f0f0',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10,
    marginLeft: 10,

  },
  
});

export default ShowTasks;