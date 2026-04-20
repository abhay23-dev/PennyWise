import { AnalyticsState } from "@/types/analytics.types";
import { create } from "zustand";
import { getDashboardStats as getDashboardStatsService, getMonthlyTotals as getMonthlyTotalsService, getCategoryStats as getCategoryStatsService, getTrends as getTrendsService, getPeriodStats as getPeriodStatsService } from "@/services/analyticsService";
import { AxiosError } from "axios";

interface AnalyticsStore extends AnalyticsState {
  getDashboardStats: () => Promise<void>;
  getMonthlyTotals: () => Promise<void>;
  getCategoryStats: () => Promise<void>;
  getTrends: () => Promise<void>;
  getPeriodStats: (days: number) => Promise<void>
  clearError: () => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  categoryData: [],
  monthlyData: [],
  dashboardStats: null,
  trends: [],
  periodData: [],

  isLoading: false,
  error: null,

  getDashboardStats: async () => {
    set({
      isLoading: true,
      error: null,
    })

    try {
      const response = await getDashboardStatsService();
      if(response.data) {
        set({
          dashboardStats: response.data,
          isLoading: false,
          error: null
        });
      }
    } catch(error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false
      })
    }
  },
  getCategoryStats: async () => {
    set({
      isLoading: true,
      error: null,
    })

    try {
      const response = await getCategoryStatsService();
      if(response.data) {
        set({
          categoryData: response.data,
          isLoading: false,
          error: null
        });
      }
    } catch(error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false
      })
    }
  },
  getMonthlyTotals: async () => {
    set({
      isLoading: true,
      error: null,
    })

    try {
      const response = await getMonthlyTotalsService();
      if(response.data) {
        set({
          monthlyData: response.data,
          isLoading: false,
          error: null
        });
      }
    } catch(error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false
      })
    }
  },
  getTrends: async () => {
    set({
      isLoading: true,
      error: null,
    })

    try {
      const response = await getTrendsService();
      if(response.data) {
        set({
          trends: response.data,
          isLoading: false,
          error: null
        });
      }
    } catch(error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false
      })
    }
  },
  getPeriodStats: async (days: number) => {
    set({
      isLoading: true,
      error: null,
    })

    try {
      const response = await getPeriodStatsService(days);
      if(response.data) {
        set({
          periodData: response.data,
          isLoading: false,
          error: null
        });
      }
    } catch(error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false
      })
    }
  },
  clearError: () => {
    set({error: null});
  }
}))