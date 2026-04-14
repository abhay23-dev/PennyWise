import { useExpenseStore } from "@/store/expenseStore";
import { Package } from "lucide-react";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList() {
  const { expenses } = useExpenseStore();
  return (
    <section className="col-span-4 flex flex-col gap-6">
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Package className="size-24 text-gray-700" strokeWidth={1} />

          <div className="text-center">
            <p className="text-xl text-gray-400 font-medium">No expenses found</p>
            <p className="text-gray-500 mt-1">Start by adding your first expense</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-100">Your Expenses</h2>
            <span className="text-sm text-gray-500">{expenses.length} expense{expenses.length === 1 ? "" : "s"}</span>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {
              expenses.map(expense => (
                <ExpenseCard expense={expense} key={expense._id} />
              ))
            }
          </div>
        </>
      )}
    </section>
  );
}
