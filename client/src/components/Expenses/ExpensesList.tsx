import { useExpenseStore } from "@/store/expenseStore";
import { Package } from "lucide-react";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList() {
  const { expenses } = useExpenseStore();
  return (
    <section>
      {expenses.length === 0 ? (
        <div>
          <Package className="size-24" />

          <div>
            <p>No expenses found</p>
            <p>Start by adding your first expense</p>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h2>Your Expenses</h2>
            <span>{expenses.length} expense{expenses.length === 1 ? "" : "s"}</span>
          </div>

          <div>
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
