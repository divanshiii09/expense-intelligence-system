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
      incomeType: incomeType,
      category: incomeType
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
      incomeType: formData.incomeType || "No Income",
      category: formData.category || "No Income",
      questionnaire: {
        incomeStability: formData.questionnaire.incomeStability || "Somewhat Stable",
        savingHabit: formData.questionnaire.savingHabit || "Sometimes",
        majorExpense: formData.questionnaire.majorExpense || "Food & Groceries",
        riskLevel: formData.questionnaire.riskLevel || "Low",
        expenseControl: formData.questionnaire.expenseControl || "Average",
      },
      spendingPriority: Object.keys(formData.spendingPriority).length
        ? formData.spendingPriority
        : {
            "Food & Groceries": 3,
            Shopping: 3,
            Bills: 4,
            Health: 1,
            Entertainment: 1,
            Transport: 1,
          },
      budgetLimits: Object.keys(limits).length
        ? limits
        : {
            "Food & Groceries": 3000,
            Shopping: 1500,
            Bills: 4000,
            Health: 1000,
            Entertainment: 1000,
            Transport: 1500,
          },
    };

    console.log("Sending to backend:", finalData); // debug check

    try {
      const res = await fetch("http://localhost:5000/api/userdata/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();
      if (data.success) alert("Limits saved successfully!");
      else alert("Error saving data");
    } catch (err) {
      console.error(err);
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