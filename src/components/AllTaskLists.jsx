import TaskList from "./TaskList"
import "../styles/AllTaskLists.css"
import { useState } from "react"

export default function AllTaskLists() {
  const [taskLists, setTaskLists] = useState([
    {
      title: "Task List 1",
      currentItems: [
        "Task 1",
      ],
      completedItems: [
        "Task 2",
      ],
      editModeDisplayed: false,
      optionsDisplayed: false,
    },
    {
      title: "Task List 2",
      currentItems: [
        "Task 3",
      ],
      completedItems: [
        "Task 4",
      ],
      editModeDisplayed: false,
      optionsDisplayed: false,
    },
  ])

  function handleNewList() {
    setTaskLists([
      ...taskLists,
      {
        name: "Title",
        currentItems: [],
        completedItems: [],
        editModeDisplayed: true,
        optionsDisplayed: false,
      }
    ])
  }



  return (
    <div className="lists-container">

      {taskLists.map((taskList, index) => {
        return (
          <TaskList
            listIndex={index}
            taskLists={taskLists}
            setTaskLists={setTaskLists}
          />
        )
      })}
      <button onClick={(event)=>{handleNewList(event)}}>New List</button>
      {/* <TaskList/>
      <TaskList/> */}
      {/* <button className="add-list-button" onClick={() => handleAddTask}>Add Task</button> */}
    </div>
  )
}