import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Modal from './Modal';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../utils/format';

export default function WishlistPanel({ open, onClose }) {
  const { wishlist, removeFromWishlist, moveToCart } = useStore();
  const items = wishlist.map(getProductById).filter(Boolean);

  return (
    <Modal open={open} onClose={onClose} title={`Wishlist (${items.length})`} size="lg">
      {items.length === 0 ? (
        <div className="empty-note">
          <p>Your wishlist is empty. Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="btn btn--primary" onClick={onClose}>Browse products</Link>
        </div>
      ) : (
        <ul className="wish-list">
          {items.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`} onClick={onClose}>
                <img src={product.images[0]} alt={product.name} width="72" height="72" />
              </Link>
              <div>
                <Link to={`/product/${product.id}`} onClick={onClose} className="wish-list__name">{product.name}</Link>
                <p>{formatPrice(product.price)}</p>
              </div>
              <button type="button" className="btn btn--primary btn--sm" onClick={() => moveToCart(product.id)} disabled={product.stock < 1}>
                <ShoppingCart size={15} aria-hidden="true" /> {product.stock < 1 ? 'Sold out' : 'Move to cart'}
              </button>
              <button type="button" className="icon-btn" onClick={() => removeFromWishlist(product.id)} aria-label={`Remove ${product.name} from wishlist`}>
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
