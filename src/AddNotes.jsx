import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddNotes = ({ setNotesData }) => {
  const [noteText, setNoteText] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:8000/notes", { note: noteText });
      setNotesData(prev => [...prev, response.data]);
      navigate('/');
    } catch (err) {
      console.log(`Error adding note: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <h2>Add Note</h2>
      <textarea
        className="border border-slate-300 p-2 mt-2 w-full"
        placeholder="Enter your note here"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button onClick={handleAdd} className="mt-4 bg-green-500 text-white px-4 py-2">
        Add Note
      </button>
    </div>
  );
};

export default AddNotes;