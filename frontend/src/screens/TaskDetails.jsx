import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { BASE_URL } from "../auth/config";
import { FontAwesome, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


const TaskDetails = ({ route, navigation }) => {
  const { task } = route.params;

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State for labors and assigned labors
  const [labors, setLabour] = useState([]);
  const [assignedLabors, setAssignedLabors] = useState([]);

  // Fetch all labors
  const fetchLabors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/labours/labours/all/abc`);
      const laborData = response.data.data.map((item) => ({
        id: item._id,
        name: item.name,
        image: item.ImageUrl,
      }));
      setLabour(laborData);
    } catch (error) {
      console.error("Error fetching labors:", error);
    }
  };

  // Load assigned labors from AsyncStorage or fallback to backend
  

  // Load assigned labors from AsyncStorage or fallback to backend
  const loadAssignedLabors = async () => {
    try {
      const savedLabors = await AsyncStorage.getItem(`task_${task._id}_assignedLabors`);
      if (savedLabors) {
        // Load assigned labors from AsyncStorage
        setAssignedLabors(JSON.parse(savedLabors));
      } else {
        // Fallback: Fetch assigned labors from backend
        const response = await axios.get(`${BASE_URL}/task/assigned/${task._id}`);
        const backendAssignedLabors = response.data.AssignedTo.map((id) => 
          labors.find((labor) => labor.id === id)
        ).filter(Boolean);
        setAssignedLabors(backendAssignedLabors);

        // Save to AsyncStorage for future use
        await AsyncStorage.setItem(`task_${task._id}_assignedLabors`, JSON.stringify(backendAssignedLabors));
      }
    } catch (error) {
      console.error("Error loading assigned labors:", error);
    }
  };

  // Handle assigning labors
  const handleLaborAssigned = async () => {
    try {
      const laborIds = assignedLabors.map((labor) => labor.id);

      // Save assigned labors in AsyncStorage
      await AsyncStorage.setItem(`task_${task._id}_assignedLabors`, JSON.stringify(assignedLabors));

      // Update backend with labor IDs
      await axios.put(`${BASE_URL}/task/update/${task._id}`, {
        TaskName: task.TaskName,
        AssignedTo: laborIds,
        Starttime: task.Starttime,
        Deadline: task.Deadline,
        Status: task.Status,
        Description: task.Description,
        ProjectID: task.ProjectID,
        LabourRequired: task.LabourRequired,
        Prerequisites: task.Prerequisites,
      });

      setModalVisible(false);
      // console.log("temp1", temp1);

      
    } catch (error) {
      console.error("Error assigning labors:", error);
    }
  };

  // Initialize labors and assigned labors
  useEffect(() => {
    fetchLabors();
  }, []);

  useEffect(() => {
    if (labors.length > 0) {
      loadAssignedLabors();
    }
  }, [labors]);

  const date = new Date();
  const date1 = date.toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <ScrollView>
        {/* Date and Task Name */}
        <Text style={styles.date}>{date1}</Text>
        <Text style={styles.taskName}>
          {task?.TaskName ||
            "Task name in full length for better understanding and use case of three lines"}
        </Text>
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => setModalVisible(true)} // Open the modal
        >
          <Text style={styles.assignText}>
            {assignedLabors?.length > 0 ? "Reassign Labors" : "+ Assign Labors"}
          </Text>
        </TouchableOpacity>
        {/* Conditional Header */}

        {assignedLabors?.length > 0 && (
          <View>
            <View style={[styles.statusRow,{ flexDirection: "row", alignItems: "center" }]}>
              <FontAwesome name="circle" color="orange" size={14} />
              <Text style={styles.statusText}> Task Assigned</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>✔ Assigned Labors</Text>
            </View>
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider}></View>

        {/* Task Descriptions */}
        <Text style={styles.sectionTitle}>Task Descriptions</Text>
        <View style={styles.descriptionRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="tasks" color="black" size={14} />
            <Text style={[styles.descriptionLabel, { marginLeft: 8 }]}>
              Task Type
            </Text>
          </View>
          <Text style={styles.descriptionValue}>Manual</Text>
        </View>
        <View style={styles.descriptionRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6 name="location-dot" color="black" size={14} />
            <Text style={[styles.descriptionLabel, { marginLeft: 8 }]}>
              Location
            </Text>
          </View>
          <Text style={styles.descriptionValue}>On-Site</Text>
        </View>
        <View style={styles.descriptionRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="timer" color="black" size={14} />
            <Text style={[styles.descriptionLabel, { marginLeft: 8 }]}>
              Duration
            </Text>
          </View>
          <Text style={styles.descriptionValue}>
            {task.Starttime.split("T")[0]}------{task.Deadline.split("T")[0]}
          </Text>
        </View>

        {/* Drawings */}
        <Text style={styles.sectionTitle}>Drawings</Text>
        <View style={styles.drawingRow}>
          <TextInput
            style={styles.drawingInput}
            placeholder="Drawing File Name"
          />
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadText}>
            <FontAwesome5 name="download" color="white" size={14} />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Associated Engineer */}
        <Text style={styles.sectionTitle}>Associated Engineer</Text>
        <TouchableOpacity style={styles.engineerRow}>
          <Text style={styles.engineerText}>+91 98675 76453</Text>
        </TouchableOpacity>

        {/* Assigned Labors */}
        {assignedLabors?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Assigned Labors List</Text>
            {assignedLabors.map((labor) => (
              <View key={labor.id} style={styles.laborRow}>
                <Image
                  source={{ uri: labor.image }}
                  style={styles.laborImage}
                />
                <Text style={styles.laborName}>{labor.name}</Text>
                <TouchableOpacity onPress={() => {
                        if (isAssigned) {
                          // Unassign labor
                          setAssignedLabors((prev) =>
                            prev.filter((labor) => labor.id !== item.id)
                          );
                        } else {
                          // Assign labor
                          setAssignedLabors((prev) => [...prev, item]);
                        }
                      }} style={styles.assignedButton}>
                  <Text style={styles.assignedText}>Assigned</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal for Assign Labors */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Assign Labors</Text>
            <Text style={styles.modalDate}>January 26, 2025</Text>

            <FlatList
              data={labors}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isAssigned = assignedLabors.some(
                  (labor) => labor.id === item.id
                ); // Check if labor is assigned
                return (
                  <View style={styles.laborRow}>
                    <Text style={styles.laborName}>{item.name}</Text>
                    <TouchableOpacity
                      style={[
                        styles.assignLaborButton,
                        isAssigned && { backgroundColor: "#ccc" }, // Change color if assigned
                      ]}
                      onPress={() => {
                        if (isAssigned) {
                          // Unassign labor
                          setAssignedLabors((prev) =>
                            prev.filter((labor) => labor.id !== item.id)
                          );
                        } else {
                          // Assign labor
                          setAssignedLabors((prev) => [...prev, item]);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.assignLaborText,
                          isAssigned && { color: "#000" }, // Change text color if assigned
                        ]}
                      >
                        {isAssigned ? "Unassign" : "Assign"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => handleLaborAssigned()}
            >
              <Text style={styles.confirmButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 24,
  },
  assignButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  assignText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    height: "40%", // Cover 40% of the screen
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // Add shadow for Android
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  descriptionLabel: {
    fontSize: 14,
    color: "#333",
  },
  descriptionValue: {
    fontSize: 14,
    color: "#999",
  },
  drawingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  drawingInput: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  downloadButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  engineerRow: {
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  engineerText: {
    fontSize: 14,
    color: "#007AFF",
  },
  laborRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  laborImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  laborName: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  assignLaborButton: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  assignLaborText: {
    color: "#fff",
    fontWeight: "bold",
  },
  assignedButton: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  assignedText: {
    color: "#000",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TaskDetails;
