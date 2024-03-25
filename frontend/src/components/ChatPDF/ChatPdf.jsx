import React, { useState } from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Chat from "./Chat";

const ChatPdf = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdfs([...pdfs, { url: reader.result, name: file.name }]);
      if (!selectedPdf) {
        setSelectedPdf({ url: reader.result, name: file.name }); // Set the entire PDF object
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf); // Set the entire PDF object
  };

  return (
    <div className="flex h-[89vh]">
      <div className="w-64 bg-gray-200 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {pdfs.map((pdf, index) => (
            <div
              key={index}
              className="mb-2 p-2 bg-gray-600 font-mono rounded-md cursor-pointer overflow-clip	"
              onClick={() => handlePdfClick(pdf)}
            >
              {pdf.name}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <input
            type="file"
            accept="application/pdf"
            className="file-input file-input-bordered file-input-info w-1/2 max-w-xs"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 pl-1">
          {selectedPdf && (
            <div className="mb-4 flex flex-col h-full">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
                  <Viewer
                    fileUrl={selectedPdf.url}
                    plugins={[defaultLayoutPluginInstance]}
                    defaultScale={SpecialZoomLevel.PageWidth} // Adjust this value to fit the width of the container
                  />
                </div>
              </Worker>
            </div>
          )}
        </div>
        {selectedPdf && <Chat pdfName={selectedPdf.name} />}
      </div>
    </div>
  );
};

export default ChatPdf;
