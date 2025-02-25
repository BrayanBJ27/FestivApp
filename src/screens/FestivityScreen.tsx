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

  // Formatear la fecha de inicio
  const formattedDate = new Date(festivityDetails.start_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Función para renderizar estrellas según el rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-${i}`}
          name="star"
          size={16}
          color="#FFD700"
          style={MainStyles.starIconES}
        />
      );
    }
    if (halfStar === 1) {
      stars.push(
        <Icon
          key="half"
          name="star-half"
          size={16}
          color="#FFD700"
          style={MainStyles.starIconES}
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          name="star"
          size={16}
          color="#FFD700"
          style={MainStyles.starIconES}
        />
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

            {/* Reviews Section */}
            <View style={MainStyles.reviewContainerES}>
              <View style={MainStyles.ratingContainerES}>
                {renderStars(festivityDetails.rating || 0)}
                <Text style={MainStyles.ratingTextES}>{festivityDetails.rating || "0"}</Text>
              </View>
              <Text style={MainStyles.reviewTextES}>
                ({festivityDetails.reviewCount || 0} reviews)
              </Text>
            </View>

            {/* Action Buttons */}
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
