import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function SignupForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section>
      <div>
        <h1>Create Account</h1>
        <p>Sign up to start tracking your expenses</p>
      </div>

      <form onSubmit={}>
        {
          error && (
            <div>
              {error}
            </div>
          )
        }

        <div>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            required 
            disabled={isLoading} 
            placeholder="John Doe" 
            onChange={(e) => setName(e.target.value)}
            value={name}          
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            id="email"
            required
            disabled={isLoading}
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="text"
            id="password"
            required
            disabled={isLoading}
            placeholder="john@example.com"
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up ..." : "Sign Up"}
        </button>
      </form>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </section>
  );
}