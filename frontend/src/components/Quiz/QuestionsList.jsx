import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const QuestionsList = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [questions, setQuestions] = useState([
    {
      subject: "Math",
      questionId: 1,
      question: "What is 2 + 2?",
      options: ["2", "3", "4", "5"],
    },
    {
      subject: "Science",
      questionId: 2,
      question: "What is the chemical symbol for Oxygen?",
      options: ["O", "O2", "O3", "O4"],
    },
    {
      subject: "History",
      questionId: 3,
      question: "Who was the first President of the United States?",
      options: [
        "George Washington",
        "Thomas Jefferson",
        "Abraham Lincoln",
        "John F. Kennedy",
      ],
    },
    {
      subject: "English",
      questionId: 4,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
    },
    {
      subject: "Geography",
      questionId: 5,
      question: "Which ocean is the largest?",
      options: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
    },
  ]);

  // new question handle
  const handleAddQn = () => {
    // Check if either question or answer is empty
    if (!newQuestion || !newAnswer) {
      // You can show an error message or handle it as needed
      console.log("Both question and answer are required");
      return;
    }

    const newQuiz = {
      subject: subject,
      questionId: questions.length + 1,
      question: newQuestion,
      // answer: newAnswer,
      options: [newAnswer], // Add options as needed
    };
    console.log(newQuiz);
    // Update the flashcards state with the new flashcard
    setQuestions([...questions, newQuiz]);

    // Clear the input fields
    setNewQuestion("");
    setNewAnswer("");

    // Close the modal
    setIsModalOpen(false);
  };

  // const questions =
  const filteredQuestions = questions;

  const handleStart = () => {
    navigate(`/quiz/${subject}/${filteredQuestions[0].questionId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center m-5 gap-5">
      <h1>{subject}</h1>
      <div className="flex justify-center items-center m-5 gap-5">
        <button className="btn btn-error" onClick={handleStart}>
          Start
        </button>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search questions"
            className="input input-bordered w-full max-w-xs"
          />
          <button
            className="btn bg-slate-500 hover:bg-slate-700"
            htmlFor="search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="black"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <button
          className="btn btn-success"
          onClick={() => setIsModalOpen(true)}
        >
          New question
        </button>
      </div>
      <div className="flex flex-col	">
        <div className="card-grid">
          {filteredQuestions.map((question, index) => (
            <Link
              key={index}
              className="bg-sky-200 cursor-pointer text-black p-5 rounded-md"
              to={`/quiz/${subject}/${question.questionId}`}
            >
              {question.question}
            </Link>
          ))}
        </div>
      </div>
      {/* modal for new question */}
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
              Add New Question
            </h3>
            <div className="py-4 flex flex-col justify-center items-center">
              <textarea
                placeholder="New Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="textarea textarea-bordered textarea-sm w-full max-w-xs m-2"
              ></textarea>
              <textarea
                placeholder="Option 1"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="textarea textarea-bordered textarea-sm w-full max-w-xs"
              ></textarea>
            </div>

            <div className="flex justify-center items-center space-x-2 flex-col">
              <button
                onClick={handleAddQn}
                className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default QuestionsList;
