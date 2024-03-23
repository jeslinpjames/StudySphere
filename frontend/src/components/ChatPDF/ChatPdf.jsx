import React, { useState } from "react";
import UploadPdf from "./UploadPdf";
import PdfList from "./PdfList";

const ChatPdf = () => {
  const [pdfs, setPdfs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleUpload = (file) => {
    setPdfs([...pdfs, file]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="drawer h-screen">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />
      <div className="drawer-content flex-1">
        <h1 className="text-2xl font-bold mb-4">ChatPdf</h1>
        {/* Add your chat component here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button ml-auto"
        >
          {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </label>
      </div>
      <div className="drawer-side h-full">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 text-base-content flex flex-col h-full">
          <li className="flex-1 overflow-y-auto">
            <PdfList pdfs={pdfs} />
          </li>
          <li className="mt-auto">
            <UploadPdf onUpload={handleUpload} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatPdf;
