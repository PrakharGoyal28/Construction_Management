import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing Screens
import Dashboard from '../screens/Dashboard';
import LabourDashboard from '../screens/LabourDashboard';
import LabourCalender from '../screens/LabourCalender';
import LabourAttendence from '../screens/LabourAttendence';
import LabourFaceVerification from '../components/LabourFaceVerification';
import Profile from '../screens/Profile';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const getDate = () => {
  const date = new Date();
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate.replace(/\s(\d{4})$/, ' $1'); 
};

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.dateText}>{getDate()}</Text>
      <Text style={styles.titleText}>Dashboard</Text>
    </View>
  );
};



const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Dashboard}
        options={{
          headerTitle: () => <CustomHeader />,
          headerStyle: {
            borderBottomWidth: 0,  // Remove the bottom border
            elevation: 0,  // Remove shadow on Android
            shadowOpacity: 0,  // Remove shadow on iOS
            height:200
          },
        }} />
      <Tab.Screen name="LabourDashboard" component={LabourDashboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Create Native Stack Navigator
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MyTabs}
        options={{ headerShown: false }} // Hide header for bottom tabs
      />
      <Stack.Screen name="LabourCalender" component={LabourCalender} />
      <Stack.Screen name="LabourAttendence" component={LabourAttendence} />
      <Stack.Screen name="LabourFace" component={LabourFaceVerification} />
    </Stack.Navigator>

  );
};

export default AppStack;


const styles = StyleSheet.create({
  headerContainer: {
    marginTop:20,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft:20
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
    marginBottom:20
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:20
  },
});