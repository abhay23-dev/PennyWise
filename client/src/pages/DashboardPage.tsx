import StatsCard from "@/components/Dashboard/StatsCard";
import ExpenseModal from "@/components/Expenses/ExpenseModal";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { useAuthStore } from "@/store/authStore";
import { useExpenseStore } from "@/store/expenseStore";
import { Expense } from "@/types";
import { Calendar, DollarSign, Package, Plus, TrendingUp } from "lucide-react";
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
      <main className="bg-slate-950 p-4 sm:px-8 sm:py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <Package className="size-24 text-gray-700" strokeWidth={1} />

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              No expenses yet
            </h2>

            <p className="text-gray-400">
              Start tracking your spending by adding your first expense
            </p>
          </div>

          <button
            onClick={handleAddExpense}
            className="flex items-center gap-2 px-6 py-3 bg-purple-950 text-gray-100 rounded-sm hover:bg-purple-800 transition font-medium"
          >
            <Plus className="size-5" /> Add Your First Expense
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
      <div>
        <div>
          <h1>Welcome back, {user?.name}</h1>
          <p>Here's your financial overview</p>
        </div>

        <button onClick={handleAddExpense}>
          <Plus />
          Add Expense
        </button>
      </div>

      <div>
        {dashboardStats && (
          <>
            <StatsCard
              icon={DollarSign}
              label="Total Expenses"
              value={`$${dashboardStats.totalExpenses.toFixed(2)}`}
            />
            <StatsCard
              icon={Package}
              label="Number of Expenses"
              value={dashboardStats.expenseCount}
            />
            <StatsCard
              icon={TrendingUp}
              label="Average Expense"
              value={`$${dashboardStats.roundedAverageExpenseAmount.toFixed(2)}`}
            />
            <StatsCard
              icon={Calendar}
              label="This Month"
              value={`$${dashboardStats.currentMonthTotal.toFixed(2)}`}
            />
          </>
        )}
      </div>
    </main>
  );
}
