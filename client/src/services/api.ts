//we will use axios to talk to the api of the backend so for that we will make axios request on every page so what we want is to make something central where we will communicate to the api of backend using axios and whenever we need to use axios we will refer it from here.

//configuration
import axios from "axios";

const TOKEN_KEY = "abhayPalIsUsingForPennywiseToken"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "Application/json",
  },
});

//intercepting request--> it means we are checking that when we are sending request we are authenticated or not

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

//intercepting response --> if some error will come from backend this interceptor will show all the errors globally ..and we will create one placeholder to show these errors.

//401 --> it means unauthorized ..it means jwt token or token is invalid or expired or there is no token to begin with

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    if(error.response.status === 401){
      localStorage.removeItem(TOKEN_KEY);

      if(!window.location.pathname.includes("/login") && !window.location.pathname.includes("/singup")){
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
export { TOKEN_KEY };