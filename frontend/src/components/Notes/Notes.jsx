import React, { useEffect, useState } from "react";
import NotesSubList from "./NotesSubList";
import api from "../../api";

function Notes() {
  const [subjects, setSubjects] = useState(sampleSubjects);

  // get user specific subjects
  const getSubjects = () => {
    api
      .get("/api/subjects")
      .then((res) => {
        setSubjects(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getSubjects();
  }, []);

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
