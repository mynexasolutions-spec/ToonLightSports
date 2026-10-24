'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutGrid, Dumbbell, HeartPulse, Weight, Flame, Wrench, Package } from 'lucide-react';
import { categories, products } from '../data/mockData';

const ICONS = {
  'Strength Equipment': Dumbbell,
  'Cardio Equipment': HeartPulse,
  'Gym Accessories': Weight,
  CrossFit: Flame,
  'Spare Parts & Flooring': Wrench,
};

const stocked = categories
  .map((c) => ({ name: c.name, count: products.filter((p) => p.category === c.name).length }))
  .filter((c) => c.count > 0);

function Items({ variant, onNavigate }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const onProducts = pathname === '/products';
  const current = onProducts ? params.get('category') : null;
  const searching = onProducts && params.get('search');
  const allActive = onProducts && !current && !searching;
  const cls = variant === 'drawer' ? 'drawer-cat' : 'catbar-link';

  // keep the selected chip visible when the strip is scrolled sideways (phones)
  React.useEffect(() => {
    if (variant === 'drawer') return;
    const el = document.querySelector('.catbar-link.active');
    if (el && el.parentElement) {
      const box = el.parentElement;
      box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
    }
  }, [current, allActive, variant]);

  return (
    <>
      <Link href="/products" className={`${cls} ${allActive ? 'active' : ''}`} onClick={onNavigate}>
        <span className="cat-ic"><LayoutGrid size={15} /></span>All Products <em>{products.length}</em>
      </Link>
      {stocked.map((c) => (
        <Link
          key={c.name}
          href={`/products?category=${encodeURIComponent(c.name)}`}
          className={`${cls} ${current === c.name ? 'active' : ''}`}
          onClick={onNavigate}
        >
          <span className="cat-ic">{React.createElement(ICONS[c.name] || Package, { size: 15 })}</span>{c.name} <em>{c.count}</em>
        </Link>
      ))}
    </>
  );
}

// variant="bar": strip under the navbar (desktop). variant="drawer": list inside the phone sidebar.
export default function CategoryBar({ variant = 'bar', onNavigate }) {
  const content = (
    <Suspense fallback={null}>
      <Items variant={variant} onNavigate={onNavigate} />
    </Suspense>
  );
  if (variant === 'drawer') {
    return (
      <>
        <div className="nav-drawer-label drawer-cat-label">Shop by category</div>
        <div className="drawer-cats">{content}</div>
      </>
    );
  }
  return (
    <div className="catbar" aria-label="Product categories">
      <div className="container catbar-inner">
        <span className="catbar-title">Shop</span>
        <nav className="catbar-links">{content}</nav>
      </div>
    </div>
  );
}
