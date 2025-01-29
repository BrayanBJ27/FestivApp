import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainStyles from '../styles/MainStyles';
import axios from 'axios';

const AdmindashboardScreen: React.FC = (): JSX.Element => {
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

  return (
    <SafeAreaView style={MainStyles.safeAreaADS}>
      <View style={MainStyles.containerADS}>
        <Text style={MainStyles.titleADS}>Admin Overview</Text>

        <Text style={MainStyles.subtitleADS}>Latest Festivities</Text>
        <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={MainStyles.horizontalScrollADS}>
            {/* Carnaval Guaranda */}
            <TouchableOpacity>
              <ImageBackground
                style={MainStyles.popularFestivityADS}
                source={require("../assets/images/guranda.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.popularFestivityTextADS}>
                  Carnaval Guaranda
                </Text>
                <View style={MainStyles.popularFestivityDetailsHS}>
                  <Text style={MainStyles.dateTextHS}>March 3rd & 4th</Text>
                  <View style={MainStyles.ratingContainerHS}>
                    <Text style={MainStyles.ratingTextHS}>4.9</Text>
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
            {/* Diablada Pillareña */}
            <TouchableOpacity>
              <ImageBackground
                style={MainStyles.popularFestivityHS}
                source={require("../assets/images/diablada.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.popularFestivityTextHS}>
                  Diablada Pillareña
                </Text>
                <View style={MainStyles.popularFestivityDetailsHS}>
                  <Text style={MainStyles.dateTextHS}>January 6th</Text>
                  <View style={MainStyles.ratingContainerHS}>
                    <Text style={MainStyles.ratingTextHS}>4.8</Text>
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
            {/* Mama Negra */}
            <TouchableOpacity>
              <ImageBackground
                style={MainStyles.popularFestivityHS}
                source={require("../assets/images/mamanegra.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.popularFestivityTextHS}>
                  Mama Negra
                </Text>
                <View style={MainStyles.popularFestivityDetailsHS}>
                  <Text style={MainStyles.dateTextHS}>November 30th</Text>
                  <View style={MainStyles.ratingContainerHS}>
                    <Text style={MainStyles.ratingTextHS}>4.7</Text>
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
          </ScrollView>
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
                <Text style={MainStyles.buttonTextHiS}>Add New</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Event Table */}
        <View style={MainStyles.tableContainerADS}>
          <View style={MainStyles.tableHeaderADS}>
            <Text style={MainStyles.tableHeaderTextADS}>Photo</Text>
            <Text style={MainStyles.tableHeaderTextADS}>Name</Text>
            <Text style={MainStyles.tableHeaderTextADS}>Date</Text>
            <Text style={MainStyles.tableHeaderTextADS}>Actions</Text>
          </View>
          {filteredEvents.map((event) => (
            <View key={event.id} style={MainStyles.tableRowADS}>
              <ImageBackground source={{ uri: event.image }} style={MainStyles.eventImageADS} />
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
    </SafeAreaView>
  );
};

export default AdmindashboardScreen;
