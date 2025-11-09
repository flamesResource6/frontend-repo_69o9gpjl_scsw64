import React from 'react';
import { Star } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="group rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <div className="text-gray-900 font-semibold">${product.price.toFixed(2)}</div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < (product.rating || 4) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button onClick={() => onEdit(product)} className="text-sm px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200">Edit</button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(product)} className="text-sm px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
