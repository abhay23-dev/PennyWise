import SignupForm from "@/components/Auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="bg-slate-950 px-4 py-8 sm:px-8 sm:py-12">
      <SignupForm />
    </main>
  )
}

//pattern for every page--> that means overall approach to the flow of working

//we are going to make service first and then we will hook that up with zustand store