import React, { useState } from "react";
import IncomeCategory from "./components/IncomeCategory";
import Questionnaire from "./components/Questionnaire";
import SpendingPriority from "./components/SpendingPriority";
import BudgetLimits from "./components/BudgetLimits";
import "./App.css"; // ⭐ ensures background styling loads

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    incomeType: "",
    category: "",
    questionnaire: {},
    spendingPriority: {},
    budgetLimits: {},
  });

  const handleIncomeNext = (incomeType) => {
    setFormData(prev => ({
      ...prev,
      incomeType,
      category: incomeType,
    }));
    setStep(2);
  };

  const handleQuestionnaireNext = (data) => {
    setFormData(prev => ({ ...prev, questionnaire: data }));
    setStep(3);
  };

  const handleSpendingNext = (data) => {
    setFormData(prev => ({ ...prev, spendingPriority: data }));
    setStep(4);
  };

  const handleSave = async (limits) => {
    const finalData = {
      ...formData,
      budgetLimits: limits,
    };

    try {
      const res = await fetch("http://localhost:5000/api/userdata/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Limits saved successfully!");
      } else {
        alert("Error saving data");
      }
    } catch (err) {
      alert("Server connection failed");
    }
  };

  let content;

  if (step === 1) content = <IncomeCategory onNext={handleIncomeNext} />;
  if (step === 2) content = <Questionnaire onNext={handleQuestionnaireNext} />;
  if (step === 3) content = <SpendingPriority onNext={handleSpendingNext} />;
  if (step === 4)
    content = (
      <BudgetLimits
        categories={Object.keys(formData.spendingPriority)
          .filter(cat => formData.spendingPriority[cat] >= 3)}
        onSave={handleSave}
      />
    );

  return (
    <div className="App"> 
      {content}
    </div>
  );
}

export default App;