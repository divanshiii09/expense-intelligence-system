import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BankUpload.css"; // ✅ add this

function BankUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/upload-statement/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onUpload(res.data.transactions); // pass parsed data
      alert(`Uploaded ${res.data.total_transactions} transactions`);
      navigate("/income"); // go to first questionnaire page
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bank-upload-container">
      <div className="upload-box">
        <h2>Upload Your Bank Statement</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload & Continue"}
        </button>
      </div>
    </div>
  );
}

export default BankUpload;