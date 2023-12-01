import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';

const Journals = () => {
  const { user } = useOutletContext();
  const [entries, setEntries] = useState([])
  console.log(entries)

  useEffect(() => {
    fetch("/journals")
    .then(r => r.json())
    .then((journals) => {
      const filteredJournal = journals.find((journal) => journal.user_id === user.id)
      setEntries(filteredJournal.entries)
    })
    .catch((e) => console.log(e))
  },[])




  //fetch all journals, filter just for journal where user_id = id

  return (
    <div>
      <h1>Journals</h1>
    </div>
  );
};

export default Journals;
