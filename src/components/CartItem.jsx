import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';

function CartItem({ product, quantity }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useStore();
  const atMax = quantity >= product.stock;
  return (
    <li className="cart-item">
      <Link to={`/product/${product.id}`} className="cart-item__img">
        <img src={product.images[0]} alt={product.name} loading="lazy" width="120" height="120" />
      </Link>
      <div className="cart-item__info">
        <p className="cart-item__brand">{product.brand}</p>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="cart-item__price">{formatPrice(product.price)} <s>{formatPrice(product.originalPrice)}</s></p>
        {atMax && <p className="stock stock--warn">Maximum available quantity</p>}
      </div>
      <div className="qty" role="group" aria-label={`Quantity for ${product.name}`}>
        <button type="button" onClick={() => decreaseQuantity(product.id)} disabled={quantity <= 1} aria-label="Decrease quantity">
          <Minus size={16} />
        </button>
        <output aria-live="polite">{quantity}</output>
        <button type="button" onClick={() => increaseQuantity(product.id)} disabled={atMax} aria-label="Increase quantity">
          <Plus size={16} />
        </button>
      </div>
      <p className="cart-item__subtotal" aria-label={`Subtotal ${formatPrice(product.price * quantity)}`}>
        {formatPrice(product.price * quantity)}
      </p>
      <button type="button" className="icon-btn cart-item__remove" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name} from cart`}>
        <Trash2 size={18} />
      </button>
    </li>
  );
}

export default memo(CartItem);
