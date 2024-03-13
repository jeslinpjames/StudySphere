import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Question = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // dummy data
  const questions = [
    {
      subject: "Math",
      questionId: 1,
      question: "What is 2 + 2?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
    },
    {
      subject: "Science",
      questionId: 2,
      question: "What is the chemical symbol for Oxygen?",
      options: ["O", "O2", "O3", "O4"],
      correctAnswer: "O2",
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
      correctAnswer: "George Washington",
    },
    {
      subject: "English",
      questionId: 4,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
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
      correctAnswer: "Pacific Ocean",
    },
  ];

  const { subject, qn_id } = useParams();
  const navigate = useNavigate();

  const filteredQuestions = questions.filter(
    (q) => q.questionId === parseInt(qn_id, 10)
  );

  const handleAnswerClick = (option) => {
    if (!isAnswered) {
      setSelectedAnswers({ ...selectedAnswers, [qn_id]: option });
      setIsAnswered(true);
      if (option === filteredQuestions[0].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  // Check if there's a question that matches the ID
  if (filteredQuestions.length === 0) {
    return <div>No question found with ID {qn_id}</div>;
  }

  // Access the first (and only) question in the filteredQuestions array
  const question = filteredQuestions[0];

  const currentIndex = questions.findIndex(
    (q) => q.questionId === parseInt(qn_id, 10)
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(`/quiz/${subject}/${questions[currentIndex - 1].questionId}`);
      setIsAnswered(!!selectedAnswers[questions[currentIndex - 1].questionId]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      navigate(`/quiz/${subject}/${questions[currentIndex + 1].questionId}`);
      setIsAnswered(!!selectedAnswers[questions[currentIndex + 1].questionId]);
    } else {
      setShowResult(true);
    }
  };

  const handleGoToSubject = () => {
    navigate(`/quiz/${subject}`);
  };

  const renderResult = () => {
    const wrongAnswers = questions.filter(
      (q) =>
        selectedAnswers[q.questionId] &&
        selectedAnswers[q.questionId] !== q.correctAnswer
    );

    return (
      <div className="flex flex-col items-center justify-center mt-16  ">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Result: {score}/{questions.length}
          </h1>
          {wrongAnswers.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Wrong Answers:
              </h2>
              <ul className="space-y-4">
                {wrongAnswers.map((q) => (
                  <li
                    key={q.questionId}
                    className="bg-red-100 text-red-800 p-4 rounded-md"
                  >
                    <h3 className="text-lg font-semibold">{q.question}</h3>
                    <p className="mt-2">
                      Your Answer: {selectedAnswers[q.questionId]}
                    </p>
                    <p className="mt-2">Correct Answer: {q.correctAnswer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="px-4 py-2 mt-6 text-gray-700 rounded-md hover:bg-red-300 transition-colors duration-200 btn btn-error"
            onClick={handleGoToSubject}
          >
            Go to Subject
          </button>
        </div>
      </div>
    );
  };

  return showResult ? (
    renderResult()
  ) : (
    <div className="flex flex-col items-center justify-center mt-16 ">
      <div className="max-w-md w-full bg-orange-50	 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{subject}</h1>
          <span className="text-lg font-semibold text-gray-700">
            Score: {score}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">{qn_id}</h2>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {question.question}
          </h3>
          <ul className="space-y-4 text-gray-800">
            {question.options.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer p-4 rounded-md border-2 border-black	 transition-colors duration-200 ${
                  selectedAnswers[qn_id] &&
                  ((selectedAnswers[qn_id] === option &&
                    option === question.correctAnswer &&
                    "bg-green-100 text-green-800") ||
                    (selectedAnswers[qn_id] === option &&
                      option !== question.correctAnswer &&
                      "bg-red-100 text-red-800") ||
                    (option === question.correctAnswer &&
                      "bg-green-100 text-green-800"))
                }`}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 text-gray-700 rounded-md hover:bg-blue-300 transition-colors duration-200 btn btn-info"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-gray-700 rounded-md hover:bg-green-300 transition-colors duration-200 btn btn-success"
            onClick={
              currentIndex === questions.length - 1 ? handleNext : handleNext
            }
          >
            {currentIndex === questions.length - 1 ? "Result" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
