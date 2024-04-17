import React, {useState} from 'react'
import '../styles/ListOptions.css';

export default function ListOptions({setEditModeDisplayed, setOptionsDisplayed}) {
    function handleDelete(event){
         const selectedList = event.target.parentElement.parentElement.parentElement.parentElement;
         selectedList.style.background='red'
         setOptionsDisplayed(false)
    }

    function handleEdit(event){
        setEditModeDisplayed(true)
        setOptionsDisplayed(false)
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
                    <button onClick={() => setOptionsDisplayed(false)} className="edit-option">Close</button>
                </li>
            </ul>
        </div>
    )
}