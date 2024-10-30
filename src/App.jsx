import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notes from './Notes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditPage from './EditPage';
import AddNotes from './AddNotes';

const App = () => {
  const [notesData, setNotesData] = useState([]);

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes");
      setNotesData(response.data);
    } catch (err) {
      console.log(`Error fetching data: ${err}`);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes notesData={notesData} setNotesData={setNotesData} />} />
        <Route path="/edit/:id" element={<EditPage notesData={notesData} setNotesData={setNotesData} />} />
        <Route path="/addnotes" element={<AddNotes setNotesData={setNotesData} />} />
      </Routes>
    </Router>
  );
};

export default App;