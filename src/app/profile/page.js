'use client';
import React, { useState } from 'react';
import { User, Package, MapPin, LogOut, CheckCircle, Plus, Edit2, Trash2 } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={{ minHeight: '80vh' }}>
      <div 
        className="page-banner"
        style={{
          background: `linear-gradient(rgba(18, 20, 24, 0.85), rgba(18, 20, 24, 0.95)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop') center/cover`,
          padding: '60px 20px',
          marginBottom: '40px',
          color: 'var(--text-light)',
          textAlign: 'center'
        }}
      >
        <div className="section-subtitle" style={{ color: 'var(--primary-color)', justifyContent: 'center' }}>ACCOUNT</div>
        <h1 className="section-title" style={{ color: '#fff', marginBottom: '15px' }}>Your <span style={{ color: 'var(--primary-color)' }}>Profile</span></h1>
        <p style={{ color: '#e0e0e0', maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>Manage your personal information and orders.</p>
      </div>

      <div className="container" style={{ paddingBottom: '50px' }}>
        <div className="profile-layout">
          
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900', color: 'var(--bg-dark)', marginBottom: '10px', boxShadow: '0 10px 20px rgba(252, 227, 0, 0.3)' }}>J</div>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '800' }}>John Doe</h3>
              <p style={{ color: 'var(--text-muted-dark)', fontSize: '12px', margin: 0 }}>john.doe@example.com</p>
            </div>
            
            <ul className="profile-nav">
              <li onClick={() => setActiveTab('profile')} className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}>
                <User size={18} /> My Profile
              </li>
              <li onClick={() => setActiveTab('orders')} className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}>
                <Package size={18} /> Order History
              </li>
              <li onClick={() => setActiveTab('addresses')} className={`profile-nav-item ${activeTab === 'addresses' ? 'active' : ''}`}>
                <MapPin size={18} /> Saved Addresses
              </li>
              <li className="profile-nav-item logout">
                <LogOut size={18} /> Log Out
              </li>
            </ul>
          </div>
          
          {/* Main Content */}
          <div className="profile-content">
            {activeTab === 'profile' && (
              <>
                <h3 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '800' }}>Personal Information</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="profile-form-row">
                    <div>
                      <label className="profile-label">First Name</label>
                      <input type="text" defaultValue="John" className="profile-input" />
                    </div>
                    <div>
                      <label className="profile-label">Last Name</label>
                      <input type="text" defaultValue="Doe" className="profile-input" />
                    </div>
                  </div>
                  <div>
                    <label className="profile-label">Email Address</label>
                    <input type="email" defaultValue="john.doe@example.com" className="profile-input" />
                  </div>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '15px', paddingTop: '20px' }}>
                    <h3 style={{ marginBottom: '15px', fontSize: '20px', fontWeight: '800' }}>Change Password</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <label className="profile-label">Current Password</label>
                        <input type="password" placeholder="........" className="profile-input" />
                      </div>
                      <div className="profile-form-row">
                        <div>
                          <label className="profile-label">New Password</label>
                          <input type="password" placeholder="........" className="profile-input" />
                        </div>
                        <div>
                          <label className="profile-label">Confirm New Password</label>
                          <input type="password" placeholder="........" className="profile-input" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '12px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '800', marginTop: '5px' }}>Save Changes</button>
                </form>
              </>
            )}

            {activeTab === 'orders' && (
              <>
                <h3 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '800' }}>Order History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="order-card">
                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop') center/cover", flexShrink: 0 }}></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary-color)', background: 'var(--bg-dark)', padding: '3px 8px', borderRadius: '50px', display: 'inline-block', marginBottom: '5px' }}>Delivered</span>
                          <h4 style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '800' }}>Premium Dumbbell Set</h4>
                          <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted-dark)' }}>Order #NX-84729 - Oct 12, 2023</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '15px', fontWeight: '800' }}>$199.99</div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted-dark)' }}>Qty: 1</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button style={{ padding: '6px 14px', background: '#f8f9fa', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '50px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>View Details</button>
                        <button className="btn btn-primary" style={{ padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '800' }}>Buy Again</button>
                      </div>
                    </div>
                  </div>
                  <div className="order-card">
                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: "url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop') center/cover", flexShrink: 0 }}></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', background: '#d1fae5', padding: '3px 8px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}><CheckCircle size={11} /> Delivered</span>
                          <h4 style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '800' }}>Yoga Mat Pro</h4>
                          <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted-dark)' }}>Order #NX-84210 - Sep 05, 2023</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '15px', fontWeight: '800' }}>$45.00</div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted-dark)' }}>Qty: 2</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button style={{ padding: '6px 14px', background: '#f8f9fa', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '50px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>View Details</button>
                        <button className="btn btn-primary" style={{ padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '800' }}>Buy Again</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'addresses' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800' }}>Saved Addresses</h3>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 18px', background: 'var(--primary-color)', color: 'var(--bg-dark)', border: 'none', borderRadius: '50px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
                    <Plus size={15} /> Add New
                  </button>
                </div>
                <div className="address-grid">
                  <div style={{ border: '2px solid var(--primary-color)', borderRadius: '16px', padding: '18px', background: 'rgba(252, 227, 0, 0.05)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted-dark)', cursor: 'pointer' }}><Edit2 size={15} /></button>
                      <button style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}><Trash2 size={15} /></button>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--bg-dark)', background: 'var(--primary-color)', padding: '3px 10px', borderRadius: '50px', display: 'inline-block', marginBottom: '10px' }}>Default</span>
                    <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '800' }}>Home</h4>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: 'var(--text-muted-dark)', lineHeight: 1.6 }}>John Doe<br/>123 Fitness Avenue, Apt 4B<br/>New York, NY 10001</p>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted-dark)', fontWeight: '600' }}>+1 (555) 123-4567</p>
                  </div>
                  <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '16px', padding: '18px', background: '#fff', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted-dark)', cursor: 'pointer' }}><Edit2 size={15} /></button>
                      <button style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}><Trash2 size={15} /></button>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted-dark)', background: '#f8f9fa', padding: '3px 10px', borderRadius: '50px', display: 'inline-block', marginBottom: '10px' }}>Work</span>
                    <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '800' }}>Office</h4>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: 'var(--text-muted-dark)', lineHeight: 1.6 }}>John Doe<br/>456 Corporate Blvd, Suite 200<br/>San Francisco, CA 94107</p>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted-dark)', fontWeight: '600' }}>+1 (555) 987-6543</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px', padding: '35px 20px', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--bg-dark)', margin: '0 0 10px' }}>
            Empower Your <span style={{ color: 'var(--primary-color)' }}>Fitness Journey</span>
          </h3>
          <p style={{ color: 'var(--text-muted-dark)', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
            Join thousands of members who are transforming their lives every day with our premium equipment and expert guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
