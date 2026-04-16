import { useExpenseStore } from "@/store/expenseStore";
import { ExpenseCategory } from "@/types";
import { getCategoryConfig } from "@/types/CategoryConfig";
import { Filter, X } from "lucide-react";
import React from "react";


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
  ].filter(Boolean).length;

  return (
    <div>
      <div>
        <Filter className="size-5" />

        <h3>Filters</h3>

        {
          activeFiltersCount > 0 && (
            <span>{activeFiltersCount}</span>
          )
        }
        {
          activeFiltersCount > 0 && (
            <button onClick={clearFilters}>
              <X className="size-4" />
              Clear Filteres
            </button>
          ) 
        }

        <div>
          <div>
            <label htmlFor="categoty-filter">Category</label>
            <select name="category-filter" id="category-filter" onChange={handleCategoryChange} value={filters.category || "all"}>
              <option value="all">All Categories</option>
              {
                Object.values(ExpenseCategory).map(category => {
                  const config = getCategoryConfig(category);

                  return (
                    <option value={category} key={category}>
                      {config.emoji} {config.label}
                    </option>
                  )
                })
              }
            </select>
          </div>
          <div>
            <label htmlFor="sort-filter">Sort by</label>
            <select name="sort-filter" id="sort-filter" onChange={handleSortChange} value={filters.sort || "-date"}>
              <option value="-date">Newest First</option>
              <option value="date">Oldest First</option>
              <option value="-amount">High to Low</option>
              <option value="amount">Low to High</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}