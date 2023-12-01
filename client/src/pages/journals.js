import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';

const Journals = () => {
  const { user } = useOutletContext();
  //fetch all journals, filter just for journal where user_id = id

  return (
    <div>
      <h1>Journals</h1>
    </div>
  );
};

export default Journals;
