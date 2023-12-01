import React, {useState, useEffect} from "react";
import { format, addDays } from 'date-fns';
import "../styles/journals.css";

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
      .then((updatedEntry) => {
        setEntryContent(updatedEntry.entry)
      })
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
      .then((newEntry) => {
        setEntryContent(newEntry.entry)
      })
      .catch(e => console.log(e))
      onEntryChange()
    }
  }

  //grab new entry content
  const handleChange = (e) => {
    setEntryContent(e.target.value)
  }

  return (
    <div id="journal-entry">

      <div className="entry-container">
        <h1 className="journal-entry">&nbsp;&nbsp;&nbsp;&nbsp;Journal&nbsp;&nbsp;&nbsp;Entry&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <h2 className="date" >{entry ? entry.date : format(today, "yyyy-MM-dd")}</h2>
        <div className="entry-div">
          {entry ? (
            <>
              <form className="entry-form" onSubmit={handleSubmit}>
                <textarea className="entry-input"
                  type="text"
                  value={entry.date === format(today, "yyyy-MM-dd") ? (
                    entryContent) :(
                      entry.entry
                    )}
                  placeholder="Add new journal entry for today"
                  onChange={handleChange}
                />
                {entry.date === format(today, "yyyy-MM-dd") ? (
                  <button className="entry-button" type="submit">Update Entry</button>
                ) : (
                  <></>
                )}
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
              <textarea className="entry-input"
                type = "text"
                value={entry ? (
                  entryContent) : (
                  null
                )}
                placeholder="Add new journal entry for today"
                onChange={handleChange}
              />
              {entry ? (
                <></>

              ) : (
                <button className="entry-button" type="submit">Add New Entry</button>
              )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Entry;
