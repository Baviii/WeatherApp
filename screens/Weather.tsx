import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {AppLayout} from '../components/AppLayout';
import TemparatureCard from '../components/TemparatureCard';
import type {Weather} from '../types/weather';
import dayjs from 'dayjs';
import WeatherLineChart from '../components/WeatherGraph';
import Error from '../components/Error';

// import {APP_API_KEY} from '@env';

export default function Weather() {
  const [weatherData, setWeatherData] = useState<Weather>();
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState(false);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=42d5752bf7a2f6f6e6c6e67c4c90e8a2&units=metric`,
      );
      const data = await response.json();
      if (data.cod != 404) {
        setWeatherData(data);
        setCityName('');
      } else {
        console.log({error});
        setError(true);
        setCityName('');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <AppLayout>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name to know the weather"
            value={cityName}
            onChangeText={text => setCityName(text)}
          />
          <Pressable style={styles.searchBtn} onPress={fetchWeatherData}>
            <Text style={styles.searchTxt}>Search</Text>
          </Pressable>
        </View>

        {error ? (
          <Error />
        ) : weatherData ? (
          <>
            <TemparatureCard
              name={weatherData?.city?.name ?? ''}
              north={weatherData?.city?.coord.lat ?? 0}
              east={weatherData?.city?.coord.lon ?? 0}
              population={weatherData?.city?.population ?? 0}
              sunrise={dayjs
                .unix(weatherData?.city?.sunrise ?? 0)
                .format('h:mm A')}
              sunset={dayjs
                .unix(weatherData?.city?.sunset ?? 0)
                .format('h:mm A')}
              temp={weatherData?.list[0].main.temp ?? 0}
              cloudName={weatherData?.list[0].weather[0].description ?? ''}
              feelsLike={weatherData?.list[0]?.main.feels_like ?? 0}
              humidity={weatherData?.list[0]?.main.humidity ?? 0}
              windSpeed={weatherData?.list[0].wind.speed ?? 0}
              image={`https://openweathermap.org/img/wn/${weatherData?.list[0]?.weather[0].icon}.png`}
            />
            <WeatherLineChart weatherData={weatherData} />
          </>
        ) : null}
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 12,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    color: '#333',
    width: '80%',
  },
  searchBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#071d66',
    padding: 10,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  searchTxt: {
    color: 'white',
    fontWeight: '600',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
