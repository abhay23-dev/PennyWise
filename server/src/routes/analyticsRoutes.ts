import { Router } from "express";
import { getDashboardStats, getExpensesByCategory, getMonthlyTotals, getPeriodStats, getSpendingTrends } from "../controllers/analyticsControllers";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/category", requireAuth, getExpensesByCategory);
router.get("/monthly", requireAuth, getMonthlyTotals);
router.get("/dashboard", requireAuth, getDashboardStats);
router.get("/trends", requireAuth, getSpendingTrends);
router.get("/period", requireAuth, getPeriodStats);

export default router;