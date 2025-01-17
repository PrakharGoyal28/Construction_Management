import mongoose from "mongoose"

const projectFinanceSchema = new mongoose.Schema({
    ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    TotalBudget: { type: Number, required: true },
    RemainingBudget: { type: Number },
    CostBreakdown: { type: String },
    RecentTransactions: { type: String },
  });

   export const ProjectFinance = mongoose.model('ProjectFinance', projectFinanceSchema);
    
