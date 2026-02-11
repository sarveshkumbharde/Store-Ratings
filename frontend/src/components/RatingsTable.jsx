export default function RatingsTable({ ratings }) {
  if (!ratings.length) {
    return (
      <div className="border rounded p-4 text-sm text-gray-500">
        No ratings yet.
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">User Ratings</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left">User</th>
            <th className="text-left">Email</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map(r => (
            <tr key={r.id} className="border-b">
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td className="text-center">{r.rating}</td>
              <td>{new Date(r.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
