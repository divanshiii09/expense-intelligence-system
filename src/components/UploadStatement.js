import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadStatement.css";

function UploadStatement({ setUploadedData }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-statement/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.detected_type === "Unknown") {
        setMessage("Unsupported statement format");
        return;
      }

      setUploadedData(data.transactions);
      setMessage("File uploaded successfully!");
      
      // Navigate to first page after upload
      navigate("/income-category");

    } catch (err) {
      console.error(err);
      setMessage("Error uploading file");
    }
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        <h1>Upload Your Bank Statement</h1>
        <p>Supported: PDF statements from Google Pay or PhonePe</p>
      </div>

      <div className="right-panel">
        <div className="form-box">
          <h2>Upload Statement</h2>
          <form onSubmit={handleUpload}>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
          {message && <p id="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default UploadStatement;