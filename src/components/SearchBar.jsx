import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ onSubmitted }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const urlSearch = pathname === '/shop' ? params.get('search') ?? '' : null;
  const [value, setValue] = useState(urlSearch ?? '');

  // Keep the box in sync with /shop?search=... (links, back button, sidebar search).
  useEffect(() => {
    if (urlSearch !== null) setValue(urlSearch);
  }, [urlSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const term = value.trim();
    navigate(term ? `/shop?search=${encodeURIComponent(term)}` : '/shop');
    onSubmitted?.();
  };

  return (
    <form className="searchbar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="global-search" className="sr-only">Search products</label>
      <Search size={18} aria-hidden="true" className="searchbar__icon" />
      <input
        id="global-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search phones, laptops, brands..."
        autoComplete="off"
      />
      <button type="submit" className="searchbar__btn">Search</button>
    </form>
  );
}
