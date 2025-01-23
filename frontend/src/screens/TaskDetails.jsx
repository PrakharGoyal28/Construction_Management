import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const TaskDetails = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>◀ Back</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>Jan 16, 2025</Text>
      </View>

      {/* Task Name */}
      <Text style={styles.taskTitle}>
        Task name in full length for better understanding and use case of three lines
      </Text>

      {/* Assign Labors */}
      <TouchableOpacity style={styles.assignButton}>
        <Text style={styles.assignText}>+ Assign labors</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Task Descriptions */}
      <Text style={styles.sectionTitle}>Task Descriptions</Text>

      <View style={styles.descriptionRow}>
        <Text style={styles.label}>🛠 Task Type</Text>
        <Text style={styles.value}>Empty</Text>
      </View>
      <View style={styles.descriptionRow}>
        <Text style={styles.label}>📍 Location</Text>
        <Text style={styles.value}>Empty</Text>
      </View>
      <View style={styles.descriptionRow}>
        <Text style={styles.label}>⏱ Duration</Text>
        <Text style={styles.value}>Empty</Text>
      </View>

      {/* Drawings */}
      <Text style={styles.sectionTitle}>📄 Drawings</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Drawing File name" />
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>⬇</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Drawing File name" />
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>⬇</Text>
        </TouchableOpacity>
      </View>

      {/* Associated Engineer */}
      <Text style={styles.sectionTitle}>📞 Associated Engineer</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value="+91 98675 76453" editable={false} />
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>📞</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>👤</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    paddingVertical: 5,
  },
  backText: {
    fontSize: 16,
    color: "#000",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  assignButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  assignText: {
    fontSize: 16,
    color: "#000",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  descriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    color: "#999",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  downloadButton: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    marginTop: 20,
  },
});

export default TaskDetails;
