import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = ({ notesData, setNotesData }) => {

    const navigate = useNavigate();

    const handleDelete = (id) => {
        setNotesData(notesData.filter(note => note.id !== id));
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div>
            <div className='flex justify-around  my-6'>
                <h1 className='text-xl font-bold text-center'>MY NOTEBOOK</h1>
                <button className='text-xl font-bold bg-purple-700 rounded-md p-2'>Add notes +</button>
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
                            <td className="border border-slate-300 w-[50px] p-1">{index + 1}</td>
                            <td className="border border-slate-300 p-1">{note.notes}</td>
                            <td className="border border-slate-300">
                                <select className='mx-5'
                                    onChange={(e) => {
                                        const updatedNotes = notesData.map(n =>
                                            n.id === note.id ? { ...n, color: e.target.value } : n
                                        );
                                        setNotesData(updatedNotes);
                                    }}>
                                    <option value="Blue">Blue</option>
                                    <option value="Red">Red</option>
                                    <option value="Green">Green</option>
                                    <option value="Yellow">Yellow</option>
                                </select>
                            </td>
                            <td className="border border-slate-300">
                                <button onClick={() => handleEdit(note.id)} className="mx-8 bg-green-700 w-14 rounded-xl p-0.5">Edit</button>
                                <button onClick={() => handleDelete(note.id)} className=" bg-red-700 w-14 rounded-xl p-0.5">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Notes;

