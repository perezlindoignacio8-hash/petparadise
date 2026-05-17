'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product } from '@/types/shopify';
import {
  createCart,
  addToCart as addToCartAPI,
  updateCartLine,
  removeFromCart as removeFromCartAPI,
  getCart,
  isShopifyConfigured,
  formatPrice,
} from '@/lib/shopify';

// Local cart item for demo mode
interface LocalCartItem {
  id: string;
  variantId: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  quantity: number;
  image: string;
  handle: string;
  currencyCode: string;
}

interface CartContextType {
  items: LocalCartItem[];
  totalQuantity: number;
  totalAmount: string;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<LocalCartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pet-paradise-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setItems(parsed.items || []);
        setCartId(parsed.cartId || null);
        setCheckoutUrl(parsed.checkoutUrl || null);
      } catch {
        // Invalid cart data, reset
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'pet-paradise-cart',
      JSON.stringify({ items, cartId, checkoutUrl })
    );
  }, [items, cartId, checkoutUrl]);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = formatPrice(
    items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toString()
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    async (product: Product, quantity = 1) => {
      setIsLoading(true);
      const variant = product.variants.edges[0]?.node;
      if (!variant) {
        setIsLoading(false);
        return;
      }

      if (isShopifyConfigured()) {
        try {
          if (!cartId) {
            const cart = await createCart(variant.id, quantity);
            if (cart) {
              setCartId(cart.id);
              setCheckoutUrl(cart.checkoutUrl);
              setItems(
                cart.lines.edges.map((edge) => ({
                  id: edge.node.id,
                  variantId: edge.node.merchandise.id,
                  title: edge.node.merchandise.product.title,
                  price: edge.node.merchandise.price.amount,
                  compareAtPrice: edge.node.merchandise.compareAtPrice?.amount,
                  quantity: edge.node.quantity,
                  image: edge.node.merchandise.product.featuredImage?.url || '',
                  handle: edge.node.merchandise.product.handle,
                  currencyCode: edge.node.merchandise.price.currencyCode,
                }))
              );
            }
          } else {
            const cart = await addToCartAPI(cartId, variant.id, quantity);
            if (cart) {
              setCheckoutUrl(cart.checkoutUrl);
              setItems(
                cart.lines.edges.map((edge) => ({
                  id: edge.node.id,
                  variantId: edge.node.merchandise.id,
                  title: edge.node.merchandise.product.title,
                  price: edge.node.merchandise.price.amount,
                  compareAtPrice: edge.node.merchandise.compareAtPrice?.amount,
                  quantity: edge.node.quantity,
                  image: edge.node.merchandise.product.featuredImage?.url || '',
                  handle: edge.node.merchandise.product.handle,
                  currencyCode: edge.node.merchandise.price.currencyCode,
                }))
              );
            }
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      } else {
        // Demo mode: local cart
        setItems((prev) => {
          const existing = prev.find((item) => item.variantId === variant.id);
          if (existing) {
            return prev.map((item) =>
              item.variantId === variant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [
            ...prev,
            {
              id: `local-${Date.now()}`,
              variantId: variant.id,
              title: product.title,
              price: variant.price.amount,
              compareAtPrice: variant.compareAtPrice?.amount,
              quantity,
              image: product.featuredImage?.url || '',
              handle: product.handle,
              currencyCode: variant.price.currencyCode,
            },
          ];
        });
      }

      setIsOpen(true);
      setIsLoading(false);
    },
    [cartId]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (quantity < 1) {
        await removeItem(itemId);
        return;
      }

      setIsLoading(true);

      if (isShopifyConfigured() && cartId) {
        try {
          const cart = await updateCartLine(cartId, itemId, quantity);
          if (cart) {
            setItems(
              cart.lines.edges.map((edge) => ({
                id: edge.node.id,
                variantId: edge.node.merchandise.id,
                title: edge.node.merchandise.product.title,
                price: edge.node.merchandise.price.amount,
                compareAtPrice: edge.node.merchandise.compareAtPrice?.amount,
                quantity: edge.node.quantity,
                image: edge.node.merchandise.product.featuredImage?.url || '',
                handle: edge.node.merchandise.product.handle,
                currencyCode: edge.node.merchandise.price.currencyCode,
              }))
            );
          }
        } catch (error) {
          console.error('Error updating cart:', error);
        }
      } else {
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        );
      }

      setIsLoading(false);
    },
    [cartId]
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      setIsLoading(true);

      if (isShopifyConfigured() && cartId) {
        try {
          const cart = await removeFromCartAPI(cartId, [itemId]);
          if (cart) {
            setItems(
              cart.lines.edges.map((edge) => ({
                id: edge.node.id,
                variantId: edge.node.merchandise.id,
                title: edge.node.merchandise.product.title,
                price: edge.node.merchandise.price.amount,
                compareAtPrice: edge.node.merchandise.compareAtPrice?.amount,
                quantity: edge.node.quantity,
                image: edge.node.merchandise.product.featuredImage?.url || '',
                handle: edge.node.merchandise.product.handle,
                currencyCode: edge.node.merchandise.price.currencyCode,
              }))
            );
          }
        } catch (error) {
          console.error('Error removing from cart:', error);
        }
      } else {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      }

      setIsLoading(false);
    },
    [cartId]
  );

  const checkout = useCallback(() => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else if (!isShopifyConfigured()) {
      alert('Conectá tu tienda Shopify para habilitar el checkout. Configurá las variables de entorno en .env.local');
    }
  }, [checkoutUrl]);

  // Sync cart on mount if we have a cartId
  useEffect(() => {
    if (cartId && isShopifyConfigured()) {
      getCart(cartId).then((cart) => {
        if (cart) {
          setCheckoutUrl(cart.checkoutUrl);
          setItems(
            cart.lines.edges.map((edge) => ({
              id: edge.node.id,
              variantId: edge.node.merchandise.id,
              title: edge.node.merchandise.product.title,
              price: edge.node.merchandise.price.amount,
              compareAtPrice: edge.node.merchandise.compareAtPrice?.amount,
              quantity: edge.node.quantity,
              image: edge.node.merchandise.product.featuredImage?.url || '',
              handle: edge.node.merchandise.product.handle,
              currencyCode: edge.node.merchandise.price.currencyCode,
            }))
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalAmount,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateQuantity,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
