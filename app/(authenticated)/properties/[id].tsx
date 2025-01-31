import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { propertiesService, Property, Equipment, Task, BookingSetting, HouseRule } from '@/services';
import { useLocalSearchParams } from 'expo-router';



const AppartementDetails = () => {
  const params = useLocalSearchParams();
  const [appartement, setAppartment] = useState<Property>({} as Property);

  useEffect(() => {
    const fetchProperty = async () => {
      console.log(params.id);
      
      const data = await propertiesService.getById(params.id as string);
      console.log(data);
      
      setAppartment(data);
    };

    fetchProperty();
  }, [params.id]);

  // Render Meuble Item
  const renderMeuble = ({ item }: { item: Equipment }) => (
    <View style={styles.meubleCard}>
      <Text style={styles.meubleText}>{item.name}</Text>
    </View>
  );

  // Render Task Item
  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskText}>{item.title}</Text>
    </View>
  );

    // Render Task Item
    const renderReservationSetting = ({ item }: { item: BookingSetting   }) => (
      <View style={styles.taskCard}>
        <Text style={styles.taskText}>{item.cancellation_policy}</Text>
      </View>
    );

     // Render Task Item
     const renderHouseRule = ({ item }: { item: HouseRule   }) => (
      <View style={styles.taskCard}>
        <Text style={styles.taskText}>{item.title}</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Image */}
        <Image source={{ uri: appartement.image }} style={styles.image} />

        {/* Title with Icons */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{appartement.title}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => console.log('share pressed')}>
              <Ionicons name="share" size={24} color="grey" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.city}>{appartement.city}</Text>
          <Text style={styles.price}>{appartement.price}</Text>
          <Text style={styles.description}>{appartement.description}</Text>

          {/* Availability */}
          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityTextContainer}>
              <Text style={styles.availabilityText}>
                {appartement.available ? 'Disponible' : 'Non disponible'}
              </Text>
              <Text style={styles.availabilityDate}>
                {appartement.available
                  ? `Jusqu'au ${appartement.availableUntil}`
                  : `Disponible à partir du ${appartement.availableUntil}`}
              </Text>
            </View>
            <TouchableOpacity style={styles.calendarButton}>
              <Text style={styles.calendarButtonText}>Afficher Calendrier</Text>
            </TouchableOpacity>
          </View>

          {/* Number of Rooms */}
          <Text style={styles.infoText}>Nombre de pièces: {appartement.number_of_rooms}</Text>

          {/* Additional Info */}
          <Text style={styles.infoText}>Informations supplémentaires: {appartement.additional_info}</Text>
        </View>

        {/* Meubles Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meubles ({appartement.equipment?.length})</Text>
            <TouchableOpacity style={styles.voirPlusButton}>
              <Text style={styles.voirPlusText}>Voir plus</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={appartement?.equipment?.slice(0, 3)} // Show only 3 items
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMeuble}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Tasks Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tasks ({appartement.task?.length})</Text>
            <TouchableOpacity style={styles.voirPlusButton}>
              <Text style={styles.voirPlusText}>Voir plus</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={appartement.task?.slice(0, 3)} // Show only 3 items
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTask}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Type de logement Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de logement</Text>
          <Text style={styles.sectionContent}>{appartement.type_de_logement}</Text>
        </View>

        {/* Nombre de voyageurs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nombre de voyageurs</Text>
          <Text style={styles.sectionContent}>{appartement.nombre_de_voyageurs} voyageurs</Text>
        </View>

        {/* Emplacement Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emplacement</Text>
          <Text style={styles.sectionContent}>{appartement.emplacement}</Text>
        </View>

        {/* Paramètres de réservation Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Paramètres de réservation ({appartement.bookingsetting?.length})</Text>
            <TouchableOpacity style={styles.voirPlusButton}>
              <Text style={styles.voirPlusText}>Voir plus</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={appartement.bookingsetting?.slice(0, 3)} // Show only 3 items
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderReservationSetting}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
       

        {/* Règlement intérieur Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Règlement intérieur ({appartement.houserule?.length})</Text>
            <TouchableOpacity style={styles.voirPlusButton}>
              <Text style={styles.voirPlusText}>Voir plus</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={appartement.houserule?.slice(0, 3)} // Show only 3 items
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderHouseRule}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
       

        {/* Conditions d'annulation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conditions d'annulation</Text>
          <Text style={styles.sectionContent}>{appartement.conditionsAnnulation}</Text>
        </View>

        <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => console.log('share pressed')}>
              <Ionicons name="trash" size={24} color="red" style={styles.icon} />
              <Text>Supprimer</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>

      

      {/* Fixed Footer */}
      <View style={[styles.footer, { gap: 150 }]}>
        <TouchableOpacity onPress={() => console.log('Modifier pressed')}>
          <Ionicons name="pencil" size={24} color="#1E90FF" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Bloquer une date</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    marginLeft: 8,
  },
  detailsContainer: {
    padding: 16,
  },
  city: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  availabilityTextContainer: {
    flex: 1,
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  availabilityDate: {
    fontSize: 14,
    color: '#666666',
  },
  calendarButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  calendarButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  meubleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  meubleText: {
    fontSize: 16,
    color: '#333333',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#333333',
  },
  voirPlusButton: {
    alignItems: 'center',
  },
  voirPlusText: {
    fontSize: 16,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default AppartementDetails;