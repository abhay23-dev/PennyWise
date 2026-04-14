
import ExpenseModal from "@/components/Expenses/ExpenseModal";
import { useExpenseStore } from "@/store/expenseStore";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ExpensesPage() {

  const { error, isLoading } = useExpenseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <main>
      <div>
        <div>
          <h1>Expenses</h1>
          <p>Manage and track your expenses</p>
        </div>
        <button>
          <Plus className="size-5" />
          Add Expense
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center py-24">
          <p className="text-gray-400 text-lg">Loading expenses ...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex justify-center items-center py-24">
          <p className="px-4 py-3 bg-red-900/20 border-red-700 rounded-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
