// ============================================================
// Shopify Storefront API Client
// ============================================================

import type { Product, Cart, DemoProduct } from '@/types/shopify';
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from './queries';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const endpoint = `https://${domain}/api/2025-01/graphql.json`;

// Check if Shopify is configured
export const isShopifyConfigured = () => {
  return domain !== '' && token !== '' && domain !== 'tu-tienda.myshopify.com';
};

// Detect if token is private (shpss_ or shpat_) or public
const isPrivateToken = token.startsWith('shpss_') || token.startsWith('shpat_');

// Generic fetch function for Shopify Storefront API
async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (isPrivateToken) {
    headers['Shopify-Storefront-Private-Token'] = token;
  } else {
    headers['X-Shopify-Storefront-Access-Token'] = token;
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = await res.json();

  if (json.errors) {
    console.error('Shopify API Error:', json.errors);
    throw new Error(json.errors[0]?.message || 'Error fetching from Shopify');
  }

  return json.data;
}

// ============================================================
// Demo/Placeholder Products (when Shopify is not connected)
// ============================================================

export const demoProducts: DemoProduct[] = [
  {
    id: '1',
    title: 'Kit Premium de Paseo para Perros',
    handle: 'kit-premium-paseo-perros',
    description: 'Kit completo con mochila transportadora, botella de agua portátil, dispensador de bolsas y más. Todo lo que necesitás para pasear a tu mejor amigo.',
    price: '54999.00',
    compareAtPrice: '74999.00',
    image: '/products/kit-paseo.jpg',
    category: 'Perros',
  },
  {
    id: '2',
    title: 'Rascador Multinivel para Gatos',
    handle: 'rascador-multinivel-gatos',
    description: 'Torre rascadora de 3 niveles con cuevas, plataformas y juguetes colgantes. Material premium de sisal natural.',
    price: '42999.00',
    compareAtPrice: '59999.00',
    image: '/products/rascador-gato.jpg',
    category: 'Gatos',
  },
  {
    id: '3',
    title: 'Comedero Automático Inteligente',
    handle: 'comedero-automatico-inteligente',
    description: 'Comedero programable con control desde tu celular. Capacidad de 4L, ideal para perros y gatos.',
    price: '38999.00',
    compareAtPrice: '49999.00',
    image: '/products/comedero-auto.jpg',
    category: 'Accesorios',
  },
  {
    id: '4',
    title: 'Cama Ortopédica Premium',
    handle: 'cama-ortopedica-premium',
    description: 'Cama con espuma de memoria para mascotas. Funda lavable, antideslizante. Disponible en 3 tamaños.',
    price: '29999.00',
    compareAtPrice: '39999.00',
    image: '/products/cama-premium.jpg',
    category: 'Perros',
  },
  {
    id: '5',
    title: 'Set de Juguetes Interactivos',
    handle: 'set-juguetes-interactivos',
    description: 'Pack de 8 juguetes variados: pelotas, cuerdas, mordedores y más. Materiales resistentes y seguros.',
    price: '15999.00',
    compareAtPrice: '22999.00',
    image: '/products/juguetes-set.jpg',
    category: 'Perros',
  },
  {
    id: '6',
    title: 'Arena Sanitaria Premium 10kg',
    handle: 'arena-sanitaria-premium',
    description: 'Arena aglomerante de alta absorción con control de olores. Bajo polvo, aroma lavanda.',
    price: '8999.00',
    image: '/products/arena-gato.jpg',
    category: 'Gatos',
  },
  {
    id: '7',
    title: 'Correa Retráctil LED',
    handle: 'correa-retractil-led',
    description: 'Correa retráctil de 5m con luz LED integrada para paseos nocturnos. Recargable vía USB.',
    price: '12999.00',
    compareAtPrice: '18999.00',
    image: '/products/correa-led.jpg',
    category: 'Perros',
  },
  {
    id: '8',
    title: 'Transportadora Plegable',
    handle: 'transportadora-plegable',
    description: 'Bolso transportador plegable con ventilación, aprobado para avión. Para mascotas de hasta 8kg.',
    price: '24999.00',
    compareAtPrice: '34999.00',
    image: '/products/transportadora.jpg',
    category: 'Accesorios',
  },
];

// Convert DemoProduct to Product-like shape for components
export function demoToProduct(demo: DemoProduct): Product {
  return {
    id: demo.id,
    title: demo.title,
    handle: demo.handle,
    description: demo.description,
    descriptionHtml: `<p>${demo.description}</p>`,
    availableForSale: true,
    productType: demo.category,
    vendor: 'Pet Paradise',
    tags: [demo.category],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    priceRange: {
      minVariantPrice: { amount: demo.price, currencyCode: 'ARS' },
      maxVariantPrice: { amount: demo.price, currencyCode: 'ARS' },
    },
    compareAtPriceRange: demo.compareAtPrice
      ? {
          minVariantPrice: { amount: demo.compareAtPrice, currencyCode: 'ARS' },
          maxVariantPrice: { amount: demo.compareAtPrice, currencyCode: 'ARS' },
        }
      : undefined,
    featuredImage: {
      url: demo.image,
      altText: demo.title,
    },
    images: {
      edges: [{ node: { url: demo.image, altText: demo.title } }],
    },
    variants: {
      edges: [
        {
          node: {
            id: `variant-${demo.id}`,
            title: 'Default',
            availableForSale: true,
            price: { amount: demo.price, currencyCode: 'ARS' },
            compareAtPrice: demo.compareAtPrice
              ? { amount: demo.compareAtPrice, currencyCode: 'ARS' }
              : null,
            selectedOptions: [],
          },
        },
      ],
    },
  };
}

// ============================================================
// API Functions
// ============================================================

export async function getProducts(first = 20, query = ''): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return demoProducts.map(demoToProduct);
  }

  try {
    const data = await shopifyFetch<{ products: { edges: { node: Product }[] } }>(
      PRODUCTS_QUERY,
      { first, query: query || undefined }
    );
    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return demoProducts.map(demoToProduct);
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured()) {
    const demo = demoProducts.find((p) => p.handle === handle);
    return demo ? demoToProduct(demo) : null;
  }

  try {
    const data = await shopifyFetch<{ productByHandle: Product | null }>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );
    return data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createCart(variantId: string, quantity: number, attributes?: { key: string; value: string }[]): Promise<Cart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const line: Record<string, unknown> = { merchandiseId: variantId, quantity };
    if (attributes && attributes.length > 0) {
      line.attributes = attributes;
    }
    const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(
      CREATE_CART_MUTATION,
      { input: { lines: [line] } }
    );
    return data.cartCreate.cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
}

export async function addToCart(cartId: string, variantId: string, quantity: number, attributes?: { key: string; value: string }[]): Promise<Cart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const line: Record<string, unknown> = { merchandiseId: variantId, quantity };
    if (attributes && attributes.length > 0) {
      line.attributes = attributes;
    }
    const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(
      ADD_TO_CART_MUTATION,
      { cartId, lines: [line] }
    );
    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(
      UPDATE_CART_MUTATION,
      { cartId, lines: [{ id: lineId, quantity }] }
    );
    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('Error updating cart:', error);
    return null;
  }
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(
      REMOVE_FROM_CART_MUTATION,
      { cartId, lineIds }
    );
    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return null;
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{ cart: Cart }>(GET_CART_QUERY, { cartId });
    return data.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

// ============================================================
// Utility Functions
// ============================================================

export function formatPrice(amount: string, currencyCode = 'ARS'): string {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}
