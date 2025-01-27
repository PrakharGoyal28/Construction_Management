import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axios from 'axios';

import { BASE_URL } from '../auth/config';
import { useNavigation } from "@react-navigation/native";
const TaskList = () => {
  const navigation=useNavigation()
  const [activeTab, setActiveTab] = useState("Assigned");
  const [tasks, setTasks] = useState([]);
  

  const fetchTasks=async ()=>{
    try {
      const today = new Date().toISOString().split('T')[0];
      console.log(`${today}`);
      console.log(`${BASE_URL}/task/info/2025-01-25`);
      
      const response = await axios.get(`${BASE_URL}/task/info/${today}`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      console.log("hello",response.status);
      console.log("hello",response.data);
      
      setTasks(response.data);
      console.log("hello          ",tasks);
      
      
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  }
  // const tasks = [
  //   { id: "1", name: "Task Name in a full length for better understanding", number: 6 },
  //   { id: "2", name: "Task Name in a full length for better understanding", number: 6 },
  //   { id: "3", name: "Task Name in a full length for better understanding", number: 6 },
  //   { id: "4", name: "Task Name in a full length for better understanding", number: 6 },
  // ];
  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  const navigateToDetails = (task) => {
    console.log(task.TaskName);
    
    navigation.navigate("TaskDetails", { task });
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity style={styles.taskCard} onPress={() => navigateToDetails(item)}>
      <View style={styles.radioCircle}></View>
      <Text style={styles.taskName}>{item.TaskName}</Text>
      <View style={styles.taskNumber}>
        <Text style={styles.numberText}>{item.LabourRequired}</Text>
      </View>
    </TouchableOpacity>
  
  );

  return (
    <View style={styles.container}>
      {/* Header
      <View style={styles.header}>
        <Text style={styles.headerText}>Task List</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.activeButton}>
            <Text style={styles.buttonText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveButton}>
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      {/* <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("Assigned")}>
          <Text style={activeTab === "Assigned" ? styles.activeTab : styles.inactiveTab}>
            Assigned
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Critical")}>
          <Text style={activeTab === "Critical" ? styles.activeTab : styles.inactiveTab}>
            Critical
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Field")}>
          <Text style={activeTab === "Field" ? styles.activeTab : styles.inactiveTab}>
            Field
          </Text>
        </TouchableOpacity>
      </View> */} 

      {/* Task List */}
      {tasks.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks today</Text>
        </View>
      ) : (
        <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item._id} />
      )}

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

export default TaskList;
