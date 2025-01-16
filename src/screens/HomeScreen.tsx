import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainStyles from '../styles/MainStyles';

const HomeScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('Home');
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.containerHS}>
            <View style={MainStyles.headerContainerHS}>
              <ImageBackground
                style={MainStyles.headerIconHS}
                source={require('../assets/images/google-icon.png')}
                resizeMode="cover"
              />
              <Text style={MainStyles.headerTextHS}>
                Find your next trip and discover more about Ecuador
              </Text>
            </View>
            <Text style={MainStyles.titleTextHS}>The following holidays.</Text>
            {/* Search Box */}
          <View style={MainStyles.searchContainerHS}>
            <View style={MainStyles.searchBoxHS}>
              <Icon
                name="search"
                size={20}
                color="#adadad"
                style={MainStyles.inputIcon}
              />
              <TextInput
                style={MainStyles.textInputHS}
                placeholder="Search..."
                placeholderTextColor="#adadad"
              />
            </View>
            <TouchableOpacity style={MainStyles.filterButtonHS}>
              <Icon name="sliders" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
            <Text style={MainStyles.sectionTitleHS}>Popular festivities</Text>
            <ImageBackground
              style={MainStyles.popularFestivityHS}
              source={require('../assets/images/google-icon.png')}
              resizeMode="cover"
            >
              <Text style={MainStyles.popularFestivityTextHS}>Carnaval Guaranda</Text>
              <View style={MainStyles.popularFestivityDetailsHS}>
                <Text style={MainStyles.dateTextHS}>March 3rd & 4th.</Text>
                <View style={MainStyles.ratingContainerHS}>
                  <Text style={MainStyles.ratingTextHS}>4.9</Text>
                  <ImageBackground
                    style={MainStyles.ratingIconHS}
                    source={require('../assets/images/star.png')}
                  />
                </View>
              </View>
            </ImageBackground>
            <Text style={MainStyles.sectionTitleHS}>Other festivities</Text>
            <View style={MainStyles.otherFestivitiesContainerHS}>
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require('../assets/images/google-icon.png')}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>Diablada Pillareña</Text>
                <Text style={MainStyles.otherFestivityDateHS}>January, 6th</Text>
              </ImageBackground>
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require('../assets/images/google-icon.png')}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>Mama Negra</Text>
                <Text style={MainStyles.otherFestivityDateHS}>November 30th</Text>
              </ImageBackground>
            </View>
            {/* Footer Navigation*/}
            <View style={MainStyles.bottomNavContainer}>
              <TouchableOpacity 
                style={MainStyles.navButton}
                onPress={() => setActiveTab('Home')}
              >
                <Icon name="home" size={24} style={activeTab === 'Home' ? MainStyles.activeIcon : MainStyles.inactiveIcon}/>
                <Text style={[MainStyles.navText, 
                    activeTab === 'Home' ? MainStyles.activeNavText : MainStyles.inactiveNavText]}>
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={MainStyles.navButton}
                onPress={() => setActiveTab('Notification')}
              >
                <Icon 
                  name="bell" size={24} 
                  style={activeTab === 'Notification' ? MainStyles.activeIcon : MainStyles.inactiveIcon}
                />
                <Text 
                  style={[
                    MainStyles.navText,
                    activeTab === 'Notification' ? MainStyles.activeNavText : MainStyles.inactiveNavText
                  ]}
                >
                  Notification
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={MainStyles.navButton}
                onPress={() => setActiveTab('Map')}
              >
                <Icon 
                  name="map-marker" size={24} 
                  style={activeTab === 'Map' ? MainStyles.activeIcon : MainStyles.inactiveIcon}
                />
                <Text 
                  style={[
                    MainStyles.navText,
                    activeTab === 'Map' ? MainStyles.activeNavText : MainStyles.inactiveNavText
                  ]}
                >
                  Map
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={MainStyles.navButton}
                onPress={() => setActiveTab('Account')}
              >
                <Icon 
                  name="user" size={24} 
                  style={activeTab === 'Account' ? MainStyles.activeIcon : MainStyles.inactiveIcon}
                />
                <Text 
                  style={[
                    MainStyles.navText,
                    activeTab === 'Account' ? MainStyles.activeNavText : MainStyles.inactiveNavText
                  ]}
                >
                  Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;