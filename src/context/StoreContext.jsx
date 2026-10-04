import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProductById } from '../data/products';
import { KEYS, readStorage, removeStorage, writeStorage } from '../utils/storage';

export const COUPONS = { ELECTRO10: 10, WELCOME20: 20 };
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_FEE = 49;
const TOAST_DURATION = 3200;

const StoreContext = createContext(null);

/* ---------- sanitizers: protect the app from corrupted localStorage ---------- */
function sanitizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  return raw.reduce((list, item) => {
    const product = item && getProductById(item.id);
    const quantity = Number(item?.quantity);
    if (!product || seen.has(product.id) || !Number.isInteger(quantity) || quantity < 1) return list;
    const clamped = Math.min(quantity, product.stock);
    if (clamped < 1) return list;
    seen.add(product.id);
    list.push({ id: product.id, quantity: clamped });
    return list;
  }, []);
}

const sanitizeWishlist = (raw) =>
  Array.isArray(raw) ? [...new Set(raw.filter((id) => Number.isInteger(id) && getProductById(id)))] : [];

const sanitizeOrders = (raw) =>
  Array.isArray(raw) ? raw.filter((o) => o && typeof o.orderId === 'string' && Array.isArray(o.products)) : [];

const sanitizeCoupon = (raw) => (typeof raw === 'string' && COUPONS[raw] ? raw : null);

