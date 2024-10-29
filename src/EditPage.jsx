import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditPage = ({ notesData, setNotesData }) => {
    const navigate = useNavigate();
    const [noteText, setNoteText] = useState("");

    const handleAdd = () => {
        
        const newNote = {
            id: notesData.length + 1,
            note: noteText,
            color: "Blue"
        };
        setNotesData([...notesData, newNote]);
        navigate('/');
    };

    return (
        <div className="p-4">
            <h2>Edit Note</h2>
            <textarea
                className="border border-slate-300 p-2 mt-2 w-full"
                placeholder="Enter your note here"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />
            <button onClick={handleAdd} className="mt-4 bg-blue-500 text-white px-4 py-2">Add</button>
        </div>
    );
};


export default EditPage
