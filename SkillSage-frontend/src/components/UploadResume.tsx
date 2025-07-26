import React, { useState } from "react";
import axios from "axios";

const UploadResume: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("❌ Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus(`✅ ${response.data.message}`);
    } catch (error) {
      console.error(error);
      setUploadStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded shadow text-white">
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 bg-gray-700 text-white px-2 py-1 rounded cursor-pointer w-full"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded w-full"
      >
        Upload
      </button>

      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default UploadResume;
