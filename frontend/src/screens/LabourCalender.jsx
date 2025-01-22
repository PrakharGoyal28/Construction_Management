import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";


const LabourCalender = ({route}) => {
  const { allAttend } = route.params

  
  const renderDay = ({ date, state }) => {
    const formattedDate = date.dateString;
  
    // Find data for the specific date
    const dayData = allAttend.find((item) => item.date === formattedDate) || { totalPresent: 0 };
  
    return (
      <View style={[styles.dayContainer, state === "disabled" && styles.disabled]}>
        <Text style={[styles.dateText, state === "disabled" && styles.disabledText]}>
          {date.day}
        </Text>
  
        {/* Display present and absent counts */}
        {(dayData.totalPresent > 0 || dayData.totalAbsent > 0) && (
          <View>
            <Text style={styles.presentText}> {dayData.totalPresent}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        dayComponent={renderDay} // Custom day rendering
        theme={{
          arrowColor: "black",
          todayTextColor: "#00adf5",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          textDayStyle: styles.defaultDayText,
          calendarBackground: "#fff",
        }}
      />
    </View>
  );
};

export default LabourCalender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9", // Light background
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 60, // Height of each day cell
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff", // White background for day cells
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  workerText: {
    fontSize: 12,
    color: "#3b82f6", // Blue color for worker count
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5, // Reduce opacity for disabled dates
  },
  disabledText: {
    color: "#a9a9a9", // Gray color for disabled text
  },
  defaultDayText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#444", // Default text color
  },
});
