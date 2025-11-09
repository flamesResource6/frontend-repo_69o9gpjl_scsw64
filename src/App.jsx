import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';

function seedProducts() {
  const seeds = [
    {
      name: 'Minimal Lamp',
      price: 39.99,
      description: 'Warm LED desk lamp with a clean, matte finish.',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Ceramic Mug',
      price: 14.5,
      description: 'Handmade ceramic mug with ergonomic handle.',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Wireless Headphones',
      price: 129.0,
      description: 'Noise‑isolating over‑ear headphones with long battery life.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxXaXJlbGVzcyUyMEhlYWRwaG9uZXN8ZW58MHwwfHx8MTc2MjcyNjE1MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Succulent Set',
      price: 24.0,
      description: 'A trio of easy-care succulents in minimalist pots.',
      image: 'https://images.unsplash.com/photo-1723110565215-90d25922161c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdWNjdWxlbnQlMjBTZXR8ZW58MHwwfHx8MTc2MjcyNjE1Mnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Canvas Backpack',
      price: 69.0,
      description: 'Durable everyday backpack with padded laptop sleeve.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Scented Candle',
      price: 18.99,
      description: 'Natural soy candle with cedarwood & citrus notes.',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Glass Water Bottle',
      price: 22.0,
      description: 'Reusable bottle with protective silicone sleeve.',
      image: 'https://images.unsplash.com/photo-1641999160901-a36bf550fd96?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxHbGFzcyUyMFdhdGVyJTIwQm90dGxlfGVufDB8MHx8fDE3NjI3MjYxNTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Gym Duffel',
      price: 54.0,
      description: 'Compact duffel with ventilated shoe pocket.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return seeds.map((s, i) => ({
    id: crypto.randomUUID(),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    rating: 4,
    ...s,
  }));
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(() => seedProducts());

  const pageTitle = useMemo(() => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'products':
        return 'All Products';
      case 'home':
      default:
        return 'Market';
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        currentPage={currentPage}
        setPage={setCurrentPage}
        user={user}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main className="flex-1">
        {currentPage === 'home' && <Home products={products} />}
        {currentPage === 'products' && <AllProducts products={products} />}
        {currentPage === 'dashboard' && (
          <Dashboard products={products} setProducts={setProducts} user={user} />
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Market</span>
          <span>{pageTitle}</span>
        </div>
      </footer>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={(u) => setUser(u)}
      />
    </div>
  );
}
