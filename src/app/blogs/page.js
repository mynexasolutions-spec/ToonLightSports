'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogs } from '../../data/mockData';

export default function BlogsPage() {
  return (
    <div style={{ minHeight: '60vh', backgroundColor: '#f8f9fa' }}>
      <div 
        className="page-banner"
        style={{
          background: `linear-gradient(rgba(18, 20, 24, 0.85), rgba(18, 20, 24, 0.95)), url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop') center/cover`,
          padding: '60px 20px',
          marginBottom: '60px',
          color: 'var(--text-light)',
          textAlign: 'center'
        }}
      >
        <div className="section-subtitle" style={{ color: 'var(--primary-color)', justifyContent: 'center' }}>LATEST UPDATES</div>
        <h1 className="section-title" style={{ color: '#fff', marginBottom: '15px' }}>News & <span style={{ color: 'var(--primary-color)' }}>Blogs</span></h1>
        <p style={{ color: '#e0e0e0', maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>Stay up to date with the latest fitness trends, workout tips, and gym equipment guides.</p>
      </div>
      
      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="blogs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card" style={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div className="blog-img-container" style={{ overflow: 'hidden', height: '160px', flexShrink: 0 }}>
                <img src={blog.image} alt={blog.title} className="blog-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
              </div>
              <div className="blog-info" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="blog-date" style={{ color: 'var(--primary-color)', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>{blog.date}</div>
                <h3 className="blog-title" style={{ fontSize: '14px', fontWeight: '800', lineHeight: '1.4', marginBottom: '15px', color: 'var(--text-dark)' }}>{blog.title}</h3>
                <Link href={`/blogs/${blog.id}`} className="read-more" style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', fontWeight: '800', fontSize: '13px', textDecoration: 'none' }}>Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
