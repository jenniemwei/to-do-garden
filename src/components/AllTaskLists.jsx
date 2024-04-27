import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TaskList from "./TaskList";
import { HelpCircle } from "react-feather";
import "../css/AllTaskLists.css";
import { useEffect, useState } from "react";

export default function AllTaskLists() {
  //holds objects that represent each list
  const [taskLists, setTaskLists] = useState([]);

  //manages local storage, saves taskLists state to local storage everytime it changes
  useEffect(() => {
    const taskListsFromLocal = JSON.parse(localStorage.getItem("taskLists"));

    //if there are no taskLists in local storage, creates a welcome list
    if (taskListsFromLocal == null) {
      localStorage.setItem(
        "taskLists",
        JSON.stringify([
          {
            title: "Welcome to To Do Garden ❀༉‧˚.",
            currentItems: [
              "Check off tasks to grow flowers!",
              "Click the three dots to edit lists or delete lists",
              "After clicking 'edit list' start typing to edit tasks or title",
              "delete this list and create your own!",
            ],
            checkedItems: [],
            editModeDisplayed: false,
            optionsDisplayed: false,
            isWelcomeList: true,
            completedDisplayed: false,
          },
        ])
      );
      //sets taskLists state to welcome list so it displays welcome list
      setTaskLists([
        {
          title: "Welcome to To Do Garden!",
          currentItems: [
            "Check off tasks to grow flowers!",
            "Click the three dots to edit lists or delete lists",
            "After clicking 'edit list' start typing to edit tasks or title",
            "delete this list and create your own!",
          ],
          checkedItems: [],
          editModeDisplayed: false,
          optionsDisplayed: false,
          isWelcomeList: true,
          completedDisplayed: false,
        },
      ]);
      //if there are taskLists in local storage, sets taskLists state to taskLists from local storage
    } else {
      setTaskLists(taskListsFromLocal);
    }
  }, []);

  useEffect(() => {
    if (taskLists != null && taskLists.length > 0) {
      localStorage.setItem("taskLists", JSON.stringify(taskLists));
    }
  }, [taskLists]);

  // Creates new list in taskLists state
  function handleNewList() {
    setTaskLists([
      ...taskLists,
      {
        title: "",
        currentItems: [],
        checkedItems: [],
        editModeDisplayed: true,
        optionsDisplayed: false,
        isWelcomeList: false,
      },
    ]);
  }

  return (
    <div id="website-container">
      <header id="homepage-header">
        <h1 id="homepage-title">To Do Garden 🌷</h1>
        <button
          className="blue-button"
          onClick={(event) => {
            handleNewList(event);
          }}
        >
          + New List
        </button>
      </header>
      <ResponsiveMasonry columnsCountBreakPoints={{ 700: 1, 800: 2, 1200: 3 }}>
        <Masonry gutter="2vw">
          {taskLists.map((taskList, index) => {
            return (
              <TaskList
                listIndex={index}
                taskLists={taskLists}
                setTaskLists={setTaskLists}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
