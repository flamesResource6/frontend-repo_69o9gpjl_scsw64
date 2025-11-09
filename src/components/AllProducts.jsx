import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

export default function AllProducts({ products }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const res = q
      ? products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      : products.slice();

    switch (sort) {
      case 'price-asc':
        res.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        res.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return res;
  }, [products, query, sort]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">All Products</h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full md:w-64 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products match your search.</div>
        )}
      </div>
    </section>
  );
}
