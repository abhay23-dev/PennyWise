import { useExpenseStore } from "@/store/expenseStore";

export default function DateRangeFilter() {
  const { filters, setDateRange } = useExpenseStore();

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newStart = e.target.value || null;

    setDateRange(newStart, filters.endDate ?? null);
  }

  function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newEnd = e.target.value || null;

    setDateRange(filters.startDate ?? null, newEnd);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="start-date" className="text-sm font-medium text-gray-400">Start Date</label>
        <input
          type="date"
          id="start-date"
          onChange={handleStartDateChange}
          value={filters.startDate || ""}
          max={filters.endDate || undefined}
          className="px-4 py-2.5 bg-purple-950 rounded-sm text-gray-100 border-none outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="end-date" className="text-sm font-medium text-gray-400">End Date</label>
        <input
          type="date"
          id="end-date"
          onChange={handleEndDateChange}
          value={filters.endDate || ""}
          min={filters.startDate || undefined}
          className="px-4 py-2.5 bg-purple-950 rounded-sm text-gray-100 border-none outline-none"
        />
      </div>
    </div>
  );
}
