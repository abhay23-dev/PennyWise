import { ExpenseState } from "@/types/expense.types";
import { create } from "zustand";
import { createExpense as createExpenseService } from "@/services/expenseService";
import { AxiosError } from "axios";

interface ExpenseStore extends ExpenseState {
  createExpense: (data: {
    amount: number,
    description: string,
    category: string,
    date: string
  }) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStore>(set => ({
  expenses: [],
  isLoading: false,
  error: null,
  totalCount: 0,
  currentExpense: null,
  filters: {category: "all", sort: "-date"},

  createExpense: async (data: {
    amount: number,
    description: string,
    category: string,
    date: string
  }) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await createExpenseService(data);

      if(response.data) {
        set((state) => ({
          expenses: [...state.expenses, response.data!],
          isLoading: false,
          error: null,
        }))
      }
    } catch(error) {
      const err = error as AxiosError<{error: string }>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
      })
    }
  }
}))