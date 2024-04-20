import React, {useState} from 'react'
import '../styles/ListOptions.css';

export default function ListOptions({taskLists, handleChangeTaskState,listIndex, setTaskLists}) {

    function handleDelete(event, listIndex){
         const newTaskLists = [...taskLists];
         console.log("LIST INDEX", listIndex)
         newTaskLists.splice(listIndex, 1);
         console.log("NEW TASK LISTS", newTaskLists)
         setTaskLists(newTaskLists);
         console.log("TASK LISTS", taskLists);
    }

    function handleEdit(event){
        handleChangeTaskState(listIndex, "editModeDisplayed", true)
        handleChangeTaskState(listIndex, "optionsDisplayed", false)
    }
    
    return (
        <div className="list-options-container">
            <ul>
                <li>
                    <button onClick={(event)=>handleDelete(event, listIndex)} className="edit-option ">Delete List</button>
                </li>
                <li>
                    <button onClick={(event)=>handleEdit(event)}className="edit-option">Edit List</button>
                </li>
                <li>
                    <button onClick={() => handleChangeTaskState(listIndex, "optionsDisplayed", false)} className="edit-option">Close</button>
                </li>
            </ul>
        </div>
    )
}