import React from "react";
import { useParams } from "react-router-dom";

const Question = () => {
  const questions = [
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
  ];

  const { subject, qn_id } = useParams();
  const filteredQuestions = questions.filter(
    (q) => q.questionId === parseInt(qn_id, 10)
  );

  // Check if there's a question that matches the ID
  if (filteredQuestions.length === 0) {
    return <div>No question found with ID {qn_id}</div>;
  }

  // Access the first (and only) question in the filteredQuestions array
  const question = filteredQuestions[0];

  return (
    <div className="flex flex-col justify-center items-center m-5 gap-5">
      <h1>{subject}</h1>
      <h1>{qn_id}</h1>
      <div>
        <h1>{question.question}</h1>
        <ul>
          {question.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
