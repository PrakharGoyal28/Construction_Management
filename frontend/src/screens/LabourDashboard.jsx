import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button';

const LabourDashboard = () => {
  const navigation = useNavigation(); // Hook to access the navigation object

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Labour Dashboard</Text>
      <Button
        title="Go to Labour Face Verification"
        onPress={() => navigation.navigate('LabourFace')} // Navigate to LabourFaceVerification screen
      />
    </View>
  )
}


export default LabourDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});