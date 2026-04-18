import { useExpenseStore } from "@/store/expenseStore";
import { Expense, ExpenseCategory } from "@/types";
import { getCategoryConfig } from "@/types/CategoryConfig";
import React, { useState } from "react";

interface ExpenseFormProps {
  onSuccess: () => void;
  expense?: Expense;
}

export default function ExpenseForm({ onSuccess, expense }: ExpenseFormProps) {
  const { createExpense, updateExpense, isLoading, error, clearError } = useExpenseStore();

  const [amount, setAmount] = useState(expense?.amount || 0);
  const [description, setDescription] = useState(expense?.description || "");
  const [category, setCategory] = useState<ExpenseCategory>(
    expense?.category || ExpenseCategory.OTHER,
  );
  //"2026-01-25T12324551564"
  const [date, setDate] = useState(expense?.date.toString().split("T")[0] || new Date().toISOString().split("T")[0]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearError();

    const expenseData = {
      amount,
      description,
      category,
      date,
    };

    if(expense) {
      await updateExpense(expense._id, expenseData);
    }
    else {
      await createExpense(expenseData);
    }

    const { error: currentError } = useExpenseStore.getState();

    if (!currentError) {
      setAmount(0);
      setDescription("");
      setCategory(ExpenseCategory.OTHER);
      setDate(new Date().toISOString().split("T")[0]);

      if (onSuccess) {
        onSuccess();
      }
    }
  }

  return (
    <div className="col-span-4 sm:col-span-3 flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        {/* <h1>Add new expense</h1> */}
        <p className="text-gray-400">Track your spending</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="px-4 py-3 bg-red-900/20 border-red-700 rounded-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-6 border border-purple-950 rounded-sm p-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-300"
            >
              Amount
            </label>
            <input
              type="number"
              value={amount}
              id="amount"
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={isLoading}
              required
              min="0"
              placeholder="49.99"
              className="px-4 py-3 bg-purple-950 rounded-sm text-gray-100 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              value={description}
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              required
              placeholder="Lunch at restaurant"
              className="px-4 py-3 bg-purple-950 rounded-sm text-gray-100 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-300"
            >
              Category
            </label>

            <select
              name="category"
              id="category"
              value={category}
              disabled={isLoading}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="px-4 py-3 bg-purple-950 rounded-sm text-gray-100 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
            >
              {Object.values(ExpenseCategory).map((cat) => {
                const config = getCategoryConfig(cat);
                return (
                  <option value={cat} key={cat}>
                    {config.emoji} {cat}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-300">
              Date
            </label>
            <input
              type="date"
              value={date}
              id="date"
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={isLoading}
              max={new Date().toISOString().split("T")[0]}
              className="px-4 py-3 bg-purple-950 rounded-sm text-gray-100 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-purple-950 text-gray-100 rounded-sm border border-purple-950 hover:border-purple-950 hover:bg-transparent transition font-medium"
        >
          {isLoading ? "Adding ..." : expense ? "Save Changes" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
