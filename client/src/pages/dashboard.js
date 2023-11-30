import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Todo from "../components/todoCard";
import Journal from "../components/journalCard";
import {format, addDays} from 'date-fns';

const Dashboard = () => {
  //const { user } = useOutletContext()
  const [isDay, setIsDay] = useState(true);
  const [todos, setTodos] = useState([]);
  const today = new Date()
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  //temporary
  const user = {
    id: 1,
    username: "Daniel Williamson",
    email: "hturner@example.org",
    location: "California",
    interests: "writing",
    bio: "Explain vote agreement law moment."
  }


  const createTodoObj = (todos, date) => {
    let todoDict = {}
    //creates object where key is today + next 6 days
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(date, i)
      todoDict = {...todoDict, [format(currentDate, "yyyy-MM-dd")]: []}
    }
    //add corresponding todos
    for (const todo of todos) {
      if (todoDict[todo.date]) {
        todoDict[todo.date] = [...todoDict[todo.date], todo]
      }
    }
    return todoDict
  }

  // filter out only todos that match the user_id
  const userTodos = todos.filter((todo) => (
    todo.user_id === user.id
  ))
  //grab the dictionary
  const todoObj = createTodoObj(userTodos, today)

//fetch all todos for the user
  useEffect(() => {
    fetch("/todos")
    .then((r) => r.json())
    .then(setTodos)
    .catch((e) => console.log(e))
  }, []) //! dependency on user changing

//fetch

//! general
//fetch journal and fetch entry for the user
//filter entry by day, if day, month, yr matches today then pass info to journal component
//!main display
//display one todo card where the todo.day = date.now()
//! alternative
//display 7 todos with each day
//! todo component
//POST need to include the date.now() feature to push in the current day 1 - 7





  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{dayNames[today.getDay()]}</h2>
      <h3>{format(today, "MM/dd/yyyy")}</h3>
      {isDay ? (
        <>
          <Todo todoList={Object.values(todoObj)[0]}/>
          <Journal />
        </>
      ) : (
        <>
          <Todo todoList={Object.values(todoObj)[0]} />
          <Todo todoList={Object.values(todoObj)[1]} />
          <Todo todoList={Object.values(todoObj)[2]} />
          <Todo todoList={Object.values(todoObj)[3]} />
          <Todo todoList={Object.values(todoObj)[4]} />
          <Todo todoList={Object.values(todoObj)[5]} />
          <Todo todoList={Object.values(todoObj)[6]} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
