import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DayColumn from './DayColumn';
import TaskBar from './TaskBar';

const CalendarContainer = ({ tasks, calendarDays }) => {
  console.log("Tasks in CC", tasks);
  
  return (
    <ScrollView 
      horizontal 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    >
      {calendarDays.map((day, index) => (
        <DayColumn key={index} date={day} />
      ))}

      {/* We can position tasks absolutely on top of columns */}
      {tasks.map(task => (
        <TaskBar
          key={task.id}
          task={task}
          calendarDays={calendarDays}
          // pass any needed styling or dimension info
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexDirection: 'row'
  }
});

export default CalendarContainer;
