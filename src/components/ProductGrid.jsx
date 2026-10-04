import ProductCard from './ProductCard';

export default function ProductGrid({ products, variant = 'default', empty }) {
  if (products.length === 0) {
    return empty ?? <p className="empty-note">No products to show.</p>;
  }
  return (
    <div className={`product-grid product-grid--${variant}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
