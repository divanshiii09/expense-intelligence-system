import React, { useState } from "react";
import IncomeCategory from "./components/IncomeCategory";
import Questionnaire from "./components/Questionnaire";
import SpendingPriority from "./components/SpendingPriority";
import BudgetLimits from "./components/BudgetLimits";

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
    const finalData = { ...formData, budgetLimits: limits };

    try {
      const res = await fetch("http://localhost:5000/api/userdata/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();
      if (data.success) alert("Limits saved successfully!");
      else alert("Error saving data");
    } catch {
      alert("Server connection failed");
    }
  };

  if (step === 1) return <IncomeCategory onNext={handleIncomeNext} />;
  if (step === 2) return <Questionnaire onNext={handleQuestionnaireNext} />;
  if (step === 3) return <SpendingPriority onNext={handleSpendingNext} />;
  if (step === 4)
    return (
      <BudgetLimits
        categories={Object.keys(formData.spendingPriority)
          .filter(cat => formData.spendingPriority[cat] >= 3)}
        onSave={handleSave}
      />
    );
}

export default App;