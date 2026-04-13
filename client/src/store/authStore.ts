import { TOKEN_KEY } from "@/services/api";
import { AuthState } from "@/types/auth.types";
import { create } from "zustand";
import { signup as signupService, login as loginService, getProfile as getProfileService } from "@/services/authService";
import { AxiosError } from "axios";

interface AuthStore extends AuthState {
  signup: (name:string, email: string, password: string) => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  getProfile: () => Promise<void>,
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY) || null,
  isLoading: false,
  error: null,
  isAuthenticated: false, 

  signup: async (name:string, email: string, password: string) => {
    set({isLoading: true, error: null});

    try{
      const response = await signupService({name, email, password});

      if(response.data) {
        const { user } = response.data;

        set({
          user,
          // isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch(error: unknown) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  login: async (email: string, password: string) => {
    set({isLoading: true, error: null});

    try{
      const response = await loginService({email, password});

      if(response.data) {
        const { user, token } = response.data;

        localStorage.setItem(TOKEN_KEY, token);

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch(error: unknown) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  getProfile: async () => {
    set({
      isLoading:true
    });

    try {
      const response = await getProfileService();
      if(response.data) {
        set({
          user: response.data,
          isLoading:false,
          error: null
        })
      }
    } catch(error) {
      const err = error as AxiosError<{error: string}>;

      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    })
  }
}))


//we named it as usexxxx so it will act as hook ...to find the type of data stored in AuthStore we are going to call this hook.

//the authstore