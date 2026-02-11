import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StoreTable() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/admin/stores").then(res => setStores(res.data));
  }, []);

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Stores</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>Name</th><th>Email</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(s => (
            <tr key={s.id} className="border-b">
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.avg_rating ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
