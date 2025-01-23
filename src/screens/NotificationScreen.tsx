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

const NotificationScreen: React.FC= (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Notification");
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerNS}>
          <View style={MainStyles.headerNS}>
            <TouchableOpacity style={MainStyles.backButtonNS}>
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={MainStyles.titleTextNS}>Upcoming Events</Text>
        </View>
      </ScrollView>
      {/* Footer Navigation*/}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default NotificationScreen;