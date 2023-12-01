import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Todo from "../components/todoCard";
import Entry from "../components/entry";
import {format, addDays} from 'date-fns';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import "../styles/dashboard.css";

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
  console.log(todayEntry)


  return (
    <Box className="myGrid" sx={{ mx: 10 }}>
        <h1 className="header">Dashboard</h1>
        <h2 className="today">{dayNames[today.getDay()]} - {format(today, "MM/dd/yy")}</h2>
      <div className="side">
        <button className="entry-button" onClick={toggleDisplay}>{isDay ? "Week View" : "Day View"}</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ): (
        <>
          {isDay ? (
          <>
            <div className="todo">
              <Todo day={Object.keys(todoObj)[0]} todoList={Object.values(todoObj)[0]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            </div>
            <div className="journal">
              <div className="dash-entryItem">
                <Entry today ={today} entry = {todayEntry} journal ={userJournal} onEntryChange={() => setEntryChange((status) => !status)}/>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="wtodo1">
              <Todo day={Object.keys(todoObj)[0]} todoList={Object.values(todoObj)[0]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            </div>
            <div className="wtodo2">
              <Todo day={Object.keys(todoObj)[1]} todoList={Object.values(todoObj)[1]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            </div>
            <div className="wtodo3">
              <Todo day={Object.keys(todoObj)[2]} todoList={Object.values(todoObj)[2]} onUpdateTodo={() => setTodoChange((status) => !status)} />
            </div>
            <div className="wtodo4">
              <Todo day={Object.keys(todoObj)[3]} todoList={Object.values(todoObj)[3]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            </div>
            <div className="wtodo5">
              <Todo day={Object.keys(todoObj)[4]} todoList={Object.values(todoObj)[4]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            </div>
            <div className="wtodo6">
              <Todo day={Object.keys(todoObj)[5]} todoList={Object.values(todoObj)[5]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            </div>
            <div className="wtodo7">
              <Todo day={Object.keys(todoObj)[6]} todoList={Object.values(todoObj)[6]} onUpdateTodo={() => setTodoChange((status) => !status)}/>
            </div>
          </>
        )}
        </>
      )}

    </Box>
  );
};

export default Dashboard;
