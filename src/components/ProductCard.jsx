import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import Rating from './Rating';
import { useStore } from '../context/StoreContext';
import { formatPrice, getStockStatus } from '../utils/format';

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const inWishlist = wishlist.includes(product.id);
  const stock = getStockStatus(product.stock);
  const soldOut = product.stock < 1;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
          <img src={product.images[0]} alt={`${product.name} by ${product.brand}`} loading="lazy" width="400" height="400" />
        </Link>
        {product.discount > 0 && <span className="badge badge--discount">-{product.discount}%</span>}
        <button
          type="button"
          className={`wish-btn${inWishlist ? ' is-active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={inWishlist}
          aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card__body">
        <p className="product-card__meta">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </p>
        <h3 className="product-card__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <Rating value={product.rating} count={product.reviews} />
        <p className="price">
          <strong>{formatPrice(product.price)}</strong>
          <s>{formatPrice(product.originalPrice)}</s>
        </p>
        <p className={`stock stock--${stock.tone}`}>{stock.label}</p>
        <div className="product-card__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={() => addToCart(product.id)} disabled={soldOut}>
            <ShoppingCart size={16} aria-hidden="true" /> {soldOut ? 'Sold out' : 'Add to Cart'}
          </button>
          <Link to={`/product/${product.id}`} className="btn btn--outline btn--sm">View Details</Link>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
