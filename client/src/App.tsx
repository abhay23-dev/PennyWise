import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";
import api from "./services/api";


const router = createRouter({
  routeTree,
  defaultPreload: "intent"
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App(){
  useEffect(() => {
    api.get("/expense").then(
      (response) => {
        console.log("Success:", response);
      },
      (error) => {
        console.log("Error:", error);
      }
    ).then
  }, []);

  return <RouterProvider router={router} />
}