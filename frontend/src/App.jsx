import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './Notes';
import EditPage from './EditPage';
import AddNotes from './AddNotes';
import axios from 'axios';

const App = () => {
  
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7777/users");
      setNotesData(response.data);
    } catch (err) {
      alert(`Error fetching data: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes notesData={notesData} setNotesData={setNotesData} loading={loading} />} />
        <Route path="/edit/:id" element={<EditPage notesData={notesData} setNotesData={setNotesData} getNotes={getNotes} />} />
        <Route path="/addnotes" element={<AddNotes setNotesData={setNotesData} getNotes={getNotes} />} />
      </Routes>
    </Router>
  );
};

export default App;