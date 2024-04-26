import React, { useState } from "react";
import "../styles/Lists.css";
import ListOptions from "./ListOptions";
import EditListMode from "./EditListMode";
import { MoreVertical } from "react-feather";
import FlowerIcon from "../Flowers/FlowerIcon.svg";
import { ChevronRight } from "react-feather";
import { ChevronDown } from "react-feather";

export default function TaskList({ listIndex, taskLists, setTaskLists }) {
  const allFlowers=[{
    source: "Flower1",
    alt: "A small stem with sprouting leaf, first stage of the flower growth"
  },
  {
    source: "Flower2",
    alt: "Taller stem, two leaves, and a bud, second stage of the flower growth"
  },
  {
    source: "Flower3",
    alt: "Taller stem, two larger leaves, opening flower, third stage of the flower growth"
  },
  {
    source: "Flower4",
    alt: "Tall stem, two full leaves, a third sprouting leaf, flower blooming, fourth stage of the flower growth"
  },
  {
    source: "Flower5",
    alt: "4 leaves, flower in full bloom, fifth stage of flower growth"
  }]

  function handleChangeTaskState(index, key, value) {
    const newTaskLists = [...taskLists];
    newTaskLists[index][key] = value;
    setTaskLists(newTaskLists);
  }

  const listItems = taskLists[listIndex].currentItems;
  const checkedItems = taskLists[listIndex].checkedItems;
  const editModeDisplayed = taskLists[listIndex].editModeDisplayed;
  const optionsDisplayed = taskLists[listIndex].optionsDisplayed;
  const completedDisplayed=taskLists[listIndex].completedDisplayed;

  function handleCheckBoxChange(event, index, item) {
    const newListItems = [...listItems];
    const newCheckedItems = [...checkedItems, item];
    newListItems.splice(index, 1);
    // const newFlower = allFlowers[newCheckedItems.length % 5];

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

  return (
    <>
      {editModeDisplayed && (
        <EditListMode
          taskLists={taskLists}
          handleChangeTaskState={handleChangeTaskState}
          listIndex={listIndex}
        />
      )}
      <div
        className="task-list"
        style={{
          zIndex: 1000 - (listIndex % (window.innerWidth > 900 ? 3 : 2)),
        }}
      >
        <div className="list-container ">
          <div className="list-header">
            <div className="list-title" mode="single">
              {taskLists[listIndex].title}
            </div>
            <div className="more-container">
              <MoreVertical
                id="more-button"
                aria-label="click to display list options"
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
                  // className="checkbox"
                  autoFocus
                />
                <p >{item}</p>
              </li>
            ))}
            <div className="completed-header">
            {checkedItems.length !== 0 && <h3>Completed</h3>}
            {checkedItems.length !==0 && (completedDisplayed ? <ChevronDown aria-label="click to minimize completed tasks" onClick={(event)=>{
              handleChangeTaskState(listIndex, "completedDisplayed", !completedDisplayed)
            }}></ChevronDown>:
            <ChevronRight aria-label="click to display completed tasks" onClick={(event)=>{
              handleChangeTaskState(listIndex, "completedDisplayed", !completedDisplayed)
            }}></ChevronRight>)}
            
            </div>
            
            {completedDisplayed && checkedItems.map((item, index) => (
              <li className="task-container" key={index + listItems.length}>
                <input
                  type="checkbox"
                  disabled={true}
                  checked={true}
                  // className="task"
                />
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flower-container">
          <div id="flower-count">
            {/* <img src={FlowerIcon} width='50px'alt="Flower Count" /> */}
            <p id="flower-text">flowers: {" "}
              {Math.floor((taskLists[listIndex].checkedItems.length+1) / 5)}
            </p>
            </div>
            <img  src={require("../Flowers/" + allFlowers[taskLists[listIndex].checkedItems.length % 5]['source'] + ".svg")} alt={allFlowers[taskLists[listIndex].checkedItems.length % 5]['alt']}/>          
        </div>
      </div>
    </>
  );
}

