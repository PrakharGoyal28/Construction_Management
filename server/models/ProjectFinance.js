import mongoose from "mongoose"

const ProjectFinanceSchema = new mongoose.Schema({
    ProjectID: { type: String, ref: 'Project', required: true },
    TotalBudget: { type: Number, required: true },
    CostBreakdown: { type: String },
    RemainingBudget: { type: Number },
    RecentTransactions: { type: String },
  });

     const Project = mongoose.model('Project', ProjectFinanceSchema);
    
      export default Project;