import type { Product } from '@/types/shopify';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  featured?: boolean;
}

export default function ProductGrid({ products, title, subtitle, featured = false }: ProductGridProps) {
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

      {featured && products.length === 1 ? (
        <FeaturedSingleProduct product={products[0]} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {[...products].sort((a, b) => {
            if (a.handle === 'kit-argentina-mundial-2026') return -1;
            if (b.handle === 'kit-argentina-mundial-2026') return 1;
            return 0;
          }).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

const sideBadges = [
  {
    icon: '🔥',
    title: 'Más vendido',
    desc: 'El favorito de nuestros clientes',
    gradient: 'from-slate-50 to-slate-100/40',
    border: 'border-slate-100',
  },
  {
    icon: '🚚',
    title: 'Envío gratis',
    desc: 'A todo el país, sin costos ocultos',
    gradient: 'from-green-50 to-green-100/40',
    border: 'border-green-100',
  },
  {
    icon: '⭐',
    title: '4.5 / 5',
    desc: '+238 reseñas verificadas',
    gradient: 'from-amber-50 to-amber-100/40',
    border: 'border-amber-100',
  },
  {
    icon: '💳',
    title: '3 cuotas',
    desc: 'Sin interés con tarjeta',
    gradient: 'from-blue-50 to-blue-100/40',
    border: 'border-blue-100',
  },
];

function FeaturedSingleProduct({ product }: { product: Product }) {
  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 via-transparent to-amber-50/40 rounded-3xl -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center px-4 py-8 lg:py-12">
        {/* Left badges */}
        <div className="lg:col-span-3 order-2 lg:order-1 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {sideBadges.slice(0, 2).map((b) => (
            <BadgeCard key={b.title} {...b} />
          ))}
        </div>

        {/* Featured card */}
        <div className="lg:col-span-6 order-1 lg:order-2 relative">
          <div className="lg:scale-[1.03] transition-transform">
            <ProductCard product={product} />
          </div>
        </div>

        {/* Right badges */}
        <div className="lg:col-span-3 order-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {sideBadges.slice(2, 4).map((b) => (
            <BadgeCard key={b.title} {...b} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface BadgeProps {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
  border: string;
}

function BadgeCard({ icon, title, desc, gradient, border }: BadgeProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} ${border} border rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow`}>
      <span className="text-3xl block mb-2">{icon}</span>
      <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide">{title}</h3>
      <p className="text-xs text-gray-600 mt-1 leading-snug">{desc}</p>
    </div>
  );
}