const sanitizePrefs = (raw) => ({
  sort: typeof raw?.sort === 'string' ? raw.sort : 'featured',
});

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => sanitizeCart(readStorage(KEYS.cart, [])));
  const [wishlist, setWishlist] = useState(() => sanitizeWishlist(readStorage(KEYS.wishlist, [])));
  const [orders, setOrders] = useState(() => sanitizeOrders(readStorage(KEYS.orders, [])));
  const [coupon, setCoupon] = useState(() => sanitizeCoupon(readStorage(KEYS.coupon, null)));
  const [prefs, setPrefs] = useState(() => sanitizePrefs(readStorage(KEYS.prefs, {})));
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  useEffect(() => { writeStorage(KEYS.cart, cart); }, [cart]);
  useEffect(() => { writeStorage(KEYS.wishlist, wishlist); }, [wishlist]);
  useEffect(() => { writeStorage(KEYS.orders, orders); }, [orders]);
  useEffect(() => { writeStorage(KEYS.prefs, prefs); }, [prefs]);
  useEffect(() => {
    if (coupon) writeStorage(KEYS.coupon, coupon);
    else removeStorage(KEYS.coupon);
  }, [coupon]);

  /* ---------- notifications ---------- */
  const dismissToast = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const notify = useCallback(
    (message, type = 'success') => {
      toastId.current += 1;
      const id = toastId.current;
      setToasts((list) => [...list.slice(-2), { id, message, type }]);
      window.setTimeout(() => dismissToast(id), TOAST_DURATION);
    },
    [dismissToast],
  );

  /* ---------- cart ---------- */
  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const product = getProductById(productId);
      if (!product || product.stock < 1) {
        notify('This product is out of stock', 'error');
        return false;
      }
      const current = cart.find((i) => i.id === productId)?.quantity ?? 0;
      if (current >= product.stock) {
        notify(`Only ${product.stock} units available in stock`, 'error');
        return false;
      }
      const next = Math.min(current + quantity, product.stock);
      setCart((items) =>
        current
          ? items.map((i) => (i.id === productId ? { ...i, quantity: next } : i))
          : [...items, { id: productId, quantity: next }],
      );
      if (current + quantity > product.stock) notify(`Only ${product.stock} units available - added the maximum`, 'info');
      else notify('Product added to cart');
      return true;
    },
    [cart, notify],
  );

  const removeFromCart = useCallback(
    (productId) => {
      setCart((items) => items.filter((i) => i.id !== productId));
      notify('Product removed from cart', 'info');
    },
    [notify],
  );

  const increaseQuantity = useCallback(
    (productId) => {
      const product = getProductById(productId);
      const current = cart.find((i) => i.id === productId)?.quantity ?? 0;
      if (!product || current >= product.stock) {
        notify(`Only ${product?.stock ?? 0} units available in stock`, 'error');
        return;
      }
      setCart((items) => items.map((i) => (i.id === productId ? { ...i, quantity: i.quantity + 1 } : i)));
    },
    [cart, notify],
  );

  const decreaseQuantity = useCallback((productId) => {
    setCart((items) =>
      items.map((i) => (i.id === productId && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCoupon(null);
  }, []);

  /* ---------- wishlist ---------- */
  const addToWishlist = useCallback(
    (productId) => {
      if (wishlist.includes(productId)) return;
      setWishlist((ids) => [...ids, productId]);
      notify('Added to wishlist');
    },
    [wishlist, notify],
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      setWishlist((ids) => ids.filter((id) => id !== productId));
      notify('Removed from wishlist', 'info');
    },
    [notify],
  );

  const toggleWishlist = useCallback(
    (productId) => (wishlist.includes(productId) ? removeFromWishlist(productId) : addToWishlist(productId)),
    [wishlist, addToWishlist, removeFromWishlist],
  );

  const moveToCart = useCallback(
    (productId) => {
      if (addToCart(productId, 1)) setWishlist((ids) => ids.filter((id) => id !== productId));
    },
    [addToCart],
  );

  /* ---------- coupons ---------- */
  const applyCoupon = useCallback(
    (rawCode) => {
      const code = rawCode.trim().toUpperCase();
      if (!code) return { ok: false, message: 'Enter a coupon code' };
      if (!COUPONS[code]) {
        notify('Invalid coupon', 'error');
        return { ok: false, message: 'Invalid coupon code' };
      }
      if (coupon === code) return { ok: false, message: 'Coupon already applied' };
      setCoupon(code);
      notify('Coupon applied successfully');
      return { ok: true, message: `${code} applied - you get ${COUPONS[code]}% off` };
    },
    [coupon, notify],
  );

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    notify('Coupon removed', 'info');
  }, [notify]);

  /* ---------- derived cart values ---------- */
  const cartItems = useMemo(
    () => cart.map((i) => ({ product: getProductById(i.id), quantity: i.quantity })).filter((i) => i.product),
    [cart],
  );

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const mrpTotal = cartItems.reduce((sum, i) => sum + i.product.originalPrice * i.quantity, 0);
    const couponPercent = coupon ? COUPONS[coupon] : 0;
    const discount = Math.round((subtotal * couponPercent) / 100);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return {
      subtotal,
      discount,
      couponPercent,
      shipping,
      total: subtotal - discount + shipping,
      mrpSavings: mrpTotal - subtotal,
    };
  }, [cartItems, coupon]);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  /* ---------- orders ---------- */
  const placeOrder = useCallback(
    ({ customer, address, paymentMethod }) => {
      if (cartItems.length === 0) return null;
      const now = new Date();
      const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      let orderId;
      do {
        orderId = `EM${datePart}${Math.floor(1000 + Math.random() * 9000)}`;
      } while (orders.some((o) => o.orderId === orderId));

      const order = {
        orderId,
        customer,
        address,
        paymentMethod,
        coupon,
        products: cartItems.map(({ product, quantity }) => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity,
        })),
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        createdAt: now.toISOString(),
      };
      setOrders((list) => [order, ...list]);
      setCart([]);
      setCoupon(null);
      notify('Order placed successfully');
      return order;
    },
    [cartItems, coupon, orders, totals, notify],
  );

  const setSortPreference = useCallback((sort) => setPrefs((p) => ({ ...p, sort })), []);

  const value = useMemo(
    () => ({
      cart, cartItems, cartCount, wishlist, orders, coupon, prefs, toasts, ...totals,
      addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
      addToWishlist, removeFromWishlist, toggleWishlist, moveToCart,
      applyCoupon, removeCoupon, placeOrder, notify, dismissToast, setSortPreference,
    }),
    [
      cart, cartItems, cartCount, wishlist, orders, coupon, prefs, toasts, totals,
      addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
      addToWishlist, removeFromWishlist, toggleWishlist, moveToCart,
      applyCoupon, removeCoupon, placeOrder, notify, dismissToast, setSortPreference,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
