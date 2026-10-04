import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import Modal from '../components/Modal';
import { useStore } from '../context/StoreContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartCount, clearCart, notify } = useStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  useDocumentTitle('Your Cart');

  if (cartItems.length === 0) {
    return (
      <section className="container empty-cart">
        <ShoppingBag size={52} aria-hidden="true" />
        <h1>Your cart is empty</h1>
        <p>Add something you like and it will show up here.</p>
        <button type="button" className="btn btn--primary btn--lg" onClick={() => navigate('/shop')}>Continue Shopping</button>
      </section>
    );
  }

  const handleClear = () => {
    clearCart();
    setConfirmOpen(false);
    notify('Cart cleared', 'info');
  };

  return (
    <div className="container cart">
      <div className="cart__head">
        <h1>Shopping cart <span>({cartCount} {cartCount === 1 ? 'item' : 'items'})</span></h1>
        <button type="button" className="btn btn--outline btn--sm" onClick={() => setConfirmOpen(true)}>
          <Trash2 size={15} aria-hidden="true" /> Clear Cart
        </button>
      </div>

      <div className="cart__layout">
        <ul className="cart__list">
          {cartItems.map(({ product, quantity }) => (
            <CartItem key={product.id} product={product} quantity={quantity} />
          ))}
        </ul>
        <CartSummary>
          <Link to="/checkout" className="btn btn--primary btn--lg btn--block">Proceed to Checkout</Link>
          <Link to="/shop" className="summary__continue">Continue Shopping</Link>
        </CartSummary>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Clear your cart?"
        size="sm"
        footer={
          <>
            <button type="button" className="btn btn--outline" onClick={() => setConfirmOpen(false)}>Keep items</button>
            <button type="button" className="btn btn--danger" onClick={handleClear}>Clear Cart</button>
          </>
        }
      >
        <p>This removes all {cartCount} {cartCount === 1 ? 'item' : 'items'} and any applied coupon from your cart.</p>
      </Modal>
    </div>
  );
}
