import { useEffect, useState } from "react";
import api from "../api/axios";
import StoreCard from "../components/StoreCard";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/stores");
      setStores(res.data);
    } catch {
      alert("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
    navigate("/login");
  };

  if (loading) return <div className="p-6">Loading stores...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stores</h1>
        <button
          onClick={logout}
          className="text-sm bg-black text-white px-4 py-1 rounded"
        >
          Logout
        </button>
        <Link to="/update-password" className="text-sm underline">
          Change Password
        </Link>
      </div>

      <div className="grid gap-4">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onRatingUpdate={fetchStores}
          />
        ))}
      </div>
    </div>
  );
}
