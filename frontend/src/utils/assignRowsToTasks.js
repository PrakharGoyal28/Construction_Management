function assignRowsToTasks(tasks) {
  // Sort tasks so earlier tasks come first
  if(tasks.length===0){
    console.log("empty task");
    
  }
  console.log("these are tasks in aR",tasks);
  
  const sorted = [...tasks].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  // Each element in 'rows' will track the last end time of the task in that row
  const rows = [];

  for (let task of sorted) {
    let placed = false;
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      // If this task starts AFTER the last end time in rowIndex,
      // we can safely place it in that row
      if (new Date(task.start) > rows[rowIndex]) {
        rows[rowIndex] = new Date(task.end); // update the end time
        task.rowIndex = rowIndex;            // store which row we used
        placed = true;
        break;
      }
    }

    // If not placed in an existing row, create a new one
    if (!placed) {
      task.rowIndex = rows.length;
      rows.push(new Date(task.end));
    }
  }
  console.log(sorted);
  
  return sorted;
}

export default assignRowsToTasks