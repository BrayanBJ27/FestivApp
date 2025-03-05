import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

const BACKEND_URL = "http://192.168.121.213:3000";

type Props = NativeStackScreenProps<RootStackParamList, 'EditEventFestivityScreen'>;

interface EventData {
  id_event: number;
  name_Event: string;
  description_Event: string;
  event_date: string; // Formato "YYYY-MM-DD"
  hour_event: string; // Formato "HH:MM:SS"
  id_festival: number;
  location: string;
}

const EditEventFestivityScreen: React.FC<Props> = ({ route, navigation }) => {
  // Se espera que se pase el eventId y los datos relacionados a la festividad en los parámetros
  const { eventId, festivityId, festivalName, festivalStartDate, festivalEndDate } = route.params;

  const [eventData, setEventData] = useState<EventData | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [locationName, setLocationName] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Función para validar que la fecha del evento esté dentro del rango de la festividad
  const validateEventDate = () => {
    const start = new Date(festivalStartDate);
    const end = new Date(festivalEndDate);
    return eventDate >= start && eventDate <= end;
  };

  // Cargar los datos del evento al montar el componente
  const fetchEventData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/events/${eventId}`);
      const data: EventData = response.data;
      setEventData(data);
      setEventName(data.name_Event);
      setEventDescription(data.description_Event);
      // Convertir la fecha y la hora a objetos Date
      setEventDate(new Date(data.event_date));
      // Para la hora, se crea un objeto Date combinando la fecha y la hora
      const [hours, minutes, seconds] = data.hour_event.split(':');
      const time = new Date();
      time.setHours(Number(hours));
      time.setMinutes(Number(minutes));
      time.setSeconds(Number(seconds));
      setEventTime(time);
      setLocationName(data.location);
    } catch (error) {
      console.error('Error fetching event:', error);
      Alert.alert('Error', 'Could not fetch event data');
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleUpdateEvent = async () => {
    if (!eventName.trim() || !eventDescription.trim() || !locationName.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!validateEventDate()) {
      Alert.alert('Error', 'Event date must be within the festivity date range');
      return;
    }

    const dateString = eventDate.toISOString().split('T')[0];
    const timeString = eventTime.toTimeString().split(' ')[0];
    const eventDateTime = `${dateString} ${timeString}`;

    try {
      const updatedData = {
        name_Event: eventName.trim(),
        description_Event: eventDescription.trim(),
        event_date: eventDateTime,
        id_festival: festivityId,
        location: locationName.trim()
      };

      await axios.put(`${BACKEND_URL}/events/${eventId}`, updatedData);
      Alert.alert('Success', 'Event updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating event:', error);
      Alert.alert('Error', 'Could not update event');
    }
  };

  return (
    <SafeAreaView style={MainStyles.safeAreaAEFS}>
      <ScrollView style={MainStyles.scrollViewAEFS}>
        <View style={MainStyles.containerAEFS}>
          <Text style={MainStyles.titleAEFS}>Edit Event for {festivalName}</Text>

          <Text style={MainStyles.labelAEFS}>Event Name</Text>
          <TextInput
            style={MainStyles.inputAEFS}
            placeholder="Enter event name"
            value={eventName}
            onChangeText={setEventName}
          />

          <Text style={MainStyles.labelAEFS}>Description</Text>
          <TextInput
            style={MainStyles.textAreaAEFS}
            placeholder="Enter event description"
            value={eventDescription}
            onChangeText={setEventDescription}
            multiline={true}
            numberOfLines={4}
          />

          <Text style={MainStyles.labelAEFS}>Event Date & Time</Text>
          <View style={MainStyles.dateTimeContainerAEFS}>
            <TouchableOpacity
              style={MainStyles.datePickerFieldAEFS}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{eventDate.toLocaleDateString()}</Text>
              <Icon name="calendar" size={20} color="#00CEC9" />
            </TouchableOpacity>
            <TouchableOpacity
              style={MainStyles.timePickerFieldAEFS}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>
                {eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Icon name="clock-o" size={20} color="#00CEC9" />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={eventDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setEventDate(selectedDate);
                }
              }}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={eventTime}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setEventTime(selectedTime);
                }
              }}
            />
          )}

          <Text style={MainStyles.labelAEFS}>Location Name</Text>
          <TextInput
            style={MainStyles.inputAEFS}
            placeholder="Enter location name"
            value={locationName}
            onChangeText={setLocationName}
          />

          <View style={MainStyles.buttonContainerAEFS}>
            <TouchableOpacity
              style={MainStyles.cancelButtonAEFS}
              onPress={() => navigation.goBack()}
            >
              <Text style={MainStyles.cancelButtonTextAEFS}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={MainStyles.createButtonAEFS}
              onPress={handleUpdateEvent}
            >
              <Text style={MainStyles.createButtonTextAEFS}>Update Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEventFestivityScreen;
