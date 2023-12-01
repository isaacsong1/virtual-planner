import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Todo from "../components/todoCard";
import Entry from "../components/entry";
import {format, addDays} from 'date-fns';

const Dashboard = () => {
  const { user } = useOutletContext();
  const [isDay, setIsDay] = useState(true);
  const [todos, setTodos] = useState([]);
  const [journals, setJournals] = useState([])
  const [entries, setEntries] = useState([])
  const [userJournal, setUserJournal] = useState(null)
  const [todoChange, setTodoChange] = useState(true)
  const [entryChange, setEntryChange] = useState(true)
  const [loading, setLoading] = useState(true)
  const today = new Date()
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  //toggle display
  const toggleDisplay = () => {
    setIsDay((status) => !status)
  }

  //fetch async
  const fetchData = async () => {
    try {
      const todosResponse = await fetch("/todos")
      const todosData = await todosResponse.json()
      setTodos(todosData)

      const journalsResponse = await fetch("/journals")
      const journalsData = await journalsResponse.json()
      setJournals(journalsData)

      const foundJournal = journalsData.find((journal) => journal.user_id === user.id)
      setUserJournal(foundJournal)

      if (foundJournal) {
        const entriesResponse = await fetch(`/journals/${foundJournal.id}`)
        const entriesData = await entriesResponse.json()
        setEntries(entriesData)
      }
    setLoading(false)
    }
    catch (error) {
        console.log(error)
        setLoading(false)
      }
  }
  //useEffect to fetch data on page load
  useEffect(() => {
    fetchData()
  }, [todoChange, entryChange])

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

  //today's entry if it exists
  const todayEntry = entries.find((entry) => entry.date === format(today, "yyyy-MM-dd"))

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{dayNames[today.getDay()]}</h2>
      <h3>{format(today, "MM/dd/yy")}</h3>
      <button onClick={toggleDisplay}>{isDay ? "Week View" : "Day View"}</button>
      {loading ? (
        <p>Loading...</p>
      ): (
        <>
          {isDay ? (
          <>
            <Todo day={Object.keys(todoObj)[0]} todoList={Object.values(todoObj)[0]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            <Entry today ={today} journal ={userJournal} entry = {todayEntry} onEntryChange={() => setEntryChange((status) => !status)}/>
          </>
        ) : (
          <>
            <Todo day={Object.keys(todoObj)[0]} todoList={Object.values(todoObj)[0]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            <Todo day={Object.keys(todoObj)[1]} todoList={Object.values(todoObj)[1]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            <Todo day={Object.keys(todoObj)[2]} todoList={Object.values(todoObj)[2]} onUpdateTodo={() => setTodoChange((status) => !status)} />
            <Todo day={Object.keys(todoObj)[3]} todoList={Object.values(todoObj)[3]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            <Todo day={Object.keys(todoObj)[4]} todoList={Object.values(todoObj)[4]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            <Todo day={Object.keys(todoObj)[5]} todoList={Object.values(todoObj)[5]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            <Todo day={Object.keys(todoObj)[6]} todoList={Object.values(todoObj)[6]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
          </>
        )}
        </>
      )}

    </div>
  );
};

export default Dashboard;
