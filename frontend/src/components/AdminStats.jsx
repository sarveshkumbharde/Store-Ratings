export default function AdminStats({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Users" value={stats.users} />
      <StatCard label="Stores" value={stats.stores} />
      <StatCard label="Ratings" value={stats.ratings} />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border rounded p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
