'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Maximize2, Volume2, VolumeX, X } from 'lucide-react';
import { siteConfig } from '../data/mockData';

const POINTS = ['Heavy-duty build quality', 'Custom gym setups', 'Delivery across India'];

// Plays while on screen (muted so browsers allow autoplay). Click or the button opens it big.
function ShowVideo({ src, poster, className, label, sound = false, onExpand }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className={`vs-frame ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={() => onExpand && onExpand({ src, poster })}
      />
      <span className="vs-label"><span className="vs-live" />{label}</span>
      {sound && (
        <button type="button" className="vs-sound" onClick={toggleMute} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}
      <button type="button" className="vs-expand" onClick={() => onExpand && onExpand({ src, poster })} aria-label="Watch full screen">
        <Maximize2 size={16} /><span>Full screen</span>
      </button>
    </div>
  );
}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="vs-modal" role="dialog" aria-modal="true" aria-label="Video" onClick={onClose}>
      <button type="button" className="vs-modal-close" onClick={onClose} aria-label="Close video"><X size={22} /></button>
      <video
        className="vs-modal-video"
        src={item.src}
        poster={item.poster}
        autoPlay
        loop
        playsInline
        controls
        controlsList="nodownload"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function VideoShowcase() {
  const [modal, setModal] = useState(null);
  const phone = siteConfig.footer.contact.find((c) => c.type === 'Phone').value.replace(/\D/g, '');

  return (
    <section className="section vs-section">
      <div className="vs-glow" aria-hidden="true" />
      <div className="container vs-grid">
        <div className="vs-copy">
          <div className="section-subtitle">WATCH US</div>
          <h2 className="vs-title">See Tonlight <span>In Action</span></h2>
          <p className="vs-desc">
            A closer look at our brand and the gym equipment we supply for commercial gyms, home gyms and fitness centers.
          </p>
          <ul className="vs-points">
            {POINTS.map((point) => (
              <li key={point}><CheckCircle size={20} />{point}</li>
            ))}
          </ul>
          <div className="vs-cta">
            <Link href="/products" className="btn btn-primary vs-btn">Explore Products <ArrowRight size={18} /></Link>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hello! I would like to know more about your gym equipment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vs-wa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.95-2.08A15.47 15.47 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.15 13.15 0 0 1-6.7-1.84l-.48-.29-4.72 1.24 1.26-4.6-.31-.5A13.17 13.17 0 0 1 2.8 16C2.8 9.27 8.27 3.8 16 3.8S29.2 9.27 29.2 16 23.73 28.8 16 28.8zm7.2-9.87c-.4-.2-2.34-1.15-2.7-1.28-.36-.14-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.54-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.67h-.76c-.26 0-.69.1-1.05.5-.36.4-1.38 1.35-1.38 3.3 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.25 6.74 5.96.94.41 1.68.65 2.25.83.95.3 1.81.26 2.49.16.76-.12 2.34-.96 2.67-1.88.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46z" />
              </svg>
              <span className="wa-pre">Chat on </span>WhatsApp
            </a>
          </div>
        </div>

        <div className="vs-stage">
          <ShowVideo
            src="/videos/brand-intro.mp4"
            poster="/videos/brand-intro-poster.jpg"
            className="vs-wide"
            label="Brand Film"
            sound
            onExpand={setModal}
          />
          <div className="vs-phone">
            <span className="vs-notch" aria-hidden="true" />
            <ShowVideo
              src="/videos/product-showcase.mp4"
              poster="/videos/product-showcase-poster.jpg"
              className="vs-tall"
              label="Showcase"
              onExpand={setModal}
            />
          </div>
        </div>
      </div>
      {modal && <Lightbox item={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
