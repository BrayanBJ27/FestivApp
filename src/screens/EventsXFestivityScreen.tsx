import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import DeleteEventModal from '../components/DeleteEventModal';

interface Festival {
  id_festival: number;
  name_Festival: string;
  start_date: string;
  end_date: string;
  image: string;
}

interface Event {
  id_event: number;
  name_Event: string;
  description_Event: string;
  event_date: string;
  hour_event: string;
  location: string;
}

const BACKEND_URL = "http://192.168.121.213:3000";

const EventsXFestivityScreen: React.FC = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [festivals, setFestivals] = useState<Festival[]>([]);
    const [selectedFestivalId, setSelectedFestivalId] = useState<number | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [deleteEventModalVisible, setDeleteEventModalVisible] = useState(false);

  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/festivals/list`);
      // Suponemos que la respuesta trae los festivales en response.data.remote
      setFestivals(response.data.remote);
    } catch (error) {
      console.error('Error fetching festivals:', error);
      Alert.alert('Error', 'Could not fetch festivals');
    }
  };

  // Obtiene los eventos filtrados por el id de la festividad
  const fetchEventsByFestival = async (festivalId: number) => {
    try {
      // Se asume que en el backend tienes un endpoint que filtra eventos por festividad.
      const response = await axios.get(`${BACKEND_URL}/events/byFestival`, {
        params: { festivityId: festivalId }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      Alert.alert('Error', 'Could not fetch events for this festivity');
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  // Cada vez que se cambie la festividad seleccionada, se obtienen los eventos correspondientes
  useEffect(() => {
    if (selectedFestivalId !== null) {
      fetchEventsByFestival(selectedFestivalId);
    } else {
      setEvents([]);
    }
  }, [selectedFestivalId]);

  // Función para eliminar un evento
  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      await axios.delete(`${BACKEND_URL}/events/${selectedEvent.id_event}`);
      // Actualizamos la lista de eventos después de la eliminación
      fetchEventsByFestival(selectedFestivalId!);
      setDeleteEventModalVisible(false);
      setSelectedEvent(null);
      Alert.alert('Success', 'Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Could not delete event');
    }
  };

  const renderTableSection = () => (
    <View style={MainStyles.tableContainerEXFS}>
      <View style={MainStyles.tableHeaderEXFS}>
        <Text style={MainStyles.tableHeaderTextEXFS}>Name</Text>
        <Text style={MainStyles.tableHeaderTextEXFS}>Date</Text>
        <Text style={MainStyles.tableHeaderTextEXFS}>Hour</Text>
        <Text style={MainStyles.tableHeaderTextEXFS}>Location</Text>
        <Text style={MainStyles.tableHeaderTextEXFS}>Action</Text>
      </View>
      {events.map((event) => (
        <View key={event.id_event} style={MainStyles.tableRowEXFS}>
          <Text style={MainStyles.tableTextEXFS}>{event.name_Event}</Text>
          <Text style={MainStyles.tableTextEXFS}>
            {new Date(event.event_date).toLocaleDateString()}
          </Text>
          <Text style={MainStyles.tableTextEXFS}>
            {event.hour_event ? event.hour_event : ''}
          </Text>
          <Text style={MainStyles.tableTextEXFS}>{event.location}</Text>
          <View style={MainStyles.actionsContainerEXFS}>
            <TouchableOpacity
                style={MainStyles.actionButtonEXFS}
                onPress={() => {
                    const festival = festivals.find(f => f.id_festival === selectedFestivalId);
                    if (festival) {
                    navigation.navigate('EditEventFestivityScreen', {
                        eventId: event.id_event,
                        festivityId: festival.id_festival,
                        festivalName: festival.name_Festival,
                        festivalStartDate: festival.start_date,
                        festivalEndDate: festival.end_date,
                    });
                    } else {
                    Alert.alert('Error', 'Festivity not found');
                    }
                }}
            >
            <Icon name="edit" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={MainStyles.actionButtonEXFS}
              onPress={() => {
                setSelectedEvent(event);
                setDeleteEventModalVisible(true);
              }}
            >
              <Icon name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
  

  return (
    <SafeAreaView style={MainStyles.safeAreaEXFS}>
      <ScrollView>
        <View style={MainStyles.containerEXFS}>
          <Text style={MainStyles.titleEXFS}>Events by Festivity</Text>
          <View style={MainStyles.pickerContainerAFS}>
          <Picker
            selectedValue={selectedFestivalId}
            style={MainStyles.pickerEXFS}
            onValueChange={(itemValue) => setSelectedFestivalId(itemValue)}
          >
            <Picker.Item label="Select a festivity" value={null} />
            {festivals.map((festival) => (
              <Picker.Item
                key={festival.id_festival}
                label={festival.name_Festival}
                value={festival.id_festival}
              />
            ))}
          </Picker>
          </View>
          {selectedFestivalId !== null && (
            <>
                <Text style={MainStyles.centeredTitleEXFS}>
                Events of {festivals.find(f => f.id_festival === selectedFestivalId)?.name_Festival}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                {renderTableSection()}
                </ScrollView>
            </>
            )}
        </View>
      </ScrollView>
      {/* Modal para eliminar evento */}
      <DeleteEventModal
        visible={deleteEventModalVisible}
        onClose={() => {
          setDeleteEventModalVisible(false);
          setSelectedEvent(null);
        }}
        onConfirm={handleDeleteEvent}
        eventName={selectedEvent?.name_Event || ''}
      />
    </SafeAreaView>
  );
};

export default EventsXFestivityScreen;
