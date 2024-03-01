import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "./Card";

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

  // update later so that only users subject can be added new cards
  // if (!isValidSubject) {
  //   return <div>Subject not found</div>;
  // }

  const filteredFlashCards = flashcards.filter(
    (flashcard) => flashcard.subject.toLowerCase() === subject.toLowerCase()
  );

  const handleAddFlashcard = () => {
    // Check if either question or answer is empty
    if (!newQuestion || !newAnswer) {
      // You can show an error message or handle it as needed
      console.log("Both question and answer are required");
      return;
    }

    const newFlashcard = {
      id: flashcards.length + 1,
      question: newQuestion,
      answer: newAnswer,
      options: [], // Add options as needed
      subject: subject,
    };
    console.log(newFlashcard);
    // Update the flashcards state with the new flashcard
    setFlashcards([...flashcards, newFlashcard]);

    // Clear the input fields
    setNewQuestion("");
    setNewAnswer("");

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center p-3 text-3xl font-bold">{subject}</h1>
      <div className="m-3 card-grid">
        {filteredFlashCards.map((flashcard) => (
          <Card flashcard={flashcard} key={flashcard.id} />
        ))}
      </div>
      <div className="m-3 text-center ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg"
        >
          Add New Flashcard
        </button>
      </div>
      {isModalOpen && (
        <dialog
          id="my_modal_2"
          className="modal p-5 backdrop-blur-sm	"
          open
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-box bg-zinc-300		"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-center text-slate-950	">
              Add New Flashcard
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
                onClick={handleAddFlashcard}
                className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default FlashCardList;
