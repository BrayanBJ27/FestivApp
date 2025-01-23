import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import MainStyles from "../styles/MainStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import {Calendar} from 'react-native-calendars';

export default function CalendarScreen() {
  const [selected, setSelected] = useState('');
  const [emailEnabled, setEmailEnabled] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerCS}>
          <View style={MainStyles.headerCS}>
            <TouchableOpacity style={MainStyles.backButtonCS}>
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={MainStyles.headerTextCS} numberOfLines={1}>
              My Plan
            </Text>
          </View>
          <ImageBackground
            style={MainStyles.imageBannerCS}
            source={require('../assets/images/diablada.jpg')}
            resizeMode="cover"
          >
            <Text style={MainStyles.eventTitleCS} numberOfLines={1}>
              Diablada Pillareña
            </Text>
          </ImageBackground>
          <View style={MainStyles.calendarHeaderCS}>
            <Text style={MainStyles.calendarTitleCS}>Calendar Event</Text>
          </View>
          {/* Aquí agregaré un calendario dinámico */}
          <Calendar
                onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                  setSelected(day.dateString);
                }}
                markedDates={{
                  [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
              />
          <Text style={MainStyles.shareTitleCS}>Share</Text>
          <TouchableOpacity style={[MainStyles.contactInputCS, { flexDirection: 'row', alignItems: 'center' }]}>
            <Text style={MainStyles.selectContactCS}>Select contact</Text>
            <Icon name="chevron-right" size={15} color="#a9a9a9" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginHorizontal: 4}}>
            <Text style={MainStyles.sendEmailCS}>Send to your email</Text>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              style={{ marginLeft: 'auto', marginRight: 20, top: 15 }}
              trackColor={{ false: '#e9e9e9', true: '#0373f3' }}
            />
          </View>
          <TouchableOpacity style={MainStyles.buttonCS}>
            <Text style={MainStyles.buttonTextCS}>Go</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}