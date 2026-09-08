import { useAuth } from "../components/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>DevHub</h1>

      <h2>Dashboard</h2>

      <p>Welcome, {user?.name}!</p>
      <p>{user?.email}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;