'use client';
import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, Link as LinkIcon, Mail } from 'lucide-react';
import { blogs } from '../../../data/mockData';

export default function BlogPostPage({ params }) {
  const unwrappedParams = use(params);
  const blog = blogs.find(b => b.id === parseInt(unwrappedParams.id)) || blogs[0];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero Header */}
      <div 
        style={{
          background: `linear-gradient(rgba(18, 20, 24, 0.7), rgba(18, 20, 24, 0.9)), url(${blog.image}) center/cover`,
          padding: '100px 20px 60px',
          color: 'var(--text-light)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', marginBottom: '30px' }}>
            <ArrowLeft size={16} /> Back to Blogs
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--primary-color)', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
            <Calendar size={14} />
            {blog.date}
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', lineHeight: '1.3', marginBottom: '0', color: '#fff' }}>
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ maxWidth: '800px', marginTop: '-40px', position: 'relative', zIndex: 20 }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '50px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          
          <div className="blog-content" style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-muted-dark)' }}>
            <p style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: 'var(--text-dark)' }}>
              In today's fast-paced world, staying fit is more important than ever. Whether you are building a commercial gym or setting up a personal workout space at home, making the right choices can dramatically impact your fitness journey.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              We've observed a massive shift towards specialized and high-quality equipment. This isn't just about lifting weights; it's about biomechanics, safety, and longevity. When you invest in top-tier machinery, you're not just buying metal and padding—you're investing in a tool that will support your goals for years to come.
            </p>

            <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--bg-dark)', marginTop: '40px', marginBottom: '15px' }}>
              Understanding Your Needs
            </h3>
            
            <p style={{ marginBottom: '20px' }}>
              Before making a purchase, it's critical to assess your actual needs. Are you focusing on cardiovascular health, strength training, or a mix of both? A well-rounded space typically incorporates a balance of free weights, resistance machines, and cardio equipment.
            </p>

            <div style={{ padding: '20px', backgroundColor: 'rgba(34,197,94, 0.1)', borderLeft: '4px solid var(--primary-color)', borderRadius: '0 8px 8px 0', margin: '30px 0', fontStyle: 'italic', fontWeight: '600', color: 'var(--bg-dark)' }}>
              "The best equipment is the one you will consistently use. Don't buy for the person you want to be tomorrow; buy for the habits you are building today."
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--bg-dark)', marginTop: '40px', marginBottom: '15px' }}>
              Quality Over Quantity
            </h3>
            
            <p style={{ marginBottom: '20px' }}>
              It's tempting to fill a space with dozens of cheap machines, but a few high-quality, versatile pieces will serve you much better. Look for heavy-gauge steel frames, smooth pulley systems, and durable upholstery. 
            </p>

            <p style={{ marginBottom: '20px' }}>
              At Tonlight Sports, we pride ourselves on delivering commercial-grade durability across all our product lines. When you choose our equipment, you are choosing uncompromising quality.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '40px 0' }} />

          {/* Share Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '800', fontSize: '14px', color: 'var(--bg-dark)' }}>Share this article:</span>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={{ background: '#f8f9fa', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted-dark)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.background='var(--primary-color)'; e.currentTarget.style.color='#000'}} onMouseOut={e => {e.currentTarget.style.background='#f8f9fa'; e.currentTarget.style.color='var(--text-muted-dark)'}}>
                <LinkIcon size={16} />
              </button>
              <button style={{ background: '#f8f9fa', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted-dark)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.background='var(--primary-color)'; e.currentTarget.style.color='#000'}} onMouseOut={e => {e.currentTarget.style.background='#f8f9fa'; e.currentTarget.style.color='var(--text-muted-dark)'}}>
                <Mail size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
