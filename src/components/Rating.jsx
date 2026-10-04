import { Star } from 'lucide-react';

export default function Rating({ value, count, size = 15 }) {
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));
  const stars = Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} aria-hidden="true" />);
  return (
    <span className="rating" role="img" aria-label={`Rated ${value} out of 5${count ? ` from ${count.toLocaleString('en-IN')} reviews` : ''}`}>
      <span className="rating__stars" aria-hidden="true">
        <span className="rating__base">{stars}</span>
        <span className="rating__fill" style={{ width: `${percent}%` }}>
          {stars}
        </span>
      </span>
      <span className="rating__value" aria-hidden="true">{value.toFixed(1)}</span>
      {count != null && <span className="rating__count" aria-hidden="true">({count.toLocaleString('en-IN')})</span>}
    </span>
  );
}
