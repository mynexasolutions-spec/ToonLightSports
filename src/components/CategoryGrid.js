import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, products } from '../data/mockData';

// Only categories that actually have products are shown; the first one is the featured (large) card.
export default function CategoryGrid() {
  const list = categories
    .map((cat) => ({ ...cat, count: products.filter((p) => p.category === cat.name).length }))
    .filter((cat) => cat.count > 0);

  return (
    <div className="cat-bento">
      {list.map((cat, i) => (
        <Link
          key={cat.id}
          href={`/products?category=${encodeURIComponent(cat.name)}`}
          className={`cat-card ${i === 0 ? 'cat-card-lg' : ''}`}
        >
          <img src={cat.image} alt={cat.name} className="cat-img" loading="lazy" />
          <div className="cat-shade" />
          <span className="cat-count">{cat.count} Products</span>
          <span className="cat-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="cat-body">
            <h3 className="cat-name">{cat.name}</h3>
            <p className="cat-desc">{cat.desc}</p>
          </div>
          <span className="cat-arrow"><ArrowUpRight size={20} /></span>
        </Link>
      ))}
    </div>
  );
}
