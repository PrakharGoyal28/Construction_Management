import {asyncHandler} from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// Create a new transaction
const createTransaction = asyncHandler(async (req, res) => {
  const { FinanceID, Date, Description, Amount } = req.body;

  // Validate required fields
  if (!FinanceID || !Amount) {
    throw new ApiError(400, "FinanceID and Amount are required.");
  }

  // Create the transaction
  const transaction = await Transaction.create({
    FinanceID,
    Date: Date || new Date(), // Default to the current date if not provided
    Description,
    Amount,
  });

  res.status(201).json(new ApiResponse(201, transaction, "Transaction created successfully."));
});

// Update a transaction
const updateTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  if (!transactionId) {
    throw new ApiError(400, "Transaction ID is required.");
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    req.body,
    { new: true, runValidators: true } // Return updated document and validate inputs
  );

  if (!updatedTransaction) {
    throw new ApiError(404, "Transaction not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedTransaction, "Transaction updated successfully."));
});

// Delete a transaction
const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  if (!transactionId) {
    throw new ApiError(400, "Transaction ID is required.");
  }

  const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

  if (!deletedTransaction) {
    throw new ApiError(404, "Transaction not found.");
  }

  res.status(200).json(new ApiResponse(200, null, "Transaction deleted successfully."));
});

// Get transactions by FinanceID
const getTransactionsByFinanceId = asyncHandler(async (req, res) => {
  const { financeId } = req.params;

  if (!financeId) {
    throw new ApiError(400, "Finance ID is required.");
  }

  const transactions = await Transaction.find({ FinanceID: financeId })
    .sort({ Date: -1 }) // Sort by date in descending order
    .exec();

  if (!transactions || transactions.length === 0) {
    throw new ApiError(404, "No transactions found for the given Finance ID.");
  }

  res.status(200).json(new ApiResponse(200, transactions, `Transactions for Finance ID: ${financeId}`));
});

export {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByFinanceId,
};
