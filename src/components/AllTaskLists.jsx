// things to do:
// make save close edit menu
// make close edit mode an X
// make edit options a three dot

import TaskList from "./TaskList"
import "../styles/AllTaskLists.css"
import { useEffect, useState } from "react"

export default function AllTaskLists() {
  const [taskLists, setTaskLists] = useState([]); 
  
  useEffect(() => {
    // const taskLists = JSON.parse(localStorage.getItem("taskLists"));
    // if (taskLists) {
    //   setTaskLists(taskLists);
    // }
  }, []);

  useEffect(() => {
    // if (taskLists.length > 0) {
    //   localStorage.setItem("taskLists", JSON.stringify(taskLists));
    // }
  } , [taskLists]);



  function handleNewList() {
    setTaskLists([
      ...taskLists,
      {
        title: "Title",
        currentItems: [],
        checkedItems: [],
        editModeDisplayed: true,
        optionsDisplayed: false,
      }
    ])
  }


  return (
    <div>
    <header id="homepage-header">
      <h1>TO DO GARDEN</h1>
    <button id="new-list-button" onClick={(event)=>{handleNewList(event)}}>+ NEW LIST</button>
    </header>
    <div className="all-lists-container">

      {taskLists.map((taskList, index) => {
        return (
          <TaskList
            listIndex={index}
            taskLists={taskLists}
            setTaskLists={setTaskLists}
          />
        )
      })}
  
      {/* <TaskList/>
      <TaskList/> */}
      {/* <button className="add-list-button" onClick={() => handleAddTask}>Add Task</button> */}
    </div>
</div>
  )
}