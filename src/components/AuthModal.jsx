import React, { useState } from 'react';

export default function AuthModal({ open, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4 rounded-2xl bg-white shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{mode === 'login' ? 'Login' : 'Create account'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="space-y-3">
          <input
            type="email"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              // For now, just mimic a successful auth
              onLogin({ email });
              onClose();
            }}
            className="w-full py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-900"
          >
            {mode === 'login' ? 'Login' : 'Sign up'}
          </button>
          <p className="text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button className="underline" onClick={() => setMode('signup')}>Sign up</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="underline" onClick={() => setMode('login')}>Login</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
