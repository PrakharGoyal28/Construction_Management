import mongoose from "mongoose"

const projectFinanceSchema = new mongoose.Schema({
    ProjectID: { type: String, ref: 'Project', required: true },
    TotalBudget: { type: Number, required: true },
    CostBreakdown: { type: String },
    RemainingBudget: { type: Number },
    RecentTransactions: { type: String },
  });

     const ProjectFinance = mongoose.model('Project', projectFinanceSchema);
    
      export default ProjectFinance;