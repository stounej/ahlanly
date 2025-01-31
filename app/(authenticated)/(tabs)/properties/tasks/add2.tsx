import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const AddTaskScreen = () => {
  const [apartment, setApartment] = useState('');
  const [equipment, setEquipment] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low');

  const apartments = [
    { id: '1', name: 'Appartement 1' },
    { id: '2', name: 'Appartement 2' },
    // Ajoutez d'autres appartements ici
  ];

  const equipments = [
    { id: '1', name: 'Réfrigérateur' },
    { id: '2', name: 'Machine à laver' },
    // Ajoutez d'autres équipements ici
  ];

  const handleAddTask = () => {
    console.log('Tâche ajoutée:', {
      apartment,
      equipment,
      description,
      deadline,
      status,
      priority,
    });
    // Ici, vous pouvez appeler une fonction pour envoyer les données au serveur ou les stocker localement
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une tâche</Text>

      {/* Sélection de l'appartement */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Appartement:</Text>
        <Picker
          selectedValue={apartment}
          onValueChange={(itemValue) => setApartment(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Sélectionnez un appartement" value="" />
          {apartments.map((apartment) => (
            <Picker.Item key={apartment.id} label={apartment.name} value={apartment.id} />
          ))}
        </Picker>
      </View>

      {/* Sélection de l'équipement (optionnel) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Équipement:</Text>
        <Picker
          selectedValue={equipment}
          onValueChange={(itemValue) => setEquipment(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Aucun" value="" />
          {equipments.map((equipment) => (
            <Picker.Item key={equipment.id} label={equipment.name} value={equipment.id} />
          ))}
        </Picker>
      </View>

      {/* Description de la tâche */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Entrez la description de la tâche"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Date limite */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date limite:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.dateInput}>
            <Text>{deadline.toLocaleDateString()}</Text>
            <Icon name="calendar" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (selectedDate) {
                setDeadline(selectedDate);
              }
            }}
          />
        )}
      </View>

      {/* Statut de la tâche */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Statut:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="En attente" value="Pending" />
          <Picker.Item label="En cours" value="In Progress" />
          <Picker.Item label="Terminé" value="Completed" />
        </Picker>
      </View>

      {/* Priorité de la tâche */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Priorité:</Text>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Faible" value="Low" />
          <Picker.Item label="Moyenne" value="Medium" />
          <Picker.Item label="Haute" value="High" />
        </Picker>
      </View>

      {/* Bouton pour ajouter la tâche */}
      <Button title="Ajouter la tâche" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default AddTaskScreen;