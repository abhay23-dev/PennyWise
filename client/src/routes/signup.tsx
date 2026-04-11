import SignupPage from "@/pages/SignupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  context: () => (
    {
      title: "Signup - PennyWise"
    }
  )
})

// this will work for /signup route and will render the Signup function