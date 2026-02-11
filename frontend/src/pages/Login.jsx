import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { isValidEmail } from "../utils/Validator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    const res = await api.post("/user/login", { email, password });
    setUser(res.data.user);

    if (res.data.user.role === "ADMIN") navigate("/admin");
    if (res.data.user.role === "USER") navigate("/user");
    if (res.data.user.role === "STORE_OWNER") navigate("/owner");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
        <input className="border p-2 w-full" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-black text-white w-full py-2">Login</button>
      </form>
      <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline font-medium">
            Sign up
          </Link>
        </p>
    </div>
  );
}
