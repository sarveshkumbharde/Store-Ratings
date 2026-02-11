import { useState } from "react";
import api from "../api/axios";
import RatingStars from "./RatingStars";

export default function StoreCard({ store, onRatingUpdate }) {
  const [rating, setRating] = useState(store.user_rating || 0);
  const [loading, setLoading] = useState(false);

  const submitRating = async value => {
    setRating(value);
    setLoading(true);

    try {
      await api.post("/user/ratings", {
        storeId: store.id,
        rating: value
      });
      onRatingUpdate();
    } catch {
      alert("Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-sm space-y-2">
      <h3 className="text-lg font-semibold">{store.name}</h3>
      <p className="text-sm text-gray-600">{store.address}</p>

      <div className="text-sm">
        Average rating:{" "}
        <span className="font-medium">
          {store.avg_rating ?? "No ratings"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Your rating:</span>
        <RatingStars value={rating} onChange={submitRating} />
        {loading && <span className="text-xs">Saving...</span>}
      </div>
    </div>
  );
}
