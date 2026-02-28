import React, { useState } from "react";
import "./BudgetLimits.css";

function BudgetLimits({ formData }) {
  // Only include categories where slider value is >= 3
  const categories = Object.entries(formData.spendingPriority || {})
    .filter(([cat, value]) => value >= 3)
    .map(([cat]) => cat);

  const [limits, setLimits] = useState({});

  const handleChange = (category, value) => {
    setLimits({ ...limits, [category]: value });
  };

  const saveData = async () => {
    const finalData = { ...formData, budgetLimits: limits };

    try {
      const response = await fetch("http://localhost:5000/api/userdata/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();
      if (result.success) alert("Your data has been saved successfully!");
      else alert("Error saving data: " + result.message);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="spending-container">
      <h1 className="spending-title">Set Monthly Limits for Major Expenses</h1>

      <div className="spending-grid">
        {categories.length === 0 && <p>No categories selected with level ≥ 3</p>}
        {categories.map((category) => (
          <div key={category} className="spending-card active">
            <h3>{category}</h3>
            <input
              type="number"
              placeholder="Enter monthly amount"
              className="limit-input"
              onChange={(e) => handleChange(category, e.target.value)}
            />
          </div>
        ))}
      </div>

      {categories.length > 0 && (
        <button className="spending-button" onClick={saveData}>
          Save Limits
        </button>
      )}
    </div>
  );
}

export default BudgetLimits;