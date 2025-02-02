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
import Profile from "../screens/Profile";
import TaskDashboard from "../screens/TaskDashboard";
import EngineerDashboard from "../screens/EngineerDashboard";
import InventoryDashboard from "../screens/InventoryDashboard";
import ReceiveInventory from "../screens/ReceiveInventory";
import CurrentInventory from "../screens/CurrentInventory";
import InventoryDetail from "../components/InventoryDetail";
import PlaceOrder from "../components/PlaceOrder";

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
        <MaterialCommunityIcons name="map-marker" size={20} color="black" />
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

const GeneralHeader = ({label}) => {
  return (
    <View style={styles.headerContainer}>
      <Text>
        <Text style={styles.restText}> {label} </Text> 
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
            height: 120,
            borderBottomWidth: 0, // Remove the bottom border
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
        }}
      />
      <Tab.Screen
        name="InventoryDashboard"
        component={InventoryDashboard}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'white' : '#111111', borderRadius: 50, height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
            }}>
              <Entypo
                name="box"
                color={
                  focused
                    ? 'black' // Focused icon
                    : 'white' // Default icon
                }
                size={24}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <View style={styles.locationContainer}>
                <MaterialCommunityIcons name="map-marker" size={24} color="black" />
                <Text style={styles.siteName}>Jodhpur</Text>
              </View>
              <Text style={styles.titleText}>Inventory</Text>
            </View>
          ),
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
      
      <Stack.Screen name="CurrentInventory"
        component={CurrentInventory}
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
                  <GeneralHeader label={"Inventory"}/>
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
      <Stack.Screen name="ReceiveInventory"
        component={ReceiveInventory}
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

                <View
                  style={{
                    marginTop: 50,
                  }}
                >
                  <GeneralHeader label={"Receive Inventory"}/>
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
      <Stack.Screen
          name="InventoryDetail"
          component={InventoryDetail}
          options={({ route, navigation }) => ({
            header: () => (
              <SafeAreaView
                style={{
                  height: 150,
                  backgroundColor: "white",
                  paddingHorizontal: 16,
                  justifyContent: "center",
                  elevation: 0,
                  shadowOpacity: 0,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    top: 55,
                    left: 16,
                    zIndex: 1,
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons
                    name="chevron-back-sharp"
                    size={24}
                    color="black"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}>
                  <GeneralHeader label={route.params.name} />
                </View>
              </SafeAreaView>
            ),
            headerStyle: {
              height: 150,
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
          })}
        />



<Stack.Screen
          name="PlaceOrder"
          component={PlaceOrder}
          options={({ route, navigation }) => ({
            header: () => (
              <SafeAreaView
                style={{
                  height: 150,
                  backgroundColor: "white",
                  paddingHorizontal: 16,
                  justifyContent: "center",
                  elevation: 0,
                  shadowOpacity: 0,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    top: 55,
                    left: 16,
                    zIndex: 1,
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons
                    name="chevron-back-sharp"
                    size={24}
                    color="black"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}>
                  <GeneralHeader label="Place Order" />
                </View>
              </SafeAreaView>
            ),
            headerStyle: {
              height: 150,
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
          })}
        />
    </Stack.Navigator>
    
  );
};

export default EngineerStack;

const styles = StyleSheet.create({
  headerContainer: {
    marginLeft: 25,
    marginTop: 100,
    // marginBottom: 80,
    height: 100,
  },
  
  titleText: {
    // marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "AlbertSans", // Ensure the font is properly loaded and linked
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38.4,
  },
  locationContainer:{
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
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
});
