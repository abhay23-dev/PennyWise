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
    <div>
      <div>
        <label htmlFor="start-date">Start Date</label>
        <input
          type="date"
          id="start-date"
          onChange={handleStartDateChange}
          value={filters.startDate || ""}
          max={filters.endDate || undefined}
          
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date</label>
        <input
          type="date"
          id="end-date"
          onChange={handleEndDateChange}
          value={filters.endDate || ""}
          min={filters.startDate || undefined}
        />
      </div>
    </div>
  );
}
