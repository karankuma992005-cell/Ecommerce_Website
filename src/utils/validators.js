const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;
const UPI_RE = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/;

export const isValidEmail = (value) => EMAIL_RE.test(value.trim());
export const isValidPhone = (value) => PHONE_RE.test(value.trim());
export const isValidUpi = (value) => UPI_RE.test(value.trim());

function isValidExpiry(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

export function validateCheckout(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!isValidEmail(v.email)) e.email = 'Enter a valid email, like name@example.com.';
  if (!v.phone.trim()) e.phone = 'Enter your phone number.';
  else if (!isValidPhone(v.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number.';

  if (!v.address.trim()) e.address = 'Enter your street address.';
  if (!v.city.trim()) e.city = 'Enter your city.';
  if (!v.state) e.state = 'Select your state.';
  if (!v.pincode.trim()) e.pincode = 'Enter your pincode.';
  else if (!/^\d{6}$/.test(v.pincode)) e.pincode = 'Pincode must be exactly 6 digits.';

  if (v.paymentMethod === 'upi') {
    if (!v.upiId.trim()) e.upiId = 'Enter your UPI ID.';
    else if (!isValidUpi(v.upiId)) e.upiId = 'Enter a valid UPI ID, like name@bank.';
  }
  if (v.paymentMethod === 'card') {
    if (v.cardNumber.replace(/\s/g, '').length !== 16) e.cardNumber = 'Enter a 16-digit card number.';
    if (!v.cardName.trim()) e.cardName = 'Enter the name on the card.';
    if (!v.cardExpiry.trim()) e.cardExpiry = 'Enter the expiry date.';
    else if (!isValidExpiry(v.cardExpiry)) e.cardExpiry = 'Enter a valid, future date as MM/YY.';
    if (!/^\d{3,4}$/.test(v.cardCvv)) e.cardCvv = 'Enter the 3 or 4 digit CVV.';
  }
  return e;
}

export function validateContact(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!isValidEmail(v.email)) e.email = 'Enter a valid email, like name@example.com.';
  if (!v.phone.trim()) e.phone = 'Enter your phone number.';
  else if (!isValidPhone(v.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!v.subject.trim()) e.subject = 'Enter a subject.';
  if (!v.message.trim()) e.message = 'Write your message.';
  else if (v.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
  return e;
}
