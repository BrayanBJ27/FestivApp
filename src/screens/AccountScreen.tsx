import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';
import BottomNavbar from '../components/BottomNavbar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../hooks/AppNavigator';

type AccountScreenProps = StackScreenProps<RootStackParamList, 'Account'>;

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Account');

  const renderButton = (text: string, onPress: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16, // Margen horizontal
        paddingVertical: 8, // Espaciado vertical reducido
      }}
    >
      <Text style={MainStyles.opTextAS}>{text}</Text>
      <Icon
        name="arrow-right"
        size={20}
        color="#000"
        style={{
          marginRight: 6, // Margen derecho ajustado
        }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerAS}>
          {/* Header */}
          <View style={MainStyles.headerAS}>
            <TouchableOpacity style={MainStyles.backButtonAS}>
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={MainStyles.titleTextAS}>{"Settings"}</Text>
          <Text style={MainStyles.subTitleTextAS}>{"Edit profile"}</Text>

          {/* Botones con flechas alineadas */}
          {renderButton("Notification", () => console.log('Navigate to Notification Screen'))}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View> {/* Separador reducido */}

          {renderButton("Country", () => console.log('Navigate to Country Screen'))}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View> {/* Separador reducido */}

          {renderButton("History", () => navigation.navigate('Calendar'))}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View> {/* Separador reducido */}

          {renderButton("Terms of Services", () => console.log('Navigate to Terms of Services'))}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View> {/* Separador reducido */}

          {renderButton("Help Center", () => console.log('Navigate to Help Center'))}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View> {/* Separador reducido */}

          {renderButton("Profile", () => console.log('Navigate to Profile'))}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View> {/* Separador reducido */}

          {renderButton("Log Out", () => console.log('Log Out'))}
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default AccountScreen;
