'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Wrench,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { products, siteConfig } from '../../../data/mockData';
import EnquiryCTA from '../../../components/EnquiryCTA';

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: 'Heavy-Duty Build', text: 'Made for daily gym use' },
  { icon: Truck, title: 'Pan India Delivery', text: 'Right to your gym or home' },
  { icon: Wrench, title: 'Custom Setups', text: 'Colours and sizes on request' },
  { icon: MessageCircle, title: 'WhatsApp Support', text: 'Quick answers and pricing' }
];

const WA_PATH =
  'M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.15 13.15 0 0 1-6.7-1.84l-.48-.29-4.72 1.24 1.26-4.6-.31-.5A13.17 13.17 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.2-9.87c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z';

export default function ProductDetailsPage({ params }) {
  const { id } = React.use(params);

  const phone = siteConfig.footer.contact.find((c) => c.type === 'Phone').value;
  const waNumber = phone.replace(/\D/g, '');

  const whatsappEnquiry = (e) => {
    e.preventDefault();
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const msg = `Hello! I'm interested in *${product.name}* (${product.id}).\n\nProduct Link: ${pageUrl}\n\nPlease share more details and pricing.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pd-missing">
        <h2>Product Not Found</h2>
        <p>This product may have been removed or the link is incorrect.</p>
        <Link href="/products" className="btn btn-primary">Back to Products <ArrowRight size={16} /></Link>
      </div>
    );
  }

  // related: same category first, then fill with others
  const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
  const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
  const related = [...sameCategory, ...others].slice(0, 4);

  return (
    <div className="pd">
      <section className="pd-top">
        <div className="container">
          <nav className="pg-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/products">Products</Link><span>/</span>
            <Link href={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span>
            <b>{product.name}</b>
          </nav>

          <div className="pd-grid">
            {/* Photo */}
            <div className="pd-media">
              <div className="pd-frame">
                <img className="pd-bg" src={product.image} alt="" aria-hidden="true" />
                <img className="pd-img" src={product.image} alt={product.name} />
              </div>
            </div>

            {/* Details */}
            <div className="pd-info">
              <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="pd-cat">{product.category}</Link>
              <h1 className="pd-title">{product.name}</h1>
              <p className="pd-id">Product ID: {product.id}</p>

              <p className="pd-desc">
                A {product.name} from Tonlight Sports, built for hard daily use in commercial gyms, hotels and home gyms.
                Message us for pricing, available colours and delivery to your city.
              </p>

              {product.specs && product.specs.length > 0 && (
                <div className="pd-specs">
                  <h4>Specifications</h4>
                  <ul>
                    {product.specs.map((spec, i) => (
                      <li key={i}><CheckCircle size={16} />{spec}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pd-actions">
                <a
                  href={`https://wa.me/${waNumber}`}
                  onClick={whatsappEnquiry}
                  className="pd-wa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d={WA_PATH} /></svg>
                  Enquire on WhatsApp
                </a>
                <a href={`tel:+${waNumber}`} className="pd-call"><Phone size={18} />Call {phone}</a>
              </div>

              <div className="pd-highlights">
                {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="pd-hl">
                    <span className="pd-hl-icon"><Icon size={18} /></span>
                    <div><strong>{title}</strong><small>{text}</small></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <div className="pd-related-head">
              <h2 className="pd-related-title">You May Also <span>Like</span></h2>
              <Link href="/products" className="view-all pd-all">View All Products <ArrowRight size={16} /></Link>
            </div>
            <div className="pop-grid">
              {related.map((p) => (
                <div key={p.id} className="pop-card">
                  <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello! I'm interested in ${p.name} (${p.id}). Please share more details and pricing.`)}`} target="_blank" rel="noopener noreferrer" className="pop-img-wrap" aria-label={`Enquire about ${p.name} on WhatsApp`}>
                    <img src={p.image} alt={p.name} className="pop-img" loading="lazy" />
                  </a>
                  <div className="pop-body">
                    <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello! I'm interested in ${p.name} (${p.id}). Please share more details and pricing.`)}`} target="_blank" rel="noopener noreferrer" className="pop-name">{p.name}</a>
                    <div className="pop-actions">
                      <Link href={`/product/${p.id}`} className="pop-details"><span className="pop-view">View </span>Details</Link>
                      <a
                        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello! I'm interested in ${p.name} (${p.id}). Please share more details and pricing.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pop-wa"
                        aria-label={`Enquire about ${p.name} on WhatsApp`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d={WA_PATH} /></svg>
                        <span className="pop-wa-text">Enquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <EnquiryCTA />
    </div>
  );
}
