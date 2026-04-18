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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="min-amount" className="text-sm font-medium text-gray-400">Min Amount ($)</label>
        <input
          type="number"
          id="min-amount"
          onChange={handleMinAmountChange}
          value={filters.minAmount || ""}
          min="0"
          step="0.01"
          placeholder="0.00"
          className="px-4 py-2.5 bg-purple-950 rounded-sm text-gray-100 border-none outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="max-amount" className="text-sm font-medium text-gray-400">Max Amount ($)</label>
        <input
          type="number"
          id="max-amount"
          onChange={handleMaxAmountChange}
          value={filters.maxAmount || ""}
          step="0.01"
          placeholder="No limit"
          min={filters.minAmount || "0"}
          className="px-4 py-2.5 bg-purple-950 rounded-sm text-gray-100 border-none outline-none"
        />
      </div>
    </div>
  );
}
