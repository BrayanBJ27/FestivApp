import React, { useState, useEffect} from 'react';
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

interface Festival {
  id_festival: number;
  name_Festival: string;
  start_date: string;
  end_date: string;
  image: string;
}

const BACKEND_URL = "http://192.168.100.11:3000";

const AdmindashboardScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/festivals/list`);
      setFestivals(response.data.remote);
      setFilteredFestivals(response.data.remote);
    } catch (error) {
      console.error('Error fetching festivals:', error);
      Alert.alert('Error', 'Could not fetch festivals');
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  // Debounced search
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const filtered = festivals.filter(festival =>
      festival.name_Festival.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredFestivals(filtered);
  }, [debouncedSearchQuery, festivals]);

  // Handle delete
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

  useEffect(() => {
    axios.get('/api/admin/recent-activity').then((response) => setRecentActivity(response.data));
    axios.get('/api/events').then((response) => setEvents(response.data));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFestivityCard = (
    title: string,
    date: string,
    rating: string,
    image: any
  ) => (
    <TouchableOpacity>
      <ImageBackground
        style={MainStyles.popularFestivityADS}
        source={image}
        resizeMode="cover"
      >
        <Text style={MainStyles.popularFestivityTextADS}>{title}</Text>
        <View style={MainStyles.popularFestivityDetailsHS}>
          <Text style={MainStyles.dateTextHS}>{date}</Text>
          <View style={MainStyles.ratingContainerHS}>
            <Text style={MainStyles.ratingTextHS}>{rating}</Text>
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

  // Table section rendering
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
          <Text style={MainStyles.tableTextADS}>{new Date(festival.start_date).toLocaleDateString()}</Text>
          <Text style={MainStyles.tableTextADS}>{new Date(festival.end_date).toLocaleDateString()}</Text>
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


  return (
    <SafeAreaView style={MainStyles.safeAreaADS}>
      <ScrollView>
        <View style={MainStyles.containerADS}>
          {/* Header Section */}
          <Text style={MainStyles.titleADS}>Overview</Text>

          {/* Latest Festivities Section */}
          <Text style={MainStyles.subtitleADS}>Latest Festivities</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={MainStyles.horizontalScrollADS}
          >
            {renderFestivityCard(
              "Carnaval Guaranda",
              "March 3rd & 4th",
              "4.9",
              require("../assets/images/guranda.jpg")
            )}
            {renderFestivityCard(
              "Diablada Pillareña",
              "January 6th",
              "4.8",
              require("../assets/images/diablada.jpg")
            )}
            {renderFestivityCard(
              "Mama Negra",
              "November 30th",
              "4.7",
              require("../assets/images/mamanegra.jpg")
            )}
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
                >Add New</Text>
              </TouchableOpacity>
            <TouchableOpacity style={MainStyles.buttonveADS}>
                <Text style={MainStyles.buttonTextADS}
                onPress={() => navigation.navigate("EventsXFestivityScreen")}
                >View Envents by Festivities</Text>
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