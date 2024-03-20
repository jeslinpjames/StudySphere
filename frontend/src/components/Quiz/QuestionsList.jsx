import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const QuestionsList = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([
    {
      subject: "Math",
      questionId: 1,
      question: "What is 2 + 2?",
      options: ["2", "3", "4", "5"],
      answer: 3,
    },
    {
      subject: "Science",
      questionId: 2,
      question: "What is the chemical symbol for Oxygen?",
      options: ["O", "O2", "O3", "O4"],
      answer: 0,
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
      answer: 0,
    },
    {
      subject: "English",
      questionId: 4,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: 0,
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
      answer: 0,
    },
  ]);

  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const handleStart = () => {
    navigate(`/quiz/${subject}/${filteredQuestions[0].questionId}`);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion(question.question);
    setOptions(question.options);
    setSelectedOption(question.answer);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter(
      (question) => question.questionId !== questionId
    );
    setQuestions(updatedQuestions);
    setFilteredQuestions(updatedQuestions);
  };

  const handleSearch = () => {
    const searchfilteredQuestions = questions.filter((question) =>
      question.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(searchfilteredQuestions);
  };

  // new question handle
  const handleAddQn = () => {
    if (
      newQuestion.trim() === "" ||
      options.some((option) => option.trim() === "") ||
      selectedOption === -1
    ) {
      return;
    }
    if (editingQuestion) {
      // Update the existing question
      const updatedQuestions = questions.map((question) => {
        if (question.questionId === editingQuestion.questionId) {
          return {
            ...question,
            question: newQuestion,
            options: options,
            answer: selectedOption,
          };
        }
        return question;
      });
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
    } else {
      // Add a new question
      const newQuestionId = questions.length + 1;
      const newQuiz = {
        subject: subject,
        question: newQuestion,
        options: options,
        answer: selectedOption,
        questionId: newQuestionId,
      };
      setQuestions([...questions, newQuiz]);
      setFilteredQuestions([...filteredQuestions, newQuiz]);
    }

    // Clear the input fields
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setSelectedOption(-1);
    setEditingQuestion(null);

    // Close the modal
    setIsModalOpen(false);
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn bg-slate-500 hover:bg-slate-700"
            htmlFor="search"
            onClick={handleSearch}
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
          onClick={() => {
            setEditingQuestion(null);
            setNewQuestion("");
            setOptions(["", "", "", ""]);
            setSelectedOption(-1);
            setIsModalOpen(true);
          }}
        >
          New question
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          {filteredQuestions.map((question, index) => (
            <div
              key={index}
              className="bg-sky-200 cursor-pointer text-black p-5 rounded-md flex justify-between items-center"
              onClick={() => handleEditQuestion(question)}
            >
              <span>{question.question}</span>
              <button
                className="btn btn-error btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteQuestion(question.questionId);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* modal for new question */}
      {isModalOpen && (
        <dialog
          id="my_modal_2"
          className="modal p-5 backdrop-blur-sm"
          open
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-box bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-center text-slate-950">
              {editingQuestion ? "Edit Question" : "Add New Question"}
            </h3>
            <div className="py-4 flex flex-col justify-center items-center">
              <textarea
                placeholder="New Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="textarea textarea-bordered textarea-sm w-full max-w-xs m-2"
              ></textarea>
              <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      className="radio radio-accent"
                      checked={selectedOption === index}
                      onChange={() => setSelectedOption(index)}
                    />
                    <input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        setOptions((prevOptions) => {
                          const newOptions = [...prevOptions];
                          newOptions[index] = e.target.value;
                          return newOptions;
                        })
                      }
                      className="input input-bordered input-accent w-full max-w-xs"
                    ></input>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center space-x-2 flex-col">
              <button
                onClick={handleAddQn}
                className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg"
              >
                {editingQuestion ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default QuestionsList;
