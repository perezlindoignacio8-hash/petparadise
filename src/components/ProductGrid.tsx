import type { Product } from '@/types/shopify';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl block mb-4">🔍</span>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron productos</h3>
        <p className="text-gray-500">Intentá con otra búsqueda o explorá nuestro catálogo completo.</p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16" id="product-grid">
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
