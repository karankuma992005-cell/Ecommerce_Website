import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import CartSummary from '../components/CartSummary';
import CheckoutForm from '../components/CheckoutForm';
import { useStore } from '../context/StoreContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatDate, formatPrice } from '../utils/format';
import { validateCheckout } from '../utils/validators';

const INITIAL_VALUES = {
  fullName: '', email: '', phone: '',
  address: '', city: '', state: '', pincode: '',
  paymentMethod: 'cod',
  upiId: '', cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
};

const PAYMENT_LABELS = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Credit / Debit Card' };

/** Input masks keep the stored value clean (digits only, grouped card number, MM/YY). */
const MASKS = {
  phone: (v) => v.replace(/\D/g, '').slice(0, 10),
  pincode: (v) => v.replace(/\D/g, '').slice(0, 6),
  cardNumber: (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(),
  cardExpiry: (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  },
  cardCvv: (v) => v.replace(/\D/g, '').slice(0, 4),
};

export default function Checkout() {
  const { cartItems, total, placeOrder, notify } = useStore();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const timer = useRef(null);

  useDocumentTitle(placedOrder ? 'Order confirmed' : 'Checkout');
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: MASKS[field] ? MASKS[field](value) : value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    const found = validateCheckout(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      notify('Please fix the highlighted fields', 'error');
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setIsSubmitting(true);
    timer.current = window.setTimeout(() => {
      const order = placeOrder({
        customer: { name: values.fullName.trim(), email: values.email.trim(), phone: values.phone },
        address: { street: values.address.trim(), city: values.city.trim(), state: values.state, pincode: values.pincode },
        paymentMethod: PAYMENT_LABELS[values.paymentMethod],
      });
      setIsSubmitting(false);
      setValues(INITIAL_VALUES); // never keep card details around
      setPlacedOrder(order);
    }, 700);
  };

  if (placedOrder) return <OrderSuccess order={placedOrder} />;
  if (cartItems.length === 0) return <Navigate to="/cart" replace />;

  return (
    <div className="container checkout">
      <h1>Checkout</h1>
      <div className="checkout__layout">
        <CheckoutForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} isSubmitting={isSubmitting} total={total} />
        <div className="checkout__side">
          <section className="summary" aria-label="Items in your order">
            <h2>Your items</h2>
            <ul className="mini-items">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id}>
                  <img src={product.images[0]} alt="" width="56" height="56" loading="lazy" />
                  <span>{product.name}<small>Qty {quantity} × {formatPrice(product.price)}</small></span>
                  <strong>{formatPrice(product.price * quantity)}</strong>
                </li>
              ))}
            </ul>
          </section>
          <CartSummary showCoupon={false}>
            <Link to="/cart" className="summary__continue">Edit cart or change coupon</Link>
          </CartSummary>
        </div>
      </div>
    </div>
  );
}

function OrderSuccess({ order }) {
  return (
    <section className="container success" aria-labelledby="success-title">
      <CheckCircle2 size={56} aria-hidden="true" />
      <h1 id="success-title">Order placed successfully!</h1>
      <p>Thank you, {order.customer.name}. A confirmation will be sent to {order.customer.email}.</p>
      <p className="success__id">Order ID: <strong>{order.orderId}</strong></p>

      <div className="success__card">
        <table>
          <thead>
            <tr><th scope="col">Product</th><th scope="col">Qty</th><th scope="col">Price</th><th scope="col">Subtotal</th></tr>
          </thead>
          <tbody>
            {order.products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td><td>{p.quantity}</td><td>{formatPrice(p.price)}</td><td>{formatPrice(p.price * p.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="summary__rows">
          <div><dt>Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
          <div><dt>Discount{order.coupon ? ` (${order.coupon})` : ''}</dt><dd>{order.discount ? `-${formatPrice(order.discount)}` : formatPrice(0)}</dd></div>
          <div><dt>Delivery</dt><dd>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</dd></div>
          <div className="summary__total"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
        </dl>
        <div className="success__meta">
          <div>
            <h2>Delivering to</h2>
            <p>{order.customer.name}<br />{order.address.street}, {order.address.city}<br />{order.address.state} - {order.address.pincode}</p>
          </div>
          <div>
            <h2>Payment</h2>
            <p>{order.paymentMethod}<br />Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="success__actions">
        <Link to="/shop" className="btn btn--primary btn--lg">Continue Shopping</Link>
        <Link to="/" className="btn btn--outline btn--lg">Go Home</Link>
      </div>
    </section>
  );
}
