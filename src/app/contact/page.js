import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight, ChevronDown } from 'lucide-react';
import ContactForm from '../../components/ContactForm';
import { siteConfig } from '../../data/mockData';

export const metadata = {
  title: 'Contact Us | Tonlight Sports',
  description: 'Call, WhatsApp or visit Tonlight Sports at Kareem Nagar, Hapur Road, Meerut for gym equipment, spare parts and flooring.',
};

const FAQS = [
  {
    q: 'How do I get a price?',
    a: 'Send us the product name or a photo on WhatsApp, or fill the quote form on this page. We will reply with the price and options.',
  },
  {
    q: 'Can I visit you?',
    a: 'Yes. You are welcome at Kareem Nagar, Hapur Road, Meerut. Please call us before you come so we can be ready for you.',
  },
  {
    q: 'Do you help plan a full gym?',
    a: 'Yes. Tell us your space, budget and the kind of members you expect, and we will suggest the machines and layout.',
  },
  {
    q: 'Do you have spare parts and flooring?',
    a: 'Yes. We have pads, pulleys, caps, handles, treadmill belts and rubber floor tiles. Browse the Spare Parts & Flooring category.',
  },
  {
    q: 'Can you deliver to my city?',
    a: 'Message us your city and we will confirm the delivery options and timing for you.',
  },
];

export default function ContactPage() {
  const contact = Object.fromEntries(siteConfig.footer.contact.map((c) => [c.type, c.value]));
  const waNumber = contact.Phone.replace(/\D/g, '');
  const address = contact.MapPin.replace('INDIA', 'India');
  const mapsLink = 'https://www.google.com/maps/search/?api=1&query=Kareem+Nagar+Hapur+Road+Meerut';

  const cards = [
    { icon: Phone, label: 'Call us', value: contact.Phone, href: `tel:+${waNumber}`, note: 'Talk to us directly' },
    { icon: null, label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${waNumber}`, note: 'Fastest way to get a price', external: true, green: true },
    { icon: Mail, label: 'Email', value: contact.Mail, href: `mailto:${contact.Mail}`, note: 'Send us your requirement' },
    { icon: MapPin, label: 'Visit us', value: 'Kareem Nagar, Hapur Road', href: mapsLink, note: 'Meerut, Uttar Pradesh', external: true },
  ];

  return (
    <div className="pg">
      <section className="pg-hero">
        <div className="pg-hero-shape" aria-hidden="true" />
        <div className="container pg-hero-inner">
          <nav className="pg-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><b>Contact</b>
          </nav>
          <h1 className="pg-title">Contact <span>Us</span></h1>
          <p className="pg-sub">Questions about equipment, spare parts or setting up your gym? Call us, message us on WhatsApp or visit us in Meerut.</p>
        </div>
      </section>

      <div className="container ct-body">
        <div className="ct-cards">
          {cards.map(({ icon: Icon, label, value, href, note, external, green }) => (
            <a
              key={label}
              href={href}
              className={`ct-card ${green ? 'ct-card-green' : ''}`}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className={`ct-card-icon ${Icon ? '' : 'ct-card-wa'}`}>{Icon && <Icon size={22} />}</span>
              <span className="ct-card-text">
                <small>{label}</small>
                <strong>{value}</strong>
                <em>{note}</em>
              </span>
              <ArrowUpRight className="ct-card-arrow" size={20} />
            </a>
          ))}
        </div>

        {/* Message form */}
        <div className="ct-form-wrap">
          <div className="ct-form-copy">
            <div className="section-subtitle">SEND A MESSAGE</div>
            <h2 className="ct-form-title">Tell us <span>what you need</span></h2>
            <p>Write your requirement and send it straight to our WhatsApp. The more you tell us, the better we can help.</p>
            <ul className="ct-tips">
              <li>Mention the product name or a photo reference</li>
              <li>Tell us your city, so we can confirm delivery</li>
              <li>Share your budget if you have one in mind</li>
            </ul>
          </div>
          <ContactForm />
        </div>

        {/* Map */}
        <div className="ct-map">
          <iframe
            title="Tonlight Sports location on Google Maps"
            src="https://maps.google.com/maps?q=Kareem+Nagar,+Hapur+Road,+Meerut&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="ct-map-card">
            <span className="ct-map-pin"><MapPin size={20} /></span>
            <h3>Tonlight Sports</h3>
            <p>{address}</p>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="ct-map-btn">
              Get Directions <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="ct-faq">
          <div className="ct-faq-head">
            <div className="section-subtitle">SUPPORT</div>
            <h2 className="ct-faq-title">Frequently Asked <span>Questions</span></h2>
          </div>
          <div className="ct-faq-list">
            {FAQS.map((f) => (
              <details key={f.q} className="ct-q">
                <summary>
                  <span>{f.q}</span>
                  <ChevronDown size={20} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
