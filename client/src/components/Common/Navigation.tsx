import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "@tanstack/react-router";

export default function Navigation() {

  const { user, isAuthenticated, logout } = useAuthStore.getState();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate({to: "/login"});
  }

  return (
    <header>
      <nav>
        <Link to="/">PennyWise</Link>
        {
          isAuthenticated ? 
          (
            <div>
              <ul>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/expenses">Expenses</Link>
                </li>
                <li>
                  <Link to="/analytics">Analytics</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>

              <div>
                <span>{user?.name}</span>
                <button onClick={handleLogout}>Logout</button>
              </div>

            </div>
          ) :
          (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link> 
            </div>
          )
        }
      </nav>
    </header>
  );
}
