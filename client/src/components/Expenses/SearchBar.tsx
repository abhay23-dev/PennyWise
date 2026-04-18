import { useExpenseStore } from "@/store/expenseStore";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const { filters, setSearchTerm } = useExpenseStore();
  const [inputValue, setInputValue] = useState(filters.searchTerm || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  return (
    <div>
      <label htmlFor="search">Search Expenses</label>
      <div>
        <Search className="size-3" />
        <input
          type="text"
          id="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search by description, category, or amount..."
        />
      </div>
    </div>
  );
}
