'use client';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, User, Package } from 'lucide-react';
import { siteConfig, products } from '../data/mockData';

const NEEDS = ['Full gym setup', 'Strength machines', 'Cardio equipment', 'Dumbbells, plates & bars', 'Spare parts', 'Flooring', 'Something else'];
const POINTS = ['Reply on WhatsApp with options and pricing', 'Custom setups for gyms, hotels and homes', 'Spare parts and rubber flooring too'];

export default function EnquiryCTA() {
  const contact = Object.fromEntries(siteConfig.footer.contact.map((c) => [c.type, c.value]));
  const waNumber = contact.Phone.replace(/\D/g, '');
  const [form, setForm] = useState({ name: '', phone: '', need: NEEDS[0] });
  const [error, setError] = useState('');

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setError('');
  };

  const submit = (e) => {
    e.preventDefault();
    const digits = form.phone.replace(/\D/g, '');
    if (!form.name.trim()) return setError('Please enter your name.');
    if (digits.length < 10) return setError('Please enter a valid 10-digit phone number.');
    const msg = `Hello Tonlight Sports! My name is ${form.name.trim()}.\nI am looking for: ${form.need}.\nPlease call or message me on ${digits}.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-panel">
          <div className="cta-copy">
            <div className="cta-eyebrow">GET A QUOTE</div>
            <h2 className="cta-title">Planning a Gym Setup?</h2>
            <p className="cta-desc">Tell us what you need and we will get back to you on WhatsApp with the right equipment and a price.</p>
            <ul className="cta-points">
              {POINTS.map((p) => (
                <li key={p}><CheckCircle size={20} />{p}</li>
              ))}
            </ul>
            <div className="cta-proof">
              <div className="cta-stack" aria-hidden="true">
                <img src="/products/hack-squat-orange.jpg" alt="" loading="lazy" />
                <img src="/products/bumper-plates-set-blue-red-green.jpg" alt="" loading="lazy" />
                <img src="/products/functional-trainer-2.jpg" alt="" loading="lazy" />
                <span>+{Math.max(products.length - 3, 0)}</span>
              </div>
              <p><strong>{products.length}+ products</strong> to choose from, from machines to spare parts.</p>
            </div>
            <div className="cta-contact">
              <a href={`tel:+${waNumber}`} className="cta-tile">
                <span className="cta-tile-icon"><Phone size={18} /></span>
                <span className="cta-tile-text"><small>Call us</small><strong>{contact.Phone}</strong></span>
              </a>
              <a href={`mailto:${contact.Mail}`} className="cta-tile">
                <span className="cta-tile-icon"><Mail size={18} /></span>
                <span className="cta-tile-text"><small>Email</small><strong>{contact.Mail}</strong></span>
              </a>
              <div className="cta-tile">
                <span className="cta-tile-icon"><MapPin size={18} /></span>
                <span className="cta-tile-text"><small>Visit us</small><strong>{contact.MapPin.replace(/\s*\(U\.P\.\)\s*INDIA$/, '')}</strong></span>
              </div>
            </div>
          </div>

          <form className="cta-form" onSubmit={submit} noValidate>
            <div className="cta-form-head">
              <span className="cta-form-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path fill="#25D366" d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5z"/><path fill="#FFFFFF" d="M23.2 18.93c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z"/></svg></span>
              <div>
                <h3 className="cta-form-title">Send us your requirement</h3>
                <p className="cta-form-sub">It only takes a minute.</p>
              </div>
            </div>
            <label className="cta-field">
              <span>Your name</span>
              <span className="cta-input"><User size={18} /><input type="text" value={form.name} onChange={set('name')} placeholder="Enter your name" autoComplete="name" /></span>
            </label>
            <label className="cta-field">
              <span>Phone number</span>
              <span className="cta-input"><Phone size={18} /><input type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile number" autoComplete="tel" /></span>
            </label>
            <label className="cta-field">
              <span>What do you need?</span>
              <span className="cta-input"><Package size={18} />
                <select value={form.need} onChange={set('need')}>
                {NEEDS.map((n) => <option key={n}>{n}</option>)}
              </select>
              </span>
            </label>
            {error && <p className="cta-error" role="alert">{error}</p>}
            <button type="submit" className="cta-submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.15 13.15 0 0 1-6.7-1.84l-.48-.29-4.72 1.24 1.26-4.6-.31-.5A13.17 13.17 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.2-9.87c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z" />
              </svg>
              Send on WhatsApp <ArrowRight size={18} />
            </button>
            <p className="cta-note">This opens WhatsApp with your details filled in.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
