import React, { useState, useRef, useEffect } from 'react'
import ListOptions from './ListOptions'


export default function EditListMode({ taskLists, handleChangeTaskState, listIndex}) {

  console.log("LIST INDEX", listIndex)
  const currentTitle=taskLists[listIndex].title
  console.log(currentTitle)
  const [editingTitle, setEditingTitle]=useState(currentTitle)
  const listItems = taskLists[listIndex].currentItems
  const [editingList, setEditingList]=useState([...listItems])
  const checkedItems = taskLists[listIndex].completedItems
  const editModeDisplayed = taskLists[listIndex].editModeDisplayed
  const optionsDisplayed = taskLists[listIndex].optionsDisplayed


    const listRef = useRef([]);

    useEffect(() => {
      const size = listRef.current.length;
      listRef.current[size - 1].focus(); //focuses on recently created task
      
    }, [editingList.length]);
  
    function handleTaskChange(event, index) {
      const newListItems = [...listItems]
      newListItems[index] = event.target.value
      setEditingList(newListItems)
      event.target.style.height = '1em';
      event.target.style.height = `${event.target.scrollHeight}px`; 
      
    }
    function handleTitleChange(event){
      setEditingTitle(event.target.value)
    }
  
  
    function handleUserClickOut(event,index){
      const taskContent=event.target.value
      // console.log("CLICKED OUT")
      if (taskContent.length===0){
        const newEditingList=[...editingList]
        newEditingList.pop(index)
        setEditingList(newEditingList)
      }
    }
    function handleCloseEditMode(event){
      handleChangeTaskState(listIndex, "editModeDisplayed", false)
    }
  
    function createNewTask(event) {
      const text = event.target.value
      setEditingList([...editingList, text])
    }

    function handleSave(event){
      handleChangeTaskState(listIndex, "currentItems", editingList)
      handleChangeTaskState(listIndex, "title", editingTitle)
    }
    
    return (
      <div id="edit-mode-container" >
      <div className="task-list edit-mode">
        <div className='list-header'>      
          <input className="title-input list-name" value={editingTitle} onChange={(event)=>{handleTitleChange(event)}}></input>
          <button onClick={(event)=>{handleCloseEditMode(event)}}>Close</button>
          </div>
  
        <ul>
          {editingList.map((item, index) => (
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
        <button onClick={(event)=>{handleSave(event)}}>Save</button>
      </div>
      </div>

    );
  }