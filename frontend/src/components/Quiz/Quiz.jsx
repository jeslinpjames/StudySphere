import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuizSubjectList from "./QuizSubjectList";
function Quiz() {
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
  const [subjects, setSubjects] = useState(sampleSubjects);

  return (
    <>
      {/* <h1>Quiz</h1> */}
      <QuizSubjectList subjects={subjects} />
    </>
  );
}

export default Quiz;
