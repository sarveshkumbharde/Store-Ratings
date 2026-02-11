import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

import AdminStats from "../components/AdminStats";
import CreateUserForm from "../components/CreateUserForm";
import CreateStoreForm from "../components/CreateStoreForm";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const fetchStats = async () => {
    const res = await api.get("/admin/dashboard");
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
    navigate("/login");
  }; 

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {stats && <AdminStats stats={stats} />}

      <CreateUserForm />
      <CreateStoreForm />

      <UserTable />
      <StoreTable />
    </div>
  );
}
