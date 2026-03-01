import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Use exact filenames as they exist in components folder
import Login from './components/login';
import BankUpload from './components/BankUpload';
import IncomeCategory from './components/IncomeCategory';
import Questionnaire from './components/Questionnaire';
import SpendingPriority from './components/SpendingPriority';
import BudgetLimits from './components/BudgetLimits';

function AppRouter() {
  const [user, setUser] = useState(null);
  const [bankData, setBankData] = useState([]);
  const [formData, setFormData] = useState({
    incomeType: "",
    category: "",
    questionnaire: {},
    spendingPriority: {},
    budgetLimits: {},
  });
  const [step, setStep] = useState(1);

  // Handlers for multi-step form
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login onLogin={setUser} />} />

        <Route path="/upload" element={
          user ? <BankUpload onUpload={setBankData} /> : <Navigate to="/login" />
        } />

        <Route path="/income" element={
          user ? <IncomeCategory onNext={handleIncomeNext} /> : <Navigate to="/login" />
        } />

        <Route path="/questionnaire" element={
          user ? <Questionnaire onNext={handleQuestionnaireNext} /> : <Navigate to="/login" />
        } />

        <Route path="/spending" element={
          user ? <SpendingPriority onNext={handleSpendingNext} /> : <Navigate to="/login" />
        } />

        <Route path="/budget" element={
          user ? <BudgetLimits
            categories={Object.keys(formData.spendingPriority).filter(
              cat => formData.spendingPriority[cat] >= 3
            )}
            onSave={handleSave}
          /> : <Navigate to="/login" />
        } />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;