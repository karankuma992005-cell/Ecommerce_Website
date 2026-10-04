import { useState } from 'react';
import { MailCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { KEYS, readStorage, removeStorage, writeStorage } from '../utils/storage';
import { isValidEmail } from '../utils/validators';

export default function Newsletter() {
  const { notify } = useStore();
  const [saved, setSaved] = useState(() => {
    const stored = readStorage(KEYS.newsletter, null);
    return stored && typeof stored.email === 'string' ? stored : null;
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return setError('Enter your email address.');
    if (!isValidEmail(email)) return setError('Enter a valid email, like name@example.com.');
    const record = { email: email.trim(), subscribedAt: new Date().toISOString() };
    writeStorage(KEYS.newsletter, record);
    setSaved(record);
    setEmail('');
    setError('');
    return notify("You're subscribed successfully!");
  };

  const reset = () => {
    removeStorage(KEYS.newsletter);
    setSaved(null);
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter__inner">
        <div>
          <h2 id="newsletter-title">Get deals before everyone else</h2>
          <p>Join the ElectroMart newsletter for new arrivals, price drops and coupon codes. No spam.</p>
        </div>
        {saved ? (
          <div className="newsletter__done" role="status">
            <MailCheck size={22} aria-hidden="true" />
            <div>
              <strong>You're subscribed successfully!</strong>
              <p>Updates will go to {saved.email}. <button type="button" className="link-btn" onClick={reset}>Use a different email</button></p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="newsletter__form">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Email address"
              autoComplete="email"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'newsletter-error' : undefined}
            />
            <button type="submit" className="btn btn--primary">Subscribe</button>
            {error && <p id="newsletter-error" className="newsletter__error" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
