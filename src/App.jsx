import React, { useEffect, useState } from 'react'
import Notes from './Notes'

const App = () => {

  const [notesData, setNotesData] = useState([]);

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:6000/notes");
      setNotesData(response?.data);
    }
    catch (err) {
      console.log(`https://www.the error is:${err}`);
    }
  }

  useEffect(() => {
    getNotes();
  }, [])

  return (
    <div>
      <Notes notesData={notesData} />
    </div>
  )
}

export default App
