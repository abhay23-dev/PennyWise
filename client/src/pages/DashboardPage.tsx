import ExpenseModal from "@/components/Expenses/ExpenseModal";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { useAuthStore } from "@/store/authStore";
import { useExpenseStore } from "@/store/expenseStore";
import { Expense } from "@/types";
import { Package, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const {
    dashboardStats,
    categoryData,
    trends,
    isLoading: analyticsLoading,
    error,
    getCategoryStats,
    getDashboardStats,
    getTrends,
  } = useAnalyticsStore();

  const { user } = useAuthStore();

  const {
    expenses,
    isLoading: expenseLoading,
    setDateRange,
    getAllExpenses,
  } = useExpenseStore();

  useEffect(() => {
    getAllExpenses();
  }, [getAllExpenses]);

  useEffect(() => {
    if (expenses.length > 0) {
      (getDashboardStats(), getCategoryStats(), getTrends());
    }
  }, [getDashboardStats, getCategoryStats, getTrends, expenses.length]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(
    undefined,
  );

  function handleAddExpense() {
    setIsModalOpen(true);
    setEditingExpense(undefined);
  }
  function handleCloseModal() {
    setEditingExpense(undefined);
    setIsModalOpen(false);
  }
  if (!analyticsLoading && expenses.length === 0) {
    return (
      <main>
        <div>
          <Package />

          <div>
            <h2>No expenses yet</h2>

            <p>Start tracking your spending by adding your first expense</p>
          </div>

          <button onClick={handleAddExpense}>
            <Plus /> Add Your First Expense
          </button>
        </div>

        <ExpenseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          expense={editingExpense}
        />
      </main>
    );
  }

  return (
    <main>
      <h1>Dashboard Page</h1>
    </main>
  );
}
