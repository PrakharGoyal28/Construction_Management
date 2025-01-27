import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskCalendar from "./TaskCalendar";

export default function TaskDashboard() {
  const [activeTab, setActiveTab] = useState("Assigned");
  const [activeDash, setActiveDash] = useState("TaskList");

  const handleActiveDash = () => {
    if (activeDash === "TaskList") {
      setActiveDash("Calendar");
    } else {
      setActiveDash("TaskList");
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Task List</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={
              activeDash === "TaskList"
                ? styles.activeButton
                : styles.inactiveButton
            }
            onPress={handleActiveDash}
          >
            <Text style={styles.buttonText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeDash === "Calendar"
                ? styles.activeButton
                : styles.inactiveButton
            }
            onPress={handleActiveDash}
          >
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}

      {activeDash === "TaskList" ? (
        <View>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => setActiveTab("Assigned")}>
              <Text
                style={
                  activeTab === "Assigned"
                    ? styles.activeTab
                    : styles.inactiveTab
                }
              >
                Assigned
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("Critical")}>
              <Text
                style={
                  activeTab === "Critical"
                    ? styles.activeTab
                    : styles.inactiveTab
                }
              >
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("Field")}>
              <Text
                style={
                  activeTab === "Field" ? styles.activeTab : styles.inactiveTab
                }
              >
                Pending
              </Text>
            </TouchableOpacity>
          </View>
          <TaskList />
        </View>
      ) : (
        <TaskCalendar />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
  },
  activeButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  inactiveButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  inactiveTab: {
    fontSize: 16,
    color: "#999",
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginVertical: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 16,
  },
  taskName: {
    flex: 1,
    fontSize: 14,
  },
  taskNumber: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  numberText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
});
