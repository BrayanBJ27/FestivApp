import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";

const ScheduleScreen: React.FC = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState<string>("Home");
  return (
    <SafeAreaView style={MainStyles.safeAreaSS}>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior='automatic'
        style={MainStyles.scrollViewSS}
      >
        <View style={MainStyles.containerSS}>
          <Text style={MainStyles.greetingTextSS}>Good morning</Text>
          <Text style={MainStyles.mainTitleSS}>Hello, Brayan</Text>
          <ImageBackground
            style={MainStyles.profileIconSS}
            source={require('../assets/images/diablada.jpg')}
            resizeMode='cover'
          />

          <Text style={MainStyles.sectionTitleSS}>Diablada Pillareña</Text>
          <ImageBackground
            style={MainStyles.mainImageSS}
            source={require('../assets/images/diablada.jpg')}
            resizeMode='cover'
          >
            <View style={MainStyles.overlayContainerSS}>
            <Icon
                name="location-arrow"
                size={20}
                color="#fff"
              />
              <Text style={MainStyles.locationTextSS}>Pillaro/Tungurahua</Text>
              <View style={MainStyles.buttonContainerSS}>
              <Icon name="calendar" size={20} color="#ffffff" />
              </View>
            </View>
          </ImageBackground>
          <View style={MainStyles.dragIndicatorSS} />
          <View style={MainStyles.scheduleContainerSS}>
            <View style={MainStyles.scheduleHeaderSS}>
              <Text style={MainStyles.scheduleTitleSS}>Schedule</Text>
            </View>
            <View style={MainStyles.scheduleItemSS}>
              <Text style={MainStyles.timeTextSS}>10:30</Text>
              <View style={MainStyles.timelineSS}>
                <View style={MainStyles.timelineActiveSS} />
              </View>
              <Text style={MainStyles.locationNameSS}>Píllaro Central</Text>
              <Text style={MainStyles.dateTextSS}>Jan 1</Text>
              <Icon
                name="cloud-rain"
                size={20}
                color="#0373f3"
                style={MainStyles.weatherIconSS}
              />
              <Icon
                name="location-dot"
                size={20}
                color="#0373f3"
                style={MainStyles.scheduleIconSS}
              />
            </View>

            <View style={MainStyles.scheduleItemSS}>
              <Text style={MainStyles.timeTextSS}>12:00</Text>
              <View style={MainStyles.timelineSS}>
                <View style={MainStyles.timelineInactiveSS} />
              </View>
              <Text style={MainStyles.locationNameSS}>San Vicente de Quilimbulo</Text>
              <Text style={MainStyles.dateTextSS}>Jan 2nd-3rd</Text>
              <Icon
                name="sun"
                size={20}
                color="#adadad"
                style={MainStyles.weatherIconSS}
              />
              <Icon
                name="location-dot"
                size={20}
                color="#adadad"
                style={MainStyles.scheduleIconSS}
              />
            </View>

            <View style={MainStyles.scheduleItemSS}>
              <Text style={MainStyles.timeTextSS}>15:00</Text>
              <View style={MainStyles.timelineSS}>
                <View style={MainStyles.timelineInactiveSS} />
              </View>
              <Text style={MainStyles.locationNameSS}>Tunguipamba</Text>
              <Text style={MainStyles.dateTextSS}>Jan 4th-5th</Text>
              <Icon
                name="cloud"
                size={20}
                color="#adadad"
                style={MainStyles.weatherIconSS}
              />
              <Icon
                name="location-dot"
                size={20}
                color="#adadad"
                style={MainStyles.scheduleIconSS}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navbar */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default ScheduleScreen;