import React from 'react';
import { ShoppingCart, LayoutDashboard, PackageSearch, Home, LogIn, LogOut, User } from 'lucide-react';

const NavButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <Icon size={16} />
    <span>{label}</span>
  </button>
);

export default function Navbar({ currentPage, setPage, user, onLoginClick, onLogout }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-black text-white flex items-center justify-center">
            <ShoppingCart size={18} />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Market</div>
            <div className="text-xs text-gray-500">Simple modern marketplace</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <NavButton
            icon={Home}
            label="Highlights"
            active={currentPage === 'home'}
            onClick={() => setPage('home')}
          />
          <NavButton
            icon={PackageSearch}
            label="All Products"
            active={currentPage === 'products'}
            onClick={() => setPage('products')}
          />
          <NavButton
            icon={LayoutDashboard}
            label="Dashboard"
            active={currentPage === 'dashboard'}
            onClick={() => setPage('dashboard')}
          />
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User size={16} />
                <span className="hidden sm:inline">{user.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-black"
                aria-label="Logout"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-black"
              aria-label="Login"
            >
              <LogIn size={16} /> Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
