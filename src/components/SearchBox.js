'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchProducts } from '../lib/search';

const MAX_RESULTS = 6;

export default function SearchBox({ onNavigate, onFocusChange }) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => searchProducts(query), [query]);
  const shown = results.slice(0, MAX_RESULTS);
  const trimmed = query.trim();

  // keep the box in sync with the page: show the active ?search= on /products, clear it elsewhere
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(pathname === '/products' ? params.get('search') || '' : '');
    setOpen(false);
  }, [pathname]);

  // press "/" anywhere to jump to the search box
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (e.target && e.target.isContentEditable)) return;
      e.preventDefault();
      inputRef.current && inputRef.current.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // close when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, []);

  const finish = () => {
    setOpen(false);
    setActive(-1);
    inputRef.current && inputRef.current.blur();
    onNavigate && onNavigate();
  };

  const submit = (e) => {
    e.preventDefault();
    if (active >= 0 && shown[active]) {
      router.push(`/product/${shown[active].id}`);
    } else if (trimmed) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/products');
    }
    finish();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (shown.length ? (i + 1) % shown.length : -1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (shown.length ? (i <= 0 ? shown.length - 1 : i - 1) : -1));
    }
  };

  const clear = () => {
    setQuery('');
    setActive(-1);
    setOpen(false);
    inputRef.current && inputRef.current.focus();
  };

  const showPanel = open && trimmed.length > 0;

  return (
    <div className="search-wrap" ref={wrapRef}>
      <form className="header-search-form" onSubmit={submit} role="search">
        <Search size={15} color="rgba(255,255,255,0.55)" />
        <input
          ref={inputRef}
          type="text"
          className="header-search-input"
          placeholder="Search products..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => { setOpen(true); onFocusChange && onFocusChange(true); }}
          onBlur={() => onFocusChange && onFocusChange(false)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          aria-label="Search products"
          aria-expanded={showPanel}
        />
        {!query && <kbd className="search-kbd" aria-hidden="true">/</kbd>}
        {query && (
          <button type="button" className="search-clear" onClick={clear} aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </form>

      {showPanel && (
        <div className="search-pop" role="listbox">
          {shown.length > 0 ? (
            <>
              <div className="search-pop-label">{results.length} result{results.length === 1 ? '' : 's'}</div>
              {shown.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className={`search-item ${i === active ? 'active' : ''}`}
                  onClick={finish}
                  onMouseEnter={() => setActive(i)}
                  role="option"
                  aria-selected={i === active}
                >
                  <img src={p.image} alt="" loading="lazy" />
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.category}</small>
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ))}
              <Link
                href={`/products?search=${encodeURIComponent(trimmed)}`}
                className="search-all"
                onClick={finish}
              >
                View all {results.length} results for &ldquo;{trimmed}&rdquo; <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <div className="search-empty">
              <strong>No products found for &ldquo;{trimmed}&rdquo;</strong>
              <span>Try another word, or message us on WhatsApp and we will help you find it.</span>
              <Link href="/contact" className="search-all" onClick={finish}>Contact us <ArrowRight size={16} /></Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
