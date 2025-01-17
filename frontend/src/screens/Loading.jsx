import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React from 'react';
import bg from '../../assets/loadingbg.jpg';
import logo from '../../assets/logo.png'

const Loading = () => {
  return (
    <ImageBackground source={bg} style={styles.container}>
      <Text style={styles.text}>Product X</Text>
        <Image 
            source={logo}
            style={styles.image}
        />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',  // Make sure the text is visible on the background
    fontWeight: 'bold',
  },
  image:{
    position:'absolute',
    bottom:50
  }
});

export default Loading;
