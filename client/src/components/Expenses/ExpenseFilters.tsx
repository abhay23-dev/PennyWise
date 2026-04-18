import { useExpenseStore } from "@/store/expenseStore";
import { ExpenseCategory } from "@/types";
import { getCategoryConfig } from "@/types/CategoryConfig";
import { Filter, X } from "lucide-react";
import React from "react";
import DateRangeFilter from "./DateRangeFilter";
import AmountRangeFilter from "./AmountRangeFilter";
import FilterChips from "./FilterChips";
import SearchBar from "./SearchBar";

export default function ExpenseFilters() {
  const { filters, setCategory, setSort, clearFilters } = useExpenseStore();

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value);
  }

  const activeFiltersCount = [
    filters.category !== "all",
    filters.sort !== "-date",
    !!filters.searchTerm,
    !!filters.startDate || !!filters.endDate,
    !!filters.minAmount || !! filters.maxAmount,
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4 p-6 border border-purple-950 rounded-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-300">
          <Filter className="size-5" />
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-purple-800 text-purple-200 rounded-full text-xs font-medium">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-gray-300 rounded-sm hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            <X className="size-4" />
            Clear Filteres
          </button>
        )}
      </div>

      <SearchBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="categoty-filter"
            className="text-sm font-medium text-gray-400"
          >
            Category
          </label>
          <select
            name="category-filter"
            id="category-filter"
            onChange={handleCategoryChange}
            value={filters.category || "all"}
            className="px-4 py-2.5 bg-purple-950 rounded-sm text-gray-100 border-none outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {Object.values(ExpenseCategory).map((category) => {
              const config = getCategoryConfig(category);

              return (
                <option value={category} key={category}>
                  {config.emoji} {config.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="sort-filter"
            className="text-sm font-medium text-gray-400"
          >
            Sort by
          </label>
          <select
            name="sort-filter"
            id="sort-filter"
            onChange={handleSortChange}
            value={filters.sort || "-date"}
            className="px-4 py-2.5 bg-purple-950 rounded-sm text-gray-100 border-none outline-none cursor-pointer"
          >
            <option value="-date">Date (Newest First)</option>
            <option value="date">Date (Oldest First)</option>
            <option value="-amount">Amount (High to Low)</option>
            <option value="amount">Amount (Low to High)</option>
          </select>
        </div>
      </div>

      <DateRangeFilter />
      <AmountRangeFilter />
      <FilterChips />
    </div>
  );
}
