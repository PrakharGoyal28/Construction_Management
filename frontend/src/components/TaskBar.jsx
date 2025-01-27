import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { differenceInDays, parseISO } from "date-fns";

const TaskBar = ({ task, calendarDays }) => {
  // Convert task.start and task.end to Date objects.
  console.log(task.start);

  const startDate = new Date(task.start);
  const endDate = new Date(task.end);
  console.log("dates", startDate, endDate);

  // Find the index of the start date in calendarDays
  const startIndex = calendarDays.findIndex(
    (day) => day.toDateString() === startDate.toDateString()
  );

  // Find the index of the end date in calendarDays
  const endIndex = calendarDays.findIndex(
    (day) => day.toDateString() === endDate.toDateString()
  );

  // If either index is -1, it means the task is out of our current date range
  if (startIndex === -1 && endIndex === -1) return null;

  // For simplicity, assume 120 px wide columns (like in DayColumn).
  const COLUMN_WIDTH = 120;
  const HEADER_HEIGHT = 50;

  const top = HEADER_HEIGHT + task.rowIndex * 50;

  // If a task partially starts before the calendar range or ends after,
  // clamp the indexes so the bar doesn't render beyond our available columns.
  const clampedStart = Math.max(0, startIndex);
  const clampedEnd = Math.min(calendarDays.length - 1, endIndex);

  const left = clampedStart * COLUMN_WIDTH;
  // +1 because inclusive of end day (if you want to stretch across entire end day)
  const daySpan = clampedEnd - clampedStart + 1;
  const width = daySpan * COLUMN_WIDTH;

  return (
    <View
      style={[
        styles.taskBar,
        {
          left,
          width,
          top,
          // you might also want to set a "top" if you have multiple rows or want to offset them
        },
      ]}
    >
      <Text style={styles.taskText}>{task.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskBar: {
    position: "absolute",
    height: 40,
    backgroundColor: "#0f0202",
    borderRadius: 6,
    borderWidth: 2, // Thickness of the border
    borderColor: "white", // Color of the border

    // For debug or layering, you might want a small margin
  },
  taskText: {
    color: "#fff",
    padding: 8,
  },
});

export default TaskBar;
