// import "./styles/todoCard.css"
import TodoItem from "./todoItem.js"

const Todo = ({todoList, onUpdateTodo}) => {

  const todos = todoList.map((todo) => (
    <TodoItem key={todo.id} todo = {todo} onUpdateTodo={onUpdateTodo}/>
  ))

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos}
      </ul>

    </div>
  );
};

export default Todo;
