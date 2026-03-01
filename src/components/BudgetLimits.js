import React, { useState } from "react";
import "./BudgetLimits.css";

function BudgetLimits({ categories = [], onSave }) {
  const [limits, setLimits] = useState({});

  const handleChange = (category, value) => {
    setLimits({
      ...limits,
      [category]: value,
    });
  };

  const saveData = () => {
    onSave(limits);
  };

  return (
    <div className="spending-container">
      <h1 className="spending-title">
        Set Monthly Limits for Major Expenses
      </h1>

      <div className="spending-grid">
        {categories.map((category) => (
          <div key={category} className="spending-card active">
            <h3>{category}</h3>

            <input
              type="number"
              placeholder="Enter monthly amount"
              className="limit-input"
              onChange={(e) =>
                handleChange(category, e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <button className="spending-button" onClick={saveData}>
        Save Limits
      </button>
    </div>
  );
}

export default BudgetLimits;