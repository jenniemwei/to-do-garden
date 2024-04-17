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

  function handleAddTask() {
    setTaskLists([
      ...taskLists,
      {
        name: "",
        currentItems: [],
        completedItems: [],
        editModeDisplayed: false,
        optionsDisplayed: false,
      }
    ])
  }



  return (
    <div className="lists-container">

      {/* {taskLists.map((taskList, index) => {
        return (
          <TaskList
            index={index}
            title={taskList.title}
            currentItems={taskList.currentItems}
            completedItems={taskList.completedItems}
            optionsDisplayed={taskList.optionsDisplayed}
            editModeDisplayed={taskList.editModeDisplayed}
            setTaskLists={setTaskLists}
          />
        )
      })} */}
      <TaskList/>
      {/* <button className="add-list-button" onClick={() => handleAddTask}>Add Task</button> */}
    </div>
  )
}