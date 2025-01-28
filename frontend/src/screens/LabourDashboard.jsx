import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button';
import axios from 'axios';
import { BASE_URL } from '../auth/config';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LabourDashboard = () => {
  const navigation = useNavigation();
  const [cnt, setcnt] = useState(0)
  const [attendance, setAttendance] = useState({ present: 0, absent: 0 });
  const [allAttend, setAllAttend] = useState({})
  const [loading, setloading] = useState(true);
  const handlepress = () => {
    setcnt((prevCnt) => prevCnt + 1);
    navigation.navigate('LabourAttendence',{attendance});
  };
  
  const fetchAttendanceData = async () => {

    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${BASE_URL}/labours/attendanceSummary`);
      const { totalPresent, totalAbsent } = response.data.data.at(-1);
      setAttendance({ present: totalPresent || 0, absent: totalAbsent || 0 });
      setloading(false);
      setAllAttend(response.data.data);

    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchAttendanceData(); // Fetch attendance data when the component mounts
  }, [cnt]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlepress}>
        <Text style={styles.buttonText}>Take Attendance</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>Attendance Review</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.row}>
            <View style={styles.status}>
              <View style={[styles.circle, { backgroundColor: 'green' }]} />
              <Text style={styles.statusText}>Present: {attendance.present}</Text>
            </View>
            <View style={styles.status}>
              <View style={[styles.circle, { backgroundColor: 'brown' }]} />
              <Text style={styles.statusText}>Absent: {attendance.absent}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.future}>
        <Text style={styles.titles}>Future Demand</Text>
        <View onTouchEndCapture={() => navigation.navigate("LabourCalender" , {allAttend})}>
          <MaterialCommunityIcons name="calendar" size={35} color='black' />
        </View>
      </View>
    </SafeAreaView>
  )
}


export default LabourDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 24,
    backgroundColor: '#fff',
    marginVertical: 18,
    marginHorizontal: 19,
    width: 'auto',
    marginLeft: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 17,
  },
  future: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 17,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  titles: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 17,
    marginLeft: 30,

  },
  row: {
    flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'center', // Ensure vertical alignment
    gap: 16,
    marginBottom: 18,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000', // Black color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24, // Makes the button rounded
    alignItems: 'center',
    marginTop: -15,
    marginLeft: 30,
    marginRight: 99,
  },
  buttonText: {
    color: '#fff', // White color
    fontSize: 16,
    fontWeight: 'bold',
  },
});