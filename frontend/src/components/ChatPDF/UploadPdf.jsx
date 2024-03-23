import React, { useState } from "react";

const UploadPdf = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
      />
      <button
        onClick={handleUpload}
        className="w-full mt-2 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        Upload PDF
      </button>
    </div>
  );
};

export default UploadPdf;
