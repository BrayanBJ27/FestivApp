import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
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

const MapScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Map");
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [region, setRegion] = useState<Region>({
    latitude: -1.24908,
    longitude: -78.61675,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [searchedMarker, setSearchedMarker] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  } | null>(null);

  // Fetch nearby places or search query results
  const fetchPlaces = async (query?: string) => {
    try {
      const url = query
        ? `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_PLACES_API_KEY}&query=${query}`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_PLACES_API_KEY}&location=${region.latitude},${region.longitude}&radius=500`;

      const response = await axios.get<{ results: Place[] }>(url);
      setPlaces(response.data.results);

      // Si hay resultados, centra el mapa en el primer lugar encontrado y coloca un marcador
      if (response.data.results.length > 0 && query) {
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
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      fetchPlaces(searchQuery);
    }
  };

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
        <Icon name="search" size={20} color="#adadad" style={MainStyles.inputIcon} />
        <TextInput
          style={MainStyles.textInputMS}
          placeholder="Search..."
          placeholderTextColor="#adadad"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch} // Ejecuta la búsqueda al presionar "Enter"
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
        {/* Mapa de Google */}
        <MapView
          style={MainStyles.mapViewMS}
          region={region} // Centro dinámico del mapa
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          zoomEnabled={true}
          scrollEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {places.map(renderMarker)}
          {/* Marker del lugar buscado */}
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
