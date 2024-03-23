import React from "react";

const PdfList = ({ pdfs }) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-2">Uploaded PDFs</h3>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap -m-1">
          {pdfs.map((pdf, index) => (
            <button
              key={index}
              className="m-1 px-3 py-1 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200"
            >
              {pdf.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfList;
