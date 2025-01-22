import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MainStyles from "../styles/MainStyles";

export default function CalendarScreen() {
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerCS}>
          <View style={MainStyles.headerCS}>
            <ImageBackground
              style={MainStyles.backButtonCS}
              source={require('./assets/images/d8f6c9f1-e3bc-4a2c-93ad-2afecf949158.png')}
              resizeMode="cover"
            />
            <Text style={MainStyles.headerTextCS} numberOfLines={1}>
              My Plan
            </Text>
          </View>
          <ImageBackground
            style={MainStyles.imageBannerCS}
            source={require('./assets/images/8b9a943435507c3a17453a2afe21258126333383.png')}
            resizeMode="cover"
          >
            <Text style={MainStyles.eventTitleCS} numberOfLines={1}>
              Diablada Pillareña
            </Text>
          </ImageBackground>
          <View style={MainStyles.calendarHeaderCS}>
            <Text style={MainStyles.calendarTitleCS}>Calendar Event</Text>
            <Text style={MainStyles.monthTextCS}>January</Text>
          </View>
          {/* Aquí agregaré un calendario dinámico */}
          <View style={MainStyles.calendarCS}>
            <Text style={MainStyles.dateCS}>Mon</Text>
            <Text style={MainStyles.dateCS}>Tue</Text>
            <Text style={MainStyles.dateCS}>Wed</Text>
            <Text style={MainStyles.dateCS}>Thu</Text>
            <Text style={MainStyles.dateCS}>Fri</Text>
            <Text style={MainStyles.dateCS}>Sat</Text>
            <Text style={MainStyles.dateCS}>Sun</Text>
          </View>
          <Text style={MainStyles.shareTitleCS}>Share</Text>
          <View style={MainStyles.contactInputCS}>
            <Text style={MainStyles.selectContactCS}>Select contact</Text>
          </View>
          <Text style={MainStyles.sendEmailCS}>Send to your email</Text>
          <View style={MainStyles.buttonCS}>
            <Text style={MainStyles.buttonTextCS}>Go</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}