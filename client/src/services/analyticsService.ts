import { ApiResponse } from "@/types"
import { CategoryTotal, DashboardStats, MonthlyTotal, SpendingTrend } from "@/types/analytics.types"
import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get<ApiResponse<DashboardStats>>("/analytics/dashboard");

  return response.data;
}

export const getMonthlyTotals = async () => {
  const response = await api.get<ApiResponse<MonthlyTotal[]>>("/analytics/monthly");
  return response.data;
}

export const getCategoryStats = async () => {
  const response = await api.get<ApiResponse<CategoryTotal[]>>("/analytics/category");
  return response.data;
}

export const getTrends = async () => {
  const response = await api.get<ApiResponse<SpendingTrend[]>>("/analytics/trends");
  return response.data;
}

export const getPeriodStats = async (days: number) => {
  const response = await api.get<ApiResponse<PeriodStats>>(`/analytics/period?days=${days}`);
  return response.data;
}
