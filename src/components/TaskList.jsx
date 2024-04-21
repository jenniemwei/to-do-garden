import React, { useState } from "react";
import "../styles/Lists.css";
import ListOptions from "./ListOptions";
import EditListMode from "./EditListMode";
import { MoreVertical } from "react-feather";
import Flower1 from "../Flowers/Flower1.svg";
import Flower2 from "../Flowers/Flower2.svg";
import Flower3 from "../Flowers/Flower3.svg";
import Flower4 from "../Flowers/Flower4.svg";
import Flower5 from "../Flowers/Flower5.svg";


export default function TaskList({ listIndex, taskLists, setTaskLists }) {
  const[flower, setFlower]=useState(Flower1)
  const allFlowers=
{
0:Flower1,
1:Flower2,
2:Flower3,
3:Flower4,
4:Flower5,
}

  function handleChangeTaskState(index, key, value) {
    const newTaskLists = [...taskLists];
    newTaskLists[index][key] = value;
    setTaskLists(newTaskLists);
  }

  const listItems = taskLists[listIndex].currentItems;
  const checkedItems = taskLists[listIndex].checkedItems;
  const editModeDisplayed = taskLists[listIndex].editModeDisplayed;
  const optionsDisplayed = taskLists[listIndex].optionsDisplayed;

  function handleCheckBoxChange(event, index, item) {
    const newListItems = [...listItems];
    const newCheckedItems = [...checkedItems, item];
    newListItems.splice(index, 1);
    const newFlower=allFlowers[((newCheckedItems.length)%5)]
    setFlower(newFlower);  
    // const newListItems = listItems.filter((item, i) => i !== index)

    handleChangeTaskState(listIndex, "checkedItems", newCheckedItems);
    console.log("newCheckedItems", newCheckedItems);
    handleChangeTaskState(listIndex, "currentItems", newListItems);
  }

  function handleOptionsClick(event) {
    for (let i = 0; i < taskLists.length; i++) {
      handleChangeTaskState(i, "optionsDisplayed", false);
    }
    const currentOptionsDisplayed = taskLists[listIndex].optionsDisplayed;
    handleChangeTaskState(
      listIndex,
      "optionsDisplayed",
      !currentOptionsDisplayed
    );
  }

  // function createNewTask(event) {
  //   const text = event.target.value
  //   setListItems([...listItems, text])
  // }

  return (
    <>
      {editModeDisplayed && (
        <EditListMode
          taskLists={taskLists}
          handleChangeTaskState={handleChangeTaskState}
          listIndex={listIndex}
        />
      )}
      <div className="task-list" style={{zIndex: 1000 - (listIndex % (window.innerWidth > 900 ? 3 : 2))}}>
        <div className="list-container ">
          <div className="list-header">
            <div
              className="list-title"
              mode="single"
    
            >
              {taskLists[listIndex].title}
            </div>
            <div className="more-container">
            <MoreVertical
             id="more-button"
              onClick={(event) => {
                handleOptionsClick(event);
              }}
            ></MoreVertical>
            </div>
           
          </div>
          <hr></hr>

          {optionsDisplayed && (
            <ListOptions
              taskLists={taskLists}
              handleChangeTaskState={handleChangeTaskState}
              setTaskLists={setTaskLists}
              listIndex={listIndex}
            />
          )}

          <ul className="list-items-container">
            {listItems.map((item, index) => (
              <li className="task-container" key={index}>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={(event) => {
                    handleCheckBoxChange(event, index, item);
                  }}
                  className="checkbox"
                  autoFocus
                />
                <p className="displayed-task">{item}</p>
              </li>
            ))}
            {checkedItems.length != 0 && <h3>Completed</h3>}
            {checkedItems.map((item, index) => (
              <li className="task-container" key={index + listItems.length}>
                <input
                  type="checkbox"
                  disabled={true}
                  checked={true}
                  // className="task"
                />
                <p className="displayed-task">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flower-container">
          <p>flower count: {Math.floor(taskLists[listIndex].checkedItems.length/5)}</p>
          <img  src={flower} alt=""/>
        </div>
      </div>
    </>
  );
}
//arrow function =>{handleInputChange(event,index)} allows parameters passed
