import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Import your chat component
// import ChatComponent from "./ChatComponent";

const ChatPdf = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Function to handle file upload
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdfs([...pdfs, { url: reader.result, name: file.name }]);
      // Set the selected PDF if it's the first one or if no PDF is selected
      if (!selectedPdf) {
        setSelectedPdf(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Function to handle PDF click
  const handlePdfClick = (pdf) => {
    console.log(pdf.url);
    console.log(pdf);

    setSelectedPdf(pdf.url);
  };

  return (
    <div className="flex h-[89vh]">
      <div className="w-64 bg-gray-100 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {pdfs.map((pdf, index) => (
            <div
              key={index}
              className="mb-2 p-2 bg-white rounded-md cursor-pointer"
              onClick={() => handlePdfClick(pdf)}
            >
              {pdf.name}
            </div>
          ))}
        </div>
        <div>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        {selectedPdf && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Selected PDF:</h2>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={selectedPdf} />
            </Worker>
          </div>
        )}
        {/* Add your chat component here */}
        {/* <ChatComponent /> */}
      </div>
    </div>
  );
};

export default ChatPdf;
