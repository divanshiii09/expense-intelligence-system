const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
  {
    // ✅ Income selection page
    incomeType: {
      type: String,
      required: false,
    },

    category: {
      type: String,
      required: false,
    },

    // ✅ Questionnaire page
    questionnaire: {
      monthlyIncome: String,
      monthlySpending: String,
      riskLevel: String,
    },

    // ✅ Spending priority page
    spendingPriority: {
      type: Object,
    },

    // ✅ Budget limits page
    budgetLimits: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserData", UserDataSchema);