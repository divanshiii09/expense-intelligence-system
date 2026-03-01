const express = require("express");
const router = express.Router();
const UserData = require("../models/UserData");

// POST /api/userdata/save
router.post("/save", async (req, res) => {
  try {
    const {
      incomeType,
      category,
      questionnaire,
      spendingPriority,
      budgetLimits,
    } = req.body;

    const userData = new UserData({
      incomeType: incomeType || "No Income",
      category: category || "No Income",
      questionnaire: {
        incomeStability: questionnaire?.incomeStability || "Somewhat Stable",
        savingHabit: questionnaire?.savingHabit || "Sometimes",
        majorExpense: questionnaire?.majorExpense || "Food & Groceries",
        riskLevel: questionnaire?.riskLevel || "Low",
        expenseControl: questionnaire?.expenseControl || "Average",
      },
      spendingPriority:
        Object.keys(spendingPriority || {}).length > 0
          ? spendingPriority
          : {
              "Food & Groceries": 3,
              Shopping: 3,
              Bills: 4,
              Health: 1,
              Entertainment: 1,
              Transport: 1,
            },
      budgetLimits:
        Object.keys(budgetLimits || {}).length > 0
          ? budgetLimits
          : {
              "Food & Groceries": 3000,
              Shopping: 1500,
              Bills: 4000,
              Health: 1000,
              Entertainment: 1000,
              Transport: 1500,
            },
    });

    await userData.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;