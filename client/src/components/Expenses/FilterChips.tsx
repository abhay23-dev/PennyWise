import { useExpenseStore } from "@/store/expenseStore";
import { X } from "lucide-react";
import { useState } from "react";

export default function FilterChips() {
  const {filters, removeFilter} = useExpenseStore();
  const activeFilters: {type: string, label: string}[] = [];

  if(filters.searchTerm) {
    activeFilters.push({
      type: "search",
      label: `Search: "${filters.searchTerm}"`
    })
  }
  if(filters.startDate || filters.endDate) {
    const start = filters.startDate || "Any";
    const end = filters.endDate || "Any";

    activeFilters.push({
      type: "dateRange",
      label: `Date: ${start} to ${end}`
    });
  }
  if(filters.minAmount || filters.endDate) {
    const min = filters.minAmount || "Any";
    const max = filters.maxAmount || "Any";
    activeFilters.push({
      type: "amountRange",
      label: `Amount: ${min} to ${max}`
    })
  }

  if(activeFilters.length === 0) return ;
  return (
    <div>
      {activeFilters.map((activeFilter) => (
        <div>
          <span>{activeFilter.label}</span>
          <button onClick={() => removeFilter(activeFilter.type)}>
            <X />
          </button>
        </div>
      ))}
    </div>
  );
}
