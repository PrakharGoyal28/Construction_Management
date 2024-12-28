import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    FinanceID: { type: String, ref: 'ProjectFinance', required: true },
    Date: { type: Date },
    Amount: { type: Number, required: true },
    Description: { type: String },
  });
 
  export const Transaction = mongoose.model('Transaction', transactionSchema);
  
