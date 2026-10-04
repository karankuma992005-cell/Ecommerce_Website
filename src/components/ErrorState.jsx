import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export default function ErrorState({ title = 'Something went wrong', message, children }) {
  return (
    <section className="container error-state" aria-labelledby="error-title">
      <SearchX size={44} aria-hidden="true" />
      <h1 id="error-title">{title}</h1>
      {message && <p>{message}</p>}
      <div className="error-state__actions">
        {children ?? (
          <>
            <Link to="/shop" className="btn btn--primary">Back to Shop</Link>
            <Link to="/" className="btn btn--outline">Go Home</Link>
          </>
        )}
      </div>
    </section>
  );
}
