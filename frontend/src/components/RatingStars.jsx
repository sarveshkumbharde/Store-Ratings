export default function RatingStars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-xl ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
