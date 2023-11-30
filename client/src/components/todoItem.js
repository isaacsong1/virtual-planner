import React, {useState} from 'react';

const TodoItem = ({todo, onUpdateTodo}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTodoItem, setEditedTodoItem] = useState(todo.item)
  console.log(editedTodoItem)

  //when todo item is double clicked, editing mode triggered
  const handleDoubleClick = () => {
    setIsEditing(true)
  }
  //store the value of the edited todo
  const handleEditTodo = (e) => {
    setEditedTodoItem(e.target.value)
    console.log(e.target.value)
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
  //!needs testing after post request
  const handleDelete = () => {
    fetch(`/todos/${todo.id}`, {method: "DELETE"})
    .then(r => r.json())
    .then(onUpdateTodo())
  }

  return (
    <div>
      <div onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            type="text"
            value={editedTodoItem}
            onChange={handleEditTodo}
            onBlur={handleBlur}
          />
        ):(
          <div>
            <input
          type="checkbox"
          checked={todo.status}
          onChange={handleCheck}
        />
        {todo.item}
          </div>
        )
        }
      </div>
      <button onClick={handleDelete}>x</button>
    </div>

  );
};

export default TodoItem;
