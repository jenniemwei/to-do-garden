// import ListOptions from './components/ListOptions';
// import TaskList from './components/TaskList';
import { useEffect, useState } from "react";
import AllTaskLists from './components/AllTaskLists';
import './styles/fonts.css';


function App() {


  // const [listState, setListState] = useState([{"name": "Tasks", "tasks": ["task 1", "task 2"]}])

  return (
    <div>
      <AllTaskLists />
    </div>
  );
}

export default App;
