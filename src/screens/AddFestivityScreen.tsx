import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import { launchImageLibrary, PhotoQuality } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewFestivalTypeModal from '../components/NewFestivalTypeModal';
import { Picker } from '@react-native-picker/picker';

// Configure backend URL with your local IP
const BACKEND_URL = "http://192.168.100.11:3000";

// Primero, definimos la interfaz para el tipo de festival
interface FestivalType {
  id_festival_type: number;
  name_FType: string;
  description_FType?: string; // El ? indica que es opcional
}

interface Location {
  id_location: number;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
}

interface FormData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  locationId: string; 
  latitude?: number;
  longitude?: number;
  image: Blob | string;
  festivalType: string;
  selectedProvince: string;
  selectedCity: string;
}
const AddFestivityScreen: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    selectedProvince: '',
    selectedCity: '',
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    locationId: '',
    latitude: undefined,
    longitude: undefined,
    image: '',
    festivalType: '',
  });

  const [festivalTypes, setFestivalTypes] = useState<FestivalType[]>([]);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [provinceList, setProvinceList] = useState<string[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/locationsfestivity/list`);
        const fetchedLocations: Location[] = response.data;
        setLocations(fetchedLocations);
        
        // Extraer provincias únicas de la lista de ubicaciones.
        const provinces = Array.from(new Set(fetchedLocations.map(loc => loc.province)));
        setProvinceList(provinces);
      } catch (error) {
        console.error('Error fetching locations:', error);
        // Manejar error (por ejemplo, con un Alert)
      }
    };

    fetchLocations();
  }, []);

  const handleProvinceChange = (province: string) => {
    setFormData({ ...formData, selectedProvince: province, selectedCity: '' });
    
    // Filtrar las ciudades que pertenezcan a la provincia seleccionada.
    const filteredCities = locations
      .filter((loc: Location) => loc.province === province)
      .map((loc: Location) => loc.city);
    
    // Extraer solo ciudades únicas.
    const uniqueCities = Array.from(new Set(filteredCities));
    setCityList(uniqueCities);
  };

  useEffect(() => {
    fetchFestivalTypes();
  }, []);

  const fetchFestivalTypes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/typefestival/list`, );
      setFestivalTypes(response.data.remote);
    } catch (error) {
      console.error('Error fetching festival types:', error);
      Alert.alert('Error', 'Could not fetch festival types');
    }
  };

  const handleAddNewType = async (name: string, description: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/typefestival/register`, {
        name_FType: name,
        description_FType: description,
      });
      await fetchFestivalTypes();
      Alert.alert('Success', 'New festival type added successfully');
    } catch (error) {
      console.error('Error adding new festival type:', error);
      Alert.alert('Error', 'Could not add new festival type');
    }
  };

  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.7 as PhotoQuality,
    });
  
    if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      } else {
        Alert.alert('Error', 'No se pudo seleccionar la imagen');
      }
    };
  

  const handleCreateEvent = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('startDate', formData.startDate.toISOString());
      formDataToSend.append('endDate', formData.endDate.toISOString());
      formDataToSend.append('id_location', formData.locationId);
      formDataToSend.append('latitude', formData.latitude?.toString() || '');
      formDataToSend.append('longitude', formData.longitude?.toString() || '');

      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        formDataToSend.append('image', blob, 'image.jpg');
      }

      const response = await axios.post('/api/events', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event created successfully', response.data);
      Alert.alert('Success', 'Evento creado correctamente');
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'No se pudo crear el evento');
    }
  };

  return (
    <SafeAreaView style={MainStyles.safeAreaAFS}>
      <ScrollView style={MainStyles.scrollViewAFS}>
        <View style={MainStyles.containerAFS}>
          <Text style={MainStyles.titleAFS}>Create Festivity</Text>

          <Text style={MainStyles.labelAFS}>Name</Text>
          <TextInput
            style={MainStyles.inputAFS}
            placeholder="Enter festivity name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <Text style={MainStyles.labelAFS}>Description</Text>
          <TextInput
            style={MainStyles.textAreaAFS}
            placeholder="Enter festivity description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline={true}
            numberOfLines={4}
          />

          {/* Start Date & End Date */}
          <View style={MainStyles.dateContainerAFS}>
            <View style={MainStyles.dateInputAFS}>
              <Text style={MainStyles.labelAFS}>Start Date</Text>
              <TouchableOpacity
                style={MainStyles.datePickerFieldAFS}
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

            <View style={MainStyles.dateInputAFS}>
              <Text style={MainStyles.labelAFS}>End Date</Text>
              <TouchableOpacity
                style={MainStyles.datePickerFieldAFS}
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
          <Text style={MainStyles.labelAFS}>Festival Type</Text>
          <View style={MainStyles.festivalTypeContainerAFS}>
            <View style={MainStyles.pickerContainerAFS}>
              <Picker
                selectedValue={formData.festivalType}
                style={MainStyles.pickerAFS}
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, festivalType: itemValue })
                }
              >
                <Picker.Item label="Select a type" value="" />
                {festivalTypes.map((type) => (
                  <Picker.Item
                    key={type.id_festival_type}
                    label={type.name_FType}
                    value={type.id_festival_type}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={MainStyles.addTypeButtonAFS}
              onPress={() => setIsTypeModalVisible(true)}
            >
              <Icon name="plus-circle" size={24} color="#00CEC9" />
            </TouchableOpacity>
          </View>
          <View style={MainStyles.locationContainerAFS}>
            <View style={MainStyles.locationDropdownContainerAFS}>
              <Text style={MainStyles.labelAFS}>Province</Text>
              <View style={MainStyles.dropdownContainerAFS}>
                <Picker
                  selectedValue={formData.selectedProvince}
                  style={MainStyles.pickerAFS}
                  onValueChange={(itemValue) => handleProvinceChange(itemValue)}
                >
                  <Picker.Item label="Select province" value="" />
                  {provinceList.map((province) => (
                    <Picker.Item key={province} label={province} value={province} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={MainStyles.locationDropdownContainerAFS}>
            <Text style={MainStyles.labelAFS}>City</Text>
            <View style={MainStyles.dropdownContainerAFS}>
              <Picker
                selectedValue={formData.selectedCity}
                style={MainStyles.pickerAFS}
                enabled={formData.selectedProvince !== ''}
                onValueChange={(itemValue) => setFormData({ ...formData, selectedCity: itemValue })}
              >
                <Picker.Item label="Select city" value="" />
                {cityList.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
          <Text style={MainStyles.labelAFS}>Image</Text>
          <TouchableOpacity
            style={MainStyles.imagePickerAFS}
            onPress={handleImageSelect}
          >
            {imageUri ? (
              <ImageBackground
                source={{ uri: imageUri }}
                style={MainStyles.imagePreviewAFS}
                resizeMode="cover"
              />
            ) : (
              <View style={MainStyles.imagePlaceholderAFS}>
                <Icon name="image" size={50} color="#00CEC9" />
                <Text style={MainStyles.imagePlaceholderTextAFS}>Tap to select image</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={MainStyles.buttonContainerAFS}>
            <TouchableOpacity
              style={MainStyles.cancelButtonAFS}
              onPress={() => {}}
            >
              <Text style={MainStyles.cancelButtonTextAFS}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={MainStyles.createButtonAFS}
              onPress={handleCreateEvent}
            >
              <Text style={MainStyles.createButtonTextAFS}>Create Festivity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NewFestivalTypeModal
        visible={isTypeModalVisible}
        onClose={() => setIsTypeModalVisible(false)}
        onSave={handleAddNewType}
      />
    </SafeAreaView>
  );
};

export default AddFestivityScreen;
