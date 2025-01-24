import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";


const LabourAttendanceDeatil = ({route}) => {
  const { labourid } = route.params

  
  const renderDay = ({ date, state }) => {
    const formattedDate = date.dateString;
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
  
    // Find data for the specific date
    const dayData = labourid.find((item) => item.date === formattedDate) || { totalPresent: 0 };
  
    // Determine background color
    let backgroundColor = "#ffffff";
    if (formattedDate < today) {
      backgroundColor = "#111111";
    } else if (formattedDate === today) {
      backgroundColor = "#111111"; 
    } else if (formattedDate > today) {
      backgroundColor = "#eeeeee"; 
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
        {/* {(dayData.totalPresent >= 0 || dayData.totalAbsent > 0) && (
          <View>
            <Text style={styles.presentText}> {dayData.totalPresent}</Text>
          </View>
        )} */}
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Labour Calander</Text>
      <Calendar
  dayComponent={renderDay}
  theme={{
    arrowColor: "black",
    todayTextColor: "#00adf5",
    textDayFontWeight: "500",
    textMonthFontWeight: "bold",
    calendarBackground: "#f9f9f9",
    textDayStyle: styles.defaultDayText,
    textDisabledColor: "#DE824D", // Light gray for disabled days
  }}
  style={{
    borderRadius: 10, // Rounded corners for the calendar
    elevation: 3, // Shadow for a floating effect
    backgroundColor: "white", // White background
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
    height: 60,
    width: 37, // Rounded cells
    borderRadius: 23, // Fully rounded
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
