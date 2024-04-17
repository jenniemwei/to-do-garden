import React, { useState, useRef, useEffect } from 'react'
import ListOptions from './ListOptions'


export default function EditListMode({ setListItems, setTitle, title, listItems, setEditModeDisplayed }) {

  const [editinglist, setEditingList]=useState([])

    
    const listRef = useRef([]);

    useEffect(() => {
      const size = listRef.current.length;
      listRef.current[size - 1].focus();
      
    }, [listItems.length]);
  
    function handleTaskChange(event, index) {
      const newListItems = [...listItems]
      newListItems[index] = event.target.value
      setListItems(newListItems)
      event.target.style.height = '1em';
      event.target.style.height = `${event.target.scrollHeight}px`; 
      
    }
    function handleTitleChange(event){
      setTitle(event.target.value)
    }
  
  
    function handleUserClickOut(event,index){
      const taskContent=event.target.value
      // console.log("CLICKED OUT")
      if (taskContent.length===0){
        const newListItems=[...listItems]
        newListItems.pop(index)
        setListItems(newListItems)
      }
    }
    function handleCloseEditMode(event){
      setEditModeDisplayed(false)
    }
  
    function createNewTask(event) {
      const text = event.target.value
      setListItems([...listItems, text])
    }
    // function handleDone(event){
    //   setListItems(listItems)
    // }
    
    return (
      <div id="edit-mode-container" >
      <div className="task-list edit-mode">
        <div className='list-header'>      
          <input className="title-input list-name" value={title} onChange={(event)=>{handleTitleChange(event)}}></input>
          <button onClick={(event)=>{handleCloseEditMode(event)}}>Close</button>
          </div>
  
        <ul>
          {listItems.map((item, index) => (
            <li key={index}>
              <input 
                type= 'checkbox' disabled={true}/>
              <textarea 
                rows="1" 
                value={item}
                ref = {el => listRef.current = [...listRef.current, el]}
                onBlur={(event) => {handleUserClickOut(event,index)}}  
                onChange={(event) => {handleTaskChange(event, index)}} 
                className="task"
              />
            </li>
          ))}
          <li>
            <textarea 
              rows="1" 
              placeholder='+ New Task' 
              onClick={(e) => createNewTask(e)} 
              className="task"
            /> 
            <input 
              disabled={true}
              type= 'checkbox'
              id='invisible-checkbox'
            />
          </li>
        </ul>
        {/* <button onClick={(event)=>{handleDone(event)}}>Save</button> */}
  
      </div>
      </div>

    );
  }