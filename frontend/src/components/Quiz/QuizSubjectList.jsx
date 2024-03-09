import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const QuizSubjectList = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [newTopicName, setNewTopicName] = useState("");
  const [warning, setWarning] = useState(""); // New state for warning message
  const navigate = useNavigate();

  const handleNewTopicSubmit = (event) => {
    event.preventDefault();

    if (newTopicName.trim() === "") {
      // Optionally, you can show an error message or handle it in any way you prefer
      setWarning("Topic name cannot be empty");
      return;
    }

    // Check if the subject already exists
    if (subjects.find((subject) => subject.name === newTopicName)) {
      setWarning("Subject already exists");
      return;
    }

    // Clear the warning if everything is okay
    setWarning("");

    // Update the subject list with the new topic
    const newSubject = { name: newTopicName };
    subjects.push(newSubject);

    // Redirect to the new page with the subject name
    navigate(`/quiz/${newSubject.name}`);
  };

  //   listing subjects and passing the selected subjects to get flashcards of it
  return (
    <div className="flex flex-col	">
      <h1 className="text-center p-3 text-3xl font-bold ">Topics</h1>
      <div className="card-grid ">
        {subjects.map((subject, index) => (
          <Link
            key={index}
            className="bg-sky-200 cursor-pointer text-black p-5 rounded-md	"
            to={`/quiz/${subject.name}`}
            onClick={() => setSelectedSubject(subject)}
          >
            {subject.name}
          </Link>
        ))}
      </div>

      {/* Modal for adding new subject and handling invalid or already existing subjects*/}
      <button
        className="btn self-center m-5 bg-green-600 text-white font-300 text-2xl round-3xl hover:bg-green-400"
        onClick={() => {
          setWarning("");
          document.getElementById("my_modal_3").showModal();
        }}
      >
        New
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={(e) => handleNewTopicSubmit(e)}>
            {/* if there is a button in the form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                // Clear the newTopicName state and warning before closing the modal
                document.getElementById("my_modal_3").close();
                setNewTopicName("");
                setWarning("");
              }}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center m-2">New Topic</h3>
            <div className="flex flex-col justify-center items-center gap-y-4	">
              <input
                type="text"
                value={newTopicName}
                onChange={(e) => {
                  setNewTopicName(e.target.value);
                  setWarning(""); // Clear the warning when the user starts typing
                }}
                placeholder="Enter topic name"
                className="p-2 m-2 w-2/3 rounded-md "
              />
              {warning && <p className="text-red-500">{warning}</p>}
              <button className="btn w-1/3 border-stone-300" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default QuizSubjectList;
