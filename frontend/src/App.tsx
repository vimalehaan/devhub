import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./components/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
}

export default App;