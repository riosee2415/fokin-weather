import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "bf006490e5e99f29c1a25b36aa2bd63f";

export default class App extends React.Component {
  state = {
    isLoading: true,
    temp: 0
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );

    this.setState({ isLoading: false, temp: data.main.temp });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();

      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();

      // Send To API
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
      // Send to API
    } catch (error) {
      Alert.alert("Can't Find You.", "So sad...");
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
  }
}
