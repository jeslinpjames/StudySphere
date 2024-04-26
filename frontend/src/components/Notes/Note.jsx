import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Note = ({ note, handleDeleteNote, handleOpenEditModal }) => {
  const maxLines = 3; // Set the maximum number of lines to display

  return (
    <div
      className="note text-black bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
      onClick={() => handleOpenEditModal(note)}
    >
      <span className="text-lg font-bold">{note.heading}</span>
      <p
        className="font-mono text-gray-700 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: "vertical",
        }}
      >
        {note.text}
      </p>
      <div className="note-footer flex justify-between items-center mt-2">
        <small className="text-gray-500">{note.date}</small>
        <div className="flex gap-2">
          <MdDeleteForever
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNote(note.id, note.subject);
            }}
            className="text-red-500 cursor-pointer hover:text-red-700"
            size="1.3em"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
