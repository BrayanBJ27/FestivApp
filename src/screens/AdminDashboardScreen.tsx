import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";

const AdmindashboardScreen: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
              <TouchableOpacity style={MainStyles.buttonnADS}>
                <Text style={MainStyles.buttonTextHiS}
                onPress={() => navigation.navigate("AddFestivityScreen")}
                >Add New</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Table Section */}
          <View style={MainStyles.tableContainerADS}>
            <View style={MainStyles.tableHeaderADS}>
              <Text style={MainStyles.tableHeaderTextADS}>Photo</Text>
              <Text style={MainStyles.tableHeaderTextADS}>Name</Text>
              <Text style={MainStyles.tableHeaderTextADS}>Date</Text>
              <Text style={MainStyles.tableHeaderTextADS}>Actions</Text>
            </View>
            {filteredEvents.map((event) => (
              <View key={event.id} style={MainStyles.tableRowADS}>
                <ImageBackground 
                  source={{ uri: event.image }} 
                  style={MainStyles.eventImageADS} 
                />
                <Text style={MainStyles.tableTextADS}>{event.name}</Text>
                <Text style={MainStyles.tableTextADS}>{event.date}</Text>
                <View style={MainStyles.actionsContainerADS}>
                  <TouchableOpacity>
                    <Icon name="edit" size={20} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="trash" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdmindashboardScreen;