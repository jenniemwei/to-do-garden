import React, { useState, useRef, useEffect } from "react";
import ListOptions from "./ListOptions";
import { X } from "react-feather";

export default function EditListMode({
  taskLists,
  handleChangeTaskState,
  listIndex,
}) {

  const currentTitle = taskLists[listIndex].title;
  //editing title that doesn't change taskLists state until save button is clicked
  const [editingTitle, setEditingTitle] = useState(currentTitle);
  const listItems = taskLists[listIndex].currentItems;
  //editing list that doesn't change taskLists state until save button is clicked
  const [editingList, setEditingList] = useState([...listItems]);

  const listRef = useRef([]);

  useEffect(() => {
    const size = listRef.current.length;
    if (size > 0 && listRef.current[size - 1] !== null) {
      listRef.current[size - 1].focus(); //focuses on recently created task
    }
  }, [editingList.length]);
//handles change in task content in editing list
  function handleTaskChange(event, index) {
    const newListItems = [...editingList];
    newListItems[index] = event.target.value;
    setEditingList(newListItems);
    // resizes text area to fit typed content
    event.target.style.height = "1em";
    event.target.style.height = `${event.target.scrollHeight}px`;
  }
  function handleTitleChange(event) {
    // resizes text area to fit typed title
    event.target.style.height = "1em";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setEditingTitle(event.target.value);
  }

  function handleUserClickOut(event, index) {
    const taskContent = event.target.value;
    if (taskContent.length === 0) {
      console.log("EMPTY TASK");
      const newEditingList = [...editingList];
      newEditingList.pop(index);
      setEditingList(newEditingList);
    }
  }
  //closes edit mode when user clicks on close button by setting editModeDisplayed to false
  function handleCloseEditMode(event) {
    handleChangeTaskState(listIndex, "editModeDisplayed", false);
  }
//creates new task in the editing list when user clicks on + New Task
  function createNewTask(event) {
    const text = event.target.value;
    setEditingList([...editingList, text]);
  }

  //saves editing list and title to taskLists state
  function handleSave(event) {
    handleChangeTaskState(listIndex, "editModeDisplayed", false);
    handleChangeTaskState(listIndex, "currentItems", editingList);
    handleChangeTaskState(listIndex, "title", editingTitle);
  }

  return (
    <div id="edit-mode-container">
      <div className=" edit-mode">
        <div className="list-header">
          <textarea
            rows="1"
            className="title-input list-title"
            value={editingTitle}
            placeholder="Title"
            onChange={(event) => {
              handleTitleChange(event);
            }}
          ></textarea>
          <button
            onClick={(event) => {
              handleCloseEditMode(event);
            }}
            aria-label="close edit list popup"
            className="close-button"
          >
            <X size="30" color="gray" />
          </button>
        </div>
        <ul>
          {editingList.map((item, index) => (
            <li className="task-container" key={index}>
              <input type="checkbox" disabled={true} />
              <textarea
                className=" task-text"
                rows="1"
                value={item}
                ref={(el) => (listRef.current = [...listRef.current, el])}
                onBlur={(event) => {
                  handleUserClickOut(event, index);
                }}
                onChange={(event) => {
                  handleTaskChange(event, index);
                }}
              />
            </li>
          ))}
          <button className="task-container new-task task-text">
            <div onClick={(e) => createNewTask(e)}>+ New Task</div>
            <input disabled={true} type="checkbox" id="invisible-checkbox" />
          </button>
        </ul>
        <button
          className="blue-button"
          onClick={(event) => {
            handleSave(event);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
