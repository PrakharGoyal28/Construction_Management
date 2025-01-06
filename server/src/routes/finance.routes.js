import express from "express";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByFinanceId,
} from "../controllers/transaction.controller.js";

const router = express.Router();

// Create a new transaction
router.post("/create", createTransaction);

// Update a transaction by ID
router.put("/update/:transactionId", updateTransaction);

// Delete a transaction by ID
router.delete("/delete/:transactionId", deleteTransaction);

// Get all transactions by FinanceID
router.get("/finance/:financeId", getTransactionsByFinanceId);

export default router;
