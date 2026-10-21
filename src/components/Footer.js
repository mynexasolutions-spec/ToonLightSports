import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig, categories } from '../data/mockData';
import BackToTop from './BackToTop';

export default function Footer() {
  const contact = Object.fromEntries(siteConfig.footer.contact.map((c) => [c.type, c.value]));
  const waNumber = contact.Phone.replace(/\D/g, '');

  return (
    <footer className="footer ft">
  <div className="ft-glow" aria-hidden="true" />
  <div className="container ft-grid">
    <div className="ft-brand">
      <Link href="/" className="ft-logo">
        <img src="/logo.png" alt="Tonlight Sports Logo" />
      </Link>
      <p className="ft-about">Gym equipment, spare parts and flooring for gyms, hotels and homes across India.</p>
      <p className="ft-tag">{siteConfig.footer.slogan}</p>
    </div>

    <nav className="ft-col" aria-label="Quick links">
      <h4 className="ft-heading">Quick Links</h4>
      <ul className="ft-list">
        {siteConfig.navLinks.map((link) => (
          <li key={link.name}><Link href={link.path}>{link.name}</Link></li>
        ))}
      </ul>
    </nav>

    <nav className="ft-col" aria-label="Our range">
      <h4 className="ft-heading">Our Range</h4>
      <ul className="ft-list">
        {categories.map((cat) => (
          <li key={cat.id}><Link href={`/products?category=${encodeURIComponent(cat.name)}`}>{cat.name}</Link></li>
        ))}
      </ul>
    </nav>

    <div className="ft-col">
      <h4 className="ft-heading">Get In Touch</h4>
      <ul className="ft-contact">
        <li>
          <span className="ft-ic"><Phone size={16} /></span>
          <a href={`tel:+${waNumber}`}>{contact.Phone}</a>
        </li>
        <li>
          <span className="ft-ic"><Mail size={16} /></span>
          <a href={`mailto:${contact.Mail}`}>{contact.Mail}</a>
        </li>
        <li>
          <span className="ft-ic"><MapPin size={16} /></span>
          <span>{contact.MapPin.replace('INDIA', 'India')}</span>
        </li>
      </ul>
    </div>
  </div>

  <div className="container ft-bottom">
    <p>&copy; {new Date().getFullYear()} Tonlight Sports. All rights reserved.</p>
    <BackToTop />
  </div>
    </footer>
  );
}
