import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from '../styles/MainStyles';
import axios from 'axios';

interface Notification {
  _id: string;
  festivalId: number;
  message: string;
  createdAt: string;
  status: string;
}

const BACKEND_URL = "http://192.168.100.11:3000";

const NotificationScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Notification");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar notificaciones desde el backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/notifications/list`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        Alert.alert("Error", "Could not fetch notifications");
      }
    };
    fetchNotifications();
  }, []);

  // Render para cada notificación usando los estilos ya definidos
  const renderNotification = (notification: Notification, index: number) => {
    const formattedDate = new Date(notification.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      <View key={notification._id} style={MainStyles.festivalContainerNS}>
        <View style={MainStyles.iconContainerNS}>
          <Icon name="bell" size={24} color="#007AFF" />
        </View>
        <View style={MainStyles.contentContainerNS}>
          <View style={MainStyles.mainContentNS}>
            <View style={MainStyles.nameAndDateNS}>
              <Text style={MainStyles.festivalNameNS}>{notification.message}</Text>
              <Text style={MainStyles.festivalDateNS}>{formattedDate}</Text>
            </View>
            <View style={MainStyles.ratingContainerNS}>
              <Text style={MainStyles.ratingLabelNS}>Status</Text>
              <View style={MainStyles.starsContainerNS}>
                <Text style={MainStyles.ratingTextNS}>{notification.status}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={MainStyles.containerNS}>
      <View style={MainStyles.headerNS}>
        <Text style={MainStyles.titleTextNS}>Next Festivities</Text>
      </View>
      <ScrollView 
        style={MainStyles.scrollViewNS}
        contentInsetAdjustmentBehavior="automatic"
      >
        {notifications.length > 0 ? (
          notifications.map(renderNotification)
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No notifications available.
          </Text>
        )}
      </ScrollView>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default NotificationScreen;
