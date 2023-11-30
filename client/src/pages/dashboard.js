import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Todo from "../components/todoCard";
import Entry from "../components/journalCard";
import {format, addDays} from 'date-fns';

const Dashboard = () => {
  //const { user } = useOutletContext()
  const [isDay, setIsDay] = useState(true);
  const [todos, setTodos] = useState([]);
  const [journals, setJournals] = useState([])
  const [entries, setEntries] = useState([])
  const [userJournal, setUseJournal] = useState(null)
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
      setUseJournal(foundJournal)

      if (foundJournal) {
        const entriesResponse = await fetch(`/journals/${foundJournal.id}`)
        const entriesData = await entriesResponse.json()
        setEntries(entriesData)
      }

    }
    catch (error) {
        console.log(error)
      }
  }
  //useEffect to fetch data on page load
  useEffect(() => {
    fetchData()
  }, [])

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
  // const todayEntry = entries.find((entry) => entry.date === format(today, "yyyy-MM-dd")) //! actual code to uncomment
  const todayEntry = entries.find((entry) => entry.date === "2023-11-30") //just for testing purposes

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{dayNames[today.getDay()]}</h2>
      <h3>{format(today, "MM/dd/yyyy")}</h3>
      {isDay ? (
        <>
          <Todo todoList={Object.values(todoObj)[0]}/>
          <Entry entry = {todayEntry}/>
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
