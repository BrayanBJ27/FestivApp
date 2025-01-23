import React, {useState} from 'react';
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import MainStyles from "../styles/MainStyles";
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";

// Definimos el tipo de las propiedades que puede recibir el componente si es necesario
interface Props {}

const AccountScreen: React.FC= (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Account");
  return (
    <SafeAreaView style={MainStyles.container}>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
      <View style={MainStyles.containerAS}>
          <View style={MainStyles.headerAS}>
            <TouchableOpacity style={MainStyles.backButtonAS}>
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={MainStyles.titleTextAS}>{"Settings"}</Text>
          <Text style={MainStyles.subTitleTextAS}>{"Edit profile"}</Text>
        
          {/* Items*/}
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
              <Text style={MainStyles.opTextAS}>Notification</Text>
              <Icon name="arrow-right" size={20} color="#000" style={MainStyles.opButtonAS}/>
          </View>
          <View style={MainStyles.separator}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
              <Text style={MainStyles.opTextAS}>Country</Text>
              <Icon name="arrow-right" size={20} color="#000" style={MainStyles.opButtonAS}/>
          </View>
          <View style={MainStyles.separator}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
              <Text style={MainStyles.opTextAS}>History</Text>
              <Icon name="arrow-right" size={20} color="#000" style={MainStyles.opButtonAS}/>
          </View>
          <View style={MainStyles.separator}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
              <Text style={MainStyles.opTextAS}>Term of Services</Text>
              <Icon name="arrow-right" size={20} color="#000" style={MainStyles.opButtonAS}/>
          </View>
          <View style={MainStyles.separator}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
              <Text style={MainStyles.opTextAS}>Help Center</Text>
              <Icon name="arrow-right" size={20} color="#000" style={MainStyles.opButtonAS}/>
          </View>
          <View style={MainStyles.separator}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
              <Text style={MainStyles.opTextAS}>Profile</Text>
              <Icon name="arrow-right" size={20} color="#000" style={MainStyles.opButtonAS}/>
          </View>
          <View style={MainStyles.separator}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
              <Text style={MainStyles.opTextAS}>Log Out</Text>
              <Icon name="arrow-right" size={20} color="#000" style={MainStyles.opButtonAS}/>
          </View>
          <View style={MainStyles.separator}></View>
        </View>
      </ScrollView>
      {/* Footer Navigation*/}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default AccountScreen;

