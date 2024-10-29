import React, { useState } from 'react';

const Notes = () => {
    const [notesData, setNotesData] = useState([
        { id: 1, note: 'Indian' },
        { id: 2, note: 'Ohio' },
        { id: 3, note: 'Michigan'}
    ]);
    
    

    const handleDelete = (id) => {
        setNotesData(notesData.filter(note => note.id !== id));
    };
    

    return (
        <div>
            <table className="border-separate border-spacing-2 border border-slate-400 w-[90%] mx-auto my-14">
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
                            <td className="border border-slate-300 w-[50px]">{index + 1}</td>
                            <td className="border border-slate-300">{note.note}</td>
                            <td className="border border-slate-300">
                                <select className='mx-5'
                                    onChange={(e) => {
                                        const updatedData = notesData.map(n =>
                                            n.id === note.id ? { ...n, color: e.target.value } : n
                                        );
                                        setNotesData(updatedData);
                                    }}
                                >
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

