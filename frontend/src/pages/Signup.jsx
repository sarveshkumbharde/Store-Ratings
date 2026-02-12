import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/signup", form);
      setUser(res.data.user);
      navigate("/user");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white border rounded p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <input
          name="name"
          placeholder="Full Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          className="border p-2 w-full"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white w-full py-2 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
