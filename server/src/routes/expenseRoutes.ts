import { Expense, ExpenseCategory } from "../types";
import { Router } from "express";
import type { Request, Response } from "express";
import { createExpense, deleteExpense, getExpenseById, getExpenses, updateExpense } from "../controllers/expenseControllers";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router()

router.get("/", requireAuth, getExpenses);
router.get("/:id",requireAuth, getExpenseById);
router.post("/",requireAuth, createExpense);
router.put("/:id",requireAuth, updateExpense);
router.delete("/:id",requireAuth, deleteExpense);

export default router;