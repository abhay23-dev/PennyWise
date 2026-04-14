import { X } from "lucide-react";
import ExpenseForm from "./ExpenseForm";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseModal({isOpen, onClose}: ExpenseModalProps) {

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if(!isOpen) return null;
    
    if(e.target === e.currentTarget){
      onClose();
    }
  }

  return (
    <div onClick={handleBackdropClick}
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div>
        <div>
          <h2>Add new expense</h2>
          <button><X className="size-5" /></button>
        </div>
        <ExpenseForm onSuccess={onClose} />
      </div>
    </div>
  )
}