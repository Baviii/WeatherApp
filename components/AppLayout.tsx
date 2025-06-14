import {Children} from 'react';
import {StyleSheet, View} from 'react-native';

export const AppLayout = ({children}: any) => {
  return <View style={style.wrapper}>{children}</View>;
};

const style = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#e5ecf4',
    flex: 1,
  },
});
