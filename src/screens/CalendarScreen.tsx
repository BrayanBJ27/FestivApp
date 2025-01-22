import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainStyles from "../styles/MainStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CalendarScreen() {
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