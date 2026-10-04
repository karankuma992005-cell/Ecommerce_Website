import { RotateCcw, X } from 'lucide-react';
import { brands as allBrands, categories } from '../data/products';

export default function FilterSidebar({ filters, onChange, onClear, open, onClose, resultCount }) {
  const { search, category, brands, minPrice, maxPrice, rating } = filters;
  const priceConflict = minPrice !== '' && maxPrice !== '' && Number(minPrice) > Number(maxPrice);

  const toggleBrand = (brand) =>
    onChange({ brands: brands.includes(brand) ? brands.filter((b) => b !== brand) : [...brands, brand] });

  return (
    <aside className={`filters${open ? ' is-open' : ''}`} aria-label="Product filters">
      <div className="filters__header">
        <h2>Filters</h2>
        <button type="button" className="icon-btn filters__close" onClick={onClose} aria-label="Close filters">
          <X size={20} />
        </button>
      </div>

      <div className="filters__group">
        <label htmlFor="filter-search" className="filters__title">Search</label>
        <input
          id="filter-search"
          type="search"
          value={search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Name, brand or category"
          autoComplete="off"
        />
      </div>

      <fieldset className="filters__group">
        <legend className="filters__title">Category</legend>
        {['All', ...categories].map((name) => (
          <label key={name} className="check">
            <input type="radio" name="category" checked={category === name} onChange={() => onChange({ category: name })} />
            <span>{name}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filters__group">
        <legend className="filters__title">Brand</legend>
        <div className="filters__scroll">
          {allBrands.map((brand) => (
            <label key={brand} className="check">
              <input type="checkbox" checked={brands.includes(brand)} onChange={() => toggleBrand(brand)} />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend className="filters__title">Price (₹)</legend>
        <div className="filters__price">
          <label className="sr-only" htmlFor="min-price">Minimum price</label>
          <input id="min-price" type="number" min="0" inputMode="numeric" placeholder="Min" value={minPrice} onChange={(e) => onChange({ minPrice: e.target.value })} />
          <span aria-hidden="true">to</span>
          <label className="sr-only" htmlFor="max-price">Maximum price</label>
          <input id="max-price" type="number" min="0" inputMode="numeric" placeholder="Max" value={maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value })} />
        </div>
        {priceConflict && <p className="field__error">Minimum price is higher than maximum.</p>}
      </fieldset>

      <fieldset className="filters__group">
        <legend className="filters__title">Rating</legend>
        {[
          { value: 0, label: 'Any rating' },
          { value: 4, label: '4★ & above' },
          { value: 3, label: '3★ & above' },
          { value: 2, label: '2★ & above' },
        ].map((option) => (
          <label key={option.value} className="check">
            <input type="radio" name="rating" checked={rating === option.value} onChange={() => onChange({ rating: option.value })} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="filters__footer">
        <button type="button" className="btn btn--outline btn--block" onClick={onClear}>
          <RotateCcw size={16} aria-hidden="true" /> Clear Filters
        </button>
        <button type="button" className="btn btn--primary btn--block filters__apply" onClick={onClose}>
          Show {resultCount} {resultCount === 1 ? 'product' : 'products'}
        </button>
      </div>
    </aside>
  );
}
