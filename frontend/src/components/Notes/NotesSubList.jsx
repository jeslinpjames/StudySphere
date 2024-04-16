import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../../api";

const NotesSubList = ({ subjects, setSubjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [newTopicName, setNewTopicName] = useState("");
  const [editTopicName, setEditTopicName] = useState("");
  const [warning, setWarning] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const navigate = useNavigate();

  const handleNewTopicSubmit = (event) => {
    event.preventDefault();
    if (newTopicName.trim() === "") {
      setWarning("Topic name cannot be empty");
      return;
    }

    if (subjects.find((subject) => subject.name === newTopicName)) {
      setWarning("Subject already exists");
      return;
    }

    // setWarning("");
    // const newSubject = {
    //   subject_name: newTopicName,
    //   sub_type: "note", // You need to decide what value to use here
    //   author: "nntt", // Assuming currentUserId is the ID of the current user
    // };

    api
      .post("api/subjects", { newTopicName, sub_type: "note", author: "nntt" })
      .then((response) => {
        if (response.status === 200) {
          alert("note created");
          setSubjects([...subjects, newTopicName]);
          // navigate(`/notes/${newSubject.subject_name}`);
          setNewTopicName("");
        }
      })
      .catch((error) => {
        console.error("Error creating new subject:", error);
        setWarning("Failed to create new subject");
      });
  };

  const handleEditTopicSubmit = (event) => {
    event.preventDefault();
    if (editTopicName.trim() === "") {
      setWarning("Topic name cannot be empty");
      return;
    }

    if (
      subjects.find(
        (subject) =>
          subject.name === editTopicName && subject.name !== editingSubject.name
      )
    ) {
      setWarning("Subject already exists");
      return;
    }

    setWarning("");
    const updatedSubjects = subjects.map((subject) =>
      subject.name === editingSubject.name ? { name: editTopicName } : subject
    );
    setSubjects(updatedSubjects);
    setEditingSubject(null);
    setEditTopicName("");
    document.getElementById("my_modal_3").close();
  };

  // subject deletion
  const handleDeleteSubject = (subjectName) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject.name !== subjectName
    );
    api
      .delete(`subjects/delete/${subjectName}/`)
      .then((res) => {
        if (res.status === 204) alert("note deleted");
        else alert("error");
      })
      .catch((error) => alert(error));
    setSubjects(updatedSubjects);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center p-3 text-3xl font-bold">Topics</h1>
      <div className="card-grid">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="bg-sky-200 text-black p-5 rounded-md flex justify-between items-center"
          >
            <Link
              className="cursor-pointer"
              to={`/notes/${subject.name}`}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject.name}
            </Link>
            <div className="flex">
              <FaEdit
                className="cursor-pointer mx-2"
                onClick={() => {
                  setEditingSubject(subject);
                  setEditTopicName(subject.name);
                  document.getElementById("my_modal_3").showModal();
                }}
              />
              <FaTrash
                className="cursor-pointer"
                onClick={() => handleDeleteSubject(subject.name)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding new subject and handling invalid or already existing subjects */}
      <button
        className="btn self-center m-5 bg-green-600 text-white font-300 text-2xl round-3xl hover:bg-green-400"
        onClick={() => {
          setWarning("");
          setEditingSubject(null);
          setEditTopicName("");
          document.getElementById("my_modal_3").showModal();
        }}
      >
        New
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form
            onSubmit={
              editingSubject ? handleEditTopicSubmit : handleNewTopicSubmit
            }
          >
            {/* if there is a button in the form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("my_modal_3").close();
                setNewTopicName("");
                setEditTopicName("");
                setWarning("");
                setEditingSubject(null);
              }}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center m-2">
              {editingSubject ? "Edit Topic" : "New Topic"}
            </h3>
            <div className="flex flex-col justify-center items-center gap-y-4">
              <input
                type="text"
                value={editingSubject ? editTopicName : newTopicName}
                onChange={(e) => {
                  if (editingSubject) {
                    setEditTopicName(e.target.value);
                  } else {
                    setNewTopicName(e.target.value);
                  }
                  setWarning("");
                }}
                placeholder={
                  editingSubject ? editTopicName : "Enter topic name"
                }
                className="p-2 m-2 w-2/3 rounded-md"
              />
              {warning && <p className="text-red-500">{warning}</p>}
              <button className="btn w-1/3 border-stone-300" type="submit">
                {editingSubject ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default NotesSubList;
