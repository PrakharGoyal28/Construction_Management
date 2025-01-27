import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";

const LabourAttendanceDeatil = ({ route }) => {
  const { attendenceDetail } = route.params;

  const renderDay = ({ date, state }) => {
    const formattedDate = date.dateString;

    // Find the attendance data for the current date
    const dayData = attendenceDetail.find(
      (item) => item.date.split("T")[0] === formattedDate
    );

    // Determine background color
    let backgroundColor = "#ffffff"; // Default color
    if (dayData) {
      if (dayData.status === "Present") {
        backgroundColor = "green"; // Green for Present
      } else if (dayData.status === "Absent") {
        backgroundColor = "brown"; // Brown for Absent
      }
    }

    return (
      <View
        style={[
          styles.dayContainer,
          { backgroundColor },
          state === "disabled" && styles.disabled,
        ]}
      >
        <Text style={[styles.dateText, state === "disabled" && styles.disabledText]}>
          {date.day}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Labour Calendar</Text>
      <Calendar
        dayComponent={renderDay}
        theme={{
          arrowColor: "black",
          todayTextColor: "#00adf5",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          calendarBackground: "#f9f9f9",
          textDayStyle: styles.defaultDayText,
          textDisabledColor: "#DE824D",
        }}
        style={{
          borderRadius: 10,
          elevation: 3,
          backgroundColor: "white",
        }}
      />
    </View>
  );
};

export default LabourAttendanceDeatil;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff", // White background for the screen
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "AlbertSans",
    lineHeight: 38.4,
    marginBottom: 16,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    width: 37, // Rounded cells
    borderRadius: 30, // Fully rounded
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#111100", // White background
    margin: 5, // Space between cells
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  presentText: {
    fontSize: 12,
    color: "#DE824D", // Orange for attendance
    fontWeight: "bold",
  },
  presentDay: {
    borderColor: "green", // Green border for present days
    backgroundColor: "#DE824D", // Light green background
  },
  absentDay: {
    borderColor: "red", // Red border for absent days
    backgroundColor: "#DE824D", // Light red background
  },
  disabled: {
    opacity: 0.5, // Dim disabled days
  },
  disabledText: {
    color: "#a9a9a9", // Gray text for disabled days
  },
  defaultDayText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#DE824D",
  },
});
