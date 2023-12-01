import React, {useState} from "react";
import { format, addDays } from 'date-fns';

const Entry = ({today, journal, entry, onEntryChange}) => {
  const [entryContent, setEntryContent] = useState(entry?.entry || "")
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (entry) {
      fetch(`/journals/${entry.journal_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          entry: entryContent
        })
      })
      .then((r) => {
        if (r.ok) {
          return r.json()
        }
        else {
          setEntryContent(entry.entry)
          throw new Error("Failed to update entry")
        }
      })
      .then((updatedEntry) => setEntryContent(updatedEntry.entry))
      .catch((e) => {console.log(e)})
      onEntryChange()
    }
    else {
      fetch(`/journals/${journal.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          entry: entryContent,
          journal_id: journal.id,
          date: format(today, "yyyy-MM-dd")
        })
      })
      .then((r) => {
        if (r.ok) {
          return r.json()
        }
        else {
          setEntryContent(entry.entry)
          throw new Error("Failed to create new entry")
        }

      })
      .then((newEntry) => setEntryContent(newEntry.entry))
      .catch(e => console.log(e))
      onEntryChange()
    }
  }

  //grab new entry content
  const handleChange = (e) => {
    setEntryContent(e.target.value)
  }

  return (
    <div>
      <h1>Journal Entry - {format(today, "MM/dd/yy")}</h1>
      {entry ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={entryContent}
              placeholder="Add new journal entry for today"
              onChange={handleChange}
            />
            <button type="submit">Update Entry</button>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
          <input
            type = "text"
            value={entryContent}
            placeholder="Add new journal entry for today"
            onChange={handleChange}
          />
          <button type="submit">Add New Entry</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Entry;
