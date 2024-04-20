// things to do:
// make save close edit menu
// make close edit mode an X
// make edit options a three dot
import Masonry,{ResponsiveMasonry} from "react-responsive-masonry"; 
import TaskList from "./TaskList"
import "../styles/AllTaskLists.css"
import { useEffect, useState } from "react"

export default function AllTaskLists() {
  const [taskLists, setTaskLists] = useState([]); 
  
  useEffect(() => {
    const taskLists = JSON.parse(localStorage.getItem("taskLists"));
    if (taskLists) {
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
      }
    ])
  }


  return (
    <div id="website-container">
    <header id="homepage-header">
      <h1 id="homepage-title">TO DO GARDEN</h1>
      <button id="new-list-button" onClick={(event)=>{handleNewList(event)}}>+ NEW LIST</button>
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