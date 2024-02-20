import React from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

// sample data
// filter flashcards based on given parameters and if users doesnt contain any return nothing , if invalid route return not found
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

  // Check if the provided subject is in the list of valid subjects
  const isValidSubject = sampleSubjects.some(
    (sampleSubject) =>
      sampleSubject.name.toLowerCase() === subject.toLowerCase()
  );

  if (!isValidSubject) {
    return <div>Subject not found</div>;
  }

  const flashcards = [
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
  ];

  const filteredFlashCards = flashcards.filter(
    (flashcard) => flashcard.subject.toLowerCase() === subject.toLowerCase()
  );

  return (
    <>
      <h1 className="text-center p-3 text-3xl font-bold">{subject}</h1>
      <div className="m-3 card-grid">
        {filteredFlashCards.map((flashcard) => (
          <Card flashcard={flashcard} key={flashcard.id} />
        ))}
      </div>
    </>
  );
}

export default FlashCardList;
