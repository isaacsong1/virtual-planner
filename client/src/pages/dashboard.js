import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Todo from "../components/todoCard";
import Journal from "../components/journalCard";

const Dashboard = () => {
  //const { user } = useOutletContext()
  const user = {
    id: 1,
    username: "Daniel Williamson",
    email: "hturner@example.org",
    location: "California",
    interests: "writing",
    bio: "Explain vote agreement law moment."
  }
  const todoObj = (userTodos) => {
    const todo_by_day = {}
    for (const todo of userTodos) {
      console.log(todo.day)
    }

    return
  }
  const [isDay, setIsDay] = useState(true);
  const [todos, setTodos] = useState(null);

//fetch all todos for the user
  useEffect(() => {
    fetch("/todos")
    .then((r) => r.json())
    .then(setTodos)
    .catch((e) => console.log(e))
  }, []) //! dependency on user changing

//! general
//fetch journal and fetch entry for the user
//filter entry by day, if day, month, yr matches today then pass info to journal component
//filter todos by user.id match with user_id
//filter todos by day, useState to pass only that todo to the todo component
//!main display
//display one todo card where the todo.day = date.now()
//! alternative
//display 7 todos with each day
//! todo component
//POST need to include the date.now() feature to push in the current day 1 - 7


//filter out only todos that match the user_id
const userTodos = todos.filter((todo) => (
  todo.user_id == user.id
))


  return (
    <div>
      <h1>Dashboard</h1>
      {isDay ? (
        <>
          {/* {console.log(userTodos)} */}
          {/* {console.log(user.id)} */}
          {todoObj(userTodos)}
          <Todo />
          <Journal />
        </>
      ) : (
        <>
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
        </>
      )}
    </div>
  );
};

export default Dashboard;
