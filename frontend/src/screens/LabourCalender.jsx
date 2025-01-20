import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";

const LaborCalendar = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch attendance summary from the API
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          "https://your-api-url.com/api/attendanceSummary"
        ); // Replace with your API endpoint
        const data = response.data.data;

        // Convert array to object for easier lookup
        const formattedData = data.reduce((acc, item) => {
          acc[item.date] = item.totalPresent;
          return acc;
        }, {});

        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Labor Calendar</Text>
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        dayComponent={({ date, state }) => {
          const presentCount = attendanceData[date.dateString] || 0;
          return (
            <View
              style={[
                styles.dayContainer,
                state === "disabled" && styles.disabledDay,
                date.dateString === new Date().toISOString().split("T")[0] &&
                  styles.today,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  state === "disabled" && styles.disabledText,
                ]}
              >
                {date.day}
              </Text>
              <Text style={styles.presentCount}>{presentCount}</Text>
            </View>
          );
        }}
        theme={{
          arrowColor: "black",
          textMonthFontWeight: "bold",
          textMonthFontSize: 20,
          textSectionTitleColor: "black",
          calendarBackground: "#fff",
          todayTextColor: "black",
        }}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  calendar: {
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  dayContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    margin: 2,
  },
  today: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  disabledDay: {
    backgroundColor: "#e3e3e3",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  disabledText: {
    color: "#a1a1a1",
  },
  presentCount: {
    fontSize: 12,
    color: "orange",
  },
});

export default LaborCalendar;
