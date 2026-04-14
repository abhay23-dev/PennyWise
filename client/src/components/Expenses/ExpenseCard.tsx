import { Expense } from "@/types";
import { getCategoryConfig } from "@/types/CategoryConfig";
import { Calendar, Pencil, Trash2 } from "lucide-react";

interface ExpenseCardProps {
  expense: Expense
}

export default function ExpenseCard({expense}: ExpenseCardProps) {
  const categoryInfo = getCategoryConfig(expense.category)
  
  function formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  function formatAmount(amount: number) {
    return `$${amount.toFixed(2)}`
  }

  return (
    <div>
      <div>
        <div>
          <span>{categoryInfo.emoji}</span>
          <span>{categoryInfo.label}</span>
        </div>
        <span>{formatAmount(expense.amount)}</span>
      </div>

      <p>{expense.description}</p>

      <div>
        <div>
          <Calendar className="size-5" />
          <span>{formatDate(expense.date)}</span>
        </div>

        <div>
          <button title="Edit Expense"><Pencil className="size-4" /></button>
          <button title="Delete Expense"><Trash2 className="size-4" /></button>
        </div>
      </div>
    </div>
  );
}