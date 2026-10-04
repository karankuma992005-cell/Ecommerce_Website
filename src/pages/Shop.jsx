import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { useStore } from '../context/StoreContext';
import { SORT_OPTIONS } from '../data/constants';
import { categories, products } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const SORTERS = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating,
  newest: (a, b) => Number(b.newest) - Number(a.newest) || b.id - a.id,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  popular: (a, b) => b.reviews - a.reviews,
};

const EMPTY_FILTERS = { brands: [], minPrice: '', maxPrice: '', rating: 0 };

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { prefs, setSortPreference } = useStore();
  const [local, setLocal] = useState(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Search and category live in the URL so links like /shop?category=Laptops just work.
  const search = searchParams.get('search') ?? '';
  const categoryParam = searchParams.get('category');
  const category = categories.includes(categoryParam) ? categoryParam : 'All';
  const urlSort = searchParams.get('sort');
  const sort = SORTERS[urlSort] ? urlSort : SORTERS[prefs.sort] ? prefs.sort : 'featured';

  useDocumentTitle(
    category !== 'All' ? category : search ? `Search: ${search}` : 'Shop',
    'Browse and filter smartphones, laptops, headphones, smart watches, cameras, gaming gear and accessories at ElectroMart.',
  );

  const filters = { search, category, ...local };

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value && value !== 'All') next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next, { replace: true });
  };

  const handleChange = (patch) => {
    const { search: s, category: c, ...rest } = patch;
    if ('search' in patch) updateParams({ search: s });
    if ('category' in patch) updateParams({ category: c });
    if (Object.keys(rest).length) setLocal((prev) => ({ ...prev, ...rest }));
  };

  const handleSort = (value) => {
    setSortPreference(value);
    if (searchParams.has('sort')) updateParams({ sort: '' });
  };

  const clearFilters = () => {
    setLocal(EMPTY_FILTERS);
    setSortPreference('featured');
    setSearchParams({}, { replace: true });
  };

  const results = useMemo(() => {
    const tokens = search.toLowerCase().split(/\s+/).filter(Boolean);
    const min = local.minPrice === '' ? 0 : Number(local.minPrice);
    const max = local.maxPrice === '' ? Infinity : Number(local.maxPrice);
    return products
      .filter((p) => {
        const haystack = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
        return (
          tokens.every((t) => haystack.includes(t)) &&
          (category === 'All' || p.category === category) &&
          (local.brands.length === 0 || local.brands.includes(p.brand)) &&
          p.price >= min &&
          p.price <= max &&
          p.rating >= local.rating
        );
      })
      .sort(SORTERS[sort]);
  }, [search, category, local, sort]);

  const hasFilters = search || category !== 'All' || local.brands.length || local.minPrice || local.maxPrice || local.rating || sort !== 'featured';

  return (
    <div className="container shop">
      <div className="shop__head">
        <div>
          <h1>{category === 'All' ? 'Shop all products' : category}</h1>
          <p className="shop__count" aria-live="polite">
            {results.length} of {products.length} products{search ? ` for "${search}"` : ''}
          </p>
        </div>
        <div className="shop__tools">
          <button type="button" className="btn btn--outline shop__filter-btn" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal size={16} aria-hidden="true" /> Filters
          </button>
          <div className="sort">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => handleSort(e.target.value)}>
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="shop__layout">
        <FilterSidebar
          filters={filters}
          onChange={handleChange}
          onClear={clearFilters}
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          resultCount={results.length}
        />
        <div className="shop__results">
          <ProductGrid
            products={results}
            variant="shop"
            empty={
              <div className="empty-note">
                <h2>No products match your filters</h2>
                <p>Try a different search term or remove some filters.</p>
                {hasFilters && <button type="button" className="btn btn--primary" onClick={clearFilters}>Clear Filters</button>}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
