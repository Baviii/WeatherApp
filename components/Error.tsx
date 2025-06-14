import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Error() {
  console.log('came insiude error');
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: '500', fontSize: 18}}>No city found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: 'auto',
  },
});
