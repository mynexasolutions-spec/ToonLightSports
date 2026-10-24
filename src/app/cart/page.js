'use client';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '60vh' }}>
      <div 
        className="page-banner"
        style={{
          background: `linear-gradient(rgba(18, 20, 24, 0.85), rgba(18, 20, 24, 0.95)), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop') center/cover`,
          padding: '60px 20px',
          marginBottom: '60px',
          color: 'var(--text-light)',
          textAlign: 'center'
        }}
      >
        <div className="section-subtitle" style={{ color: 'var(--primary-color)', justifyContent: 'center' }}>CHECKOUT</div>
        <h1 className="section-title" style={{ color: '#fff', marginBottom: '15px' }}>Shopping <span style={{ color: 'var(--primary-color)' }}>Cart</span></h1>
        <p style={{ color: '#e0e0e0', maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>Review your items and proceed to checkout.</p>
      </div>

      <div className="container" style={{ paddingBottom: '100px' }}>
        {cartItems.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ background: 'var(--bg-light)', padding: '30px', borderRadius: '50%', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <ShoppingCart size={80} color="var(--primary-color)" />
            </div>
            <h3 style={{ marginBottom: '15px', fontSize: '28px', fontWeight: '800' }}>Your cart is empty</h3>
            <p style={{ color: 'var(--text-muted-dark)', marginBottom: '40px', fontSize: '16px', maxWidth: '400px' }}>Looks like you haven't added any premium fitness equipment to your cart yet.</p>
            <Link href="/products" className="btn btn-primary" style={{ padding: '16px 40px', borderRadius: '50px', fontSize: '16px', fontWeight: '800', boxShadow: '0 10px 20px rgba(34,197,94, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: '#fff', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '800' }}>{item.name}</h4>
                      <p style={{ margin: 0, color: 'var(--text-muted-dark)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category}</p>
                      <p style={{ margin: '6px 0 0', fontWeight: '900', fontSize: '14px', color: 'var(--primary-color)' }}>₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.05)', padding: '3px' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '6px', background: '#fff', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><Minus size={12}/></button>
                      <span style={{ padding: '0 15px', fontWeight: '800', fontSize: '13px' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '6px', background: '#fff', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><Plus size={12}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--text-muted-dark)', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'red'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted-dark)'}><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '800' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', gap: '15px' }}>
                <span style={{ color: 'var(--text-muted-dark)', fontSize: '14px' }}>Subtotal</span>
                <span style={{ fontWeight: '800', fontSize: '14px' }}>₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--text-muted-dark)', fontSize: '14px', flexShrink: 0 }}>Shipping</span>
                <span style={{ fontWeight: '800', fontSize: '13px', textAlign: 'right' }}>Calculated at checkout</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px dashed rgba(0,0,0,0.1)', fontSize: '18px', fontWeight: '900' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary-color)' }}>₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px', padding: '12px', borderRadius: '50px', fontSize: '15px', fontWeight: '800', boxShadow: '0 10px 20px rgba(34,197,94, 0.3)' }}>Proceed to Checkout</button>
            </div>
          </div>
        )}

        {/* Trust Badges / Guarantees Section */}
        <div className="trust-badges-grid" style={{ marginTop: '100px' }}>
          <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <Lock size={32} color="var(--primary-color)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>Secure Checkout</h4>
            <p style={{ color: 'var(--text-muted-dark)', fontSize: '13px', lineHeight: '1.5' }}>Your payment information is processed securely with 256-bit encryption.</p>
          </div>
          <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <Truck size={32} color="var(--primary-color)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>Nationwide Delivery</h4>
            <p style={{ color: 'var(--text-muted-dark)', fontSize: '13px', lineHeight: '1.5' }}>We ship and install commercial equipment directly to your facility.</p>
          </div>
          <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <ShieldCheck size={32} color="var(--primary-color)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>5-Year Warranty</h4>
            <p style={{ color: 'var(--text-muted-dark)', fontSize: '13px', lineHeight: '1.5' }}>Industry-leading warranty on all structural frames and components.</p>
          </div>
          <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <RotateCcw size={32} color="var(--primary-color)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>Easy Returns</h4>
            <p style={{ color: 'var(--text-muted-dark)', fontSize: '13px', lineHeight: '1.5' }}>Not satisfied? Contact us within 14 days for a hassle-free return.</p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="subscribe-container-inner" style={{ marginTop: '80px' }}>
          <div className="subscribe-left">
            <div className="subscribe-icon-wrapper">
              <ShieldCheck size={60} />
            </div>
            <div className="subscribe-text">
              <div className="subscribe-subtitle">PARTNER WITH US</div>
              <h2 className="subscribe-title">Need Bulk Pricing?</h2>
              <p className="subscribe-desc">Reach out to our sales team to discuss commercial installations and bulk equipment discounts.</p>
            </div>
          </div>
          <div className="subscribe-right-text" style={{ textAlign: 'left', borderLeft: '3px solid var(--primary-color)', paddingLeft: '25px' }}>
            <span style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold' }}>Contact Sales</span>
            <span style={{ color: 'var(--primary-color)', fontSize: '28px', fontWeight: '900', marginTop: '5px' }}>+91 74176 71316</span>
          </div>
        </div>
      </div>
    </div>
  );
}
