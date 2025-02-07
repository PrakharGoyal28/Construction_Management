import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; // for icons
import {useNavigation } from '@react-navigation/native';
import TaskCalendar from './TaskCalendar';

// const { widthS } = Dimensions.get('window');
// const { heightS } = Dimensions.get('window');

const DashboardButton = ({ icon, label, selected ,goTo}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.button, selected && styles.selectedButton]} onTouchEndCapture={() => navigation.navigate(goTo)}>
      <MaterialCommunityIcons name={icon} size={24} color={selected ? 'white' : 'black'} />
      <Text style={[styles.buttonLabel, selected && styles.selectedLabel]}>{label}</Text>
    </View>
  );
};


const EngineerDashboard = () => {
  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          <DashboardButton icon="calendar" label="Scheduling" goTo={'SchedulingDashboard'}/>
          <DashboardButton icon="clipboard-list" label="Inventory"  goTo={'InventoryDashboard'}/>
          <DashboardButton icon="receipt" label="Billing" />
          <DashboardButton icon="comment-question-outline" label="Q/A" />
          </View>
        <Text style={styles.header}>Notifications</Text> 
        </ScrollView>
    </View>
  )
}

export default EngineerDashboard


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    flex:1
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
    width: '40%',
    height: '40%',
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
