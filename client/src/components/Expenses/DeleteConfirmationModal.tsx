import { Expense } from "@/types";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  expense: Expense;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function({ isOpen, expense, onConfirm, onCancel, isDeleting}: DeleteConfirmationModalProps) {


  if(!expense || !isOpen) return null;

  return (
      <div>
      <div>
        <AlertTriangle className="size-6" />
        <h2>Delete Expense</h2>
      </div>
      <div>
        <p>Are you sure you want to delete this expense? This action cannot be undone.</p>

        <div>
          <div>
            <span>Amount</span>
            <span>{expense.amount}</span>
          </div>

          <div>
            <span>Description:</span>
            <span>{expense.description}</span>
          </div>

          <div>
            <span>Category</span>
            <span>{expense.category}</span>
          </div>
        </div>
      </div>

      <div>
        <button onClick={onCancel} disabled={isDeleting}>
          Cancel
        </button>
        <button onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Deleting ..." : "Delete"}
        </button>
      </div>
    </div>
  );
}