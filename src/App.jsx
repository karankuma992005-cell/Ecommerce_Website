import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ToastNotification from './components/ToastNotification';
import ErrorState from './components/ErrorState';
import { useDocumentTitle } from './hooks/useDocumentTitle';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Contact = lazy(() => import('./pages/Contact'));

/** Scrolls to #hash targets (retrying while lazy pages load) or back to the top on navigation. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'REPLACE') return undefined; // e.g. typing in the filter box
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    let attempts = 0;
    let timer;
    const scrollToTarget = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (attempts < 20) {
        attempts += 1;
        timer = window.setTimeout(scrollToTarget, 50);
      }
    };
    scrollToTarget();
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key, navType]);

  return null;
}

function NotFound() {
  useDocumentTitle('Page not found');
  return <ErrorState title="Page not found" message="The page you are looking for does not exist or has moved." />;
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <Suspense fallback={<LoadingSpinner fullPage label="Loading page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastNotification />
    </>
  );
}
