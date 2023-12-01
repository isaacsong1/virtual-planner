import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Entry from "../components/entry";
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import "../styles/journals.css";
// today, journal, entry, onEntryChange
const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '5px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(2),
  borderRadius: '4px',
  textAlign: 'center',
  width: '250px',
  height: '300px'
}));

const Journals = () => {
  const { user } = useOutletContext();
  const [entries, setEntries] = useState([])
  const today = new Date()

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

  const entryPlaceholder = entries.map((entry) => (
    <Grid xs={3}>
      <Item className="entryItem">
        {/* <Entry today={today} /> */}
      </Item>
    </Grid>
  ))


  return (
    <Box sx={{mx:10}}classname="entryBox">
      <Grid container spacing={12}>
      <Grid xs={12}>
        <h1 className="title">Journal Entries</h1>
      </Grid>
      <div>
        {entryPlaceholder}
      </div>
      </Grid>
    </Box>
  );
};

export default Journals;
