// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { View, StyleSheet,Text,ScrollView } from "react-native";
// import {Calendar} from "react-native-big-calendar";
// import moment from "moment";


// const generateWeekDates = () => {
//   return Array.from({ length: 7 }, (_, i) =>
//     moment().add(i, "days").format("DD MMM, YYYY")
//   );
// };

// const dates = generateWeekDates();

// const tasks = [
//   { id: "1", name: "Task 1", day: 0, length: 1 },
//   { id: "2", name: "Task 2", day: 1, length: 2 },
//   { id: "3", name: "Task 3", day: 2, length: 1 },
//   { id: "4", name: "Task 4", day: 3, length: 1 },
//   { id: "5", name: "Task 5", day: 4, length: 2 },
// ];
//  const TaskCalendar = () => {
//   // const [tasks, setTasks] = useState([]);
//   // const [formattedTasks, setFormattedTasks] = useState([]);

//   // const fetchTasks = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:3000/api/v1/task/all/abc`
//   //     );
//   //     // Assume tasks have Starttime and Deadline fields
//   //     const temp = response.data;
//   //     const temp1 = temp.map((item) => ({
//   //       id: item._id,
//   //       title: item.TaskName,
//   //       start: new Date(item.Starttime),
//   //       end: new Date(item.Deadline),
//   //       color: getRandomColor(),
//   //     }));
//   //     setTasks(temp1);
//   //   } catch (error) {
//   //     console.error("Error fetching tasks:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //     fetchTasks(); // Fetch tasks when the component mounts
//   //   }, []);

//   // return (
//   //   <View style={styles.container}>
//   //     <Calendar
//   //       events={tasks}
//   //       height={600}

//   //       mode="day"
//   //        // Options: "day", "week", "month"
//   //       allDayAccessor="allDay"
//   //       dayLayoutAlgorithm="no-overlap"
//   //       onPressEvent={(event) => {
//   //         console.log(event); // Handle navigation or task details
//   //       }}
//   //       // renderEvent={(event) => (
//   //       //   <View style={{ padding: 4, backgroundColor: event.color, borderRadius: 5 }}>
//   //       //     <Text style={{ color: "#fff", fontWeight: "bold" }}>{event.title}</Text>
//   //       //   </View>
//   //       // )}
//   //       eventCellStyle={(event) => ({
//   //         backgroundColor: event.color || "#FFA07A", // Use unique color or fallback
//   //         borderRadius: 8,

//   //         marginBottom: 4, // Add margin for better separation

//   //       })}
//   //       overlapOffset={10}
//   //     />
//   //   </View>
//   // );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Task Calendar</Text>

//       {/* Date Headers */}
//       <View style={styles.dateRow}>
//         {dates.map((date, index) => (
//           <Text key={index} style={styles.dateHeader}>{date}</Text>
//         ))}
//       </View>

//       {/* Scrollable Task View */}
//       <ScrollView horizontal>
//         <View style={styles.taskContainer}>
//           {tasks.map((task) => (
//             <View
//               key={task.id}
//               style={[
//                 styles.task,
//                 { left: task.day * 100, width: task.length * 100 },
//               ]}
//             >
//               <Text numberOfLines={1} style={styles.taskText}>{task.name}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );

// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     padding: 10,

// //   },
// // });

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: "#fff" },
//   header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   dateRow: { flexDirection: "row", justifyContent: "space-around" },
//   dateHeader: { fontWeight: "bold", width: 100, textAlign: "center" },
//   taskContainer: { flexDirection: "row", marginTop: 10 },
//   task: {
//     position: "absolute",
//     height: 40,
//     backgroundColor: "#f4a261",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//     paddingHorizontal: 5,
//   },
//   taskText: { color: "#fff", fontWeight: "bold" },
// });

// export default TaskCalendar
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import CalendarContainer from "../components/CalendarContainer";
import assignRowsToTasks from "../utils/assignRowsToTasks";
import axios from "axios";
import { BASE_URL } from "../auth/config";







export default function TaskCalendar() {
  // generate your calendar days
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/task/all/abc`
      );
      // console.log(response.data);
      
      // Assume tasks have Starttime and Deadline fields
      const temp = response.data;
      const temp1 = temp.map((item) => ({
        id: item._id,
        title: item.TaskName,
        start: new Date(item.Starttime),
        end: new Date(item.Deadline),
        
      }));
      setTasks(temp1);
      // console.log(tasks);
      
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    
  }, []);
  // console.log(tasks);
  

  const tasksWithRows =assignRowsToTasks(tasks);
  // console.log("*******");
  
  // console.log("Task With rows",tasksWithRows);

  // console.log("*******");

  const calendarDays = useMemo(() => {
    const startDate = new Date();
    const daysToShow = 21;
    let arr = [];
    for (let i = 0; i < daysToShow; i++) {
      let d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  

  return (
    <View style={{ flex: 1 }}>
      <CalendarContainer tasks={tasksWithRows} calendarDays={calendarDays} />
    </View>
  );
}
