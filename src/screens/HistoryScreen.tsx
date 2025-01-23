import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainStyles from "../styles/MainStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomNavbar from "../components/BottomNavbar";

export default function CalendarScreen() {
  const [activeTab, setActiveTab] = useState("Map");
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerHS}>
          <View style={MainStyles.headerHS}>
            <TouchableOpacity style={MainStyles.backButtonHS}>
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={MainStyles.headerTextHS} numberOfLines={1}>
                Visited destinations
            </Text>
          </View>          
          <TouchableOpacity style={MainStyles.buttonHS}>
            <Text style={MainStyles.buttonTextHS}>View specific itinerary</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Footer Navigation*/}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}