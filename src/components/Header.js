'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Phone, Mail, MapPin, House, Package, LayoutGrid, Info, ChevronRight } from 'lucide-react';
import { siteConfig } from '../data/mockData';
import SearchBox from './SearchBox';
import CategoryBar from './CategoryBar';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';

const NAV_ICONS = { Home: House, Products: Package, Categories: LayoutGrid, 'About Us': Info, Contact: Phone };

const outgoingVariants = {
  rest: { transform: "translateY(0%)" },
  active: { transform: "translateY(100%)" },
};

const incomingVariants = {
  rest: { transform: "translateY(-100%)" },
  active: { transform: "translateY(0%)" },
};

const transition = {
  duration: 0.3,
  ease: [0.338, 0.015, 0.395, 0.959],
};

function RollingNavLink({ href, children, isActive, onClick, icon: Icon }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const animating = useRef(false);
  const pendingRequest = useRef(null);
  const hovered = useRef(false);
  const focused = useRef(false);

  const updateActive = (next) => {
    activeRef.current = next;
    setActive(next);
  };

  const requestActive = (next) => {
    if (reduceMotion) return;
    if (next === activeRef.current) {
      pendingRequest.current = null;
      return;
    }
    if (animating.current) {
      pendingRequest.current = next;
      return;
    }
    animating.current = true;
    updateActive(next);
  };

  const completeAnimation = () => {
    if (!animating.current) return;
    animating.current = false;

    if (pendingRequest.current !== null && pendingRequest.current !== activeRef.current) {
      const next = pendingRequest.current;
      pendingRequest.current = null;
      animating.current = true;
      updateActive(next);
    } else {
      pendingRequest.current = null;
    }
  };

  return (
    <Link
      href={href}
      className={`nav-link ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={() => {
        hovered.current = true;
        requestActive(true);
      }}
      onMouseLeave={() => {
        hovered.current = false;
        requestActive(focused.current);
      }}
      onFocus={() => {
        focused.current = true;
        requestActive(true);
      }}
      onBlur={() => {
        focused.current = false;
        requestActive(hovered.current);
      }}
      style={{ display: 'block', overflow: 'hidden', position: 'relative' }}
    >
      <motion.span
        className="roll-text"
        style={{ display: 'block', whiteSpace: 'nowrap' }}
        variants={outgoingVariants}
        initial="rest"
        animate={active ? "active" : "rest"}
        onAnimationComplete={completeAnimation}
        transition={transition}
      >
        {children}
      </motion.span>
      <motion.span
        className="roll-text"
        style={{ position: 'absolute', inset: 0, display: 'block', whiteSpace: 'nowrap' }}
        variants={incomingVariants}
        initial="rest"
        animate={active ? "active" : "rest"}
        transition={transition}
      >
        {children}
      </motion.span>
      {Icon && <span className="nav-link-icon" aria-hidden="true"><Icon size={18} /></span>}
      <ChevronRight className="nav-link-chev" size={16} aria-hidden="true" />
    </Link>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);

  const contact = Object.fromEntries(siteConfig.footer.contact.map((c) => [c.type, c.value]));
  const phoneHref = `tel:+${contact.Phone.replace(/\D/g, '')}`;

  React.useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className={`container header-container ${isSearchFocused ? 'search-active' : ''}`}>
        <Link href="/" className="logo">
          <img src="/logo.png" alt="Tonlight Sports Logo" />
        </Link>
        <div
          className={`nav-backdrop ${isMobileMenuOpen ? 'show' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <nav className={`nav ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <div className="nav-drawer-head">
            <img src="/logo.png" alt="Tonlight Sports" />
            <button type="button" className="nav-drawer-close" aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="nav-drawer-label">Menu</div>
          {siteConfig.navLinks.map((link) => (
            <RollingNavLink
              key={link.name}
              href={link.path}
              isActive={mounted && pathname === link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              icon={NAV_ICONS[link.name]}
            >
              {link.name}
            </RollingNavLink>
          ))}
          <CategoryBar variant="drawer" onNavigate={() => setIsMobileMenuOpen(false)} />
          <div className="nav-cta-row">
            <a href={phoneHref} className="nav-cta-mobile"><Phone size={16} />Call Now</a>
            <a href={`https://wa.me/${contact.Phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="nav-cta-wa">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.15 13.15 0 0 1-6.7-1.84l-.48-.29-4.72 1.24 1.26-4.6-.31-.5A13.17 13.17 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.2-9.87c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="nav-drawer-contact">
            <a href={phoneHref}><span className="dc-ic"><Phone size={15} /></span>{contact.Phone}</a>
            <a href={`mailto:${contact.Mail}`}><span className="dc-ic"><Mail size={15} /></span>{contact.Mail}</a>
            <span><span className="dc-ic"><MapPin size={15} /></span>{contact.MapPin.replace(/\s*\(U\.P\.\)\s*INDIA$/, '')}</span>
          </div>
        </nav>
        <div className="header-actions">
          <SearchBox onNavigate={() => setIsMobileMenuOpen(false)} onFocusChange={setIsSearchFocused} />

          <a href={phoneHref} className="header-cta"><Phone size={16} />Call Now</a>

          <button
            className="action-btn mobile-menu-btn"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <CategoryBar />
      <span className="header-progress" ref={progressRef} aria-hidden="true" />
    </header>
    </>
  );
}
