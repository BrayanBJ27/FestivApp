import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from "../styles/MainStyles";

const MapScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Map");

  return (
    <SafeAreaView style={MainStyles.safeAreaMS}>
      <View style={MainStyles.mapContainerMS}>
        {/* Mapa de Google */}
        <MapView
          style={MainStyles.mapViewMS}
          initialRegion={{
            latitude: -1.24908, // Coordenadas iniciales (Ejemplo: Tungurahua)
            longitude: -78.61675,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {/* Marcadores en el mapa */}
          <Marker
            coordinate={{ latitude: -1.24908, longitude: -78.61675 }}
            title="Tungurahua"
            description="Ubicación aproximada"
          />
        </MapView>

        <ScrollView
          style={MainStyles.scrollContainerMS}
          scrollEnabled={true}
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* Contenido sobre el mapa */}
          <View style={MainStyles.overlayContainerMS}>
            {/* Header Section */}
            <View style={MainStyles.headerContainerMS}>
              <TouchableOpacity style={MainStyles.backButtonMS}>
                <Icon name="arrow-left" size={20} color="#000" />
              </TouchableOpacity>
              <View style={MainStyles.searchBarMS}>
                <Icon name="search" size={20} color="#aeaeae" style={MainStyles.searchIconMS} />
                <Text style={MainStyles.searchTextMS}>Tungurahua</Text>
              </View>
              <TouchableOpacity style={MainStyles.filterButtonMS}>
                <Icon name="sliders" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Location Targeting Section */}
            <Text style={MainStyles.locationTitleMS}>Location targeting</Text>
            <View style={MainStyles.locationsContainerMS}>
              <View style={MainStyles.locationCardMS}>
                <Text style={MainStyles.locationTitleTextMS}>
                  Villas del Norte Lodging
                </Text>
                <View style={MainStyles.ratingContainerMS}>
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star-half" size={14} color="#FFD700" />
                </View>
                <Text style={MainStyles.priceTextMS}>from $25/night</Text>
              </View>
              <View style={MainStyles.locationCardMS}>
                <Text style={MainStyles.locationTitleTextMS}>El Sol Lodge</Text>
                <View style={MainStyles.ratingContainerMS}>
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star" size={14} color="#FFD700" />
                  <Icon name="star" size={14} color="#FFD700" />
                </View>
                <Text style={MainStyles.priceTextMS}>from $199/night</Text>
              </View>
            </View>
          </View>

          {/* Footer Navigation */}
          <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;