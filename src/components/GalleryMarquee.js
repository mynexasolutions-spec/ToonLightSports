import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products, siteConfig } from '../data/mockData';

// Hand-picked photos from the real catalog; names that no longer exist are skipped.
const ROW_ONE = [
  'Hack Squat (Orange)',
  'Functional Trainer (Dual Pulley)',
  'Bumper Plates Set (Blue, Red, Green)',
  'Smith Machine',
  'Commercial Treadmills (Showroom)',
  'Preacher Curl Machine',
  'Rubber Dumbbell Set with 2-Tier Rack',
  'Cable Crossover',
];
const ROW_TWO = [
  '45° Leg Press (Orange)',
  'Weight Plate Tree with Star Plates',
  'Hip Adductor / Abductor',
  'Treadmill & Cross Trainer',
  'Power Rack with Bench',
  'Pec Fly / Rear Delt (Orange)',
  'Olympic Barbells (Chrome)',
  'Lat Pulldown & Low Row (Black)',
];

const pick = (names) => names.map((n) => products.find((p) => p.name === n)).filter(Boolean);

function Row({ items, reverse }) {
  // list is rendered twice so the -50% translate loops seamlessly
  const loop = [...items, ...items];
  return (
    <div className="gm-row">
      <div className={`gm-track ${reverse ? 'gm-reverse' : ''}`}>
        {loop.map((p, i) => (
          <Link
            key={`${p.id}-${i}`}
            href={`/product/${p.id}`}
            className="gm-card"
            aria-hidden={i >= items.length ? 'true' : undefined}
            tabIndex={i >= items.length ? -1 : undefined}
          >
            <img src={p.image} alt={i >= items.length ? '' : p.name} loading="lazy" draggable="false" />
            <span className="gm-shade" />
            <span className="gm-cat">{p.category}</span>
            <span className="gm-name">{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function GalleryMarquee() {
  const one = pick(ROW_ONE);
  const two = pick(ROW_TWO);
  if (one.length + two.length < 4) return null;
  const g = siteConfig.exploreGallery;

  return (
    <section className="section gm-section">
      <div className="gm-glow" aria-hidden="true" />
      <div className="container gm-head">
        <div className="gm-head-copy">
          <div className="section-subtitle">{g.subtitle}</div>
          <h2 className="gm-title">{g.titleMain} <span>{g.titleHighlight}</span></h2>
          <p className="gm-desc">{g.description}</p>
        </div>
        <Link href="/products" className="btn btn-primary gm-btn">View Full Catalog <ArrowRight size={18} /></Link>
      </div>

      <div className="gm-rows">
        <Row items={one.length ? one : two} />
        <Row items={two.length ? two : one} reverse />
      </div>

      <div className="container gm-foot">
        <span><strong>{products.length}+</strong> products and counting</span>
        <Link href="/categories" className="gm-link">Browse by category <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
