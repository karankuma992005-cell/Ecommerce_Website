import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingCart, Truck, Zap } from 'lucide-react';
import ErrorState from '../components/ErrorState';
import ProductGallery from '../components/ProductGallery';
import ProductGrid from '../components/ProductGrid';
import Rating from '../components/Rating';
import { useStore } from '../context/StoreContext';
import { getProductById, getRelatedProducts } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice, getStockStatus } from '../utils/format';

function ProductView({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const stock = getStockStatus(product.stock);
  const soldOut = product.stock < 1;
  const inWishlist = wishlist.includes(product.id);
  const related = getRelatedProducts(product);

  useDocumentTitle(product.name, product.description);

  const buyNow = () => {
    if (addToCart(product.id, quantity)) navigate('/checkout');
  };

  return (
    <div className="container pdp">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><ChevronRight size={14} aria-hidden="true" />
        <Link to="/shop">Shop</Link><ChevronRight size={14} aria-hidden="true" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp__main">
        <ProductGallery images={product.images} name={product.name} />

        <div className="pdp__info">
          <p className="pdp__brand">{product.brand}</p>
          <h1>{product.name}</h1>
          <Rating value={product.rating} count={product.reviews} size={17} />

          <p className="price price--lg">
            <strong>{formatPrice(product.price)}</strong>
            <s>{formatPrice(product.originalPrice)}</s>
            <span className="badge badge--inline">{product.discount}% off</span>
          </p>
          <p className="pdp__tax">Inclusive of all taxes</p>
          <p className={`stock stock--${stock.tone}`}>{stock.label}</p>
          <p className="pdp__desc">{product.description}</p>

          <div className="pdp__buy">
            <div className="qty" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1 || soldOut} aria-label="Decrease quantity"><Minus size={16} /></button>
              <output aria-live="polite">{soldOut ? 0 : quantity}</output>
              <button type="button" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} disabled={soldOut || quantity >= product.stock} aria-label="Increase quantity"><Plus size={16} /></button>
            </div>
            <button type="button" className="btn btn--primary btn--lg" onClick={() => addToCart(product.id, quantity)} disabled={soldOut}>
              <ShoppingCart size={18} aria-hidden="true" /> Add to Cart
            </button>
            <button type="button" className="btn btn--dark btn--lg" onClick={buyNow} disabled={soldOut}>
              <Zap size={18} aria-hidden="true" /> Buy Now
            </button>
            <button
              type="button"
              className={`btn btn--outline btn--lg pdp__wish${inWishlist ? ' is-active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={inWishlist}
            >
              <Heart size={18} aria-hidden="true" fill={inWishlist ? 'currentColor' : 'none'} /> {inWishlist ? 'In Wishlist' : 'Wishlist'}
            </button>
          </div>

          <ul className="pdp__perks">
            <li><Truck size={18} aria-hidden="true" /> Free delivery on orders over ₹999</li>
            <li><ShieldCheck size={18} aria-hidden="true" /> Genuine product with brand warranty</li>
            <li><RotateCcw size={18} aria-hidden="true" /> Easy returns</li>
          </ul>
        </div>
      </div>

      <section className="pdp__specs" aria-labelledby="specs-title">
        <h2 id="specs-title">Specifications</h2>
        <table>
          <tbody>
            {Object.entries(product.specifications).map(([label, value]) => (
              <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      {related.length > 0 && (
        <section className="pdp__related" aria-labelledby="related-title">
          <h2 id="related-title">Related products</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const product = /^\d+$/.test(id) ? getProductById(id) : undefined;
  useDocumentTitle(product ? product.name : 'Product not found');

  if (!product) {
    return <ErrorState title="Product not found" message="This product may have been removed or the link is incorrect." />;
  }
  // key resets quantity and gallery state when navigating between related products
  return <ProductView key={product.id} product={product} />;
}
