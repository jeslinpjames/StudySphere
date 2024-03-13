import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Note = ({ note, handleDeleteNote, handleOpenEditModal }) => {
  return (
    <div className="note text-black bg-white rounded-lg shadow-md p-4 mb-4">
      <span className="text-lg font-bold">{note.heading}</span>
      <p className="font-mono text-gray-700">{note.text}</p>
      <div className="note-footer flex justify-between items-center mt-2">
        <small className="text-gray-500">{note.date}</small>
        <div className="flex gap-2">
          <MdEdit
            onClick={() => handleOpenEditModal(note)}
            className="text-blue-500 cursor-pointer hover:text-blue-700"
          />
          <MdDeleteForever
            onClick={() => handleDeleteNote(note.id, note.subject)}
            className="text-red-500 cursor-pointer hover:text-red-700"
            size="1.3em"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
