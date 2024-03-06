import React from "react";
import { useParams, Link } from "react-router-dom";

const Questions = () => {
  const { subject } = useParams();

  return (
    <div className="flex justify-center items-center m-5 gap-5">
      <button className="btn btn-error">Start</button>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search questions"
          className="input input-bordered w-full max-w-xs"
        />
        <button
          className="btn bg-slate-500 hover:bg-slate-700"
          htmlFor="search"
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
      <button className="btn btn-success">New question</button>
    </div>
  );
};

export default Questions;
