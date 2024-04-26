// things to do:
//completed count

import Masonry,{ResponsiveMasonry} from "react-responsive-masonry"; 
import TaskList from "./TaskList"
import "../styles/AllTaskLists.css"
import { useEffect, useState } from "react"

export default function AllTaskLists() {
  const [taskLists, setTaskLists] = useState([  {
    title: "Welcome to To Do Garden!",
    currentItems: ["Check off tasks to grow flowers!", "Click the three dots to edit lists or delete lists", "After clicking 'edit list' start typing to edit tasks or title", "delete this list and create your own!"],
    checkedItems: [],
    editModeDisplayed: false,
    optionsDisplayed: false,
    isWelcomeList: true,
    completedDisplayed: false,
  } 
  ]); 
  

  useEffect(() => {
    const taskLists = JSON.parse(localStorage.getItem("taskLists"));
    if (taskLists && taskLists[0].isWelcomeList === false || taskLists.length>1) {
      setTaskLists(taskLists);
    }
  }, []);

  useEffect(() => {
    if (taskLists.length > 0) {
      localStorage.setItem("taskLists", JSON.stringify(taskLists));
    }
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
        isWelcomeList: false,
      }
    ])
  }


  return (
    <div id="website-container">
    <header id="homepage-header">
      <h1 id="homepage-title">TO DO GARDEN</h1>
      <button className="blue-button" onClick={(event)=>{handleNewList(event)}}>+ NEW LIST</button>
    </header>
    {/* className="all-lists-container" */}
    <ResponsiveMasonry 
    columnsCountBreakPoints={{ 700: 1, 800: 2, 1200: 3 }}>
      <Masonry gutter="2vw">
      {taskLists.map((taskList, index) => {
        return (
          <TaskList
            listIndex={index}
            taskLists={taskLists}
            setTaskLists={setTaskLists}
          />
        )
      })}
      </Masonry>
    </ResponsiveMasonry>
</div>
  )
}