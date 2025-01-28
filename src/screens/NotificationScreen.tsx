import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from '../styles/MainStyles';

const festivals = [
  {
    name: "Ambato",
    date: "March 3rd",
    description:
      "The Fiesta de la Fruta y de las Flores is celebrated with the goal of commemorating the unity and resilience of the city after the devastating earthquake of 1949, which caused significant damage to the region.",
    rating: 4.8,
    icon: "spa", // Custom icon component needed
  },
  {
    name: "Latacunga",
    date: "November 1st",
    description:
      "The Fiesta de la Mama Negra has its roots in the colonial era, when the Spanish began to worship the Virgin of Mercy, in honor of whom various ceremonies were held.",
    rating: 4,
    icon: "masks-theater", // Custom icon component needed
  },
  {
    name: "Pichincha",
    date: "Friday in March",
    description:
      "Good Friday is a celebration that takes place throughout the country, but it holds special significance in Quito (Pichincha province) and other cities with Catholic traditions.",
    rating: 4,
    icon: "church", // Custom icon component needed
  },
  {
    name: "Guayaquil",
    date: "9th and 12th of October",
    description:
      "Independency Guayaquil,They commemorate the independence of Guayaquil from Spanish rule, which occurred on October 9th, 1820.",
    rating: 3,
    icon: "umbrella-beach", // Custom icon component needed
  },
];

const NotificationScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Notification");

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={{
            color: i <= rating ? '#007AFF' : '#e0e0e0',
            fontSize: 16,
            marginLeft: 2
          }}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  const renderFestival = (festival: any, index: number) => (
    <View key={index} style={MainStyles.festivalContainerNS}>
      <View style={MainStyles.iconContainerNS}>
        <Icon name={festival.icon} size={24} color="#007AFF" />
      </View>
      <View style={MainStyles.contentContainerNS}>
        <View style={MainStyles.mainContentNS}>
          <View style={MainStyles.nameAndDateNS}>
            <Text style={MainStyles.festivalNameNS}>{festival.name}</Text>
            <Text style={MainStyles.festivalDateNS}>{festival.date}</Text>
          </View>
          <View style={MainStyles.ratingContainerNS}>
            <Text style={MainStyles.ratingLabelNS}>Rating</Text>
            <View style={MainStyles.starsContainerNS}>{renderStars(festival.rating)}</View>
          </View>
        </View>
        <Text style={MainStyles.festivalDescriptionNS}>{festival.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={MainStyles.containerNS}>
      <View style={MainStyles.headerNS}>
        <TouchableOpacity style={MainStyles.backButtonNS}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={MainStyles.titleTextNS}>Next Festivities</Text>
        <TouchableOpacity>
          <Text style={MainStyles.viewAllTextNS}>View all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        style={MainStyles.scrollViewNS}
        contentInsetAdjustmentBehavior="automatic"
      >
        {festivals.map(renderFestival)}
      </ScrollView>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default NotificationScreen;