import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';

export default function CartSummary({ showCoupon = true, children }) {
  const { subtotal, discount, couponPercent, coupon, shipping, total, mrpSavings, applyCoupon, removeCoupon } = useStore();
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleApply = (event) => {
    event.preventDefault();
    const result = applyCoupon(code);
    setFeedback(result);
    if (result.ok) setCode('');
  };

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <aside className="summary" aria-label="Order summary">
      <h2>Order Summary</h2>

      {showCoupon && (
        <form className="coupon" onSubmit={handleApply} noValidate>
          <label htmlFor="coupon-code">Coupon code</label>
          <div className="coupon__row">
            <input
              id="coupon-code"
              value={code}
              onChange={(e) => { setCode(e.target.value); setFeedback(null); }}
              placeholder="Try ELECTRO10"
              autoComplete="off"
              aria-describedby="coupon-feedback"
            />
            <button type="submit" className="btn btn--dark">Apply</button>
          </div>
          <p id="coupon-feedback" className={`coupon__msg${feedback ? (feedback.ok ? ' is-ok' : ' is-bad') : ''}`} role="status">
            {feedback?.message}
          </p>
        </form>
      )}

      {coupon && (
        <p className="coupon-chip">
          <Tag size={14} aria-hidden="true" /> {coupon} ({couponPercent}% off)
          {showCoupon && (
            <button type="button" onClick={removeCoupon} aria-label={`Remove coupon ${coupon}`}><X size={14} /></button>
          )}
        </p>
      )}

      <dl className="summary__rows">
        <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div className={discount ? 'is-discount' : ''}><dt>Discount</dt><dd>{discount ? `-${formatPrice(discount)}` : formatPrice(0)}</dd></div>
        <div><dt>Delivery</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
        <div className="summary__total"><dt>Final Total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>

      {shipping > 0 && (
        <p className="summary__note">Add {formatPrice(remaining)} more to get free delivery.</p>
      )}
      {mrpSavings > 0 && <p className="summary__save">You save {formatPrice(mrpSavings + discount)} on this order.</p>}
      {children}
    </aside>
  );
}
