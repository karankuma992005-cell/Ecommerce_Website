import Rating from './Rating';

export default function ReviewCard({ review }) {
  return (
    <figure className="review-card">
      <Rating value={review.rating} />
      <blockquote>{review.text}</blockquote>
      <figcaption>
        <span className="avatar" aria-hidden="true">{review.name.charAt(0)}</span>
        <span>
          <strong>{review.name}</strong>
          <small>Purchased {review.product}</small>
        </span>
      </figcaption>
    </figure>
  );
}
