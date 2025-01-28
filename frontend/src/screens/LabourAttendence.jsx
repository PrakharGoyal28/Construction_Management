import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/button";
import axios from "axios";
import { BASE_URL } from "../auth/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../auth/Auth";

const LabourAttendence = ({ route }) => {
  const { attendance } = route.params;
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [cnt, setcnt] = useState(0);
  const [allAttend, setAllAttend] = useState({});
  const [loading, setloading] = useState(true);
  const [labours, setlabours] = useState([]);

  const handlepress = (labourId) => {
    setcnt((prevCnt) => prevCnt + 1);
    navigation.navigate("LabourFace", { labourId });
  };

  const fetchAllLabours = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/labours/allLabours`);
      setlabours(response.data.data);
      setloading(false);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching labours:", error);
    }
  };
  const markAttendance = async (labourId, status) => {
    try {
      const date = new Date().toISOString().split("T")[0]; // Get current date
      const response = await axios.post(
        `${BASE_URL}/labours/updateAttendance`,
        {
          labourId,
          date,
          status,
          remarks: `marked by ${user._id}`,
          userId: user._id,
        }
      );

      if (response.data) {
        setcnt((prevCnt) => prevCnt + 1);
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handlePresentPress =async (labourId) => {
    const result = labours.find((labour) => labour._id === labourId);
    // console.log(result.Attendance);
    if (result.Attendance.at(-1).remarks != "Automatically marked as absent") {
      // return;
    }
    
    await markAttendance(labourId, "Present");
    navigation.navigate("LabourFace", { labourId });
  };

  const handleAbsentPress = (labourId) => {
    const result = labours.find((labour) => labour._id === labourId);
    // console.log(result.Attendance.at(-1).remarks);
    if (result.Attendance.at(-1).remarks != "Automatically marked as absent") {
      return;
    }
    ToastAndroid.show("Attendance Marked", ToastAndroid.SHORT);
    markAttendance(labourId, "Absent");
  };

  useEffect(() => {
    fetchAllLabours(); // Fetch attendance data when the component mounts
  }, [cnt]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Attendance Review</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.row}>
            <View style={styles.status}>
              <View style={[styles.circle, { backgroundColor: "green" }]} />
              <Text style={styles.statusText}>
                Present: {attendance.present}
              </Text>
            </View>
            <View style={styles.status}>
              <View style={[styles.circle, { backgroundColor: "brown" }]} />
              <Text style={styles.statusText}>Absent: {attendance.absent}</Text>
            </View>
          </View>
        )}
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          <View style={styles.labourList}>
            {labours.map((labour, index) => (
              <View key={index} style={styles.labourCard}>
                <View style={styles.labourInfo}>
                  <View
                    style={styles.imagePlaceholder}
                    onTouchEndCapture={() =>
                      navigation.navigate("LabourAttendenceDetail", {
                        attendenceDetail: labour.Attendance,
                      })
                    }
                  >
                    {/* <MaterialCommunityIcons
                      name="account"
                      size={40}
                      color="black"
                    /> */}
                    <Image
                      source={{
                        uri:
                          labour.ImageUrl ||
                          "https://th.bing.com/th/id/OIP.F7AAZ51YNslUUrejRKkDeQHaE1?rs=1&pid=ImgDetMain",
                      }}
                      style={{ width: 100, height: 100 }}
                    />
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Text style={styles.labourName}>{labour.name}</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[
                        styles.absentButton,
                        labour.Attendance.at(-1).remarks !==
                          "Automatically marked as absent" &&
                        labour.Attendance.at(-1).status === "Present"
                          ? { opacity: 0 }
                          : { opacity: 1 },
                      ]}
                      disabled={
                        labour.Attendance.at(-1).remarks !==
                          "Automatically marked as absent" &&
                        labour.Attendance.at(-1).status === "Absent"
                      }
                      onPress={() => handleAbsentPress(labour._id)}
                    >
                      <Text style={styles.buttonText}>Absent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.presentButton,
                        labour.Attendance.at(-1).remarks !==
                          "Automatically marked as absent" &&
                        labour.Attendance.at(-1).status === "Absent"
                          ? { opacity: 0 }
                          : { opacity: 1 },
                      ]}
                      // disabled={
                      //   labour.Attendance.at(-1).remarks !== "Automatically marked as absent" &&
                      //   labour.Attendance.at(-1).status === "Present"
                      // }
                      onPress={() => handlePresentPress(labour._id)}
                    >
                      <Text style={[styles.buttonText, { color: "white" }]}>
                        Present
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default LabourAttendence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#fff",
    marginVertical: -11,
    marginHorizontal: 19,
    width: "auto",
    marginLeft: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 17,
  },
  future: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 17,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  titles: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 17,
    marginLeft: 30,
  },
  row: {
    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "flex-start", // Align items to the start
    alignItems: "center", // Ensure vertical alignment
    gap: 16,
    marginBottom: 18,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
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
  labourList: {
    marginTop: 20,
  },
  labourCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 100,
  },
  imagePlaceholder: {
    aspectRatio: 1,
    height: 90,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  labourName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  absentButton: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
    Color: "black",
    marginRight: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  presentButton: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  button: {
    backgroundColor: "#000", // Black color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24, // Makes the button rounded
    alignItems: "center",
    marginTop: -15,
    marginLeft: 30,
    marginRight: 99,
  },
  buttonText: {
    color: "black", // White color
    fontSize: 16,
  },
  buttonTexxt: {
    color: "white", // White color
    fontSize: 16,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    bottom: 0,
    marginTop: 15,
  },
});
