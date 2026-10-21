'use client';
import React from 'react';
import { ShoppingCart, Search, User, CheckCircle, Package, Truck, Headphones, ChevronRight, Star, ArrowRight, ShieldCheck, Dumbbell, Mail, Phone, MapPin, ChevronLeft, Wrench, MessageCircle, Quote } from 'lucide-react';
import Link from 'next/link';
import { products, categories, testimonials, blogs, siteConfig } from '../data/mockData';
import { useCart } from '../context/CartContext';
import VideoShowcase from '../components/VideoShowcase';
import CategoryGrid from '../components/CategoryGrid';
import HeroSlider from '../components/HeroSlider';
import GalleryMarquee from '../components/GalleryMarquee';
import EnquiryCTA from '../components/EnquiryCTA';

const FEATURED_NAMES = [
  'Hack Squat (Orange)',
  '45° Leg Press (Orange)',
  'Functional Trainer (Dual Pulley)',
  'Smith Machine',
  'Hip Adductor / Abductor',
  'Preacher Curl Machine',
  'Pec Fly / Rear Delt (Orange)',
  'Lat Pulldown & Low Row (Black)',
];

export default function Home() {
  const { addToCart } = useCart();
  const waPhone = siteConfig.footer.contact.find((c) => c.type === 'Phone').value.replace(/\D/g, '');
  const featured = FEATURED_NAMES.map((n) => products.find((p) => p.name === n)).filter(Boolean);
  const popularProducts = featured.length >= 4 ? featured : products.slice(0, 8);
  const [galleryIndex, setGalleryIndex] = React.useState(0);

  const [itemsPerView, setItemsPerView] = React.useState(4);
  const [testisPerView, setTestisPerView] = React.useState(3);

  const [galleryTouchStart, setGalleryTouchStart] = React.useState(null);
  const [testisTouchStart, setTestisTouchStart] = React.useState(null);


  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(2);
        setTestisPerView(1);
      } else if (window.innerWidth < 992) {
        setItemsPerView(2);
        setTestisPerView(2);
      } else {
        setItemsPerView(4);
        setTestisPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  
  const galleryItems = siteConfig.exploreGallery.categories;
  const galleryMaxIndex = Math.max(0, galleryItems.length - itemsPerView);
  
  const nextGallery = () => {
    setGalleryIndex(prev => (prev >= galleryMaxIndex ? 0 : prev + 1));
  };

  const [testimonialIndex, setTestimonialIndex] = React.useState(0);
  const testimonialMaxIndex = Math.max(0, testimonials.length - testisPerView);

  React.useEffect(() => {
    const galleryInterval = setInterval(() => {
      setGalleryIndex(prev => (prev >= galleryMaxIndex ? 0 : prev + 1));
    }, 3000);
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev >= testimonialMaxIndex ? 0 : prev + 1));
    }, 4000);
    return () => {
      clearInterval(galleryInterval);
      clearInterval(testimonialInterval);
    };
  }, [galleryMaxIndex, testimonialMaxIndex]);
  
  const prevGallery = () => {
    setGalleryIndex(prev => (prev <= 0 ? galleryMaxIndex : prev - 1));
  };

  const nextTestimonial = () => {
    setTestimonialIndex(prev => (prev >= testimonialMaxIndex ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setTestimonialIndex(prev => (prev <= 0 ? testimonialMaxIndex : prev - 1));
  };
  
  
  const handleGalleryTouchStart = (e) => setGalleryTouchStart(e.touches[0].clientX);
  const handleGalleryTouchEnd = (e) => {
    if (galleryTouchStart === null) return;
    const currentTouch = e.changedTouches[0].clientX;
    const diff = galleryTouchStart - currentTouch;
    if (diff > 50) nextGallery();
    else if (diff < -50) prevGallery();
    setGalleryTouchStart(null);
  };

  const handleTestisTouchStart = (e) => setTestisTouchStart(e.touches[0].clientX);
  const handleTestisTouchEnd = (e) => {
    if (testisTouchStart === null) return;
    const currentTouch = e.changedTouches[0].clientX;
    const diff = testisTouchStart - currentTouch;
    if (diff > 50) nextTestimonial();
    else if (diff < -50) prevTestimonial();
    setTestisTouchStart(null);
  };

  const getIcon = (iconName) => {
    const icons = { ShieldCheck, CheckCircle, User, Truck, Headphones, Package, MapPin, Wrench, MessageCircle };
    const Icon = icons[iconName];
    return Icon ? <Icon className="feature-icon-wrapper" size={28} /> : null;
  };
  
  const getWhyIcon = (iconName) => {
    const icons = { ShieldCheck, Package, MapPin, User };
    const Icon = icons[iconName];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <>

      {/* HERO SECTION */}
      <section className="hero">
        <HeroSlider />
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge"><span className="hero-badge-dot"></span>{siteConfig.hero.subtitle}</div>
            <h1 className="hero-title">{siteConfig.hero.titleLine1}<br/><span className="text-primary">{siteConfig.hero.titleHighlight}</span><br/>{siteConfig.hero.titleLine2}</h1>
            <p className="hero-description">{siteConfig.hero.description}</p>
            <div className="hero-buttons">
              {siteConfig.hero.buttons.map(btn => (
                <Link key={btn.text} href={btn.link} className={`btn ${btn.primary ? 'btn-primary' : 'btn-outline'}`}>
                  {btn.text}{btn.primary && <ArrowRight size={18} />}
                </Link>
              ))}
            </div>
            <div className="hero-stats">
              <div><div className="hero-stat-num">{products.length}+</div><div className="hero-stat-label">Products</div></div>
              <div><div className="hero-stat-num">100%</div><div className="hero-stat-label">Custom Setups</div></div>
              <div><div className="hero-stat-num">Pan India</div><div className="hero-stat-label">Delivery</div></div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURE BAR */}
      <div className="feature-bar">
        <div className="feature-bar-marquee">
          <div className="feature-bar-container">
            {[...siteConfig.featureBar, ...siteConfig.featureBar].map((feature, index) => (
              <div key={`${feature.id}-${index}`} className="feature-item">
                {getIcon(feature.icon)}
                <div className="feature-text">
                  <div className="feature-title">{feature.title.replace('{count}', products.length)}</div>
                  <div className="feature-subtitle">{feature.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION (LIGHT) */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-subtitle">EXPLORE OUR RANGE</div>
              <h2 className="section-title">Shop by <span>Category</span></h2>
            </div>
            <Link href="/categories" className="view-all">View All Categories <ArrowRight size={16} /></Link>
          </div>
          
          <CategoryGrid />
        </div>
      </section>

      {/* POPULAR EQUIPMENT SECTION (DARK) */}
      {products.length > 0 && (
      <section className="section popular-section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-subtitle">FEATURED PRODUCTS</div>
              <h2 className="section-title">Popular <span>Equipment</span></h2>
            </div>
            <Link href="/products" className="view-all">View All Products <ArrowRight size={16} /></Link>
          </div>

          <div className="pop-grid">
            {popularProducts.map((product) => (
              <div key={product.id} className="pop-card">
                <Link href={`/product/${product.id}`} className="pop-img-wrap">
                  <img src={product.image} alt={product.name} className="pop-img" loading="lazy" />
                </Link>
                <div className="pop-body">
                  <Link href={`/product/${product.id}`} className="pop-name">{product.name}</Link>
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
        </div>
      </section>
      )}

      {/* WHY CHOOSE US SECTION (LIGHT) */}
      <section className="section wc-section">
        <div className="wc-bg" aria-hidden="true"></div>
        <div className="container wc-grid">
          <div className="wc-left">
            <div className="section-subtitle">{siteConfig.whyChooseUs.subtitle}</div>
            <h2 className="wc-title">{siteConfig.whyChooseUs.titleMain} <span>{siteConfig.whyChooseUs.titleHighlight}</span></h2>
            <h3 className="wc-sub">{siteConfig.whyChooseUs.subHeading}</h3>
            <p className="wc-desc">{siteConfig.whyChooseUs.description}</p>

            <div className="wc-features">
              {siteConfig.whyChooseUs.features.map((feature, i) => (
                <div key={feature.id} className="wc-card">
                  <span className="wc-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="wc-icon">{getWhyIcon(feature.icon)}</div>
                  <h4 className="wc-card-title">{feature.title}</h4>
                  <p className="wc-card-desc">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="wc-cta">
              <Link href="/about-us" className="btn btn-primary wc-btn">Learn More <ArrowRight size={18} /></Link>
              <a href={`https://wa.me/${waPhone}?text=${encodeURIComponent('Hello! I would like to know more about your gym equipment.')}`} target="_blank" rel="noopener noreferrer" className="wc-wa">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.15 13.15 0 0 1-6.7-1.84l-.48-.29-4.72 1.24 1.26-4.6-.31-.5A13.17 13.17 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.2-9.87c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z" />
                </svg>
                <span className="wa-pre">Chat on </span>WhatsApp
              </a>
            </div>
          </div>

          <div className="wc-visual">
            <div className="wc-block" aria-hidden="true"></div>
            <div className="wc-photo wc-photo-1"><img src="/products/lat-pulldown-low-row-black.jpg" alt="Lat pulldown and low row station" loading="lazy" /></div>
            <div className="wc-photo wc-photo-2"><img src="/products/leg-press-orange.jpg" alt="45 degree leg press" loading="lazy" /></div>
            <div className="wc-badge">
              {siteConfig.whyChooseUs.badgeText.map((text, idx) => (
                <span key={idx}>{text}</span>
              ))}
            </div>
            <div className="wc-chip"><strong>{products.length}+</strong><span>Products</span></div>
          </div>
        </div>
      </section>

      {/* VIDEO SHOWCASE (DARK) */}
      <VideoShowcase />

      {/* EXPLORE RANGE GALLERY (DARK) */}
      <GalleryMarquee />

      {/* TESTIMONIALS (LIGHT) */}
      <section className="section tm-section">
        <div className="tm-mark" aria-hidden="true">&ldquo;</div>
        <div className="container tm-container">
          <div className="tm-head">
            <div>
              <div className="section-subtitle">TESTIMONIALS</div>
              <h2 className="tm-title">What Our <span>Customers Say</span></h2>
            </div>
            <div className="tm-nav">
              <button type="button" className="tm-arrow" onClick={prevTestimonial} aria-label="Previous review"><ChevronLeft size={22} /></button>
              <button type="button" className="tm-arrow tm-arrow-fill" onClick={nextTestimonial} aria-label="Next review"><ChevronRight size={22} /></button>
            </div>
          </div>

          <div className="tm-viewport" onTouchStart={handleTestisTouchStart} onTouchEnd={handleTestisTouchEnd}>
            <div
              className="tm-track"
              style={{ transform: `translateX(calc(-${testimonialIndex} * ((100% + 24px) / ${testisPerView})))` }}
            >
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="tm-card"
                  style={{ flex: `0 0 calc((100% - 24px * ${testisPerView - 1}) / ${testisPerView})` }}
                >
                  <span className="tm-quote-icon"><Quote size={20} /></span>
                  <div className="tm-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < testimonial.rating ? 'var(--primary-color)' : 'transparent'} color={i < testimonial.rating ? '#c9a800' : '#cfd2d8'} />
                    ))}
                  </div>
                  <p className="tm-text">{testimonial.quote}</p>
                  <div className="tm-author">
                    <span className="tm-avatar" aria-hidden="true">{testimonial.initials}</span>
                    <div>
                      <div className="tm-name">{testimonial.name}</div>
                      <div className="tm-role">{testimonial.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="tm-dots">
            {Array.from({ length: testimonialMaxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`tm-dot ${idx === testimonialIndex ? 'active' : ''}`}
                onClick={() => setTestimonialIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GET A QUOTE */}
      <EnquiryCTA />

    </>
  );
}
