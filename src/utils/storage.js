/** Safe localStorage helpers. They never throw and fall back gracefully on corrupted data. */
export const KEYS = {
  cart: 'electromart_cart',
  wishlist: 'electromart_wishlist',
  orders: 'electromart_orders',
  coupon: 'electromart_coupon',
  prefs: 'electromart_prefs',
  newsletter: 'electromart_newsletter',
};

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* storage unavailable - ignore */
  }
}
