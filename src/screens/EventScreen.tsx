import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MainStyles from "../styles/MainStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const EventScreen: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={MainStyles.safeAreaES}>
      <ImageBackground
        source={require("../assets/images/diablada.jpg")}
        style={MainStyles.backgroundImageES}
        resizeMode="cover"
      >
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={MainStyles.eventContainerES}>
            {/* Back Button */}
            <TouchableOpacity style={MainStyles.backButtonES}>
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>

            {/* Title and Description */}
            <Text style={MainStyles.eventTitleES}>Diablada Pillareña</Text>
            <Text style={MainStyles.eventDescriptionES}>
              The "Diablos de Píllaro" parade with colorful costumes and masks,
              representing a symbolic struggle between good and evil.
            </Text>

            {/* Reviews Section */}
            <View style={MainStyles.reviewContainerES}>
              <View style={MainStyles.ratingContainerES}>
              <Icon name="star" size={16} color="#FFD700" style={MainStyles.starIconES} />
            <Icon name="star" size={16} color="#FFD700" style={MainStyles.starIconES} />
            <Icon name="star" size={16} color="#FFD700" style={MainStyles.starIconES} />
            <Icon name="star" size={16} color="#FFD700" style={MainStyles.starIconES} />
            <Icon name="star-half" size={16} color="#FFD700" style={MainStyles.starIconES} />
            <Text style={MainStyles.ratingTextES}>4.79</Text>
              </View>
              <Text style={MainStyles.reviewTextES}>(78 reviews)</Text>
              <TouchableOpacity>
                <Text style={MainStyles.seeReviewsTextES}>See reviews</Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={MainStyles.buttonContainerES}>
              <TouchableOpacity style={MainStyles.primaryButtonES}>
                <Text style={MainStyles.primaryButtonTextES}>
                  Enter the plan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={MainStyles.secondaryButtonES}>
                <Text style={MainStyles.secondaryButtonTextES}>
                  View other
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EventScreen;
