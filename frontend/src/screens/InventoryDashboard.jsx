import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {  MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DashboardButton = ({ icon, label, selected, goTo }) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.button, selected && styles.selectedButton]} onTouchEndCapture={() => navigation.navigate(goTo)}>
            <MaterialIcons name={icon} size={29} color={selected ? 'white' : 'black'} />
            <Text style={[styles.buttonLabel, selected && styles.selectedLabel]}>{label}</Text>
        </View>
    );
};


const InventoryDashboard = () => {
    return (
        <View style={styles.container} >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.grid}>
                    <DashboardButton icon="move-to-inbox" selected={true} label="Current/ Order Inventory" goTo={"CurrentInventory"}/>
                    <DashboardButton icon="move-to-inbox"  label="Receive Inventory" goTo={"ReceiveInventory"} />
                </View>
                <Text style={styles.header}>Notifications</Text>
            </ScrollView>
        </View>
    )
}

export default InventoryDashboard

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
        height: '45%',
    },
    button: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
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