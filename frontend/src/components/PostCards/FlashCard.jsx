import React, { useState } from "react";
import FlashCardList from "./FlashCardList";
import SubjectList from "./SubjectList";

function FlashCard() {
  const [flashCards, setFlashCards] = useState(sampleData);
  const [subjects, setSubjects] = useState(sampleSubjects);

  return (
    <>
      <div className="m-5">
        <SubjectList
          subjects={subjects}
          setSubjects={setSubjects}
          flashcards={flashCards}
        />
      </div>
    </>
  );
}

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
const sampleData = [
  {
    id: 1,
    question: "What is who?",
    answer: "Boo is who",
    options: ["1", "2", "3"],
  },
  {
    id: 2,
    question: "What is who?",
    answer: "Boo is who",
    options: ["1", "2", "3"],
  },
  {
    id: 3,
    question: "What is who?",
    answer: "Boo is who",
    options: ["1", "2", "3"],
  },
];

export default FlashCard;
