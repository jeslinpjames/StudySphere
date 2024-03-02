import React, { useState, useEffect } from 'react';

function Notes() {
 // State to hold the notes
 const [notes, setNotes] = useState([]);
 // State to hold the current note's title and content
 const [currentNote, setCurrentNote] = useState({ title: '', content: '' });

 // Load notes from localStorage when the component mounts
 useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
 }, []);

 // Save notes to localStorage whenever the notes state changes
 useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
 }, [notes]);

 // Function to add a new note
 const addNote = () => {
    if (!currentNote.title || !currentNote.content) {
      alert('Please fill in both the title and content.');
      return;
    }
    const newNote = { id: Date.now(), ...currentNote };
    setNotes([...notes, newNote]);
    setCurrentNote({ title: '', content: '' });
 };

 // Function to delete a note
 const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
 };

 return (
    <>
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Note title"
        value={currentNote.title}
        onChange={e => setCurrentNote({ ...currentNote, title: e.target.value })}
      />
      <textarea
        placeholder="Note content"
        value={currentNote.content}
        onChange={e => setCurrentNote({ ...currentNote, content: e.target.value })}
        style={{ width: '100%', height: '500px' }} // Make the textarea bigger
      />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.title} - {note.content}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
 );
}

export default Notes;
