import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    FinanceID: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectFinance', required: true },
    Date: { type: Date },
    Description: { type: String },
    Amount: { type: Number, required: true },
  });
 
  export const Transaction = mongoose.model('Transaction', transactionSchema);
  
  
