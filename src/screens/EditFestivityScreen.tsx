import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditFestivityScreen: React.FC<{ festivityId: string }> = ({ festivityId }): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    image: '',
  });

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // 🚀 **Cargar la festividad existente**
  useEffect(() => {
    const fetchFestivity = async () => {
      try {
        const response = await axios.get(`/api/events/${festivityId}`);
        const festivity = response.data;

        setFormData({
          name: festivity.name,
          description: festivity.description,
          startDate: new Date(festivity.startDate),
          endDate: new Date(festivity.endDate),
          location: festivity.location,
          image: festivity.image,
        });

        setImageUri(festivity.image); // Establecer la imagen existente
      } catch (error) {
        console.error('Error fetching festivity:', error);
        Alert.alert('Error', 'No se pudo cargar la festividad.');
      }
    };

    fetchFestivity();
  }, [festivityId]);

  // 📸 **Seleccionar imagen**
  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    } else {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  // ✅ **Actualizar festividad**
  const handleUpdateEvent = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('startDate', formData.startDate.toISOString());
      formDataToSend.append('endDate', formData.endDate.toISOString());
      formDataToSend.append('location', formData.location);

      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        formDataToSend.append('image', blob, 'image.jpg');
      }

      const response = await axios.put(`/api/events/${festivityId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event updated successfully', response.data);
      Alert.alert('Success', 'Evento actualizado correctamente');
    } catch (error) {
      console.error('Error updating event:', error);
      Alert.alert('Error', 'No se pudo actualizar el evento');
    }
  };

  return (
    <SafeAreaView style={MainStyles.safeAreaEFS}>
      <ScrollView style={MainStyles.scrollViewEFS}>
        <View style={MainStyles.containerEFS}>
          <Text style={MainStyles.titleEFS}>Update Festivity</Text>

          <Text style={MainStyles.labelEFS}>Name</Text>
          <TextInput
            style={MainStyles.inputEFS}
            placeholder="Enter festivity name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <Text style={MainStyles.labelEFS}>Description</Text>
          <TextInput
            style={MainStyles.textAreaEFS}
            placeholder="Enter festivity description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline={true}
            numberOfLines={4}
          />

          {/* 📅 Start Date & End Date */}
          <View style={MainStyles.dateContainerEFS}>
            <View style={MainStyles.dateInputEFS}>
              <Text style={MainStyles.labelEFS}>Start Date</Text>
              <TouchableOpacity
                style={MainStyles.datePickerFieldEFS}
                onPress={() => setOpenStartDate(true)}
              >
                <Text>{formData.startDate.toLocaleDateString()}</Text>
                <Icon name="calendar" size={20} color="#00CEC9" />
              </TouchableOpacity>
              {openStartDate && (
                <DateTimePicker
                  value={formData.startDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setOpenStartDate(false);
                    if (date) setFormData({ ...formData, startDate: date });
                  }}
                />
              )}
            </View>

            <View style={MainStyles.dateInputEFS}>
              <Text style={MainStyles.labelEFS}>End Date</Text>
              <TouchableOpacity
                style={MainStyles.datePickerFieldEFS}
                onPress={() => setOpenEndDate(true)}
              >
                <Text>{formData.endDate.toLocaleDateString()}</Text>
                <Icon name="calendar" size={20} color="#00CEC9" />
              </TouchableOpacity>
              {openEndDate && (
                <DateTimePicker
                  value={formData.endDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setOpenEndDate(false);
                    if (date) setFormData({ ...formData, endDate: date });
                  }}
                />
              )}
            </View>
          </View>

          <Text style={MainStyles.labelEFS}>Location</Text>
          <View style={MainStyles.locationInputEFS}>
            <TextInput
              style={MainStyles.inputWithIconEFS}
              placeholder="Enter festivity location"
              placeholderTextColor="#666"
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
            />
            <Icon name="map-marker" size={20} color="#00CEC9" style={MainStyles.iconInsideInputEFS} />
          </View>

          <Text style={MainStyles.labelEFS}>Image</Text>
          <TouchableOpacity
            style={MainStyles.imagePickerEFS}
            onPress={handleImageSelect}
          >
            {imageUri ? (
              <ImageBackground
                source={{ uri: imageUri }}
                style={MainStyles.imagePreviewEFS}
                resizeMode="cover"
              />
            ) : (
              <View style={MainStyles.imagePlaceholderEFS}>
                <Icon name="image" size={50} color="#00CEC9" />
                <Text style={MainStyles.imagePlaceholderTextEFS}>Tap to select image</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={MainStyles.buttonContainerEFS}>
            <TouchableOpacity
              style={MainStyles.cancelButtonEFS}
              onPress={() => {}}
            >
              <Text style={MainStyles.cancelButtonTextEFS}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={MainStyles.updateButtonEFS}
              onPress={handleUpdateEvent}
            >
              <Text style={MainStyles.updateButtonTextEFS}>Update Festivity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditFestivityScreen;
