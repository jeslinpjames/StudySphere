import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SubjectList = ({ subjects, flashcards }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  //   listing subjects and passing the selected subjects to get flashcards of it
  return (
    <div>
      <h1 className="text-center p-3 text-3xl font-bold">Topics</h1>
      <div className="card-grid ">
        {subjects.map((subject, index) => (
          <Link
            className="bg-sky-200 cursor-pointer text-black p-5 rounded-md	"
            to={`/flashcards/${subject.name}`}
            onClick={() => setSelectedSubject(subject)}
          >
            {subject.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;

// <div>
//       {!chosen ? (
//         <div className="card-grid">
//           {subjects.map((subject, index) => (
//             <Link
//               key={index}
//               className="bg-green-200 cursor-pointer"
//               onClick={() => {
//                 setSelectedSubject(subject.name);
//                 setChosen(true);
//               }}
//               to={`flashcards/${subject.name}`}
//             >
//               {subject.name}
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <FlashCardList flashcards={filteredFlashCards} />
//       )}
//     </div>
//   );
