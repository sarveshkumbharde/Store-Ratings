export default function OwnerStoreInfo({ store }) {
  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-semibold">{store.name}</h2>
      <p className="text-sm text-gray-600">{store.address}</p>
      <p className="text-sm text-gray-600">{store.email}</p>
    </div>
  );
}
