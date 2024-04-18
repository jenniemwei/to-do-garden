import React, { useState } from 'react'
import '../styles/Lists.css';
import ListOptions from './ListOptions';
import EditListMode from './EditListMode';

export default function TaskList({listIndex, taskLists, setTaskLists}) {

  // const[listItems, setListItems] = useState(['task 1 task 1 task 1 ','task 2','task 3 ', 'task 4']) //[ declared thing, how you set it to something/override]
  // const [checkedItems, setCheckedItems] = useState([])
  // // const[checked, setChecked] = useState(false)
  // const[optionsDisplayed, setOptionsDisplayed]=useState(false)
  // const[title,setTitle] = useState('Title')

  // state for each TaskList before save
  // const [editModeDisplayed, setEditModeDisplayed] = useState(false)


  function handleChangeTaskState(index, key, value) {
    const newTaskLists = [...taskLists]
    newTaskLists[index][key] = value
    setTaskLists(newTaskLists)
  }

  // function handleTaskChange(event, index) {
  //   const newListItems = [...listItems]
  //   newListItems[index] = event.target.value
  //   setListItems(newListItems)
  //   event.target.style.height = '1em';
  //   event.target.style.height = `${event.target.scrollHeight}px`; 
    
  // }
  // function handleTitleChange(event){
  //   setTitle(event.target.value)
  // }
  
  const listItems = taskLists[listIndex].currentItems
  const checkedItems = taskLists[listIndex].completedItems
  const editModeDisplayed = taskLists[listIndex].editModeDisplayed
  const optionsDisplayed = taskLists[listIndex].optionsDisplayed

  function handleCheckBoxChange(event,index,item){
    const currCheckbox=event.target.value
    // setChecked()
    const newListItems = [...listItems];
    newListItems.pop(index);
    const newCheckedItems = [...checkedItems, item]
    // const newListItems = listItems.filter((item, i) => i !== index)
    
    handleChangeTaskState(listIndex, "checkedItems", newCheckedItems)
    handleChangeTaskState(listIndex, "currentItems", newListItems)

  }

  function handleOptionsClick(event){
    const currentOptionsDisplayed = taskLists[listIndex].optionsDisplayed
    handleChangeTaskState(listIndex, "optionsDisplayed", !currentOptionsDisplayed)
  }

  // function createNewTask(event) {
  //   const text = event.target.value
  //   setListItems([...listItems, text])
  // }
  


  return (
    <>
      {editModeDisplayed && <EditListMode 
        taskLists={taskLists}
        handleChangeTaskState={handleChangeTaskState}
        listIndex={listIndex}
      />}
      <div className="task-list">
        <div className='list-header'>      
          <h1 className="list-name">{taskLists[listIndex].title}</h1> 
          {/* make title not an input not working */}
          <button onClick={(event)=>{handleOptionsClick(event)}}>edit</button>
          </div>
          <hr></hr>

          {optionsDisplayed && <ListOptions 
          taskLists={taskLists}
          handleChangeTaskState={handleChangeTaskState}
          listIndex={listIndex}/>
          }
        <ul className="list-items-container">
          {listItems.map((item, index) => (
            <li className='task-container' key={index}>
              <input 
                type= 'checkbox'
                checked={false}
                onChange={(event) => {handleCheckBoxChange(event, index,item)}} className="task" autoFocus />
                <p className='displayed-task'>{item}</p>
            </li>
          ))}
          <h3>Completed</h3>
          {checkedItems.map((item, index) => (
            <li className='task-container' key={index + listItems.length}>
              <input type='checkbox' disabled={true} checked={true} className="task" />
              <p className='displayed-task'>{item}</p>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}
//arrow function =>{handleInputChange(event,index)} allows parameters passed