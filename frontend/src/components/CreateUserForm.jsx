import { useState } from "react";
import api from "../api/axios";

export default function CreateUserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
  }); 

  const submit = async e => {
    e.preventDefault();
    await api.post("/admin/add-user", form);
    alert("User created");
    setForm({ name: "", email: "", password: "", address: "", role: "USER" });
  };

  return (
    <form onSubmit={submit} className="border p-4 rounded space-y-2">
      <h2 className="font-semibold">Create User</h2>

      <input className="border p-2 w-full" placeholder="Name"
        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

      <input className="border p-2 w-full" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

      <input className="border p-2 w-full" type="password" placeholder="Password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />

      <input className="border p-2 w-full" placeholder="Address"
        value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />

      <select className="border p-2 w-full"
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
        <option value="STORE_OWNER">STORE OWNER</option>
      </select>

      <button className="bg-black text-white px-4 py-1">Create</button>
    </form>
  );
}
