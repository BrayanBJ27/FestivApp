import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from "../styles/MainStyles";

const HomeScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerHS}>
          {/* Header */}
          <View style={MainStyles.headerContainerHS}>
            <Text style={MainStyles.headerTextHS}>
              Find your next trip and discover more about Ecuador
            </Text>
            <ImageBackground
              style={MainStyles.headerImageHS}
              source={require("../assets/images/oficial_festiapp.png")}
            />
          </View>
          <Text style={MainStyles.titleTextHS}>The following holidays.</Text>

          {/* Search Box */}
          <View style={MainStyles.searchContainerHS}>
            <View style={MainStyles.searchBoxHS}>
              <Icon
                name="search"
                size={20}
                color="#adadad"
                style={MainStyles.inputIcon}
              />
              <TextInput
                style={MainStyles.textInputHS}
                placeholder="Search..."
                placeholderTextColor="#adadad"
              />
            </View>
            <TouchableOpacity style={MainStyles.filterButtonHS}>
              <Icon name="sliders" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Popular Festivities */}
          <Text style={MainStyles.sectionTitleHS}>Popular festivities</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={MainStyles.horizontalScrollHS}
          >
            {/* Recuadro 1 */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 1 })}
            >
              <ImageBackground
                style={MainStyles.popularFestivityHS}
                source={require("../assets/images/diablada.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.popularFestivityTextHS}>
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

            {/* Recuadro 2 */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 2 })}
            >
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

            {/* Recuadro 3 */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 3 })}
            >
              <ImageBackground
                style={MainStyles.popularFestivityHS}
                source={require("../assets/images/diablada.jpg")}
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

          {/* Other Festivities */}
          <Text style={MainStyles.sectionTitleHS}>Other festivities</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={MainStyles.horizontalScrollHS}
          >
            {/* Diablada Pillareña */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 5 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/diablada.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>
                  Diablada Pillareña
                </Text>
                <Text style={MainStyles.otherFestivityDateHS}>
                  January 6th
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            {/* Mama Negra */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 6 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/diablada.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>Mama Negra</Text>
                <Text style={MainStyles.otherFestivityDateHS}>
                  November 30th
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            {/* Recuadro 3 */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 7 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/diablada.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>
                  Fiesta del Sol
                </Text>
                <Text style={MainStyles.otherFestivityDateHS}>June 21st</Text>
              </ImageBackground>
            </TouchableOpacity>

            {/* Recuadro 4 */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 8 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/diablada.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>
                  Inti Raymi
                </Text>
                <Text style={MainStyles.otherFestivityDateHS}>
                  June 24th
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default HomeScreen;
