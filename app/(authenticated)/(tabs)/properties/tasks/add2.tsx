import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import * as Calendar from 'expo-calendar';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from '@/components/DateTimePicker';
import { tasksService, UsersService, TaskCategory, User, Property, propertiesService, Task } from '@/services';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

interface AddTaskScreenProps {
  hideAppartment?: boolean;
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

interface Task {
  id?: string;
  property_id?: string;
  category_id?: string;
  title?: string;
  description?: string;
  due_date?: Date;
  // Add other properties as needed
}

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ hideAppartment }) => {
  const [form, setForm] = useState<any>({});
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCollaboratorsModal, setShowCollaboratorsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, collabs, props] = await Promise.all([
          tasksService.getTaskCategories(),
          UsersService.getAll(),
          propertiesService.getJustProperties()
        ]);
        setCategories(cats);
        setCollaborators(collabs);
        setProperties(props);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCheckbox = (field: keyof Task) => {
    setForm((prev: Task | undefined) => ({
      ...prev || {},
      [field]: prev?.[field] ? false : true
    }));
  };

  const renderIcon = (iconLibrary: string, iconName: string) => {
    const IconComponent = {
      Ionicons,
      MaterialIcons,
      FontAwesome5,
      Feather
    }[iconLibrary as keyof typeof IconComponents];

    return IconComponent ? (
      <IconComponent 
        name={iconName} 
        size={20} 
        style={styles.categoryIcon}
      />
    ) : null;
  };

  const handleRecurrenceChange = (field: keyof Task, value: any) => {
    setForm((prev: any ) => ({
      ...prev,
      recurrence: { ...prev.recurrence, [field]: value }
    }));
  };

  const handleAddToCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    let defaultCalendarId;

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      
      if (calendars.length > 0) {
        const firstCalendar = calendars[0];
        if ('id' in firstCalendar) {
          defaultCalendarId = firstCalendar.id;
        } else {
          console.error('No valid calendar found');
          return;
        }
      } else {
        console.error('No calendars found');
        return;
      }
    } else {
      console.error('Calendar permission not granted');
      return;
    }

    const startDate = form?.due_date || new Date();
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const eventDetails = {
      title: form?.title || '',
      startDate,
      endDate,
      timeZone: 'Europe/Paris',
      location: form?.property_id ? `Appartement ${form?.property_id}` : undefined,
      notes: form?.description || '',
    };

    try {
      await Calendar.createEventAsync(defaultCalendarId.toString(), eventDetails);
      console.log('Événement ajouté au calendrier');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement au calendrier', error);
    }
  };

  const handleSubmit = async () => {
    const {   hasEquipment,
      assignCollaborator,
      addToCalendar,assignAppart, ...data} =  form
    const task = await tasksService.create(data as Task)
    // if (form.addToCalendar) {
    //   handleAddToCalendar();
    // }
  };

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }
  
  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource?.id,
      // source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    return newCalendarID;
  }

  // const handlePropertyChange = (propertyId: string) => {
  //   setForm({ ...form, property_id: propertyId });
  // };

  // const handleChangeDate = (newDate: Date) => {
  //   setForm({...form, due_date: newDate});
  // };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles?.title}>Nouvelle Tâche</Text>

        {/* Titre */}
        <View style={styles.section}>
          <Text style={styles.label}>Nom de la tâche</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Vérification des extincteurs"
            value={form?.title}
            onChangeText={text => setForm({...form, title: text})}
          />
        </View>

        {/* Bien concerné */}
        {!hideAppartment && (
          <View style={styles.section}>
            <Text style={styles.label}>Cette tâche concerne un bien ?</Text>

            <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[styles.switchButton, form?.assignAppart && styles.activeSwitch]}
              onPress={() => setForm({...form, assignAppart: true})}>
              <Text style={form?.assignAppart ? styles.activeSwitchText : styles.switchText}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.switchButton, !form?.assignAppart && styles.activeSwitch]}
              onPress={() => setForm({...form, assignAppart: false})}>
              <Text style={!form?.assignAppart ? styles.activeSwitchText : styles.switchText}>Non</Text>
            </TouchableOpacity>
          </View>
          
           {form?.assignAppart && ( <TouchableOpacity 
    style={styles.propertySelector}
    onPress={() => setShowPropertiesModal(true)}
  >
    {form.property_id ? (
      <View style={styles.selectedProperty}>
        <Image
          source={{ uri: properties.find(p => p.id === form.property_id)?.property_images[0]?.image_url }}
          style={styles.selectedPropertyImage}
        />
        <Text style={styles.selectedPropertyText}>
          {properties.find(p => p.id === form.property_id)?.title}
        </Text>
      </View>
    ) : (
      <Text style={styles.placeholderText}>Sélectionnez un bien</Text>
    )}
    <Icon name="chevron-down" size={16} color="#666" />
  </TouchableOpacity>)}
          </View>
        )}

        {/* Catégories */}
        <View style={styles.section}>
          <Text style={styles.label}>Catégorie</Text>
          <View style={styles.categoriesContainer}>
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                style={[
                  styles.categoryButton,
                  form.category_id === category.id && { 
                    backgroundColor: category.color + '20',
                    borderColor: category.color
                  }
                ]}
                onPress={() => setForm({...form, category_id: category.id})}>
                {renderIcon(category.icon_library, category.icon_name)}
                <Text style={[
                  styles.categoryText,
                  form.category_id === category.id && { color: category.color }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date et heure */}
        <View style={styles.section}>
          <Text style={styles.label}>Date et heure prévue</Text>
          <DatePicker onChangeDate={(newDate) => setForm({...form, due_date: newDate})} />
          <TouchableOpacity
            style={styles.calendarLink}
            onPress={() => setForm({...form, addToCalendar: true})}>
            <Text style={styles.linkText}>Ajouter cette tâche à votre calendrier ?</Text>
          </TouchableOpacity>
        </View>

        {/* Planification automatique */}
        <View style={styles.section}>
          <Text style={styles.label}>Planification automatique</Text>
          
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox('auto_after')}>
            <View style={[styles.checkbox, form?.auto_after && styles.checkedBox]}>
              {form?.auto_after && <Icon name="check" size={12} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>Ajouter automatiquement après chaque départ</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox('auto_before')}>
            <View style={[styles.checkbox, form?.auto_before && styles.checkedBox]}>
              {form?.auto_before && <Icon name="check" size={12} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>Ajouter automatiquement avant chaque arrivée</Text>
          </TouchableOpacity>
        </View>
        {/* Récurrence */}
        <View style={styles.section}>
          <Text style={styles.label}>Planification récurrente</Text>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => handleRecurrenceChange('active', !form.recurrence?.active)}>
            <View style={[styles.checkbox, form.recurrence?.active && styles.checkedBox]}>
              {form.recurrence?.active && <Icon name="check" size={12} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>Définir une récurrence</Text>
          </TouchableOpacity>

          {form.recurrence?.active && (
            <View style={styles.recurrenceOptions}>
              <Picker
                selectedValue={form.recurrence.frequency}
                onValueChange={value => handleRecurrenceChange('frequency', value)}
               >
                <Picker.Item label="Toutes les semaines" value="weekly" />
                <Picker.Item label="Tous les mois" value="monthly" />
                <Picker.Item label="Tous les ans" value="yearly" />
                <Picker.Item label="Tous les X jours" value="daily" />
              </Picker>

              {form.recurrence.frequency === 'daily' && (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Nombre de jours"
                  value={String(form.recurrence.interval)}
                  onChangeText={text => handleRecurrenceChange('interval', parseInt(text) || 1)}
                />
              )}
            </View>
          )}
        </View>

        {/* Collaborateurs */}
        <View style={styles.section}>
          <Text style={styles.label}>Affecter à un collaborateur</Text>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[styles.switchButton, form.assignCollaborator && styles.activeSwitch]}
              onPress={() => setForm({...form, assignCollaborator: true})}>
              <Text style={form.assignCollaborator ? styles.activeSwitchText : styles.switchText}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.switchButton, !form.assignCollaborator && styles.activeSwitch]}
              onPress={() => setForm({...form, assignCollaborator: false})}>
              <Text style={!form.assignCollaborator ? styles.activeSwitchText : styles.switchText}>Non</Text>
            </TouchableOpacity>
          </View>

          {form.assignCollaborator && (
  <View>
    <TouchableOpacity 
      style={styles.selectorButton}
      onPress={() => setShowCollaboratorsModal(true)}
    >
      {form.user_id ? (
        <View style={styles.selectedCollaborator}>
          {collaborators.find(c => c.user_id === form.user_id)?.avatar ? (
            <Image
              source={{ uri: collaborators.find(c => c.id === form.user_id)?.avatar }}
              style={styles.selectedAvatar}
            />
          ) : (
            <View style={[styles.selectedAvatar, styles.emptyAvatar]}>
              <Text style={styles.avatarText}>
                {collaborators.find(c => c.user_id === form.user_id)?.full_name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          )}
          <Text style={styles.selectedName}>
            {collaborators.find(c => c.user_id === form.user_id)?.full_name}
          </Text>
          
        </View>
      ) : (
        <Text style={styles.selectorPlaceholder}>Sélectionnez un collaborateur</Text>
      )}
      <Icon name="chevron-down" size={16} color="#666" />
    </TouchableOpacity>
  </View>
)}
        </View>

        <Modal
    visible={showPropertiesModal}
    animationType="slide"
    onRequestClose={() => setShowPropertiesModal(false)}
  >
    <View style={styles.modalContainer}>
      <FlatList
        data={properties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.propertyListItem}
            onPress={() => {
              setForm({...form, property_id: item.id});
              setShowPropertiesModal(false);
            }}
          >
            <Image
              source={{ uri: item.property_images[0]?.image_url }}
              style={styles.propertyListImage}
            />
            <View style={styles.propertyListInfo}>
              <Text style={styles.propertyListTitle}>{item?.title}</Text>
              <Text style={styles.propertyListLocation}>{item.city}</Text>
              <Text 
                style={styles.propertyListDescription}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  </Modal>
  <Modal
  visible={showCollaboratorsModal}
  animationType="slide"
  onRequestClose={() => setShowCollaboratorsModal(false)}
>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Sélectionner un collaborateur</Text>
    <FlatList
      data={collaborators}
      keyExtractor={item => item.user_id}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.collaboratorListItem}
          onPress={() => {
            setForm({...form, user_id: item.user_id});
            setShowCollaboratorsModal(false);
          }}
        >
          {item.avatar ? (
            <Image
              source={{ uri: item.avatar }}
              style={styles.collaboratorAvatar}
            />
          ) : (
            <View style={[styles.collaboratorAvatar, styles.emptyAvatar]}>
              <Text style={styles.avatarText}>
                {item.full_name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          )}
          <Text style={styles.collaboratorName}>{item.full_name}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
</Modal>
      </ScrollView>

      <View style={styles.fixedFooter}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Enregistrer la tâche</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  selectedCollaborator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedName: {
    fontSize: 16,
    color: '#333',
  },
  selectorPlaceholder: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  collaboratorListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  collaboratorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  emptyAvatar: {
    backgroundColor: '#2a7fde',
    justifyContent: 'center' 
    
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf:'center',
     },
  collaboratorName: {
    fontSize: 16,
    color: '#333',
  },
  propertySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  selectedProperty: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedPropertyImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  selectedPropertyText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
  propertyListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  propertyListImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  propertyListInfo: {
    flex: 1,
  },
  propertyListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  propertyListLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  propertyListDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#444',
  },
  categoryIcon: {
    width: 20,
    textAlign: 'center',
  },
  recurrenceOptions: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a7fde',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitIcon: {
    marginLeft: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginVertical: 20,
    textAlign: 'center',
  },
  // section: {
  //   backgroundColor: 'white',
  //   borderRadius: 12,
  //   padding: 16,
  //   marginBottom: 16,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  // },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  themeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedTheme: {
    backgroundColor: '#2a7fde',
  },
  themeText: {
    color: '#666',
  },
  selectedThemeText: {
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  switchButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  activeSwitch: {
    backgroundColor: '#2a7fde',
  },
  switchText: {
    color: '#666',
  },
  activeSwitchText: {
    color: 'white',
  },
  calendarLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
  },
  linkText: {
    color: '#2a7fde',
    marginLeft: 8,
    fontSize: 14,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkedBox: {
    backgroundColor: '#2a7fde',
    borderColor: '#2a7fde'
  },
  checkboxLabel: {
    flex: 1,
    color: '#444',
    fontSize: 14,
    lineHeight: 20
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  // submitButton: {
  //   backgroundColor: '#2a7fde',
  //   borderRadius: 8,
  //   padding: 16,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  //   marginBottom: 5
  // },
});

export default AddTaskScreen;