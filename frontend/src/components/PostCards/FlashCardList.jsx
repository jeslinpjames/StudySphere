import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "./Card";
import { MdEdit, MdDelete } from "react-icons/md";

const sampleSubjects = [
  {
    name: "english",
  },
  {
    name: "Maths",
  },
  {
    name: "CS",
  },
];

function FlashCardList() {
  const { subject } = useParams();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      question: "What is who?",
      answer: "Boo is who",
      options: ["1", "2", "3"],
      subject: "CS",
    },
    {
      id: 2,
      question: "What is who?",
      answer: "Boo is who",
      options: ["1", "2", "3"],
      subject: "Maths",
    },
    {
      id: 3,
      question: "What is who?",
      answer: "Boo is who",
      options: ["1", "2", "3"],
      subject: "malayalam",
    },
  ]);

  const isValidSubject = sampleSubjects.some(
    (sampleSubject) =>
      sampleSubject.name.toLowerCase() === subject.toLowerCase()
  );

  const filteredFlashCards = flashcards.filter(
    (flashcard) =>
      flashcard.subject.toLowerCase() === subject.toLowerCase() &&
      flashcard.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFlashcard = () => {
    if (!newQuestion || !newAnswer) {
      console.log("Both question and answer are required");
      return;
    }

    const newFlashcard = {
      id: flashcards.length + 1,
      question: newQuestion,
      answer: newAnswer,
      options: [],
      subject: subject,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setNewQuestion("");
    setNewAnswer("");
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditFlashcard = (flashcard) => {
    setEditingFlashcard(flashcard);
    setNewQuestion(flashcard.question);
    setNewAnswer(flashcard.answer);
    setIsModalOpen(true);
  };

  // editing function
  const handleUpdateFlashcard = () => {
    if (!newQuestion || !newAnswer) {
      console.log("Both question and answer are required");
      return;
    }

    const updatedFlashcards = flashcards.map((flashcard) =>
      flashcard.id === editingFlashcard.id
        ? { ...flashcard, question: newQuestion, answer: newAnswer }
        : flashcard
    );
    setFlashcards(updatedFlashcards);
    setEditingFlashcard(null);
    setNewQuestion("");
    setNewAnswer("");
    setIsModalOpen(false);
  };

  // deletion
  const handleDeleteFlashcard = (id) => {
    const updatedFlashcards = flashcards.filter(
      (flashcard) => flashcard.id !== id
    );
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center p-3 text-3xl font-bold">{subject}</h1>
      <div className="m-3 justify-self-center self-center">
        <input
          type="text"
          placeholder="Search ..."
          className="input input-bordered w-96 bg-slate-200 text-black"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="m-3 card-grid">
        {filteredFlashCards.map((flashcard) => (
          <div className="relative" key={flashcard.id}>
            <Card flashcard={flashcard} />
            <div className="absolute top-2 right-2 flex gap-2">
              <MdEdit
                className="text-blue-700 cursor-pointer"
                size={24}
                onClick={() => handleEditFlashcard(flashcard)}
              />
              <MdDelete
                className="text-red-700 cursor-pointer"
                size={24}
                onClick={() => handleDeleteFlashcard(flashcard.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="m-3 text-center ">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingFlashcard(null);
            setNewQuestion("");
            setNewAnswer("");
          }}
          className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg"
        >
          Add New Flashcard
        </button>
      </div>
      {isModalOpen && (
        <dialog
          id="my_modal_2"
          className="modal p-5 backdrop-blur-sm"
          open
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-box bg-zinc-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-center text-slate-950">
              {editingFlashcard ? "Edit Flashcard" : "Add New Flashcard"}
            </h3>
            <div className="py-4 flex flex-col justify-center items-center">
              <textarea
                placeholder="New Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="textarea textarea-bordered textarea-sm w-full max-w-xs m-2"
              ></textarea>
              <textarea
                placeholder="New Answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="textarea textarea-bordered textarea-sm w-full max-w-xs"
              ></textarea>
            </div>

            <div className="flex justify-center items-center space-x-2 flex-col">
              <button
                onClick={
                  editingFlashcard ? handleUpdateFlashcard : handleAddFlashcard
                }
                className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg"
              >
                {editingFlashcard ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default FlashCardList;
