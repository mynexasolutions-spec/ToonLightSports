import Link from 'next/link';
import CategoryGrid from '../../components/CategoryGrid';
import { categories, products } from '../../data/mockData';

export const metadata = {
  title: 'Categories | Tonlight Sports',
  description: 'Browse Tonlight Sports gym equipment by category: strength, cardio, accessories, CrossFit and spare parts.',
};

export default function CategoriesPage() {
  const stocked = categories.filter((c) => products.some((p) => p.category === c.name));

  return (
    <div className="pg">
      <section className="pg-hero">
        <div className="pg-hero-shape" aria-hidden="true" />
        <div className="container pg-hero-inner">
          <nav className="pg-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><b>Categories</b>
          </nav>
          <h1 className="pg-title">Browse by <span>Categories</span></h1>
          <p className="pg-sub">Find the right equipment for your gym, hotel or home. Pick a category to see everything in it.</p>
          <div className="cat-stats">
            <div><strong>{stocked.length}</strong><span>Categories</span></div>
            <div><strong>{products.length}+</strong><span>Products</span></div>
            <div><strong>Pan India</strong><span>Delivery</span></div>
          </div>
        </div>
      </section>

      <div className="container pg-body cat-page-body">
        <CategoryGrid />
        <div className="cat-help">
          <div>
            <h3>Not sure what you need?</h3>
            <p>Tell us about your space and budget and we will suggest the right setup.</p>
          </div>
          <Link href="/products" className="btn btn-primary cat-help-btn">View All Products</Link>
        </div>
      </div>

    </div>
  );
}
