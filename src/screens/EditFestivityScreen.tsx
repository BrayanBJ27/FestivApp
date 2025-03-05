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
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import MainStyles from '../styles/MainStyles';
import axios from 'axios';
import { launchImageLibrary, PhotoQuality } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type EditFestivityScreenRouteProp = RouteProp<RootStackParamList, 'EditFestivityScreen'>;
type EditFestivityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditFestivityScreen'>;

type Props = {
  route: EditFestivityScreenRouteProp;
  navigation: EditFestivityScreenNavigationProp;
}

const BACKEND_URL = "http://192.168.121.213:3000";

interface FestivalType {
  id_festival_type: number;
  name_FType: string;
}

interface Festival {
  id_festival: number;
  name_Festival: string;
  description_Festival: string;
  start_date: string;
  end_date: string;
  id_festival_type: number;
  id_location: number;
  image: string | null;
}

interface EditFestivityScreenProps {
  route: RouteProp<RootStackParamList, 'EditFestivityScreen'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const EditFestivityScreen: React.FC<Props> = ({ route, navigation }) => {
  const { festivityId } = route.params;

  const [formData, setFormData] = useState({
    selectedProvince: '',
    selectedCity: '',
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    festivalType: '',
  });

  const [festivalTypes, setFestivalTypes] = useState<FestivalType[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [provinceList, setProvinceList] = useState<string[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch festival data
  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/festivals/${festivityId}`);
        const festival = response.data;
        
        setFormData({
          name: festival.name_Festival,
          description: festival.description_Festival,
          startDate: new Date(festival.start_date),
          endDate: new Date(festival.end_date),
          festivalType: festival.id_festival_type.toString(),
          selectedProvince: festival.province,
          selectedCity: festival.city,
        });

        if (festival.image) {
          setImageUri(`data:image/jpeg;base64,${festival.image}`);
        }

        // Fetch cities for the selected province
        await handleProvinceChange(festival.province);
        
      } catch (error) {
        console.error('Error fetching festival:', error);
        Alert.alert('Error', 'Could not fetch festival data');
      } finally {
        setLoading(false);
      }
    };

    fetchFestivalData();
  }, [festivityId]);

  // Fetch festival types
  useEffect(() => {
    const fetchFestivalTypes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/typefestival/list`);
        setFestivalTypes(response.data.remote);
      } catch (error) {
        console.error('Error fetching festival types:', error);
        Alert.alert('Error', 'Could not fetch festival types');
      }
    };

    fetchFestivalTypes();
  }, []);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/provinces/list`);
        const provinces: string[] = response.data.data.map((item: { province: string }) => item.province);
        setProvinceList(Array.from(new Set(provinces)));
      } catch (error) {
        console.error('Error fetching provinces:', error);
        Alert.alert('Error', 'Could not fetch provinces');
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (province: string) => {
    setFormData(prev => ({ ...prev, selectedProvince: province, selectedCity: '' }));
    
    if (!province) {
      setCityList([]);
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/cities/list`, {
        params: { province }
      });
      const cities = response.data.data.map((item: { city: string }) => item.city);
      setCityList(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      Alert.alert('Error', 'Could not fetch cities');
      setCityList([]);
    }
  };

  const handleImageSelect = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Could not select image');
    }
  };

  const handleUpdateFestivity = async () => {
    try {
      // Validación inicial
      if (!formData.name.trim() || !formData.description.trim() || 
          !formData.festivalType || !formData.selectedProvince || 
          !formData.selectedCity) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      // Obtener ID de ubicación
      const locationResponse = await axios.get(`${BACKEND_URL}/cities/location`, {
        params: {
          city: formData.selectedCity,
          province: formData.selectedProvince
        }
      });

      if (!locationResponse.data.id_location) {
        throw new Error('Location ID not found');
      }

      // Procesar imagen si existe
      let imageBase64 = '';
      if (imageUri) {
        if (imageUri.startsWith('data:image')) {
          // La imagen ya está en base64
          imageBase64 = imageUri.split(',')[1];
        } else {
          // Convertir la nueva imagen a base64
          const response = await fetch(imageUri);
          const blob = await response.blob();
          const reader = new FileReader();
          imageBase64 = await new Promise((resolve) => {
            reader.onload = () => {
              const base64String = reader.result as string;
              resolve(base64String.split(',')[1]);
            };
            reader.readAsDataURL(blob);
          });
        }
      }

      const festivalData = {
        name_Festival: formData.name.trim(),
        description_Festival: formData.description.trim(),
        start_date: formData.startDate.toISOString().split('T')[0],
        end_date: formData.endDate.toISOString().split('T')[0],
        id_festival_type: Number(formData.festivalType),
        id_location: locationResponse.data.id_location,
        image: imageBase64 || null
      };

      await axios.put(`${BACKEND_URL}/festivals/${festivityId}`, festivalData);
      
      Alert.alert(
        'Success',
        'Festival updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );

    } catch (error) {
      console.error('Error updating festival:', error);
      Alert.alert('Error', 'Could not update festival');
    }
  };

  if (loading) {
    return (
      <View style={[MainStyles.containerAFS, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={MainStyles.safeAreaAFS}>
      <ScrollView style={MainStyles.scrollViewAFS}>
        <View style={MainStyles.containerAFS}>
          <Text style={MainStyles.titleAFS}>Edit Festivity</Text>

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

          {/* Dates Section */}
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

          {/* Festival Type */}
          <Text style={MainStyles.labelAFS}>Festival Type</Text>
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
                  value={type.id_festival_type.toString()}
                />
              ))}
            </Picker>
          </View>

          {/* Location */}
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

          {/* Image */}
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

          {/* Buttons */}
          <View style={MainStyles.buttonContainerAFS}>
            <TouchableOpacity
              style={MainStyles.cancelButtonAFS}
              onPress={() => navigation.goBack()}
            >
              <Text style={MainStyles.cancelButtonTextAFS}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={MainStyles.createButtonAFS}
              onPress={handleUpdateFestivity}
            >
              <Text style={MainStyles.createButtonTextAFS}>Update Festivity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditFestivityScreen;