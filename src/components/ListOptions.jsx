import React, {useState} from 'react'
import '../styles/ListOptions.css';

export default function ListOptions({taskLists, handleChangeTaskState,listIndex}) {

    function handleDelete(event){
         const selectedList = event.target.parentElement.parentElement.parentElement.parentElement;
         selectedList.style.background='red'
         handleChangeTaskState(listIndex, "optionsDisplayed", false)
    }

    function handleEdit(event){
        handleChangeTaskState(listIndex, "editModeDisplayed", true)
        handleChangeTaskState(listIndex, "optionsDisplayed", false)
    }
    
    return (
        <div className="list-options-container">
            <ul>
                <li>
                    <button onClick={(event)=>handleDelete(event)} className="edit-option">Delete List</button>
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