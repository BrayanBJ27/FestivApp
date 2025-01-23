import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from "../styles/MainStyles";
import { GOOGLE_PLACES_API_KEY } from "@env";

interface Place {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  vicinity: string;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
}

const MapScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Map");
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [region, setRegion] = useState<Region | null>(null);
  const [searchedMarker, setSearchedMarker] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  } | null>(null);

  const getUserLocation = async () => {
    try {
      const response = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_PLACES_API_KEY}`
      );
  
      const { location } = response.data;
      const { lat, lng } = location;
  
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
  
      fetchPlaces(lat, lng);
    } catch (error) {
      console.error("Error getting user location:", error);
      Alert.alert("Error", "Unable to fetch your current location.");
    }
  };

  const fetchPlaces = async (latitude?: number, longitude?: number, query?: string) => {
    try {
      const location = latitude && longitude 
        ? `${latitude},${longitude}` 
        : `${region?.latitude},${region?.longitude}`;
      
      const baseQuery = query 
        ? `${query} restaurants hotels`  
        : '';
      
      const url = query
        ? `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_PLACES_API_KEY}&query=${baseQuery}&location=${location}&radius=5000&type=restaurant|lodging`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_PLACES_API_KEY}&location=${location}&radius=5000&type=restaurant|lodging`;

      const response = await axios.get<{ results: Place[] }>(url);
      
      if (response.data.results.length > 0) {
        setPlaces(response.data.results);

        if (query) {
          const firstPlace = response.data.results[0];
          setRegion({
            latitude: firstPlace.geometry.location.lat,
            longitude: firstPlace.geometry.location.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          setSearchedMarker({
            latitude: firstPlace.geometry.location.lat,
            longitude: firstPlace.geometry.location.lng,
            name: firstPlace.name,
          });
        }
      } else {
        setPlaces([]);
        Alert.alert("No Results", "No restaurants or hotels found in this area.");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      Alert.alert("Error", "Unable to fetch places.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      fetchPlaces(undefined, undefined, searchQuery);
    }
  };

  const renderLocationCard = (place: Place, index: number) => {
    const photoUrl = place.photos && place.photos.length > 0
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      : null;
  
    return (
      <View style={MainStyles.locationCardMS} key={index}>
        {photoUrl && (
          <ImageBackground 
            source={{ uri: photoUrl }}
            style={MainStyles.locationImageMS}
            resizeMode="cover"
          />
        )}
        <View style={MainStyles.locationDetailsMS}>
          <Text style={MainStyles.locationTitleTextMS}>{place.name}</Text>
          <Text style={MainStyles.priceTextMS}>{place.vicinity}</Text>
          <View style={MainStyles.ratingContainerMS}>
            <Icon name="star" size={10} color="#ffd700" />
            <Icon name="star" size={10} color="#ffd700" />
            <Icon name="star" size={10} color="#ffd700" />
            <Icon name="star" size={10} color="#ffd700" />
            <Icon name="star" size={10} color="#ffd700" />
          </View>
        </View>
      </View>
    );
  };

  const renderMarker = (place: Place, index: number) => (
    <Marker
      key={index}
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
      title={place.name}
      description={place.vicinity}
    />
  );

  const renderHeader = () => (
    <View style={MainStyles.headerContainerMS}>
      <TouchableOpacity style={MainStyles.backButtonMS}>
        <Icon name="arrow-left" size={20} color="#000" />
      </TouchableOpacity>
      <View style={MainStyles.searchBoxMS}>
        <Icon name="search" size={20} color="#adadad" style={MainStyles.inputIcon} />
        <TextInput
          style={MainStyles.textInputMS}
          placeholder="Search..."
          placeholderTextColor="#adadad"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      <TouchableOpacity style={MainStyles.filterButtonMS}>
        <Icon name="sliders" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={MainStyles.safeAreaMS}>
      <View style={MainStyles.mapContainerMS}>
        {region && (
          <MapView
            style={MainStyles.mapViewMS}
            region={region}
            zoomEnabled={true}
            scrollEnabled={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {places.map(renderMarker)}
            {searchedMarker && (
              <Marker
                coordinate={{
                  latitude: searchedMarker.latitude,
                  longitude: searchedMarker.longitude,
                }}
                title={searchedMarker.name}
              />
            )}
          </MapView>
        )}

        <ScrollView
          style={MainStyles.scrollContainerMS}
          scrollEnabled={true}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={MainStyles.overlayContainerMS}>
            {renderHeader()}
            <Text style={MainStyles.locationTitleMS}>Nearby Locations</Text>
            <View style={MainStyles.locationsContainerMS}>
              {places.map(renderLocationCard)}
            </View>
          </View>
        </ScrollView>

        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;