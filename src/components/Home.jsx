import React from 'react';
import ProductCard from './ProductCard';

export default function Home({ products }) {
  const highlights = products.slice(0, 6);
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Your modern market for everyday essentials</h1>
            <p className="text-gray-600 mb-6">Discover a curated selection of quality products. Clean design, smooth experience, and secure checkout.
            </p>
            <div className="flex items-center gap-3">
              <a href="#highlights" className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-900">Shop highlights</a>
              <a href="#all" className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Browse all</a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {highlights.slice(0, 3).map((p) => (
              <img key={p.id} src={p.image} alt={p.name} className="rounded-xl aspect-square object-cover" />
            ))}
            <div className="col-span-3 grid grid-cols-3 gap-3">
              {highlights.slice(3, 6).map((p) => (
                <img key={p.id} src={p.image} alt={p.name} className="rounded-xl aspect-square object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="highlights" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-semibold">Highlights</h2>
          <a href="#all" className="text-sm text-gray-600 underline">See all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {highlights.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="all" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-semibold">All Products</h2>
          <a href="#top" className="text-sm text-gray-600 underline">Back to top</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
