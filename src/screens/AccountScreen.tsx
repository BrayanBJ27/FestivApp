import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text } from "react-native";
import styles from '../styles/MainStyles'; // Asegúrate de importar los estilos

// Definimos el tipo de las propiedades que puede recibir el componente si es necesario
interface Props {}

const AccountScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
          resizeMode={"stretch"}
          style={styles.image}
        />
        <Text style={styles.titleText}>{"Settings"}</Text>
        <Text style={styles.subTitleText}>{"Edit profile"}</Text>
        
        {/* Example of an item */}
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{"Notification"}</Text>
          <Image
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
        </View>

        <View style={styles.separator}></View>
        
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{"Country"}</Text>
          <Image
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{"History"}</Text>
          <Image
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{"Terms of Service"}</Text>
          <Image
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomItem}>
            <Image
              source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <Text style={styles.bottomItemText}>{"Home"}</Text>
            <Text style={styles.bottomItemText}>{"Notification"}</Text>
            <Text style={styles.bottomItemText}>{"Map"}</Text>
            <Text style={styles.bottomActiveText}>{"Account"}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

