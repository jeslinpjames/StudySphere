import React, { useState, useEffect } from "react";
import NotesSubList from "./NotesSubList";

function Notes() {
  return (
    <div className="m-5">
      <NotesSubList subjects={sampleSubjects} />
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
