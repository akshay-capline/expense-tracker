import express from "express";
import { addExpense, deleteExpense, getAllExpenses, updateExpense } from "../controller/expense.controller.js";

const router = express.Router();

router.post("/add", addExpense);
router.get("/:id", getAllExpenses);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);

export default router;