import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles from "../../Styles/HomeStyles";
import Korea from "../Korea";
import Region from "../Region";

const IMAGE_URL = "../../assets/home";

const Tab = createMaterialTopTabNavigator();

class HomeScreen extends React.Component {
  state = {
    location: "서울특별시 관악구",
  };
  render() {
    const { location } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.topBar}
          resizeMode={"contain"}
          source={require(`${IMAGE_URL}/top_bar.png`)}
        >
          <Image
            style={{ height: 20, width: 16 }}
            source={require(`${IMAGE_URL}/location_icon.png`)}
          />
          <Text style={styles.textLocation}>{location}</Text>
          <TouchableOpacity>
            <Image
              style={{ height: 6, width: 11 }}
              source={require(`${IMAGE_URL}/white_tri.png`)}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.content}>
          <Text style={styles.title}>국내현황</Text>
          <Tab.Navigator style={styles.locationNav}>
            <Tab.Screen name="Korea" component={Korea} />
            <Tab.Screen name="Region" component={Region} />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
