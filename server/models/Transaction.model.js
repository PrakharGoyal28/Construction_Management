import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    FinanceID: { type: String, ref: 'ProjectFinance', required: true },
    Date: { type: Date },
    Amount: { type: Number, required: true },
    Description: { type: String },
  });
 
   const Transaction = mongoose.model('Transaction', TransactionSchema);
  
    export default Transaction;