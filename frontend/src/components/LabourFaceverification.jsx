import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'; 
import { BASE_URL } from '../auth/config'
import axios from 'axios'

const LabourFaceVerification = () => {
  const route=useRoute();
  const [labour, setLabour] = useState({})
  const { labourid } = route.params; // Retrieve the labourId from the route parameters

  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState('back')
  const [image, setImage] = useState(null)
  useEffect(() => {
    async function getLabour() {
      try {
        const response = await axios.get(
          `${BASE_URL}/labours/labourDetails/${labourid}`,
        )
        setLabour(response.data.data.labour)
      } catch (error) {
        console.error('Failed to find labour:', error.message)
      }
    }
    getLabour()
  }, [labourid])

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function toggleCameraFacing() {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/icon.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{labour.name}</Text>
          <Text style={styles.details}>Phone Number: {labour.Contact}</Text>
          <Text style={styles.details}>Type: {labour.Type}</Text>
        </View>
      </View>

      <CameraView style={styles.camera} facing={cameraType}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default LabourFaceVerification