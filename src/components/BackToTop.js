'use client';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  return (
    <button type="button" className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Back to top <ArrowUp size={16} />
    </button>
  );
}
