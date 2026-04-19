import DateRangeSelector from "@/components/Dashboard/DateRangeSelector";
import StatsCard from "@/components/Dashboard/StatsCard";
import ExpenseModal from "@/components/Expenses/ExpenseModal";
import { getPeriodStats } from "@/services/analyticsService";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { useAuthStore } from "@/store/authStore";
import { useExpenseStore } from "@/store/expenseStore";
import { Expense } from "@/types";
import { useNavigate } from "@tanstack/react-router";
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
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState("180");

  const navigate = useNavigate();

  function handleAddExpense() {
    setIsModalOpen(true);
    setEditingExpense(undefined);
  }
  function handleCloseModal() {
    setEditingExpense(undefined);
    setIsModalOpen(false);
  }

  function handleMonthClick() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const startDate = `${year}-${month}-01`;
    const lastDay = new Date(year, parseInt(month), 0).getDate();
    const endDate = `${year}-${month}-${lastDay.toString().padStart(2, "0")}`;

    setDateRange(startDate, endDate);
    navigate({to: "/expenses"})
  }

  function handleDateRangeChange(range: string) {
    setSelectedRange(range);

    if(range === "all") {
      getCategoryStats();
    } else {
      const days = parseFloat(range);
      getPeriodStats(days);
    }
  }
  const isLoading = analyticsLoading || expenseLoading;
  if (!isLoading && expenses.length === 0) {
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

  if (!isLoading && !dashboardStats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <main className="bg-slate-950 px-4 py-8 sm:px-8 sm:py-12">
      <div className="border-b border-purple-950 pb-4 mb-8 flex flex-col gap-8 justify-start sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-4">Welcome back, {user?.name}</h1>
          <p className="text-gray-400 mt-1">Here's your financial overview</p>
        </div>

        <button onClick={handleAddExpense} className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-950 text-gray-100 rounded-sm hover:bg-purple-800 transition font-medium">
          <Plus className="size-5" />
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              onClick={handleMonthClick}
            />
          </>
        )}
      </div>

      <div>
        <DateRangeSelector selected={selectedRange} onChange={handleDateRangeChange} />
      </div>
    </main>
  );
}
