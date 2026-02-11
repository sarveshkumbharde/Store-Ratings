import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import OwnerStoreInfo from "../components/OwnerStoreInfo";
import OwnerStats from "../components/OwnerStats";
import RatingsTable from "../components/RatingsTable";

export default function OwnerDashboard() {
  const [store, setStore] = useState(null);
  const [stats, setStats] = useState(null);
  const [ratings, setRatings] = useState([]);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get("/owner/store"),
      api.get("/owner/stats"),
      api.get("/owner/ratings"),
    ])
      .then(([storeRes, statsRes, ratingsRes]) => {
        setStore(storeRes.data);
        setStats(statsRes.data);
        setRatings(ratingsRes.data); 
      })
      .catch(() => alert("Failed to load owner data"));
  }, []);

  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Logout
        </button>
        <Link to="/update-password" className="text-sm underline">
          Change Password
        </Link>
      </div>

      {store && <OwnerStoreInfo store={store} />}
      {stats && <OwnerStats stats={stats} />}
      <RatingsTable ratings={ratings} />
    </div>
  );
}
