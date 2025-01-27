import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns'; // optional library for date formatting

const DayColumn = ({ date }) => {
  return (
    <View style={styles.column}>
      <Text style={styles.columnHeader}>
        {format(date, 'EEE')} {/* e.g. 'Mon', 'Tue' */}
      </Text>
      <Text style={styles.columnSubHeader}>
        {format(date, 'MMM d')} {/* e.g. 'Jan 1' */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    width: 120, // or however wide you want each day column
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    // etc.
  },
  columnHeader: {
    fontWeight: 'bold',
    // ...
  },
  columnSubHeader: {
    color: '#666',
    // ...
  }
});

export default DayColumn;
