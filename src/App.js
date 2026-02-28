import React, { useState } from "react";
import IncomeCategory from "./components/IncomeCategory";
import Questionnaire from "./components/Questionnaire";
import SpendingPriority from "./components/SpendingPriority";
import BudgetLimits from "./components/BudgetLimits";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);

  // Centralized form data
  const [formData, setFormData] = useState({
    incomeType: "",
    category: "",
    questionnaire: {},
    spendingPriority: {},
    budgetLimits: {},
  });

  const nextStep = () => setStep(step + 1);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  return (
    <div className="app-container">
      {step === 1 && (
        <IncomeCategory
          onNext={(data) => {
            updateFormData("incomeType", data.incomeType);
            updateFormData("category", data.category);
            nextStep();
          }}
        />
      )}
      {step === 2 && (
        <Questionnaire
          onNext={(data) => {
            updateFormData("questionnaire", data);
            nextStep();
          }}
        />
      )}
      {step === 3 && (
        <SpendingPriority
          onNext={(data) => {
            updateFormData("spendingPriority", data);
            nextStep();
          }}
        />
      )}
      {step === 4 && <BudgetLimits formData={formData} />}
    </div>
  );
}

export default App;