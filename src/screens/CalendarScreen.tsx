import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import MainStyles from "../styles/MainStyles";
import { Calendar } from 'react-native-calendars';
import BottomNavbar from "../components/BottomNavbar";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import axios from "axios";

// URL base de tu backend
const BACKEND_URL = "http://192.168.100.11:3000";

// Función para generar un array de fechas entre dos rangos (YYYY-MM-DD)
function getDatesInRange(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  // Avanza día a día
  let current = new Date(start);
  while (current <= end) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    dates.push(dateString);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export default function CalendarScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Calendar">>();
  const { festivityId } = route.params;

  const [selected, setSelected] = useState('');
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  // Estados para guardar la festividad
  const [festivity, setFestivity] = useState<any>(null);
  // Estado para marcar las fechas en el calendario
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  // 1. Cargar la festividad desde el backend
  useEffect(() => {
    const fetchFestivityDetail = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/festivals/detail/${festivityId}`);
        setFestivity(response.data);
      } catch (error) {
        console.error("Error fetching festivity detail in CalendarScreen:", error);
      }
    };
    fetchFestivityDetail();
  }, [festivityId]);

  // 2. Cuando se obtenga la festividad, marcar las fechas en el calendario
  useEffect(() => {
    if (festivity && festivity.start_date && festivity.end_date) {
      const start = festivity.start_date; // "YYYY-MM-DD"
      const end = festivity.end_date;     // "YYYY-MM-DD"
      const allDates = getDatesInRange(start, end);

      // Crear objeto para "markedDates"
      const newMarked: { [date: string]: any } = {};
      allDates.forEach(date => {
        newMarked[date] = {
          selected: true,
          selectedColor: '#0373f3', // color para el rango
        };
      });

      setMarkedDates(newMarked);
    }
  }, [festivity]);

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerCS}>
          <View style={MainStyles.headerCS}>
            <Text style={MainStyles.headerTextCS} numberOfLines={1}>
              My Plan
            </Text>
          </View>

          {/* Banner con la imagen y el nombre de la festividad */}
          <ImageBackground
            style={MainStyles.imageBannerCS}
            source={
              festivity && festivity.image
                ? { uri: `data:image/jpeg;base64,${festivity.image}` }
                : require('../assets/images/diablada.jpg')
            }
            resizeMode="cover"
          >
            <Text style={MainStyles.eventTitleCS} numberOfLines={1}>
              {festivity ? festivity.name_Festival : "Diablada Pillareña"}
            </Text>
          </ImageBackground>

          <View style={MainStyles.calendarHeaderCS}>
            <Text style={MainStyles.calendarTitleCS}>Calendar Event</Text>
          </View>

          {/* Calendario dinámico con "current" definido por el start_date de la festividad */}
          <Calendar
            current={
              festivity
                ? new Date(festivity.start_date).toISOString().split("T")[0]
                : undefined
            }
            onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              ...markedDates,
              [selected]: {
                selected: true,
                selectedColor: '#ffb300',
              }
            }}
          />
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}
