import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing Screens
import Dashboard from '../screens/Dashboard';
import LabourDashboard from '../screens/LabourDashboard';
import LabourCalender from '../screens/LabourCalender';
import LabourAttendence from '../screens/LabourAttendence';
import LabourFaceVerification from '../components/LabourFaceverification';
import Profile from '../screens/Profile';

// Get device width dynamically
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');


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
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [styles.tabBarStyle],
      }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
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
  tabBarStyle: {
    position: 'absolute',
    width: width, 
    height: 0.093*height, // Fixed height for the tab bar
    bottom: 0, // Anchors the tab bar to the bottom of the screen
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#111111', // Default background color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  tabIcon:{
    width: 0.071*width, // Adjust the icon width as needed
    height: 0.158*height, // Adjust the icon height as needed
    resizeMode: 'contain',
  },
});
