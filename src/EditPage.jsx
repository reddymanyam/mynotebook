import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPage = ({ notesData, setNotesData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const noteToEdit = notesData.find((note) => note.id === parseInt(id));
    if (noteToEdit) {
      setNotes(noteToEdit.notes || noteToEdit.note);
    }
  }, [id, notesData]);

  const handleEdit = async () => {
    try {
      // Create the updated note object
      const updatedNote = {
        notes: notes, // Using 'notes' to match your server structure
        id: parseInt(id)
      };

      // Send update to server
      await axios.put(`http://localhost:8000/notes/${id}`, updatedNote);

      // Update local state
      setNotesData(prevNotes => 
        prevNotes.map(note => 
          note.id === parseInt(id) 
            ? updatedNote 
            : note
        )
      );

      navigate('/');
    } catch (err) {
      console.log(`Error updating note: ${err}`);
    }
  };

  return (
    <div className='mx-auto max-w-2xl p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Note</h1>
      <div className='space-y-4'>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className='w-full h-48 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder="Enter your note here..."
        />
        <div className='flex justify-end'>
          <button
            onClick={handleEdit}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
          >
            Update Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;