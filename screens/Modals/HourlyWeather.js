import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

import CustomImage from '../../components/CustomImage/CustomImage';
import { textStyles } from '../../utils/textStyles';
import { calculateWindDirection } from '../../utils/functions';

export default function HourlyWeather(props) {
  const { navigate } = props.navigation;
  const { data, dateDay, closeModal } = props.screenProps;

  const generateHourlyContainers = data.hourly.data.map((hour, i) => {
    const { icon } = hour;
    const time = moment.unix(hour.time).format('HH:mm');
    const temperature = Math.round(hour.temperature);
    const day = moment.unix(hour.time).format('DD');
    const windDirection = calculateWindDirection(hour.windBearing);
    const windSpeed = Math.round((hour.windSpeed / 1000) * 360000) / 100;
    if (day === dateDay) {
      return (
        <TouchableOpacity key={i} onPress={() => navigate('Details')}>
          <View style={styles.hourlyView}>
            <View style={styles.timeView}>
              <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.weatherIcon}>
              <CustomImage icon={icon} styles={{ width: 38, height: 38, tintColor: '#fff' }} />
            </View>
            <View style={styles.hourlyTemp}>
              <Text style={styles.hourlyTempText}>{temperature}°C</Text>
            </View>
            <View style={styles.windContainer}>
              <View style={styles.windProperties}>
                <Image
                  source={require('../../assets/icons/png/wind-speed.png')}
                  style={{ width: 20, height: 15, tintColor: '#fff', marginBottom: 10 }}
                />
                <Text
                  style={{
                    ...textStyles.bold,
                    ...styles.windSpeed,
                    color: windSpeed > '10' ? (windSpeed >= 15 ? 'red' : 'yellow') : '#29cf04',
                  }}
                >
                  {` ${windSpeed}km/h`}
                </Text>
              </View>
              <View style={styles.windProperties}>
                <Image
                  source={require('../../assets/icons/png/wind-direction.png')}
                  style={{ width: 20, height: 20, tintColor: '#fff', paddingTop: 10 }}
                />
                <Text style={{ ...textStyles.bold, ...styles.windDirection }}>
                  {` ${windDirection}km/h`}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  });

  return (
    <>
      <View style={styles.hourlyContainer}>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={{ position: 'absolute', top: '20%', left: '5%' }}
            onPress={() => closeModal()}
          >
            <Entypo name="cross" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>Hourly</Text>
          </View>
        </View>
        <ScrollView>{data && generateHourlyContainers}</ScrollView>
      </View>
    </>
  );
}

HourlyWeather.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  hourlyContainer: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
  },
  titleView: {
    alignSelf: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    marginBottom: '5%',
    marginTop: '5%',
    width: '50%',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
  hourlyView: {
    flex: 1,
    backgroundColor: 'rgba(5,102,141, 0.5)',
    height: 60,
    marginTop: '2%',
    marginHorizontal: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  timeView: {
    flex: 3,
    paddingLeft: '4%',
  },
  time: {
    fontFamily: 'RobotoCondensed',
    color: '#fff',
  },
  weatherIcon: {
    flex: 2.5,
    width: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  hourlyTemp: {
    flex: 5,
    alignItems: 'flex-start',
    paddingLeft: '7%',
  },
  hourlyTempText: {
    fontSize: 25,
    color: '#fff',
  },
  hourlyLimits: {
    flex: 4,
  },
  windProperties: {
    flexDirection: 'row',
  },
  windSpeed: {
    color: '#fff',
    fontSize: 10,
  },
  windDirection: {
    color: '#fff',
    fontSize: 10,
    paddingTop: 5,
  },
});
