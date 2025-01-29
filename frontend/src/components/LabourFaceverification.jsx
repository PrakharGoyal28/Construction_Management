import { Button, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { CameraView, useCameraPermissions } from 'expo-camera';
import { BASE_URL } from '../auth/config'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LabourFaceVerification = ({ route }) => {
  const [labour, setLabour] = useState({})
  const navigation = useNavigation()
  const { labourId } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState('back')
  const [image, setImage] = useState(null)
  const [camera, setCamera] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getLabour() {
      try {
        const response = await axios.get(
          `${BASE_URL}/labours/labourDetails/${labourId}`,
        )
        setLabour(response.data.data.labour)
      } catch (error) {
        console.error('Failed to find labour:', error.message)
      }
    }
    getLabour()
  }, [labourId])

  const takePicture = async () => {
    // if (!camera) return;
    // setLoading(true);
    // try {
    //   const photo = await camera.takePictureAsync({
    //     quality: 0.5,
    //   });
    //   setImage(photo.uri); // Show the preview of the image
    //   await sendImageToBackend(photo.uri); // Send the image URI to the backend
    // } catch (error) {
    //   console.error("Failed to take picture:", error);
    //   alert("Failed to capture image. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
    ToastAndroid.show("Attendance Marked", ToastAndroid.SHORT);
    navigation.goBack()
  };


  const sendImageToBackend = async (imageUri) => {
    try {
      // Create FormData to send the image file
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg", // Adjust based on your image type
        name: "photo.jpg", // Provide a file name
      });
      formData.append("labourId", labourId); // Add labourId to the form data

      // Send the image to the backend for embedding generation and verification
      const similarityResponse = await axios.post(`${BASE_URL}/labours/verifyembedding`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (similarityResponse.data.matched) {
        alert("Face verified successfully! Attendance marked.");
        navigation.navigate("LabourAttendenceDetail", {
          attendenceDetail: labour.Attendance,
        });
      } else {
        alert("Face verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during face verification:", error.message);
      alert("An error occurred during face verification.");
    }
  };



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
      <View style={styles.cal}>
        <MaterialCommunityIcons
          name="calendar"
          onTouchEndCapture={() => navigation.navigate("LabourAttendenceDetail", { attendenceDetail: labour.Attendance })}
          size={35}
          color="black"
        />
      </View>
      <View style={styles.card}>
        <Image
          source={{
            uri:
              labour.ImageUrl ||
              "https://th.bing.com/th/id/OIP.F7AAZ51YNslUUrejRKkDeQHaE1?rs=1&pid=ImgDetMain",
          }}
          style={{ width: 80, height: 80 ,borderRadius: 50}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{labour.name}</Text>
          <Text style={styles.details}>Phone Number: {labour.Contact}</Text>
          <Text style={styles.details}>Type: {labour.Type}</Text>
        </View>
      </View>

      <CameraView
        style={styles.camera}
        facing={cameraType}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={takePicture}
            disabled={loading}
          >
            <Text style={styles.text}>{loading ? 'Processing...' : 'Take Photo'}</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {image && (
        <View style={styles.preview}>
          <Image source={{ uri: image }} style={styles.previewImage} />
        </View>
      )}
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
  cal: {
    position: 'absolute',
    top: 0,
    right: 50,
  }
})

export default LabourFaceVerification