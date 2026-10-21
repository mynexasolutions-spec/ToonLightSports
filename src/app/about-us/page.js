import Link from 'next/link';
import { ArrowRight, ShieldCheck, Handshake, MessageCircle, Wrench, Package, MapPin } from 'lucide-react';
import { categories, products, siteConfig } from '../../data/mockData';

export const metadata = {
  title: 'About Us | Tonlight Sports',
  description: 'Tonlight Sports supplies gym equipment, spare parts and flooring from Kareem Nagar, Hapur Road, Meerut.',
};

const VALUES = [
  { icon: ShieldCheck, title: 'Built to last', text: 'Heavy-duty equipment chosen for hard, everyday use in busy gyms.' },
  { icon: Handshake, title: 'Honest advice', text: 'We suggest what fits your space and budget, not simply the costliest option.' },
  { icon: MessageCircle, title: 'Quick support', text: 'Message us on WhatsApp and get a reply with options and pricing.' },
  { icon: Wrench, title: 'Custom setups', text: 'Gyms, hotels, institutions and homes. Tell us what you need.' },
];

export default function AboutUsPage() {
  const contact = Object.fromEntries(siteConfig.footer.contact.map((c) => [c.type, c.value]));
  const waNumber = contact.Phone.replace(/\D/g, '');
  const stocked = categories
    .map((c) => ({ ...c, count: products.filter((p) => p.category === c.name).length }))
    .filter((c) => c.count > 0);

  const stats = [
    { value: `${products.length}+`, label: 'Products' },
    { value: stocked.length, label: 'Categories' },
    { value: 'Meerut', label: 'Our base' },
    { value: 'Pan India', label: 'Delivery' },
  ];

  return (
    <div className="pg">
      <section className="pg-hero">
        <div className="pg-hero-shape" aria-hidden="true" />
        <div className="container pg-hero-inner">
          <nav className="pg-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><b>About Us</b>
          </nav>
          <h1 className="pg-title">About <span>Tonlight Sports</span></h1>
          <p className="pg-sub">Gym equipment, spare parts and flooring for gyms, hotels and homes, from our base in Meerut.</p>
        </div>
      </section>

      {/* Story */}
      <section className="wc-section ab-story">
        <div className="wc-bg" aria-hidden="true" />
        <div className="container wc-grid">
          <div className="wc-left">
            <div className="section-subtitle">WHO WE ARE</div>
            <h2 className="wc-title">Gym equipment, <span>made simple</span></h2>
            <p className="wc-desc">
              Tonlight Sports is a gym equipment business based at Kareem Nagar, Hapur Road, Meerut. We supply strength machines,
              cardio equipment, accessories, CrossFit gear, spare parts and rubber flooring for gyms, hotels and home setups.
            </p>
            <p className="wc-desc ab-p2">
              Our aim is simple: sturdy equipment, honest advice and quick support, so you can open your gym or train at home with confidence.
            </p>
            <div className="wc-cta" style={{ marginTop: 28 }}>
              <Link href="/products" className="btn btn-primary wc-btn">View Products <ArrowRight size={18} /></Link>
              <Link href="/contact" className="ab-ghost">Contact Us</Link>
            </div>
          </div>

          <div className="wc-visual">
            <div className="wc-block" aria-hidden="true" />
            <div className="wc-photo wc-photo-1"><img src="/products/power-rack-with-bench.jpg" alt="Power rack with bench" loading="lazy" /></div>
            <div className="wc-photo wc-photo-2"><img src="/products/leg-press-orange.jpg" alt="45 degree leg press" loading="lazy" /></div>
            <div className="wc-badge">
              {siteConfig.whyChooseUs.badgeText.map((text) => <span key={text}>{text}</span>)}
            </div>
            <div className="wc-chip"><strong>{products.length}+</strong><span>Products</span></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="container ab-stats-wrap">
        <div className="ab-stats">
          {stats.map((s) => (
            <div key={s.label} className="ab-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What we offer */}
      <section className="ab-offer">
        <div className="container">
          <div className="ab-head">
            <div className="section-subtitle">WHAT WE OFFER</div>
            <h2 className="ab-title">Everything for your <span>gym</span></h2>
          </div>
          <div className="ab-offer-grid">
            {stocked.map((c, i) => (
              <Link key={c.id} href={`/products?category=${encodeURIComponent(c.name)}`} className="wc-card ab-offer-card">
                <span className="wc-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="wc-icon"><Package size={20} /></div>
                <h4 className="wc-card-title">{c.name}</h4>
                <p className="wc-card-desc">{c.desc}</p>
                <span className="ab-offer-count">{c.count} products <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="ab-values-sec">
        <div className="container">
          <div className="ab-head">
            <div className="section-subtitle">OUR PROMISE</div>
            <h2 className="ab-title">How we <span>work</span></h2>
          </div>
          <div className="ab-values">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="ab-value">
                <span className="ab-value-icon"><Icon size={22} /></span>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="ab-visit">
        <div className="container">
          <div className="ab-visit-card">
            <div>
              <div className="ab-visit-eyebrow"><MapPin size={16} /> VISIT US</div>
              <h2>Come and see us in Meerut</h2>
              <p>{contact.MapPin.replace('INDIA', 'India')}</p>
            </div>
            <div className="ab-visit-actions">
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="ab-visit-wa">WhatsApp Us</a>
              <Link href="/contact" className="ab-visit-btn">Get Directions <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
