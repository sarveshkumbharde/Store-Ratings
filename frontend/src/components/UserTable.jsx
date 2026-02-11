import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Users</h2>

      <table className="w-full text-sm">
        <thead> 
          <tr className="border-b">
            <th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
