import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; // for icons

const DashboardButton = ({ icon, label, selected }) => {
  return (
    <View style={[styles.button, selected && styles.selectedButton]}>
      <MaterialCommunityIcons name={icon} size={24} color={selected ? 'white' : 'black'} />
      <Text style={[styles.buttonLabel, selected && styles.selectedLabel]}>{label}</Text>
    </View>
  );
};


const Dashboard = () => {
  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          <DashboardButton icon="calendar" label="Attendance" selected />
          <DashboardButton icon="checkbox-marked-circle" label="Tasks" selected />
          <DashboardButton icon="account-group" label="Labor Calendar" />
          <DashboardButton icon="calendar-range" label="Task Calendar" />
        </View>
        <Text style={styles.header}>Tasks Status</Text>
        </ScrollView>
    </View>
  )
}

export default Dashboard


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 150,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
});
