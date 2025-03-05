import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import DeleteFestivalModal from '../components/DeleteFestivalModal';
import useDebounce from '../hooks/useDebounce';

// Interfaz para festividades de MySQL (tabla principal)
interface Festival {
  id_festival: number;
  name_Festival: string;
  start_date: string;
  end_date: string;
  image: string; // base64
}

// Interfaz extendida con rating (combinación de MySQL y Mongo)
interface FestivalWithRating extends Festival {
  rating: number;
}

const BACKEND_URL = "http://192.168.121.213:3000";

const AdmindashboardScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Estados para la tabla de festividades
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([]);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Estado para las Latest Festivities (con rating)
  const [latestFestivals, setLatestFestivals] = useState<FestivalWithRating[]>([]);

  // Estado de búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 1. Cargar festivales (tabla) desde MySQL
  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/festivals/list`);
      // Se asume que la respuesta trae los datos en response.data.remote
      setFestivals(response.data.remote);
      setFilteredFestivals(response.data.remote);
    } catch (error) {
      console.error('Error fetching festivals:', error);
      Alert.alert('Error', 'Could not fetch festivals');
    }
  };

  // 2. Cargar Latest Festivities (con rating) desde el endpoint
  const fetchLatestFestivals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/festivals/latest`);
      // Se espera que la respuesta sea { data: [ ... ] }
      setLatestFestivals(response.data.data);
    } catch (error) {
      console.error('Error fetching latest festivities:', error);
      Alert.alert('Error', 'Could not fetch latest festivities');
    }
  };

  useEffect(() => {
    fetchFestivals();
    fetchLatestFestivals();
  }, []);

  // 3. Filtrar festividades según búsqueda
  useEffect(() => {
    const filtered = festivals.filter(festival =>
      festival.name_Festival.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredFestivals(filtered);
  }, [debouncedSearchQuery, festivals]);

  // 4. Función para eliminar festival
  const handleDelete = async () => {
    if (!selectedFestival) return;
    try {
      await axios.delete(`${BACKEND_URL}/festivals/${selectedFestival.id_festival}`);
      await fetchFestivals();
      setDeleteModalVisible(false);
      setSelectedFestival(null);
      Alert.alert('Success', 'Festival deleted successfully');
    } catch (error) {
      console.error('Error deleting festival:', error);
      Alert.alert('Error', 'Could not delete festival');
    }
  };

  // 5. Renderizar un card para Latest Festivities
  const renderFestivityCard = (festival: FestivalWithRating) => {
    // Formatear la fecha al estilo "January 6"
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const formattedDate = new Date(festival.start_date).toLocaleDateString('en-US', options);

    return (
      <TouchableOpacity key={festival.id_festival}>
        <ImageBackground
          style={MainStyles.popularFestivityADS}
          source={
            festival.image
              ? { uri: `data:image/jpeg;base64,${festival.image}` }
              : require("../assets/images/oficial_festiapp.png")
          }
          resizeMode="cover"
        >
          <Text style={MainStyles.popularFestivityTextADS}>{festival.name_Festival}</Text>
          <View style={MainStyles.popularFestivityDetailsHS}>
            <Text style={MainStyles.dateTextHS}>{formattedDate}</Text>
            <View style={MainStyles.ratingContainerHS}>
              <Text style={MainStyles.ratingTextHS}>{festival.rating}</Text>
              <Icon
                name="star"
                size={20}
                color="#FFD700"
                style={MainStyles.ratingIconHS}
              />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // 6. Renderizar la tabla de "All Festivities" (datos de MySQL)
  const renderTableSection = () => (
    <View style={MainStyles.tableContainerADS}>
      <View style={MainStyles.tableHeaderADS}>
        <Text style={MainStyles.tableHeaderTextADS}>Photo</Text>
        <Text style={MainStyles.tableHeaderTextADS}>Name</Text>
        <Text style={MainStyles.tableHeaderTextADS}>Start Date</Text>
        <Text style={MainStyles.tableHeaderTextADS}>End Date</Text>
        <Text style={MainStyles.tableHeaderTextADS}>Actions</Text>
      </View>
      {filteredFestivals.map((festival) => (
        <View key={festival.id_festival} style={MainStyles.tableRowADS}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ImageBackground
              style={MainStyles.eventImageADS}
              source={
                festival.image
                  ? { uri: `data:image/jpeg;base64,${festival.image}` }
                  : require('../assets/images/oficial_festiapp.png')
              }
              resizeMode="cover"
            />
          </View>
          <Text style={MainStyles.tableTextADS}>{festival.name_Festival}</Text>
          <Text style={MainStyles.tableTextADS}>
            {new Date(festival.start_date).toLocaleDateString()}
          </Text>
          <Text style={MainStyles.tableTextADS}>
            {new Date(festival.end_date).toLocaleDateString()}
          </Text>
          <View style={MainStyles.actionsContainerADS}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('AddEventFScreen', { 
                festivityId: festival.id_festival,
                festivalStartDate: festival.start_date,
                festivalEndDate: festival.end_date,
                festivalName: festival.name_Festival
              })}
              style={MainStyles.actionButtonADS}
            >
              <Icon name="circle-plus" size={20} color="#00CC00" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('EditFestivityScreen', { 
                festivityId: festival.id_festival 
              })}
              style={MainStyles.actionButtonADS}
            >
              <Icon name="edit" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setSelectedFestival(festival);
                setDeleteModalVisible(true);
              }}
              style={MainStyles.actionButtonADS}
            >
              <Icon name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  // 7. Render principal
  return (
    <SafeAreaView style={MainStyles.safeAreaADS}>
      <ScrollView>
        <View style={MainStyles.containerADS}>
          <Text style={MainStyles.titleADS}>Overview</Text>

          {/* Latest Festivities Section */}
          <Text style={MainStyles.subtitleADS}>Latest Festivities</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={MainStyles.horizontalScrollADS}
          >
            {latestFestivals.map((festival) => renderFestivityCard(festival))}
          </ScrollView>

          {/* Search Section */}
          <View style={MainStyles.searchSectionADS}>
            <Text style={MainStyles.subtitleADS}>All Festivities</Text>
            <View style={MainStyles.searchContainerADS}>
              <TextInput
                style={MainStyles.searchInputADS}
                placeholder="Search festivities..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={MainStyles.buttonnADS}>
              <Text style={MainStyles.buttonTextADS}
                onPress={() => navigation.navigate("AddFestivityScreen")}
              >
                Add New
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={MainStyles.buttonveADS}>
              <Text style={MainStyles.buttonTextADS}
                onPress={() => navigation.navigate("EventsXFestivityScreen")}
              >
                View Events by Festivities
              </Text>
            </TouchableOpacity>
          </View>

          {/* Table Section */}
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            {renderTableSection()}
          </ScrollView>
        </View>
      </ScrollView>

      <DeleteFestivalModal
        visible={deleteModalVisible}
        onClose={() => {
          setDeleteModalVisible(false);
          setSelectedFestival(null);
        }}
        onConfirm={handleDelete}
        festivalName={selectedFestival?.name_Festival || ''}
      />
    </SafeAreaView>
  );
};

export default AdmindashboardScreen;
