import React, { useState } from "react";
import "./SpendingPriority.css";

const categories = [
  { name: "Food & Groceries", icon: "🍔" },
  { name: "Transport", icon: "🚗" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Bills", icon: "📄" },
  { name: "Health", icon: "💊" },
];

function SpendingPriority({ onNext }) {
  const [selected, setSelected] = useState([]);
  const [levels, setLevels] = useState({});

  const toggleCategory = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const setLevel = (category, value) => {
    setLevels({ ...levels, [category]: Number(value) });
  };

  return (
    <div className="spending-container">
      <h1 className="spending-title">Where does most income go?</h1>
      <p className="spending-subtitle">Select categories and choose spending level</p>

      <div className="spending-grid">
        {categories.map((item) => (
          <div
            key={item.name}
            className={`spending-card ${selected.includes(item.name) ? "active" : ""}`}
            onClick={() => toggleCategory(item.name)}
          >
            <div className="spending-icon">{item.icon}</div>
            <div className="spending-name">{item.name}</div>
            {selected.includes(item.name) && (
              <input
                type="range"
                min="0"
                max="5"
                value={levels[item.name] || 0}
                onChange={(e) => setLevel(item.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <button className="spending-button" onClick={() => onNext(levels)}>
        Continue
      </button>
    </div>
  );
}

export default SpendingPriority;