import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {  FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DashboardButton = ({ icon, label, selected, goTo }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={[styles.button, selected && styles.selectedButton]} onPress={() => navigation.navigate(goTo)}>
            <FontAwesome  name={icon} size={29} color={selected ? 'white' : 'black'} />
            <Text style={[styles.buttonLabel, selected && styles.selectedLabel]}>{label}</Text>
        </TouchableOpacity>
    );
};

const SchedulingDashboard = () => {
    return (
        <View style={styles.container} >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.grid}>
                    <DashboardButton icon="calendar-plus-o" selected={true} label="Create Task" goTo={"CreateTask"} />
                    <DashboardButton icon="calendar" label="Timeline Overview" goTo={"CurrentInventory"} />
                    <DashboardButton icon="gear" label="Supervisor Management" goTo={"CurrentInventory"} />
                    <DashboardButton icon="users" label="Request labor" goTo={"LabourReqDashboard"} />
                </View>
                <Text style={styles.header}>Notifications</Text>
            </ScrollView>
        </View>
    )
}

export default SchedulingDashboard

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "white",
        flex: 1
    },
    grid: {
        flexDirection: 'col',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85%',
    },
    button: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center', 
        paddingLeft:'20%', 
        gap: 8,
    },
    selectedButton: {
        backgroundColor: 'black',
    },
    buttonLabel: {
        marginTop: 8,
        fontSize: 14,
        color: 'black',
    },
    selectedLabel: {
        color: 'white',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 24,
    },
})