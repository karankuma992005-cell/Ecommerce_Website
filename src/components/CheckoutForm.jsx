import { Banknote, CreditCard, Smartphone } from 'lucide-react';
import FormField from './FormField';
import LoadingSpinner from './LoadingSpinner';
import { INDIAN_STATES } from '../data/constants';
import { formatPrice } from '../utils/format';

const PAYMENT_METHODS = [
  { value: 'cod', label: 'Cash on Delivery', hint: 'Pay when your order arrives', icon: Banknote },
  { value: 'upi', label: 'UPI', hint: 'Pay with any UPI app', icon: Smartphone },
  { value: 'card', label: 'Credit / Debit Card', hint: 'Visa, Mastercard, RuPay', icon: CreditCard },
];

export default function CheckoutForm({ values, errors, onChange, onSubmit, isSubmitting, total }) {
  const bind = (field) => ({
    value: values[field],
    error: errors[field],
    onChange: (event) => onChange(field, event.target.value),
  });

  return (
    <form className="checkout-form" onSubmit={onSubmit} noValidate>
      <fieldset>
        <legend>Customer information</legend>
        <div className="form-grid">
          <FormField id="fullName" label="Full name" autoComplete="name" className="span-2" {...bind('fullName')} />
          <FormField id="email" label="Email" type="email" autoComplete="email" {...bind('email')} />
          <FormField id="phone" label="Phone number" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} hint="10-digit mobile number" {...bind('phone')} />
        </div>
      </fieldset>

      <fieldset>
        <legend>Shipping address</legend>
        <div className="form-grid">
          <FormField id="address" label="Address" autoComplete="street-address" className="span-2" {...bind('address')} />
          <FormField id="city" label="City" autoComplete="address-level2" {...bind('city')} />
          <FormField id="state" label="State" as="select" autoComplete="address-level1" {...bind('state')}>
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </FormField>
          <FormField id="pincode" label="Pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} {...bind('pincode')} />
        </div>
      </fieldset>

      <fieldset>
        <legend>Payment method</legend>
        <p className="demo-note">This is a demo checkout. No real payment is processed and card details are never saved.</p>
        <div className="pay-options" role="radiogroup" aria-label="Payment method">
          {PAYMENT_METHODS.map(({ value, label, hint, icon: Icon }) => (
            <label key={value} className={`pay-option${values.paymentMethod === value ? ' is-selected' : ''}`}>
              <input type="radio" name="paymentMethod" value={value} checked={values.paymentMethod === value} onChange={() => onChange('paymentMethod', value)} />
              <Icon size={22} aria-hidden="true" />
              <span><strong>{label}</strong><small>{hint}</small></span>
            </label>
          ))}
        </div>

        {values.paymentMethod === 'upi' && (
          <div className="form-grid pay-details">
            <FormField id="upiId" label="UPI ID" placeholder="name@bank" autoComplete="off" className="span-2" {...bind('upiId')} />
          </div>
        )}

        {values.paymentMethod === 'card' && (
          <div className="form-grid pay-details">
            <FormField id="cardNumber" label="Card number" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" maxLength={19} className="span-2" {...bind('cardNumber')} />
            <FormField id="cardName" label="Card holder name" autoComplete="cc-name" className="span-2" {...bind('cardName')} />
            <FormField id="cardExpiry" label="Expiry date" placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" maxLength={5} {...bind('cardExpiry')} />
            <FormField id="cardCvv" label="CVV" type="password" inputMode="numeric" autoComplete="cc-csc" maxLength={4} {...bind('cardCvv')} />
          </div>
        )}
      </fieldset>

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={isSubmitting}>
        {isSubmitting ? <LoadingSpinner small label="Placing order" /> : `Place Order - ${formatPrice(total)}`}
      </button>
    </form>
  );
}
