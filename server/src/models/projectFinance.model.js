import mongoose from "mongoose"

const projectFinanceSchema = new mongoose.Schema({
    ProjectID: { type: String, ref: 'Project', required: true },
    TotalBudget: { type: Number, required: true },
    RemainingBudget: { type: Number },
    CostBreakdown: { type: String },
    RecentTransactions: { type: String },
  });

   export const ProjectFinance = mongoose.model('Project', projectFinanceSchema);
    
