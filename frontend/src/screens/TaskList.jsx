import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet,ScrollView } from "react-native";
import axios from 'axios';

import { BASE_URL } from '../auth/config';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
const TaskList = () => {
  const navigation=useNavigation()
  const [activeTab, setActiveTab] = useState("Assigned");
  const [tasks, setTasks] = useState([]);
  
  
  const fetchTasks=async ()=>{
    try {
      const today = new Date().toISOString().split('T')[0];
      // console.log(`${today}`);
      // console.log(`${BASE_URL}/task/info/2025-01-25`);
      
      const response = await axios.get(`${BASE_URL}/task/info/${today}`);
      // console.log("response",response.data);
      
      
      
      setTasks(response.data);
      
      
      
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  }
  
  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);
  // console.log("hello->>>>>",tasks);
  // console.log("hello->>>>>",tasks);

  const navigateToDetails = (task) => {
    // console.log("yo yo",task.TaskName);
    
    navigation.navigate("TaskDetails", { task });
  };

  const renderTask = ({ item }) => {
    console.log("Item",item.AssignedTo);
      return (item.AssignedTo.length>0?(<TouchableOpacity style={styles.taskCard} onPress={() => navigateToDetails(item)}>
      <View style={styles.radioCircleGreen}>
        <FontAwesome5 name="check" color="green" size={14}/>
      </View>
      <Text style={styles.taskName}>{item.TaskName}</Text>
      <View style={styles.taskNumber}>
        <Text style={styles.numberText}>{item.LabourRequired}</Text>
      </View>
    </TouchableOpacity>):(<TouchableOpacity style={styles.taskCard} onPress={() => navigateToDetails(item)}>
      <View style={styles.radioCircleGreen}>
      
        </View>
      <Text style={styles.taskName}>{item.TaskName}</Text>
      <View style={styles.taskNumber}>
        <Text style={styles.numberText}>{item.LabourRequired}</Text>
      </View>
    </TouchableOpacity>)
    
  
  )};

  return (
    <View style={styles.container}>
      
      {/* Task List */}
      {tasks.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks today</Text>
        </View>
      ) : (
        <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item._id} contentContainerStyle={styles.flatListContent} />
      )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
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
  radioCircleGreen: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 16,
    color:"green"
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
  flatListContent: {
    paddingBottom: 180, // Adjust this value to the height of your bottom navigation bar
  },
});

export default TaskList;
