import { useParams } from "react-router-dom";
import { useState } from "react";
import Note from "./Note";

const NotesList = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      heading: "Heading 1",
      text: "This is my first note!",
      date: "2021-12-12",
      subject: "english",
    },
    {
      id: 2,
      heading: "Heading 2",
      text: "This is my second note!",
      date: "2021-12-15",
      subject: "english",
    },
    {
      id: 3,
      heading: "Heading 3",
      text: "This is my third note!",
      date: "2021-12-22",
      subject: "english",
    },
    {
      id: 4,
      heading: "Heading 4",
      text: "This is my fourth note!",
      date: "2021-12-25",
      subject: "Maths",
    },
    {
      id: 5,
      heading: "Heading 5",
      text: "This is my fifth note!",
      date: "2021-12-28",
      subject: "Maths",
    },
  ]);

  const { subject } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHeading, setNewHeading] = useState("");
  const [newText, setNewText] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteNote = (id, subject) => {
    setNotes(
      notes.filter((note) => note.id !== id || note.subject !== subject)
    );
  };

  const handleAddNote = () => {
    if (newHeading.trim() && newText.trim()) {
      const maxId = Math.max(...notes.map((note) => note.id));
      const newNote = {
        id: maxId + 1,
        heading: newHeading,
        text: newText,
        date: new Date().toISOString().slice(0, 10),
        subject: subject,
      };
      setNotes([...notes, newNote]);
      setNewHeading("");
      setNewText("");
      setIsModalOpen(false);
      setEditingNote(null);
      setSearchTerm("");
    }
  };

  const handleEditNote = (id, newHeading, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, heading: newHeading, text: newText } : note
      )
    );
    setEditingNote(null);
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (note) => {
    setEditingNote(note);
    setNewHeading(note.heading);
    setNewText(note.text);
    setIsModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = subject
    ? notes.filter(
        (note) =>
          note.subject === subject &&
          (note.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.text.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : notes.filter(
        (note) =>
          note.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.text.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="flex flex-col">
      <div className="m-4 justify-self-center self-center">
        <input
          type="text"
          placeholder="Search notes..."
          className="input input-bordered w-96 bg-slate-200 text-black"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="notes-list m-5">
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleEditNote={handleEditNote}
            handleDeleteNote={handleDeleteNote}
            handleOpenEditModal={handleOpenEditModal}
          />
        ))}

        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                {editingNote ? "Edit Note" : "Add New Note"}
              </h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Heading</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter heading"
                  className="input input-bordered"
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Note</span>
                </label>
                <textarea
                  placeholder="Enter note"
                  className="textarea textarea-bordered textarea-sm w-full max-w-xl"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingNote(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    editingNote
                      ? handleEditNote(editingNote.id, newHeading, newText)
                      : handleAddNote()
                  }
                >
                  {editingNote ? "Save" : "Add Note"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="btn btn-primary mb-4 justify-self-center self-center"
        onClick={() => {
          setIsModalOpen(true);
          setEditingNote(null);
          setNewHeading("");
          setNewText("");
        }}
      >
        Add New Note
      </button>
    </div>
  );
};

export default NotesList;
