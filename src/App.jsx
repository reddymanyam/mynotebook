import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './Notes';
import EditPage from './EditPage';
import AddNotes from './AddNotes';

const App = () => {
  const [notesData, setNotesData] = useState([]);

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