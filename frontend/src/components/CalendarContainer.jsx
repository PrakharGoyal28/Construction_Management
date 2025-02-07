import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DayColumn from './DayColumn';
import TaskBar from './TaskBar';

const CalendarContainer = ({ tasks, calendarDays }) => {
  // console.log("Tasks in CC", tasks);
  
  return (
    <ScrollView 
      style={styles.outerContainer} // Vertical scrolling container
      contentContainerStyle={styles.verticalContentContainer}
    >
      <ScrollView 
        horizontal 
        style={styles.innerContainer} // Horizontal scrolling container
        contentContainerStyle={styles.horizontalContentContainer}
      >
        {calendarDays.map((day, index) => (
          <DayColumn key={index} date={day} />
        ))}

       
        {tasks.map((task) => (
          <TaskBar
            key={task.id}
            task={task}
            calendarDays={calendarDays}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  verticalContentContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Prevent tasks from getting hidden behind bottom navigation
  },
  innerContainer: {
    flex: 1,
  },
  horizontalContentContainer: {
    flexDirection: 'row',
  },
});

export default CalendarContainer;
