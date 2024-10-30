import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notes = ({ notesData, setNotesData }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      setNotesData(prev => prev.filter(note => note.id !== id));
    } catch (err) {
     alert(`Error deleting note: ${err}`);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/addnotes');
  };

  return (
    <div>
      <div className='flex justify-around my-6'>
        <h1 className='text-xl font-bold text-center'>MY NOTEBOOK</h1>
        <button 
          className='text-xl font-bold bg-purple-700 text-white rounded-md p-2 hover:bg-purple-800' 
          onClick={handleAdd}
        >
          Add notes +
        </button>
      </div>
      
      <table className="border-separate border-spacing-2 border border-slate-400 w-[90%] mx-auto">
        <thead>
          <tr>
            <th className="border border-slate-300 w-[50px]">S.no</th>
            <th className="border border-slate-300">Notes</th>
            <th className="border border-slate-300 w-[120px]">Color</th>
            <th className="border border-slate-300 w-[200px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {notesData.map((note, index) => (
            <tr key={note.id}>
              <td className="border border-slate-300 w-[50px] p-1 text-center">
                {index + 1}
              </td>
              <td className="border border-slate-300 p-1">
                {note.note}
              </td>
              <td className="border border-slate-300">
                <select className='mx-5 w-24 p-1 rounded'>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </td>
              <td className="border border-slate-300">
                <button 
                  onClick={() => handleEdit(note.id)} 
                  className="mx-8 bg-green-700 w-14 rounded-xl p-0.5 text-white hover:bg-green-800"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(note.id)} 
                  className="bg-red-700 w-14 rounded-xl p-0.5 text-white hover:bg-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notes;