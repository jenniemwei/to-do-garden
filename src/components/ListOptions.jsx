import React, { useState } from "react";
import "../css/ListOptions.css";
import { X } from "react-feather";

export default function ListOptions({
  taskLists,
  handleChangeTaskState,
  listIndex,
  setTaskLists,
}) {
  //deletes list from taskLists state when user clicks on delete list
  function handleDelete(event, listIndex) {
    const newTaskLists = [...taskLists];
    newTaskLists.splice(listIndex, 1);
    setTaskLists(newTaskLists);
  }

  //turns on edit mode when user clicks on edit list
  function handleEdit(event) {
    handleChangeTaskState(listIndex, "editModeDisplayed", true);
    handleChangeTaskState(listIndex, "optionsDisplayed", false);
  }

  return (
    <div className="list-options-container">
      <ul>
        <li>
          <button
            onClick={(event) => handleDelete(event, listIndex)}
            className="edit-option "
          >
            Delete List
          </button>
        </li>
        <li>
          <button
            onClick={(event) => handleEdit(event)}
            className="edit-option"
          >
            Edit List
          </button>
        </li>
        <li>
          <button
            onClick={(event) =>
              handleChangeTaskState(listIndex, "optionsDisplayed", false)
            }
            className="edit-option"
          >
            Close
          </button>
        </li>
      </ul>
    </div>
  );
}
