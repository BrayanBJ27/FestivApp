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
        const response = await axios.get(`${BACKEND_URL}/provinces/list`);
        const { data } = response.data;
        
        // Aseguramos que provinces sea un array de strings
        const provinces: string[] = Array.from(
          new Set(
            data.map((item: { province: string }) => item.province)
          )
        );
        
        setProvinceList(provinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        Alert.alert('Error', 'Could not fetch provinces');
      }
    };
  
    fetchLocations();
  }, []);

  async function handleProvinceChange(province: string) {
    setFormData(prev => ({ ...prev, selectedProvince: province, selectedCity: '' }));
  
    if (!province) {
      setCityList([]);
      return;
    }
  
    try {
      const response = await axios.get(`${BACKEND_URL}/cities/list`, {
        params: { province }
      });
  
      const { data } = response.data;
      // Extraer solo las ciudades del array de objetos
      const cities = data.map((item: { city: string }) => item.city);
      setCityList(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      Alert.alert('Error', 'Could not fetch cities for the selected province');
      setCityList([]);
    }
  }

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

    const handleCreateFestivity = async () => {
      try {
        // Validación inicial de campos requeridos
        if (!formData.name.trim()) {
          Alert.alert('Error', 'Please enter a festival name');
          return;
        }
        if (!formData.description.trim()) {
          Alert.alert('Error', 'Please enter a festival description');
          return;
        }
        if (!formData.festivalType) {
          Alert.alert('Error', 'Please select a festival type');
          return;
        }
        if (!formData.selectedProvince || !formData.selectedCity) {
          Alert.alert('Error', 'Please select both province and city');
          return;
        }
    
        console.log('Starting festival creation process...');
        console.log('Initial form data:', formData);
    
        // Obtener el ID de ubicación
        const locationUrl = `${BACKEND_URL}/cities/location`;
        console.log('Fetching location ID from:', locationUrl);
        
        const locationResponse = await axios.get(locationUrl, {
          params: {
            city: formData.selectedCity,
            province: formData.selectedProvince
          }
        });
    
        console.log('Location response:', locationResponse.data);
    
        if (!locationResponse.data.id_location) {
          throw new Error('Location ID not found');
        }
    
        // Procesar la imagen si existe
        let imageBase64 = '';
        if (imageUri) {
          console.log('Processing image...');
          try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            
            imageBase64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64String = reader.result as string;
                // Extraer solo la parte base64, removiendo el prefijo data:image/...
                resolve(base64String.split(',')[1]);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            console.log('Image processed successfully');
          } catch (error) {
            console.error('Error processing image:', error);
            Alert.alert('Warning', 'Could not process image, continuing without image');
          }
        }
    
        // Preparar los datos del festival
        const festivalData = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          startDate: formData.startDate.toISOString().split('T')[0],
          endDate: formData.endDate.toISOString().split('T')[0],
          id_festival_type: Number(formData.festivalType),
          id_location: locationResponse.data.id_location,
          image: imageBase64 || null
        };
    
        console.log('Prepared festival data:', {
          ...festivalData,
          image: imageBase64 ? '[Image data present]' : 'null'
        });
    
        // Enviar la solicitud para crear el festival
        const createUrl = `${BACKEND_URL}/festivals/register`;
        console.log('Sending POST request to:', createUrl);
    
        const response = await axios.post(createUrl, festivalData, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 segundos de timeout
        });
    
        console.log('Server response:', response.data);
    
        if (response.data) {
          Alert.alert('Success', 'Festival created successfully!');
          
          // Resetear el formulario
          setFormData({
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
          setImageUri(null);
          setCityList([]);
        }
    
      } catch (error: any) {
        console.error('Full error object:', error);
        console.error('Error creating festival:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
    
        // Mensaje de error más detallado para el usuario
        let errorMessage = 'Failed to create festival';
        if (error.response) {
          // Error con respuesta del servidor
          errorMessage = error.response.data?.error || errorMessage;
        } else if (error.request) {
          // Error de red
          errorMessage = 'Network error. Please check your connection';
        } else {
          // Otros errores
          errorMessage = error.message || errorMessage;
        }
    
        Alert.alert(
          'Error',
          errorMessage,
          [
            {
              text: 'OK',
              onPress: () => console.log('Error alert closed')
            }
          ]
        );
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
                onValueChange={(itemValue) => 
                  setFormData({ ...formData, selectedCity: itemValue })
                }
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
              onPress={handleCreateFestivity}
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
