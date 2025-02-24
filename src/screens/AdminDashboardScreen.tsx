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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import DeleteFestivalModal from '../components/DeleteFestivalModal';
import useDebounce from '../hooks/useDebounce';

// Interfaz de festividad para la tabla principal (MySQL)
interface Festival {
  id_festival: number;
  name_Festival: string;
  start_date: string;
  end_date: string;
  image: string; // base64
}

// Interfaz para las festividades con rating (combina MySQL + Mongo)
interface FestivalWithRating {
  id_festival: number;
  name_Festival: string;
  start_date: string;
  end_date: string;
  image: string; // base64
  rating: number; // proveniente de Mongo
}

const BACKEND_URL = "http://192.168.100.11:3000";

const AdmindashboardScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Estados para festividades principales (tabla)
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([]);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Estados para “Latest Festivities” (con rating)
  const [latestFestivals, setLatestFestivals] = useState<FestivalWithRating[]>([]);

  // Otros estados
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  // 1. Carga de festivales para la tabla (MySQL)
  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/festivals/list`);
      // Se asume que la respuesta contiene "remote" con los datos
      setFestivals(response.data.remote);
      setFilteredFestivals(response.data.remote);
    } catch (error) {
      console.error('Error fetching festivals:', error);
      Alert.alert('Error', 'Could not fetch festivals');
    }
  };

  // 2. Carga de “Latest Festivities” con rating (MySQL + Mongo)
  const fetchLatestFestivals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/festivals/latest`);
      // Se asume que la respuesta es { data: [ { id_festival, name_Festival, ... rating } ] }
      setLatestFestivals(response.data.data);
    } catch (error) {
      console.error('Error fetching latest festivities:', error);
      Alert.alert('Error', 'Could not fetch latest festivities');
    }
  };

  // 3. Efectos iniciales
  useEffect(() => {
    fetchFestivals();
    fetchLatestFestivals();

    // Cargas adicionales (ejemplo)
    axios.get('/api/admin/recent-activity').then((response) => setRecentActivity(response.data));
    axios.get('/api/events').then((response) => setEvents(response.data));
  }, []);

  // 4. Filtro de búsqueda en la tabla
  useEffect(() => {
    const filtered = festivals.filter(festival =>
      festival.name_Festival.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredFestivals(filtered);
  }, [debouncedSearchQuery, festivals]);

  // 5. Función para eliminar festival
  const handleDelete = async () => {
    if (!selectedFestival) return;
    try {
      await axios.delete(`${BACKEND_URL}/festivals/${selectedFestival.id_festival}`);
      await fetchFestivals(); // Refresca la tabla
      setDeleteModalVisible(false);
      setSelectedFestival(null);
      Alert.alert('Success', 'Festival deleted successfully');
    } catch (error) {
      console.error('Error deleting festival:', error);
      Alert.alert('Error', 'Could not delete festival');
    }
  };

  // 6. Renderiza un card para “Latest Festivities”
  const renderFestivityCard = (festival: FestivalWithRating) => {
    // Convertir la fecha al formato "Month Day" (ej. January 6)
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

  // 7. Render de la tabla (All Festivities)
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

  // 8. Render principal
  return (
    <SafeAreaView style={MainStyles.safeAreaADS}>
      <ScrollView>
        <View style={MainStyles.containerADS}>
          {/* Header Section */}
          <Text style={MainStyles.titleADS}>Overview</Text>

          {/* Latest Festivities Section (con rating) */}
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

      {/* Modal para confirmar eliminación */}
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
