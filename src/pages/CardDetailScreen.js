import {withNavigation} from 'react-navigation';
import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

function CardDetailScreen({navigation}) {
  const imageUrl = navigation.getParam('imageUrl');

  return (
    <WebView
      source={{uri: imageUrl}}
      style={styles.container}
      onError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
    />
  );
}

export default withNavigation(CardDetailScreen);
