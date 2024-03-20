import React, { useState } from "react";
import NotesSubList from "./NotesSubList";

function Notes() {
  const [subjects, setSubjects] = useState(sampleSubjects);

  return (
    <div className="m-5">
      <NotesSubList subjects={subjects} setSubjects={setSubjects} />
    </div>
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

export default Notes;
