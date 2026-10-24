'use client';
import React, { Suspense } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { products, categories, siteConfig } from '../../data/mockData';
import { searchProducts } from '../../lib/search';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const PAGE_SIZE = 12;

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const searchFilter = searchParams.get('search');
  const requestedPage = parseInt(searchParams.get('page'), 10) || 1;
  const waPhone = siteConfig.footer.contact.find((c) => c.type === 'Phone').value.replace(/\D/g, '');

  // Filter logic
  let displayedProducts = products;
  if (categoryFilter) {
    displayedProducts = displayedProducts.filter((p) => p.category === categoryFilter);
  }
  if (searchFilter) {
    const found = new Set(searchProducts(searchFilter).map((p) => p.id));
    displayedProducts = searchProducts(searchFilter, displayedProducts);
    if (!found.size) displayedProducts = [];
  }

  // Pagination
  const totalPages = Math.max(1, Math.ceil(displayedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const pagedProducts = displayedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const pageHref = (n) => {
    const params = new URLSearchParams(searchParams.toString());
    if (n > 1) params.set('page', n); else params.delete('page');
    const qs = params.toString();
    return qs ? `/products?${qs}` : '/products';
  };

  const pageNumbers = [];
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1) pageNumbers.push(n);
    else if (pageNumbers[pageNumbers.length - 1] !== '...') pageNumbers.push('...');
  }

  // Title
  let title = 'All Products';
  if (searchFilter) title = `Search: "${searchFilter}"`;
  else if (categoryFilter) title = `${categoryFilter} Products`;
  const titleWords = title.split(' ');
  const titleLast = titleWords.pop();
  const titleLead = titleWords.join(' ');

  // Category chips (only categories that have products)
  const chips = categories
    .map((c) => ({ name: c.name, count: products.filter((p) => p.category === c.name).length }))
    .filter((c) => c.count > 0);

  return (
    <div className="pg">
      <section className="pg-hero">
        <div className="pg-hero-shape" aria-hidden="true" />
        <div className="container pg-hero-inner">
          <nav className="pg-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><b>Products</b>
          </nav>
          <h1 className="pg-title">{titleLead} <span>{titleLast}</span></h1>
          <p className="pg-sub">
            {searchFilter || categoryFilter
              ? `${displayedProducts.length} product${displayedProducts.length === 1 ? '' : 's'} found.`
              : 'Heavy-duty gym equipment, accessories and spare parts for gyms, hotels and homes.'}
          </p>
        </div>
      </section>

      <div className="container pg-body">
        <div className="pg-filters" role="toolbar" aria-label="Filter by category">
          <Link href="/products" className={`pg-chip ${!categoryFilter && !searchFilter ? 'active' : ''}`}>
            All <em>{products.length}</em>
          </Link>
          {chips.map((c) => (
            <Link
              key={c.name}
              href={`/products?category=${encodeURIComponent(c.name)}`}
              className={`pg-chip ${categoryFilter === c.name ? 'active' : ''}`}
            >
              {c.name} <em>{c.count}</em>
            </Link>
          ))}
          {(categoryFilter || searchFilter) && (
            <Link href="/products" className="pg-clear"><X size={14} /> Clear filters</Link>
          )}
        </div>

        <div className="pg-count">
          Showing <strong>{pagedProducts.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-{(currentPage - 1) * PAGE_SIZE + pagedProducts.length}</strong> of <strong>{displayedProducts.length}</strong> products
        </div>

        {pagedProducts.length > 0 ? (
          <div className="pop-grid pg-grid">
            {pagedProducts.map((product, index) => (
              <div key={product.id} className="pop-card">
                <a href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello! I'm interested in ${product.name} (${product.id}). Please share more details and pricing.`)}`} target="_blank" rel="noopener noreferrer" className="pop-img-wrap" aria-label={`Enquire about ${product.name} on WhatsApp`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1100px) 25vw, (min-width: 769px) 33vw, 50vw"
                    priority={index < 4}
                    className="pop-img"
                  />
                </a>
                <div className="pop-body">
                  <a href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello! I'm interested in ${product.name} (${product.id}). Please share more details and pricing.`)}`} target="_blank" rel="noopener noreferrer" className="pop-name">{product.name}</a>
                  <div className="pop-actions">
                    <Link href={`/product/${product.id}`} className="pop-details"><span className="pop-view">View </span>Details</Link>
                    <a
                      href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello! I'm interested in ${product.name} (${product.id}). Please share more details and pricing.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pop-wa"
                      aria-label={`Enquire about ${product.name} on WhatsApp`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.15 13.15 0 0 1-6.7-1.84l-.48-.29-4.72 1.24 1.26-4.6-.31-.5A13.17 13.17 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.2-9.87c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z" />
                      </svg>
                      <span className="pop-wa-text">Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pg-empty">
            <h3>{products.length === 0 ? 'Products coming soon' : 'No products found'}</h3>
            <p>
              {products.length === 0
                ? `Our new catalog is on its way. Call or WhatsApp us on ${siteConfig.footer.contact.find((c) => c.type === 'Phone').value} for the latest range.`
                : 'Try a different category or search term.'}
            </p>
            <Link href="/products" className="btn btn-primary">View all products <ArrowRight size={16} /></Link>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="pg-pager" aria-label="Product pages">
            {currentPage > 1 ? (
              <Link href={pageHref(currentPage - 1)} className="pg-page pg-page-nav" aria-label="Previous page"><ChevronLeft size={18} /></Link>
            ) : (
              <span className="pg-page pg-page-nav disabled"><ChevronLeft size={18} /></span>
            )}
            {pageNumbers.map((n, i) => n === '...' ? (
              <span key={`gap-${i}`} className="pg-gap">…</span>
            ) : (
              <Link key={n} href={pageHref(n)} className={`pg-page ${n === currentPage ? 'active' : ''}`} aria-current={n === currentPage ? 'page' : undefined}>{n}</Link>
            ))}
            {currentPage < totalPages ? (
              <Link href={pageHref(currentPage + 1)} className="pg-page pg-page-nav" aria-label="Next page"><ChevronRight size={18} /></Link>
            ) : (
              <span className="pg-page pg-page-nav disabled"><ChevronRight size={18} /></span>
            )}
          </nav>
        )}
      </div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
