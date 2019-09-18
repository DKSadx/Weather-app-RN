import React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import Header from '../components/Header/Header';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import DailyWeather from '../components/DailyWeather/DailyWeather';
import BottomIndicator from '../components/BottomIndicator/BottomIndicator';

export default function MainScreen(props) {
  const { navigate } = props.navigation;
  return (
    <GestureRecognizer onSwipeLeft={() => navigate('RightScreen')}>
      <ImageBackground source={require('../assets/images/1.jpg')} style={styles.imageBackground}>
        <View style={styles.mainScreen}>
          <Header name="Bjelašnica" />
          <CurrentWeather name="Bjelašnica" />
          <DailyWeather />
          <BottomIndicator name="Jahorina" direction="forward" navigation={props.navigation} />
        </View>
      </ImageBackground>
    </GestureRecognizer>
  );
}

MainScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  mainScreen: {
    height: '100%',
    width: '100%',
  },
});
