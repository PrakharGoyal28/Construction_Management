import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, ScrollView, Alert, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons, FontAwesome5, Entypo, AntDesign } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { BASE_URL } from "../auth/config";
import { useNavigation } from "@react-navigation/native";

const CreateTask = () => {
    const [selectedSupervisor, setSelectedSupervisor] = useState("");
    const [supervisors, setSupervisors] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectingStart, setSelectingStart] = useState(true);
    
    const navigation=useNavigation(); 

    useEffect(() => {
        axios.get(`${BASE_URL}/users/getSupervisors`)
            .then(response => setSupervisors(response.data))
            .catch(error => console.error("Error fetching supervisors:", error));
    }, []);

    const handleDayPress = (day) => {
        if (selectingStart) {
            setStartDate(day.dateString);
            setSelectingStart(false);
        } else {
            if (new Date(day.dateString) < new Date(startDate)) {
                Alert.alert("Error", "End date cannot be before start date!");
            } else {
                setEndDate(day.dateString);
                setShowCalendar(false);
            }
        }
    };

    const handleCreateTask = async () => {
        if (!taskName || !location || !selectedSupervisor || !startDate || !endDate) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }
    
        const taskData = {
            TaskName: taskName,
            Location: location,
            AssignedTo: [selectedSupervisor],
            Starttime: new Date(startDate),
            Deadline: new Date(endDate),
            Description: "Task description here",
            LabourRequired: [],
        };
    
        try {
            const response = await axios.post(`${BASE_URL}/task/create`, taskData);
            Alert.alert("Success", "Task created successfully!");
            navigation.goBack();
        } catch (error) {
            console.error("Error creating task:", error);
            Alert.alert("Error", error.response?.data?.message || "Could not create task.");
        }
    };
    


    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}><MaterialIcons name="edit" size={20} /> Name</Text>
                    <TextInput
                        placeholder="Task name"
                        style={styles.input}
                        value={taskName}
                        onChangeText={setTaskName}
                    />
                </View>

                <View>
                    <Text style={styles.title} ><Entypo name="location-pin" size={20} /> Location</Text>
                    <TextInput
                        placeholder="Location"
                        style={styles.input}
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>
                <View >
                    <Text style={styles.title}><MaterialIcons name="inventory" size={20} /> Materials</Text>
                    <TouchableOpacity style={styles.addButton}><Text>+ Add Material</Text></TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.title}><FontAwesome5 name="users" size={20} /> Number of Labors</Text>
                    <TouchableOpacity style={styles.addButton}><Text>+ Add</Text></TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.title}><FontAwesome5 name="tools" size={20} /> Equipment Required</Text>
                    <TouchableOpacity style={styles.addButton}><Text>+ Add</Text></TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.title}><FontAwesome5 name="user" size={20} /> Assign to</Text>
                    <Picker
                        selectedValue={selectedSupervisor}
                        onValueChange={(itemValue) => setSelectedSupervisor(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Supervisor" value="" />
                        {supervisors.map((supervisor) => (
                            <Picker.Item key={supervisor._id} label={supervisor.name} value={supervisor._id} />
                        ))}
                    </Picker>
                </View>

                <View>
                    <Text style={styles.title}><MaterialIcons name="access-alarms" size={24} color="black" />  Duration </Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => { setShowCalendar(true); setSelectingStart(true); }}>
                        <Text>{startDate && endDate ? `${startDate} → ${endDate}` : "+ Select Duration"}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text><FontAwesome5 name="file-image" size={20} /> Drawings</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 15 }}>
                        <AntDesign name="pluscircle" size={24} color="black" />
                        <Text style={{ marginLeft: 5 }}>Add</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.button]}
                    onPress={handleCreateTask}
                >
                    <Text style={[styles.buttonText]}>
                        Create Task
                    </Text>
                </TouchableOpacity>
                

                <Modal visible={showCalendar} transparent={true}>
                    <View style={styles.modalContainer}>
                        <Calendar
                            onDayPress={handleDayPress}
                            markedDates={{
                                ...(startDate && { [startDate]: { selected: true, selectedColor: "green" } }),
                                ...(endDate && { [endDate]: { selected: true, selectedColor: "red" } }),
                            }}
                        />
                        <Button title="Close" onPress={() => setShowCalendar(false)} />
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default CreateTask;

const styles = {
    container: {
        padding: 30,
        backgroundColor: "white",
        flex: 1,
        gap: 30
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    addButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginVertical: 10,
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "AlbertSans",
        fontWeight: "700",
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    button: {
        marginTop: 20,
        width: 200,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'black',
        borderRadius: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
};
