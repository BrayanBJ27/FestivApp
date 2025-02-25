import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import MainStyles from "../styles/MainStyles";
import axios from "axios";

const BACKEND_URL = "http://192.168.100.11:3000";

type Props = NativeStackScreenProps<RootStackParamList, "FestivityScreen">;

const FestivityScreen: React.FC<Props> = ({ route, navigation }) => {
  const { festivityId } = route.params;
  const [festivityDetails, setFestivityDetails] = useState<any>(null);

  useEffect(() => {
    const fetchFestivityDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/festivals/detail/${festivityId}`);
        setFestivityDetails(response.data);
      } catch (error) {
        console.error("Error fetching festivity details:", error);
        Alert.alert("Error", "Could not fetch festivity details");
      }
    };
    fetchFestivityDetails();
  }, [festivityId]);

  if (!festivityDetails) {
    return (
      <SafeAreaView style={MainStyles.safeAreaES}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Formatear la fecha
  const formattedDate = new Date(festivityDetails.start_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Actualizar el rating en el backend
  const handleRatingUpdate = async (newRating: number) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/ratings/update`, {
        festivalId: festivityId,
        rating: newRating,
      });
      // Actualizamos el estado con el nuevo rating devuelto
      setFestivityDetails((prev: any) => ({
        ...prev,
        rating: response.data.rating,
      }));
    } catch (error) {
      console.error("Error updating rating:", error);
      Alert.alert("Error", "Could not update rating");
    }
  };

  // Renderizar estrellas dinámicamente
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let iconName = "star"; // Por defecto, estrella vacía
      if (rating >= i) {
        iconName = "star"; // Estrella llena
      } else if (rating + 0.5 >= i) {
        iconName = "star-half"; // Media estrella
      }
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRatingUpdate(i)}>
          <Icon name={iconName} size={16} color="#FFD700" style={MainStyles.starIconES} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={MainStyles.safeAreaES}>
      <ImageBackground
        source={
          festivityDetails.image
            ? { uri: `data:image/jpeg;base64,${festivityDetails.image}` }
            : require("../assets/images/oficial_festiapp.png")
        }
        style={MainStyles.backgroundImageES}
        resizeMode="cover"
      >
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={MainStyles.eventContainerES}>
            {/* Título y Descripción */}
            <Text style={MainStyles.eventTitleES}>{festivityDetails.name_Festival}</Text>
            <Text style={MainStyles.eventDescriptionES}>
              {festivityDetails.description_Festival}
            </Text>

            {/* Información adicional */}
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 10 }}>
              Date: {formattedDate}
            </Text>

            {/* Sección de rating */}
            <View style={MainStyles.reviewContainerES}>
              <View style={MainStyles.ratingContainerES}>
                {renderStars(festivityDetails.rating || 0)}
                <Text style={MainStyles.ratingTextES}>
                  {festivityDetails.rating?.toFixed(2) || "0"}
                </Text>
              </View>
              <Text style={MainStyles.reviewTextES}>
                ({festivityDetails.reviewCount || 0} reviews)
              </Text>
            </View>

            {/* Botones de acción */}
            <View style={MainStyles.buttonContainerES}>
              <TouchableOpacity
                style={MainStyles.primaryButtonES}
                onPress={() => navigation.navigate("Schedule")}
              >
                <Text style={MainStyles.primaryButtonTextES}>Enter the plan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={MainStyles.secondaryButtonES}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={MainStyles.secondaryButtonTextES}>View other</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FestivityScreen;
