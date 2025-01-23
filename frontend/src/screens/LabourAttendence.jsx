import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/button";
import axios from "axios";
import { BASE_URL } from "../auth/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LabourAttendence = () => {
  const navigation = useNavigation();
  const [cnt, setcnt] = useState(0);
  const [attendance, setAttendance] = useState({ present: 0, absent: 0 });
  const [allAttend, setAllAttend] = useState({});
  const [loading, setloading] = useState(true);
  const [labours, setlabours] = useState([]);

  const handlepress = (labourid) => {
    setcnt((prevCnt) => prevCnt + 1);
    navigation.navigate("LabourFace", { labourid });
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/labours/attendanceSummary`);
      const { totalPresent, totalAbsent } = response.data.data[0];
      setAttendance({ present: totalPresent || 0, absent: totalAbsent || 0 });
      setloading(false);
      setAllAttend(response.data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setloading(false);
    }
  };

  const fetchAllLabours = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/labours/allLabours`);

      response.data.data.forEach((labour) => {
        console.log("Labour Name:", labour.name);
      });

      setlabours(response.data.data);
    } catch (error) {
      console.error("Error fetching labours:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
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
      <ScrollView>

      <View style={styles.labourList}>
        {labours.map((labour, index) => (
          <View key={index} style={styles.labourCard}>
            <View style={styles.labourInfo}>
              <View style={styles.imagePlaceholder}>
                <MaterialCommunityIcons
                  name="account"
                  size={40}
                  color="black"
                />
              </View>
              <Text style={styles.labourName}>{labour.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.absentButton}>
                <Text style={styles.buttonText}>Absent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presentButton}
                onPress={() => handlepress(labour._id)} // Pass the labour's ID
                >
                <Text style={styles.buttonTexxt}>Present</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
        </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  labourInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  labourName: {
    fontSize: 16,
    marginLeft: 25,
    fontWeight: "bold",
    marginBottom: 33,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 63,
    marginRight: 43,
  },
  absentButton: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    Color: "black",

    marginRight: 8,
  },
  presentButton: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});
