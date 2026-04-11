import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const { matches } = useRouterState();

  const activeMatch = matches[matches.length - 1];

  const { title = "PennyWise" } = activeMatch.context as {title: string};

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Outlet />
    </>
  );
}

//Initial basic logic is that this <Outler> we will as replacement or something like holder ..for example is we go to login page so the html or jsx of login page will get loaded or rendered on the outlet place....
//and above it is the code for title change so what will happen every time we go to new page its title will get store in matches end.. so we are just changing document title with the title stored in last index of matches... and using useEffect we are changing it each time our title changes