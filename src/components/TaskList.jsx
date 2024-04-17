import React, { useState } from 'react'
import '../styles/Lists.css';
import ListOptions from './ListOptions';
import EditListMode from './EditListMode';

export default function TaskList() {

  const[listItems, setListItems] = useState(['task 1 task 1 task 1 ','task 2','task 3 ', 'task 4']) //[ declared thing, how you set it to something/override]
  const [checkedItems, setCheckedItems] = useState([])
  // const[checked, setChecked] = useState(false)
  const[optionsDisplayed, setOptionsDisplayed]=useState(false)
  const[title,setTitle] = useState('Title')
  const[editModeDisplayed, setEditModeDisplayed]=useState(false)

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

  function handleCheckBoxChange(event,index,item){
    const currCheckbox=event.target.value
    // setChecked()
    const newCheckedItems = [...checkedItems, item]
    const newListItems = listItems.filter((item, i) => i !== index)
    setCheckedItems(newCheckedItems)
    setListItems(newListItems)

  }

  function handleOptionsClick(event){
    setOptionsDisplayed(!optionsDisplayed)
  }

  function createNewTask(event) {
    const text = event.target.value
    setListItems([...listItems, text])
  }
  


  return (
    <>
      {editModeDisplayed&&<EditListMode 
        listItems={listItems}
        setListItems={setListItems}
        setTitle={setTitle}
        title={title}
        setEditModeDisplayed={setEditModeDisplayed}
      />}
      <div className="task-list">
        <div className='list-header'>      
          <h1 className="list-name">{title}</h1> 
          {/* make title not an input not working */}
          <button onClick={(event)=>{handleOptionsClick(event)}}>edit</button>
          </div>
          <hr></hr>

          {optionsDisplayed && <ListOptions setEditModeDisplayed={setEditModeDisplayed} setOptionsDisplayed={setOptionsDisplayed}/>}
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