import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from '../styles/MainStyles';

const HomeScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerHS}>
          {/* Header */}
          <View style={MainStyles.headerContainerHS}>
            <Text style={MainStyles.headerTextHS}>Find your next trip and discover
              more about Ecuador</Text>
            <Image
              style={MainStyles.headerImageHS}
              source={require('../assets/images/oficial_festiapp.png')}
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

          <Text style={MainStyles.sectionTitleHS}>Popular festivities</Text>
          <ImageBackground
            style={MainStyles.popularFestivityHS}
            source={require("../assets/images/diablada.jpg")}
            resizeMode="cover"
          >
            <Text style={MainStyles.popularFestivityTextHS}>Carnaval Guaranda</Text>
            <View style={MainStyles.popularFestivityDetailsHS}>
              <Text style={MainStyles.dateTextHS}>March 3rd & 4th</Text>
              <View style={MainStyles.ratingContainerHS}>
                <Text style={MainStyles.ratingTextHS}>4.9</Text>
                <Icon name="star" size={20} color="#FFD700" style={MainStyles.ratingIconHS}/>
              </View>
            </View>
          </ImageBackground>

          <Text style={MainStyles.sectionTitleHS}>Other festivities</Text>
          <View style={MainStyles.otherFestivitiesContainerHS}>
            <ImageBackground
              style={MainStyles.otherFestivityHS}
              source={require("../assets/images/diablada.jpg")}
              resizeMode="cover"
            >
              <Text style={MainStyles.otherFestivityTitleHS}>Diablada Pillareña</Text>
              <Text style={MainStyles.otherFestivityDateHS}>January, 6th</Text>
            </ImageBackground>
            <ImageBackground
              style={MainStyles.otherFestivityHS}
              source={require("../assets/images/diablada.jpg")}
              resizeMode="cover"
            >
              <Text style={MainStyles.otherFestivityTitleHS}>Mama Negra</Text>
              <Text style={MainStyles.otherFestivityDateHS}>November 30th</Text>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
      {/* Footer Navigation*/}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default HomeScreen;
