const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  incomeCategory: String,

  questionnaire: {
    monthlyIncome: String,
    monthlySpending: String,
    savingHabit: String,
    financialGoal: String,
    riskLevel: String,
  },

  spendingLevels: {
    type: Object,
    default: {}
  },

  budgetLimits: {
    type: Object,
    default: {}
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("UserData", UserDataSchema);