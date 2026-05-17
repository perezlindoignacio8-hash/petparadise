'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import type { Product } from '@/types/shopify';
import { getProducts } from '@/lib/shopify';

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProducts(50).then((data) => {
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    if (!q.trim()) { setFiltered(products); return; }
    const lower = q.toLowerCase();
    setFiltered(products.filter((p) =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.productType.toLowerCase().includes(lower)
    ));
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-red-600 mb-3">Productos</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
          Todo para consentir a tu mascota en un solo lugar. Encontrá productos de calidad, ofertas increíbles y accesorios que hacen su vida más feliz.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar onSearch={handleSearch} />
        <p className="text-sm text-gray-400 shrink-0">
          {query ? `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}` : 'Mostrando nuestro catálogo completo'}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="aspect-square bg-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="h-10 bg-gray-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
