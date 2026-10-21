import React from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="container" style={{ padding: '80px 80px', minHeight: '60vh' }}>
      <div className="section-subtitle">DISCOVER</div>
      <h1 className="section-title">Search <span>Equipment</span></h1>
      
      <div style={{ marginTop: '40px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search for treadmills, dumbbells, etc..." 
            style={{ 
              flex: 1, 
              padding: '15px 20px', 
              borderRadius: '50px', 
              border: '1px solid var(--border-dark)',
              fontSize: '16px',
              outline: 'none'
            }} 
          />
          <button className="btn btn-primary">
            <Search size={18} /> Search
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '60px' }}>
        <h3 style={{ color: 'var(--text-muted-dark)', marginBottom: '20px' }}>Popular Searches</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {['Leg Press', 'Dumbbells', 'Treadmill', 'CrossFit Rig', 'Smith Machine'].map(term => (
            <span key={term} style={{ 
              padding: '8px 16px', 
              background: 'var(--bg-light-alt)', 
              borderRadius: '20px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>{term}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
