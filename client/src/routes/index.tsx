//there are two parts which are same for  every route i guess..--> These are the configuration part and the flexible part which we can do...for configuration part we have to follow the documentation ..

import HomePage from "@/pages/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
  context: () => (
    {
      title: "Home - PennyWise"
    }
  )
})

// so in this we are doing basically we are just creating one path that means our index.js is child of main parent ...and when we will call this route we will render the component of HomePage and setting a title