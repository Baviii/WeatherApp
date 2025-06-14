import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export type TempProps = {
  name: string;
  north: number;
  east: number;
  population: number;
  sunrise: string;
  sunset: string;
  temp: number;
  cloudName: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  image: string;
};
export default function TemparatureCard(props: TempProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.populationContainer}>
        <Text style={styles.cityNameText}>{props.name}</Text>
        <Text style={styles.infoText}>
          {props.north}N {props.east}
        </Text>
        <Text style={styles.infoText}>
          {' '}
          <Text style={{fontWeight: '600'}}>Population: </Text>{' '}
          {props.population}
        </Text>
        <Text style={styles.infoText}>
          <Text style={{fontWeight: '600'}}>Sunrise: </Text>
          {props.sunrise}
        </Text>
        <Text style={styles.infoText}>
          <Text style={{fontWeight: '600'}}>Sunset: </Text>
          {props.sunset}
        </Text>
      </View>

      <View style={styles.tempContainer}>
        <Image source={{uri: props.image}} style={styles.image} />
        <View style={styles.populationContainer}>
          <Text style={styles.cityNameText}>{props.temp}</Text>
          <Text style={styles.infoText}>{props.cloudName}</Text>
          <Text style={styles.infoText}>
            {' '}
            <Text style={{fontWeight: '600'}}>Feels like: </Text>{' '}
            {props.feelsLike}
          </Text>
          <Text style={styles.infoText}>
            <Text style={{fontWeight: '600'}}>Humidity: </Text>
            {props.humidity}
          </Text>
          <Text style={styles.infoText}>
            <Text style={{fontWeight: '600'}}>Wind speed: </Text>
            {props.windSpeed}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'column',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d4da',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  populationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginHorizontal: 'auto',
  },
  tempContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-around',
    backgroundColor: '#f2f5fc',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d4da',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: 'black',
    borderRadius: 4,
    opacity: 0.5,
  },
  cityNameText: {
    color: '#0d1b4a',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'manrope',
    lineHeight: 20,
  },
  infoText: {
    color: '#0d1b4a',
    fontWeight: '400',
    fontSize: 15,
    fontFamily: 'manrope',
    lineHeight: 20,
  },
});
