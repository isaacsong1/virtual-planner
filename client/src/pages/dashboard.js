import { useState } from "react";
import Todo from "../components/todoCard";
import Journal from "../components/journalCard";

const Dashboard = () => {
  const [isDay, setIsDay] = useState(true);

  return (
    <div>
      <h1>Dashboard</h1>
      {isDay ? (
        <>
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
