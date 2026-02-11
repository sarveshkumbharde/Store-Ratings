export default function OwnerStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Stat label="Total Ratings" value={stats.ratings} />
      <Stat label="Average Rating" value={stats.avgRating ?? "—"} />
    </div>
  );
}

function Stat({ label, value }) { 
  return (
    <div className="border rounded p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
