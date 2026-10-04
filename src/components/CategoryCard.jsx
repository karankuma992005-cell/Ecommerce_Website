import { Link } from 'react-router-dom';
import { categoryIcons } from '../utils/categoryIcons';

export default function CategoryCard({ name, count }) {
  const Icon = categoryIcons[name];
  return (
    <Link to={`/shop?category=${encodeURIComponent(name)}`} className="category-card">
      <span className="category-card__icon">{Icon && <Icon size={26} aria-hidden="true" />}</span>
      <span className="category-card__name">{name}</span>
      <span className="category-card__count">{count} products</span>
    </Link>
  );
}
