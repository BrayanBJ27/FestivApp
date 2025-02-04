import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainStyles from "../styles/MainStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import BottomNavbar from "../components/BottomNavbar";
import { useTheme } from '../hooks/ThemeContext'; // Importar el hook del modo oscuro

const cities = ["Tungurahua", "Quito", "Ambato"];
const destinations = [
  { time: "12:30", name: "Pillaro Central", location: "Tungurahua", visited: true },
  { time: "14:30", name: "San Vicente de Quilimbulo", location: "Tungurahua", visited: true },
  { time: "17:30", name: "Tunguipamba", location: "Tungurahua", visited: true },
  { time: "21:30", name: "Guanguibana", location: "Tungurahua", visited: false }
];

const CalendarScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Map");
  const [selectedCity, setSelectedCity] = useState("Tungurahua");
  const [selectedDay, setSelectedDay] = useState(1);
  const { isDarkMode } = useTheme(); // Detectar si está en modo oscuro

  const renderCityFilter = () => (
    <ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false}
  style={[MainStyles.filterScrollHiS, isDarkMode ? MainStyles.darkFilterScrollHiS : null]}
>

      {cities.map((city) => (
        <TouchableOpacity
          key={city}
          style={[
            MainStyles.cityFilterHiS,
            selectedCity === city && MainStyles.cityFilterActiveHiS,
            isDarkMode ? MainStyles.darkCityFilterHiS : null
          ]}
          onPress={() => setSelectedCity(city)}
        >
          <Text style={[
            MainStyles.cityFilterTextHiS,
            selectedCity === city && MainStyles.cityFilterTextActiveHiS,
            isDarkMode ? MainStyles.darkCityFilterTextHiS : null
          ]}>
            {city}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDayTabs = () => (
    <View style={[MainStyles.dayTabsContainerHiS, isDarkMode ? MainStyles.darkDayTabsContainerHiS : null]}>
      {[1, 2, 3].map((day) => (
        <TouchableOpacity
          key={day}
          style={[
            MainStyles.dayTabHiS,
            selectedDay === day && MainStyles.dayTabActiveHiS,
            isDarkMode ? MainStyles.darkDayTabHiS : null
          ]}
          onPress={() => setSelectedDay(day)}
        >
          <Text style={[MainStyles.dayTabTextHiS, isDarkMode ? MainStyles.darkDayTabTextHiS : null]}>
            Day {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDestinations = () => (
    <View style={MainStyles.timelineContainerHiS}>
      {destinations.map((dest, index) => (
        <View key={index} style={[MainStyles.destinationItemHiS, isDarkMode ? MainStyles.darkDestinationItemHiS : null]}>
          <View style={MainStyles.timelineLeftHiS}>
            <Text style={[MainStyles.timeTextHiS, isDarkMode ? MainStyles.darkTimeTextHiS : null]}>{dest.time}</Text>
            <View style={[
              MainStyles.timelineDotHiS,
              dest.visited ? MainStyles.visitedDotHiS : MainStyles.unvisitedDotHiS
            ]} />
          </View>
          <View style={MainStyles.destinationContentHiS}>
            <Text style={[MainStyles.destinationNameHiS, isDarkMode ? MainStyles.darkDestinationNameHiS : null]}>
              {dest.name}
            </Text>
            <Text style={[MainStyles.destinationLocationHiS, isDarkMode ? MainStyles.darkDestinationLocationHiS : null]}>
              {dest.location}
            </Text>
          </View>
          <Icon name="map-location-dot" size={24} color="#007AFF" style={MainStyles.mapIconHiS} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[MainStyles.safeAreaHiS, isDarkMode ? MainStyles.darkSafeAreaHiS : null]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[MainStyles.containerHiS, isDarkMode ? MainStyles.darkContainerHiS : null]}>
          <View style={MainStyles.headerHiS}>
            
          </View>
          {renderCityFilter()}
          {renderDayTabs()}
          {renderDestinations()}
          <TouchableOpacity style={[MainStyles.buttonHiS, isDarkMode ? MainStyles.darkButtonPS : null]}>
            <Text style={[MainStyles.buttonTextHiS, isDarkMode ? MainStyles.darkButtonTextPS : null]}>
              View specific itinerary
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CalendarScreen;
