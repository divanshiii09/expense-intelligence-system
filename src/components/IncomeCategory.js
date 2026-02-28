import React from "react";
import "./IncomeCategory.css";

const categories = [
  { name: "Fixed Income", icon: "💼", desc: "Same income every month" },
  { name: "Variable Income", icon: "📊", desc: "Income changes monthly" },
  { name: "Freelancer / Gig", icon: "🧑‍💻", desc: "Project based earnings" },
  { name: "Business Owner", icon: "🏢", desc: "Runs a business" },
  { name: "No Income", icon: "🎓", desc: "Student or not earning" },
  { name: "Multiple Sources", icon: "💰", desc: "More than one income" },
];

function IncomeCategory({ onNext }) {
  const handleClick = (category) => {
    onNext({ incomeType: category.name, category: category.name });
  };

  return (
    <div className="income-container">
      <h1 className="income-title">Tell us about your income</h1>
      <p className="income-subtitle">
        This helps us personalize your financial plan
      </p>

      <div className="income-grid">
        {categories.map((item) => (
          <div
            key={item.name}
            className="income-card"
            onClick={() => handleClick(item)}
          >
            <div className="income-icon">{item.icon}</div>
            <div className="income-name">{item.name}</div>
            <div className="income-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomeCategory;