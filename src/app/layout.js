import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollObserver from '../components/ScrollObserver';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { CartProvider } from '../context/CartContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata = {
  title: 'Tonlight Sports | Gym Equipment',
  description: 'High-quality gym equipment for commercial gyms, home gyms, outdoor parks and fitness centers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CartProvider>
          <ScrollObserver />
          <Header />
          <main className="main-container">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  )
}
