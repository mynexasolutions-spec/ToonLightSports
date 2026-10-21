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
      <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="ft-wa">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.15 13.15 0 0 1-6.7-1.84l-.48-.29-4.72 1.24 1.26-4.6-.31-.5A13.17 13.17 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.2-9.87c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z" />
        </svg>
        Chat on WhatsApp
      </a>
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
