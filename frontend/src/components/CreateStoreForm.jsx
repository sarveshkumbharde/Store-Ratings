import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CreateStoreForm() {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: ""
  });

  useEffect(() => {
    api
    .get("/admin/users", {
      params: { role: "STORE_OWNER" },
    })
    .then(res => setOwners(res.data))
    .catch(err => console.error(err));
  }, []);

  const submit = async e => {
    e.preventDefault();
    await api.post("/admin/add-store", form);
    alert("Store created");
  };

  return (
    <form onSubmit={submit} className="border p-4 rounded space-y-2">
      <h2 className="font-semibold">Create Store</h2>

      <input className="border p-2 w-full" placeholder="Store Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input className="border p-2 w-full" placeholder="Store Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input className="border p-2 w-full" placeholder="Address"
        onChange={e => setForm({ ...form, address: e.target.value })} />

      <select className="border p-2 w-full"
        onChange={e => setForm({ ...form, ownerId: e.target.value })}>
        <option value="">Select Owner</option>
        {owners.map(o => (
          <option key={o.id} value={o.id}>{o.name}</option>
        ))}
      </select>

      <button className="bg-black text-white px-4 py-1">Create Store</button>
    </form>
  );
}
