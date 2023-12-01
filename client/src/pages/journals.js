import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Entry from "../components/entry";
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import "../styles/journals.css";



const Journals = () => {
  const { user } = useOutletContext();
  const [entries, setEntries] = useState([])
  const [journal, setJournal] = useState()
  const [entryChange, setEntryChange] = useState(true)
  const today = new Date()

  console.log(entries)

  useEffect(() => {
    fetch("/journals")
    .then(r => r.json())
    .then((journals) => {
      const filteredJournal = journals.find((journal) => journal.user_id === user.id)
      setJournal(filteredJournal)
      setEntries(filteredJournal.entries)
    })
    .catch((e) => console.log(e))
  },[entryChange])

  const entryPlaceholder = entries.map((entry) => (
    <Grid sx={{height:'100%', width: "auto"}} key={entry.id} xs={3}>
      <div className="entryItem">
        <Entry today={today} journal={journal} entry={entry} onEntryChange={() => setEntryChange((status) => !status)}/>
      </div>
    </Grid>
  ))


  return (
    <Box sx={{mx:10}}className="entryBox">
      <Grid container spacing={12}>
      <Grid xs={12} sx={{py:4}}>
        <h1 className="title">Journal Entries</h1>
      </Grid >
        <Grid sx={{ height: '500px' ,pt:2}}container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 } }>
        {entryPlaceholder}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Journals;
