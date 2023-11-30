import React, {useState} from "react";

const Entry = ({entry}) => {
  const [entryContent, setEntryContent] = useState(entry?.entry || "")

  //add new entry (POST)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  //grab new entry content
  const handleChange = () => {
    console.log('change')
  }

  return (
    <div>
      <h1>Journal Entry</h1>
      <form onSubmit={handleSubmit}>
        <input
          type = "text"
          value={entryContent}
          placeholder="Adds new journal entry for today"
          onChange={handleChange}
        />
        <button type="submit">Add New Entry</button>
      </form>
      {console.log(entry.entry)}
    </div>
  );
};

export default Entry;
