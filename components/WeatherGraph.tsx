// WeatherLineChart.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import {Weather} from '../types/weather';

type WeatherLineChartProps = {
  weatherData: Weather;
};

// Solution 1: Enhanced Single Chart with Legend and Better Styling
export default function WeatherLineChart({weatherData}: WeatherLineChartProps) {
  if (!weatherData || !weatherData.list) return null;

  const data = weatherData.list.slice(0, 8); // Reduced to 8 points for clarity
  const temperatureData = data.map(item => Math.round(item.main.temp));
  const feelsLikeData = data.map(item => Math.round(item.main.feels_like));
  const labels = data.map(item => item.dt_txt.slice(11, 16)); // HH:mm

  const contentInset = {top: 20, bottom: 20};

  // Find min/max for better Y-axis scaling
  const allTemps = [...temperatureData, ...feelsLikeData];
  const minTemp = Math.min(...allTemps) - 2;
  const maxTemp = Math.max(...allTemps) + 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature & Feels Like (°C)</Text>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine, {backgroundColor: '#FF6B35'}]} />
          <Text style={styles.legendText}>Temperature</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine, {backgroundColor: '#4ECDC4'}]} />
          <Text style={styles.legendText}>Feels Like</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <YAxis
          data={temperatureData}
          min={minTemp}
          max={maxTemp}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: '#666', fontWeight: 'bold'}}
          numberOfTicks={5}
          formatLabel={(value: any) => `${Math.round(value)}°`}
        />
        <View style={styles.chartWrapper}>
          {/* Temperature Line */}
          <LineChart
            style={StyleSheet.absoluteFill}
            data={temperatureData}
            min={minTemp}
            max={maxTemp}
            svg={{
              stroke: '#FF6B35',
              strokeWidth: 2,
              //   strokeLinecap: 'round',
              //   strokeLinejoin: 'round',
            }}
            contentInset={contentInset}
            animate={true}
            animationDuration={300}>
            <Grid svg={{stroke: '#E0E0E0', strokeWidth: 1}} />
          </LineChart>

          {/* Feels Like Line */}
          <LineChart
            style={StyleSheet.absoluteFill}
            data={feelsLikeData}
            min={minTemp}
            max={maxTemp}
            svg={{
              stroke: '#4ECDC4',
              strokeWidth: 3,
              strokeDasharray: [2, 5], // Dashed line to differentiate
              strokeLinecap: 'round',
            }}
            contentInset={contentInset}
            animate={true}
            animationDuration={300}
          />
        </View>
      </View>

      <XAxis
        style={styles.xAxis}
        data={temperatureData}
        formatLabel={(value: any, index: number) => {
          // Show every other label to avoid congestion
          return index % 2 === 0 ? labels[index] : '';
        }}
        contentInset={{left: 40, right: 20}}
        svg={{fontSize: 11, fill: '#666', fontWeight: '400'}}
        numberOfTicks={labels.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 18,
    color: '#333',
  },
  subTitle: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendLine: {
    width: 20,
    height: 3,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 180,
    marginBottom: 10,
  },
  chartWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  xAxis: {
    marginHorizontal: 15,
    height: 30,
  },
  separateChartContainer: {
    marginBottom: 20,
  },
  xAxisSmall: {
    marginHorizontal: 15,
    height: 25,
  },
  tempValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  tempValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
  },
});
