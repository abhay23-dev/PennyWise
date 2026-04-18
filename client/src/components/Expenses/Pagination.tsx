import { useExpenseStore } from "@/store/expenseStore";
import { Loader2 } from "lucide-react";

interface PaginationProps {
  displayedCount: number;
  totalCount: number;
  hasMore: Boolean;
}

export default function Pagination({ displayedCount, totalCount, hasMore }: PaginationProps) {
  const {loadMoreExpenses, isLoading} = useExpenseStore();
  return (
    <div>
      <p>
        {
          hasMore ? `Showing 1-${displayedCount} of ${totalCount}` :
          `Showing all ${totalCount} expense${totalCount === 1 ? "" : "s"}`
        }
      </p>

      {
        hasMore && (
          <button onClick={loadMoreExpenses}>
            {isLoading ? <>
            <Loader2 />
            <span>Loading ...</span>
            </> :  "Load More"}
          </button>
        )
      }
    </div>
  );
}