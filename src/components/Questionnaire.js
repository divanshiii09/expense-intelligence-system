import React, { useState } from "react";
import "./Questionnaire.css";

function Questionnaire({ onNext }) {
  const [formData, setFormData] = useState({
    monthlyIncome: "",
    monthlySpending: "",
    financialGoals: "",
    monthlySavings: "",
    riskLevel: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h2 className="questionnaire-title">Quick Financial Questionnaire</h2>

        <div className="form-group">
          <label className="form-label">Select your monthly income</label>
          <select
            name="monthlyIncome"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select option</option>
            <option>Less than ₹20,000</option>
            <option>₹20,000 - ₹50,000</option>
            <option>₹50,001 - ₹1,00,000</option>
            <option>Above ₹1,00,000</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">How much do you mostly spend in a month?</label>
          <select
            name="monthlySpending"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select option</option>
            <option>Less than ₹10,000</option>
            <option>₹10,000 - ₹30,000</option>
            <option>₹30,001 - ₹50,000</option>
            <option>Above ₹50,000</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Do you have any major financial goals?</label>
          <select
            name="financialGoals"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select option</option>
            <option>Saving</option>
            <option>Investment</option>
            <option>Debt Payment</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">How much do you save monthly?</label>
          <select
            name="monthlySavings"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select option</option>
            <option>Less than ₹5,000</option>
            <option>₹5,000 - ₹10,000</option>
            <option>Above ₹10,000</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">What is your financial risk comfort?</label>
          <select
            name="riskLevel"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select option</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button className="next-button" onClick={() => onNext(formData)}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;