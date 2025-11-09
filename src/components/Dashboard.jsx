import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';

const emptyForm = { name: '', price: '', description: '', image: '', rating: 4 };

export default function Dashboard({ products, setProducts, user }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [products, query]);

  useEffect(() => {
    if (!editingId) setForm(emptyForm);
  }, [editingId]);

  const submit = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(form.price || '0') || 0;
    if (!form.name.trim()) return;

    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...form, price: priceNum } : p));
      setEditingId(null);
    } else {
      const newProduct = {
        id: crypto.randomUUID(),
        name: form.name,
        price: priceNum,
        description: form.description,
        image: form.image || `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}/600/600`,
        rating: form.rating || 4,
        createdAt: new Date().toISOString(),
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setForm(emptyForm);
  };

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: String(p.price), description: p.description, image: p.image, rating: p.rating });
  };

  const onDelete = (p) => {
    if (confirm(`Delete ${p.name}?`)) {
      setProducts(prev => prev.filter(x => x.id !== p.id));
      if (editingId === p.id) setEditingId(null);
    }
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Please log in to access the dashboard</h2>
        <p className="text-gray-600">Use the button in the top-right to sign in.</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Product Dashboard</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-64 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <form onSubmit={submit} className="grid md:grid-cols-5 gap-3 bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <input
          value={form.name}
          onChange={(e) => setForm(v => ({ ...v, name: e.target.value }))}
          placeholder="Product name"
          className="md:col-span-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm(v => ({ ...v, price: e.target.value }))}
          placeholder="Price"
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          value={form.image}
          onChange={(e) => setForm(v => ({ ...v, image: e.target.value }))}
          placeholder="Image URL"
          className="md:col-span-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          value={form.description}
          onChange={(e) => setForm(v => ({ ...v, description: e.target.value }))}
          placeholder="Short description"
          className="md:col-span-5 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="md:col-span-5 flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-900">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        )}
      </div>
    </section>
  );
}
