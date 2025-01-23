import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from "../styles/MainStyles";
import { GOOGLE_PLACES_API_KEY } from "@env";

// Define interfaces for type safety
interface Place {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  vicinity: string;
}

interface TabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MapScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Map");
  const [places, setPlaces] = useState<Place[]>([]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get<{
        results: Place[];
      }>(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_PLACES_API_KEY}&location=-1.24908,-78.61675&radius=500`
      );
      setPlaces(response.data.results);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const renderLocationCard = (place: Place, index: number) => (
    <View style={MainStyles.locationCardMS} key={index}>
      <Text style={MainStyles.locationTitleTextMS}>{place.name}</Text>
      <Text style={MainStyles.priceTextMS}>{place.vicinity}</Text>
    </View>
  );

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
              <Icon
                name="search"
                size={20}
                color="#adadad"
                style={MainStyles.inputIcon}
              />
              <TextInput
                style={MainStyles.textInputMS}
                placeholder="Search..."
                placeholderTextColor="#adadad"
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
        <MapView
          style={MainStyles.mapViewMS}
          initialRegion={{
            latitude: -1.24908,
            longitude: -78.61675,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {places.map(renderMarker)}
        </MapView>

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
        {/* Bottom Navbar */}
        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;