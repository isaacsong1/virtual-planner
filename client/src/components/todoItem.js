import React, {useState} from 'react';
import "../styles/todos.css";

const TodoItem = ({todo, onUpdateTodo}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTodoItem, setEditedTodoItem] = useState(todo.item)

  //when todo item is double clicked, editing mode triggered
  const handleDoubleClick = () => {
    setIsEditing(true)
  }
  //store the value of the edited todo
  const handleEditTodo = (e) => {
    setEditedTodoItem(e.target.value)
  }
  //patch when the user clicks away
  const handleBlur = () => {
    fetch(`/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({item: editedTodoItem})
    })
    .then(r => r.json())
    .then((updatedTodo) => {
      onUpdateTodo(updatedTodo)
      setEditedTodoItem(updatedTodo.item)
    })
    .catch((e) => console.log(e))

    setIsEditing(false)
  }
  //patch status when checkbox clicked
  const handleCheck = () => {
    fetch(`/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ status: !todo.status })
    })
      .then(r => r.json())
      .then((updatedTodo) => {
        onUpdateTodo(updatedTodo)
      })
      .catch((e) => console.log(e))
  }
  //delete when clicked
  const handleDelete = () => {
    fetch(`/todos/${todo.id}`, {method: "DELETE"})
    .then(() => {
      onUpdateTodo()
    })
    .catch((e) => console.log(e))
  }

  return (
    <div className='td-item-container'>
      <div onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input className='edit-todo'
            type="text"
            value={editedTodoItem}
            onChange={handleEditTodo}
            onBlur={handleBlur}
          />
        ) : (
          <div className='checkbox'>
              <input className='cbx-input'
              type="checkbox"
              checked={todo.status}
              onChange={handleCheck}
              />
            <label className='cbx-label'>
              {todo.item}
            </label>
          </div>
        )
        }
      </div>
      <button className='delete-button' onClick={handleDelete}>x</button>
    </div>
  );
};

export default TodoItem;
