import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,

} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons, Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// Importing Screens
import Dashboard from "../screens/Dashboard";
import LabourDashboard from "../screens/LabourDashboard";
import LabourCalender from "../screens/LabourCalender";
import LabourAttendence from "../screens/LabourAttendence";
import LabourFaceVerification from "../components/LabourFaceverification";
import Profile from "../screens/Profile";
import TaskList from "../screens/TaskList";
import LabourAttendenceDeatil from "../components/LabourAttendenceDetail";
import TaskDetails from "../screens/TaskDetails";
import TaskCalendar from "../screens/TaskCalendar";
import TaskDashboard from "../screens/TaskDashboard";
import EngineerDashboard from "../screens/EngineerDashboard";

// Get device width dynamically
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const getDate = () => {
  const date = new Date();
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate.replace(/\s(\d{4})$/, " $1"); // Add comma between date and year
};

const CustomHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons name="map-marker" size={24} color="black" />
          <Text style={styles.siteName}>Jodhpur</Text>
        </View>
        <Text style={styles.titleText}>Dashboard</Text>
      </View>
    );
  };

const gettDate = () => {
  const today = new Date();
  const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  // Split "January 16, Thursday, 2025" into "January 16" and "Thursday, 2025"
  const [monthDay, rest] = formattedDate.split(",", 2);
  const year = today.getFullYear(); // 2025

  return { monthDay, rest: rest.trim(), year };
};

const GeneralHeader = () => {
  const { monthDay, rest, year } = gettDate();

  return (
    <View style={styles.headerContainer}>
      <Text>
        <Text style={styles.restText}> {rest}</Text> {/* Thursday, 2025 */}
        <Text style={styles.monthDayText}>
          {" "}
          {monthDay}, {year}
        </Text>{" "}
        {/* January 16 */}
      </Text>
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
      <Tab.Screen
        name="Home"
        component={EngineerDashboard}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'white' : '#111111', borderRadius: 50, height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
            }}>
              <Entypo
                name="home"
                color={
                  focused
                    ? 'black' // Focused icon
                    : 'white' // Default icon
                }
                size={24}
              />
            </View>
          ),
          headerTitle: () => <CustomHeader />,
          headerStyle: {
            height: 150,
            borderBottomWidth: 0, // Remove the bottom border
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
        }}
      />
      <Tab.Screen
        name="LabourDashboard"
        component={LabourDashboard}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'white' : '#111111', borderRadius: 50, height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
            }}>
              <FontAwesome
                name="calendar"
                color={
                  focused
                    ? 'black' // Focused icon
                    : 'white' // Default icon
                }
                size={24}
              />
            </View>
          ),
          headerTitle: () => <GeneralHeader />,
          headerStyle: {
            height: 150,
            borderBottomWidth: 0, // Remove the bottom border
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
        }}
      />

      <Tab.Screen
        name="TaskDashboard"
        component={TaskDashboard}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'white' : '#111111', borderRadius: 50, height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
            }}>
              <FontAwesome5
                name="tasks"
                color={
                  focused
                    ? 'black' // Focused icon
                    : 'white' // Default icon
                }
                size={24}
              />
            </View>
          ),
          // headerTitle: () => <CustomHeader />,
          // headerStyle: {
          //   height: 150,
          //   borderBottomWidth: 0,  // Remove the bottom border
          //   elevation: 0,  // Remove shadow on Android
          //   shadowOpacity: 0,  // Remove shadow on iOS
          // },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'white' : '#111111', borderRadius: 50, height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
            }}>
              <FontAwesome5
                name="user"
                color={
                  focused
                    ? 'black' // Focused icon
                    : 'white' // Default icon
                }
                size={24}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Create Native Stack Navigator
const Stack = createNativeStackNavigator();

const EngineerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationDuration: 5,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MyTabs}
        options={{ headerShown: false }} // Hide header for bottom tabs
      />
      <Stack.Screen
        name="LabourCalender"
        component={LabourCalender}
        options={{
          headerTitle: "", // No title
          headerShadowVisible: false, // Remove shadow
          headerBackVisible: false, // Disable default back button
          headerLeft: () => {
            const navigation = useNavigation(); // Get the navigation prop

            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 30, // Increase the padding to make the header taller
                  paddingHorizontal: 16, // Ensure the button is not cramped
                }}
                onPress={() => navigation.goBack()} // Go back when button is pressed
              >
                <Ionicons
                  name="chevron-back-sharp"
                  size={24}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: "white",
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      {/* <Stack.Navigator> */}

      <Stack.Screen
        name="LabourAttendence"
        component={LabourAttendence}
        options={{

          header: () => {
            const navigation = useNavigation();
            return (
              <SafeAreaView
                style={{
                  height: 150, // Total header height
                  backgroundColor: "white", // Header background color
                  paddingHorizontal: 16, // Horizontal padding
                  justifyContent: "center",
                  elevation: 0, // Remove shadow on Android
                  shadowOpacity: 0,
                }}
              >
                {/* Back Button */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    top: 55, // Position at the top
                    left: 16, // Align to the left
                    zIndex: 1, // Ensure it appears above other elements
                  }}
                  onPress={() => navigation.goBack()} // Go back when button is pressed
                >
                  <Ionicons
                    name="chevron-back-sharp"
                    size={24}
                    color="black"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
                </TouchableOpacity>

                {/* General Header */}
                <View
                  style={{
                    marginTop: 50, // Space below the back button
                  }}
                >
                  <GeneralHeader />
                </View>
              </SafeAreaView>
            )
          },
          headerStyle: {
            height: 150, // Adjusted height
            borderBottomWidth: 0, // Remove bottom border
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
        }}
      />
      {/* </Stack.Navigator> */}

      <Stack.Screen
        name="LabourFace"
        component={LabourFaceVerification}
        options={{
          headerTitle: "", // No title
          headerShadowVisible: false, // Remove shadow
          headerBackVisible: false, // Disable default back button
          headerLeft: () => {
            const navigation = useNavigation(); // Get the navigation prop

            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 30, // Increase the padding to make the header taller
                  paddingHorizontal: 16, // Ensure the button is not cramped
                }}
                onPress={() => navigation.goBack()} // Go back when button is pressed
              >
                <Ionicons
                  name="chevron-back-sharp"
                  size={24}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <View style={{ flexDirection: "row", gap: 195 }}>
                  <Text style={{ fontSize: 16, color: "black", marginTop: 5 }}>
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: "white",
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="LabourAttendenceDetail"
        component={LabourAttendenceDeatil}
        options={{
          headerTitle: "", // No title
          headerShadowVisible: false, // Remove shadow
          headerBackVisible: false, // Disable default back button
          headerLeft: () => {
            const navigation = useNavigation(); // Get the navigation prop

            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 30, // Increase the padding to make the header taller
                  paddingHorizontal: 16, // Ensure the button is not cramped
                }}
                onPress={() => navigation.goBack()} // Go back when button is pressed
              >
                <Ionicons
                  name="chevron-back-sharp"
                  size={24}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: "white",
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
      name="TaskDetails"
      component={TaskDetails}
      />
      <Stack.Screen
      name="TaskList"
      component={TaskList}
      />
      <Stack.Screen
      name="TaskCalendar"
      component={TaskCalendar}
      />

      <Stack.Screen name="TaskDashboard"
      component={TaskDashboard}/>

      

    </Stack.Navigator>
  );
};

export default EngineerStack;

const styles = StyleSheet.create({
  headerContainer: {
    marginLeft: 25,
    marginTop: 80,
    // marginBottom: 80,
    height: 100,
  },
  dateText: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "AlbertSans", // Ensure the font is properly loaded and linked
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38.4,
  },
  monthDayText: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
  },
  restText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "AlbertSans", // Ensure the font is properly loaded and linked
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38.4,
  },
  tabBarStyle: {
    position: "absolute",
    width: width,
    height: 0.093 * height, // Fixed height for the tab bar
    bottom: -10, // Anchors the tab bar to the bottom of the screen
    alignSelf: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#111111", // Default background color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    paddingTop: 10,
  },
  
  // tabIcon: {
  //   width: 0.071 * width, // Adjust the icon width as needed
  //   height: 0.158 * height, // Adjust the icon height as needed
  //   resizeMode: "contain",
  // },
});
