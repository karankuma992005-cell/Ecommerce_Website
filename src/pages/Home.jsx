import { Link, useNavigate } from 'react-router-dom';
import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import Newsletter from '../components/Newsletter';
import ProductGrid from '../components/ProductGrid';
import ReviewCard from '../components/ReviewCard';
import { REVIEWS } from '../data/constants';
import { buildHeroArt } from '../data/images';
import { categories, products } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice } from '../utils/format';

const featured = products.filter((p) => p.featured).slice(0, 8);
const trending = products.filter((p) => p.trending).slice(0, 8);
const topOffers = [...products].sort((a, b) => b.discount - a.discount).slice(0, 3);
const maxDiscount = topOffers[0].discount;
const categoryCounts = Object.fromEntries(categories.map((c) => [c, products.filter((p) => p.category === c).length]));

const heroArt = {
  phone: buildHeroArt('phone', { body: '#c9ced6', accent: '#2f5fb3' }),
  headphones: buildHeroArt('headphones', { body: '#e8ecf3', accent: '#3b82f6' }),
  watch: buildHeroArt('watch', { body: '#d4d8de', accent: '#e07a3f' }),
};

const TRUST = [
  { icon: Truck, text: 'Free delivery over ₹999' },
  { icon: ShieldCheck, text: 'Secure checkout' },
  { icon: BadgeCheck, text: '100% genuine brands' },
  { icon: RotateCcw, text: 'Easy returns' },
];

export default function Home() {
  const navigate = useNavigate();
  useDocumentTitle(null);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__tag">Smart Technology. Better Shopping.</p>
            <h1 id="hero-title">Upgrade Your Tech. Upgrade Your Life.</h1>
            <p className="hero__text">
              Discover the latest smartphones, laptops, gaming gear, audio devices and smart accessories at great prices.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn--primary btn--lg">Shop Now</Link>
              <Link to="/#categories" className="btn btn--ghost btn--lg">Explore Categories</Link>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <img className="hero__art hero__art--phone" src={heroArt.phone} alt="" width="320" height="320" />
            <img className="hero__art hero__art--headphones" src={heroArt.headphones} alt="" width="280" height="280" />
            <img className="hero__art hero__art--watch" src={heroArt.watch} alt="" width="220" height="220" />
          </div>
        </div>
        <ul className="container trust" aria-label="Why shop with us">
          {TRUST.map(({ icon: Icon, text }) => (
            <li key={text}><Icon size={18} aria-hidden="true" /> {text}</li>
          ))}
        </ul>
      </section>

      <section id="categories" className="section container" aria-labelledby="cat-title">
        <div className="section__head"><h2 id="cat-title">Popular categories</h2></div>
        <div className="category-grid">
          {categories.map((name) => <CategoryCard key={name} name={name} count={categoryCounts[name]} />)}
        </div>
      </section>

      <section className="section container" aria-labelledby="featured-title">
        <div className="section__head">
          <h2 id="featured-title">Featured products</h2>
          <Link to="/shop" className="link-more">View all products</Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="offer" aria-labelledby="offer-title">
        <div className="container offer__inner">
          <div>
            <p className="offer__tag">Limited Time Offer</p>
            <h2 id="offer-title">Up to {maxDiscount}% OFF on selected electronics</h2>
            <p>Save on audio, accessories and more while stock lasts. Use code <strong>WELCOME20</strong> in your cart for an extra 20% off.</p>
            <button type="button" className="btn btn--light btn--lg" onClick={() => navigate('/shop')}>Shop Offers</button>
          </div>
          <ul className="offer__list">
            {topOffers.map((p) => (
              <li key={p.id}>
                <Link to={`/product/${p.id}`}>
                  <img src={p.images[0]} alt="" width="64" height="64" loading="lazy" />
                  <span><strong>{p.name}</strong><small>{formatPrice(p.price)} <s>{formatPrice(p.originalPrice)}</s></small></span>
                  <em>-{p.discount}%</em>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container" aria-labelledby="trending-title">
        <div className="section__head">
          <h2 id="trending-title">Trending now</h2>
          <Link to="/shop?sort=popular" className="link-more">Browse popular</Link>
        </div>
        <ProductGrid products={trending} />
      </section>

      <section className="section section--tint" aria-labelledby="reviews-title">
        <div className="container">
          <div className="section__head"><h2 id="reviews-title">What customers say</h2></div>
          <div className="review-grid">
            {REVIEWS.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
