import { AuthResponse, LoginRequest, SignupRequest } from "@/types/auth.types";
import api from "./api";
import { ApiResponse, User } from "@/types";

export const signup = async (data: SignupRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/signup", data);

  return response.data;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);

  return response.data;
}

export const getProfile = async () => {
  const response = await api.get<ApiResponse<User>>("/profile");
  return response.data;
}

export const updateProfile = async (name?:string, email?:string, password?:string) => {
  const response = await api.get<ApiResponse<User>>("/profile");
  return response.data;
}






//job of this file is to separate api call from the components

//this will contain the function to make the call to backend --auth using axios

//very important work flow or the working of zustand--> a zustand action will be triggered once we interact with ui of the frontend...
//that action will call this function if that function is about signup

//then this function sends an http request with the method post to the endpoint "/auth/signup" then backend processes that and will send a response

//this function will return the response to the zustand action and zustand action is going to send the response to the frontend and it rerender the ui.