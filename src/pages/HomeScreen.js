import {withNavigation} from 'react-navigation';
import React from 'react';
import {View, Text} from 'react-native';

function HomeScreen() {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
}

export default withNavigation(HomeScreen);
