import React, {useState} from 'react';
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

const cities = ["Tungurahua", "Quito", "Ambato"];
const destinations = [
  {
    time: "12:30",
    name: "Pillaro Central",
    location: "Tungurahua",
    visited: true
  },
  {
    time: "14:30",
    name: "San Vicente de Quilimbulo",
    location: "Tungurahua",
    visited: true
  },
  {
    time: "17:30",
    name: "Tunguipamba",
    location: "Tungurahua",
    visited: true
  },
  {
    time: "21:30",
    name: "Guanguibana",
    location: "Tungurahua",
    visited: false
  }
];

const CalendarScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Map");
  const [selectedCity, setSelectedCity] = useState("Tungurahua");
  const [selectedDay, setSelectedDay] = useState(1);

  const renderCityFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={MainStyles.filterScrollHiS}
    >
      {cities.map((city) => (
        <TouchableOpacity
          key={city}
          style={[
            MainStyles.cityFilterHiS,
            selectedCity === city && MainStyles.cityFilterActiveHiS
          ]}
          onPress={() => setSelectedCity(city)}
        >
          <Text style={[
            MainStyles.cityFilterTextHiS,
            selectedCity === city && MainStyles.cityFilterTextActiveHiS
          ]}>
            {city}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDayTabs = () => (
    <View style={MainStyles.dayTabsContainerHiS}>
      {[1, 2, 3].map((day) => (
        <TouchableOpacity
          key={day}
          style={[
            MainStyles.dayTabHiS,
            selectedDay === day && MainStyles.dayTabActiveHiS
          ]}
          onPress={() => setSelectedDay(day)}
        >
          <Text style={MainStyles.dayTabTextHiS}>Day {day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDestinations = () => (
    <View style={MainStyles.timelineContainerHiS}>
      {destinations.map((dest, index) => (
        <View key={index} style={MainStyles.destinationItemHiS}>
          <View style={MainStyles.timelineLeftHiS}>
            <Text style={MainStyles.timeTextHiS}>{dest.time}</Text>
            <View style={[
              MainStyles.timelineDotHiS,
              dest.visited ? MainStyles.visitedDotHiS : MainStyles.unvisitedDotHiS
            ]} />
          </View>
          <View style={MainStyles.destinationContentHiS}>
            <Text style={MainStyles.destinationNameHiS}>{dest.name}</Text>
            <Text style={MainStyles.destinationLocationHiS}>{dest.location}</Text>
          </View>
          <Icon name="map-location-dot" size={24} color="#007AFF" style={MainStyles.mapIconHiS} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={MainStyles.safeAreaHiS}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerHiS}>
          <View style={MainStyles.headerHiS}>
            <TouchableOpacity style={MainStyles.backButtonHiS}>
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={MainStyles.headerTextHiS}>
              Visited destinations
            </Text>
          </View>
          {renderCityFilter()}
          {renderDayTabs()}
          {renderDestinations()}
          <TouchableOpacity style={MainStyles.buttonHiS}>
            <Text style={MainStyles.buttonTextHiS}>View specific itinerary</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CalendarScreen;