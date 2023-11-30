import React, {useState} from "react";
// import "./styles/todoCard.css"
import TodoItem from "./todoItem.js"
import { useOutletContext } from 'react-router-dom';

const Todo = ({day, todoList, onUpdateTodo}) => {
  const { user } = useOutletContext()
  const [newTodo, setNewTodo] = useState('')
  const todos = todoList.map((todo) => (
    <TodoItem key={todo.id} todo = {todo} onUpdateTodo={onUpdateTodo}/>
  ))

  //send post when enter key pressed
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          item: newTodo,
          date: day,
          status: false,
          user_id: user.id
        })

      })
      .then(r => r.json())
      .then((newTodo) => {
        setNewTodo("")
        onUpdateTodo()
      })
    }
  }
  
  //grab the new input value
  const handleNewInput = (e) => {
    setNewTodo(e.target.value)
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos}
        <input
          type="text"
          value={newTodo}
          placeholder="Add new todo"
          onChange={handleNewInput}
          onKeyDown={handleEnter}
        />
      </ul>

    </div>
  );
};

export default Todo;
