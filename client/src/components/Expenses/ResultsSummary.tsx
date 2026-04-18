import { Expense } from "@/types"
interface ResultsSummaryProps{
  expenses: Expense[]
}

export default function ResultsSummary({expenses}: ResultsSummaryProps) {
  const numberOfExpenses = expenses.length;
  const totalAmountOfExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const avgAmountOfExpenses = numberOfExpenses > 0 ? totalAmountOfExpenses / numberOfExpenses : 0;

  return (
    <div>
      <div>
        <span>Total Expenses</span>
        <span>{numberOfExpenses} {numberOfExpenses === 1 ? "expense" : "expenses"}</span>
      </div>

      <div>
        <span>Total Amount</span>
        <span>${totalAmountOfExpenses.toFixed(2)}</span>
      </div>

      <div>
        <span>Average Amount</span>
        <span>${avgAmountOfExpenses.toFixed(2)}</span>
      </div>
    </div>
  )
}