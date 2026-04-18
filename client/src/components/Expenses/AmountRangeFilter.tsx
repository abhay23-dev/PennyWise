import { useExpenseStore } from "@/store/expenseStore";

export default function DateRangeFilter() {
  const { filters, setAmountRange } = useExpenseStore();

  function handleMinAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMin = Number(e.target.value) || null;

    setAmountRange(newMin, filters.maxAmount ?? null);
  }

  function handleMaxAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMax = Number(e.target.value) || null;

    setAmountRange(filters.minAmount ?? null, newMax);
  }

  return (
    <div>
      <div>
        <label htmlFor="min-amount">Min Amount ($)</label>
        <input
          type="number"
          id="min-amount"
          onChange={handleMinAmountChange}
          value={filters.minAmount || ""}
          min="0"
          step="0.01"
          placeholder="0.00"
        />
      </div>
      <div>
        <label htmlFor="max-amount">Max Amount ($)</label>
        <input
          type="number"
          id="max-amount"
          onChange={handleMaxAmountChange}
          value={filters.maxAmount || ""}
          step="0.01"
          placeholder="No limit"
          min={filters.minAmount || "0"}
        />
      </div>
    </div>
  );
}
