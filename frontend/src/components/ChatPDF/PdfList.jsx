// PdfList.jsx
import React from "react";

const PdfList = ({ pdfs, onPdfClick }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-2">Uploaded PDFs</h3>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap">
          {pdfs.map((pdf, index) => (
            <button
              key={index}
              className="m-1 px-3 py-1 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200"
              onClick={() => onPdfClick(pdf)}
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
