import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

const BACKEND_URL = "http://192.168.100.11:3000";

type Props = NativeStackScreenProps<RootStackParamList, 'AddEventFScreen'>;

const AddEventScreen: React.FC<Props> = ({ route, navigation }) => {
  const { festivityId, festivalStartDate, festivalEndDate, festivalName } = route.params;
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

  const handleCreateEvent = async () => {
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
      const eventData = {
        name_Event: eventName.trim(),
        description_Event: eventDescription.trim(),
        event_date: eventDateTime,
        id_festival: festivityId,
        location: locationName.trim()
      };

      // Realizamos la petición POST para crear el evento (debes tener el endpoint configurado en el backend)
      await axios.post(`${BACKEND_URL}/events/register`, eventData);
      Alert.alert('Success', 'Event created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Could not create event');
    }
  };

  return (
    <SafeAreaView style={MainStyles.safeAreaAEFS}>
      <ScrollView style={MainStyles.scrollViewAEFS}>
        <View style={MainStyles.containerAEFS}>
        <Text style={MainStyles.titleAEFS}>Create Event for {festivalName}</Text>
          
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
              <Text>{eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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
              onPress={handleCreateEvent}
            >
              <Text style={MainStyles.createButtonTextAEFS}>Create Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEventScreen;
