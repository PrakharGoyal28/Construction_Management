import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Task } from '../models/Task.model.js';


async function generateSchedule() {
  

  const tasks = await Task.find().populate('Prerequisites');

  const taskMap = new Map();
  const indegree = new Map();
  const adjList = new Map(); // Adjacency list for dependencies
  const earliestStart = new Map(); // Tracks the earliest start date for each task

  // Initialize maps
  tasks.forEach(task => {
    const taskId = task._id.toString();
    taskMap.set(taskId, task);
    indegree.set(taskId, 0);
    adjList.set(taskId, []);
    earliestStart.set(taskId, new Date(task.Starttime)); // Initialize with the provided Starttime
  });

  // Populate indegree and adjacency list
  tasks.forEach(task => {
    task.Prerequisites.forEach(prerequisite => {
      console.log(prerequisite.Deadline);
      
      if(prerequisite.Deadline>task.Starttime){
        throw new Error(`prerequisite ${prerequisite.TaskName} not completed for ${task.TaskName} to start`)
      }
      const prerequisiteId = prerequisite._id.toString();
      adjList.get(prerequisiteId).push(task._id.toString());
      indegree.set(task._id.toString(), (indegree.get(task._id.toString()) || 0) + 1);
    });
  });

  const queue = [];
  const schedule = [];

  // Enqueue tasks with no prerequisites
  indegree.forEach((value, key) => {
    if (value === 0) queue.push(key);
  });

  // Process tasks in topological order
  while (queue.length > 0) {
    const currentTaskId = queue.shift();
    const currentTask = taskMap.get(currentTaskId);
    const currentStartTime = earliestStart.get(currentTaskId);

    // Add the current task to the schedule
    schedule.push({ ...currentTask.toObject(), EarliestStart: currentStartTime });

    // Update dependent tasks
    adjList.get(currentTaskId).forEach(dependentTaskId => {
      const dependentTask = taskMap.get(dependentTaskId);
      const dependentEarliestStart = earliestStart.get(dependentTaskId);

      // Calculate the earliest start time based on the current task's completion
      const completionTime = new Date(currentStartTime);
      completionTime.setDate(completionTime.getDate() + currentTask.Timerequired);

      // Ensure dependent task respects the prerequisite's completion time
      if (completionTime > dependentEarliestStart) {
        earliestStart.set(dependentTaskId, completionTime);
      }

      // Decrease indegree and enqueue if ready
      indegree.set(dependentTaskId, indegree.get(dependentTaskId) - 1);
      if (indegree.get(dependentTaskId) === 0) {
        queue.push(dependentTaskId);
      }
    });
  }

  if (schedule.length !== tasks.length) {
    throw new Error('Cyclic dependency detected. Cannot generate schedule.');
  }

  return formatForCalendar(schedule);
}

function formatForCalendar(tasks) {
  const calendar = {};

  tasks.forEach(task => {
    const startDate = task.EarliestStart || task.Starttime;
    const startDateKey = startDate.toISOString().split('T')[0];

    if (!calendar[startDateKey]) {
      calendar[startDateKey] = [];
    }

    calendar[startDateKey].push({
      TaskName: task.TaskName,
      Starttime: startDate,
      Description: task.Description,
    });
  });

  return calendar;
}

const getSchedule=async (req,res)=>{
  try {
    const schedule = await generateSchedule();
    res.status(200).json({
      message: 'Task schedule generated successfully',
      schedule,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export {getSchedule}
