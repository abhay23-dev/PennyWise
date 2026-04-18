import { useExpenseStore } from "@/store/expenseStore";
import { Package } from "lucide-react";
import ExpenseCard from "./ExpenseCard";
import { Expense } from "@/types";
import { useMemo } from "react";

interface ExpenseListProps {
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export default function ExpenseList({ onEdit, onDelete}: ExpenseListProps) {
  const { expenses, filters } = useExpenseStore();

  const filteredExpenses = useMemo(() => {

    let result = [...expenses];

    if(filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(expense => {
        const descriptionMatch = expense.description.toLowerCase().includes(searchLower)
        const categoryMatch = expense.category.toLowerCase().includes(searchLower)
        const amountMatch = expense.amount.toString().toLowerCase().includes(searchLower);

        return descriptionMatch || categoryMatch || amountMatch;
      })

    }

    if(filters.startDate) {
      result = result.filter(expense => {
        const expenseDate = new Date(expense.date);

        const startDate = new Date(filters.startDate!);
        return expenseDate >= startDate;
      })
    }

    if(filters.endDate) {
      result = result.filter(expense => {
        const expenseDate = new Date(expense.date);

        const endDate = new Date(filters.endDate!);
        return expenseDate <= endDate;
      })
    }

    if(filters.minAmount) {
      result = result.filter((expense) => expense.amount >= filters.minAmount!);
    }
    if(filters.maxAmount) {
      result = result.filter((expense) => expense.amount >= filters.maxAmount!);
    }

    return result;
  }, [expenses, filters])

  function getEmptyMessage() {
    if (filters.category && filters.category !== "all") {
      return `No ${filters.category} expenses found`;
    }
    return "No expenses found";
  }

  function getEmptyHint() {
    if (filters.category && filters.category !== "all") {
      return "Try changing the category filter or add a new expense";
    }

    return "Start by adding your first expense";
  }

  return (
    <section className="col-span-4 flex flex-col gap-6">
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Package className="size-24 text-gray-700" strokeWidth={1} />

          <div className="text-center">
            <p className="text-xl text-gray-400 font-medium">
              {getEmptyMessage()}
            </p>
            <p className="text-gray-500 mt-1">{getEmptyHint()}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-100">
              {filters.category && filters.category !== "all"
                ? `${filters.category?.charAt(0).toUpperCase + filters.category?.slice(1)} Expenses`
                : "Your Expenses"}
            </h2>
            <span className="text-sm text-gray-500">
              {expenses.length} expense{expenses.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {expenses.map((expense) => (
              <ExpenseCard expense={expense} key={expense._id} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
