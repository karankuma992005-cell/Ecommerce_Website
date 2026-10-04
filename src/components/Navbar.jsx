import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Heart, Menu, ShoppingCart, X, Zap } from 'lucide-react';
import SearchBar from './SearchBar';
import WishlistPanel from './WishlistPanel';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';

export default function Navbar() {
  const { cartCount, wishlist } = useStore();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const catRef = useRef(null);

  // Close menus after every navigation.
  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!catOpen) return undefined;
    const onPointer = (e) => !catRef.current?.contains(e.target) && setCatOpen(false);
    const onKey = (e) => e.key === 'Escape' && setCatOpen(false);
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [catOpen]);

  const onContact = location.pathname === '/contact';
  const aboutActive = onContact && location.hash === '#about';
  const contactActive = onContact && location.hash !== '#about';
  const shopCategory = location.pathname === '/shop' && new URLSearchParams(location.search).has('category');

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand" aria-label="ElectroMart home">
          <span className="brand__mark"><Zap size={18} aria-hidden="true" fill="currentColor" /></span>
          <span className="brand__name">ElectroMart</span>
        </Link>

        <nav id="main-nav" className={`navbar__links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive && !shopCategory ? 'active' : undefined)}>Shop</NavLink>
          <div className="dropdown" ref={catRef}>
            <button
              type="button"
              className={`dropdown__toggle${shopCategory ? ' active' : ''}`}
              aria-expanded={catOpen}
              aria-controls="category-menu"
              onClick={() => setCatOpen((v) => !v)}
            >
              Categories <ChevronDown size={16} aria-hidden="true" />
            </button>
            <ul id="category-menu" className={`dropdown__menu${catOpen ? ' is-open' : ''}`}>
              {categories.map((name) => (
                <li key={name}><Link to={`/shop?category=${encodeURIComponent(name)}`}>{name}</Link></li>
              ))}
            </ul>
          </div>
          <Link to="/contact#about" className={aboutActive ? 'active' : undefined}>About</Link>
          <Link to="/contact" className={contactActive ? 'active' : undefined}>Contact</Link>
        </nav>

        <div className="navbar__search"><SearchBar /></div>

        <div className="navbar__actions">
          <button type="button" className="nav-icon" onClick={() => setWishOpen(true)} aria-label={`Wishlist, ${wishlist.length} items`}>
            <Heart size={22} aria-hidden="true" />
            {wishlist.length > 0 && <span className="count" aria-hidden="true">{wishlist.length}</span>}
          </button>
          <Link to="/cart" className="nav-icon" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingCart size={22} aria-hidden="true" />
            {cartCount > 0 && <span className="count" aria-hidden="true">{cartCount}</span>}
          </Link>
          <button
            type="button"
            className="nav-icon navbar__toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <WishlistPanel open={wishOpen} onClose={() => setWishOpen(false)} />
    </header>
  );
}
