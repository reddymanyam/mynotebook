import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPage = ({ notesData, setNotesData }) => {
  // Get the ID of the note from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold the current content of the note
  const [notes, setNotes] = useState("");

  // This useEffect runs when the component loads or when the ID or notesData changes
  useEffect(() => {
    // Find the note that matches the ID in the existing data
    const noteToEdit = notesData.find((note) => note.id === parseInt(id));

    if (noteToEdit) {
      // If the note is found, set it as the textarea content
      setNotes(noteToEdit.note);
    } else {
      // If not found, fetch the note data from the server
      axios.get(`http://localhost:4000/notes/${id}`)
        .then(response => setNotes(response.data.note))  // Set the fetched note content
        .catch(err => console.log(`Error fetching note: ${err}`));
    }
  }, [id, notesData]);

  // Function to handle the note update when "Update Note" is clicked
  const handleEdit = async () => {
    try {
      // Prepare the updated note with the current content
      const updatedNote = { note: notes, id: parseInt(id) };

      // Send a PUT request to update the note on the server
      await axios.put(`http://localhost:4000/notes/${id}`, updatedNote);

      // Update the note in the local state
      setNotesData(prevNotes => 
        prevNotes.map(note => 
          note.id === parseInt(id) ? { ...note, note: notes } : note
        )
      );

      // Redirect to the home page after updating
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
