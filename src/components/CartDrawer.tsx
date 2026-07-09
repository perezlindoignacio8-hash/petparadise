'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/shopify';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const {
    items,
    totalQuantity,
    totalAmount,
    isOpen,
    isLoading,
    closeCart,
    updateQuantity,
    removeItem,
    checkout,
  } = useCart();

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Handle open/close with delay for exit animation
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setVisible(true);
    } else {
      // Wait for the slide-out animation before unmounting
      closeTimerRef.current = setTimeout(() => setVisible(false), 350);
    }
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [isOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Don't render anything until mounted on client, and don't render when fully closed
  if (!mounted || !visible) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        id="cart-backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 200ms',
        }}
      />

      {/* Drawer */}
      <div
        id="cart-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '100%',
          maxWidth: '28rem',
          backgroundColor: '#fff',
          zIndex: 9999,
          boxShadow: '-4px 0 25px rgba(0,0,0,0.15)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-out',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#303854]">Tu Carrito</h2>
              {totalQuantity > 0 && (
                <span className="bg-[#303854] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Cerrar carrito"
              id="close-cart-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar - Envío gratis */}
          {items.length > 0 && (() => {
            const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
            const installmentsThreshold = 35000;
            const shippingThreshold = 45000;
            const hasInstallments = subtotal >= installmentsThreshold;
            const hasShipping = subtotal >= shippingThreshold;
            const progress = Math.min(100, (subtotal / shippingThreshold) * 100);

            let message = '';
            if (hasShipping) {
              message = '¡20% OFF + 3 Cuotas + Envío gratis desbloqueados!';
            } else if (hasInstallments) {
              message = `¡3 Cuotas desbloqueadas! Te faltan $${(shippingThreshold - subtotal).toLocaleString('es-AR')} para Envío Gratis`;
            } else {
              message = `20% OFF desbloqueado - Te faltan $${(installmentsThreshold - subtotal).toLocaleString('es-AR')} para 3 Cuotas`;
            }

            return (
              <div className="px-6 pt-4 pb-2 border-b border-gray-100">
                <div className="bg-sky-50 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#7DB8E8]">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-bold text-[#303854] text-center">
                      {message}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-3 mx-4 my-6 z-10">
                    {/* Background track */}
                    <div className="absolute inset-0 bg-sky-100 rounded-full overflow-hidden">
                      {/* Filled progress */}
                      <div
                        className="relative h-full bg-gradient-to-r from-[#7DB8E8] to-sky-500 rounded-full transition-all duration-500 overflow-hidden"
                        style={{ width: `${progress}%` }}
                      >
                        {/* Moving light effect */}
                        <div className="absolute top-0 h-full w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-progress-shimmer"></div>
                      </div>
                    </div>

                    {/* 20% OFF milestone (siempre desbloqueado) */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-[#5AA0D8] text-white">
                        <span className="text-[9px] font-black">20%</span>
                      </div>
                    </div>

                    {/* 3 Cuotas milestone (intermedio) */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        hasInstallments ? 'bg-[#5AA0D8] text-white' : 'bg-white text-[#7DB8E8] border-2 border-[#B0D4EE]'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Shipping milestone */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        hasShipping ? 'bg-[#5AA0D8] text-white' : 'bg-white text-[#7DB8E8] border-2 border-[#B0D4EE]'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                          <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                          <path d="M19.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="relative flex justify-between items-start mt-6 text-[10px] text-slate-600 font-semibold px-1">
                    <div className="text-left flex-1">
                      <p>20% OFF</p>
                    </div>
                    <div className="text-center flex-1">
                      <p>3 Cuotas</p>
                      <p className="text-slate-500">${installmentsThreshold.toLocaleString('es-AR')}</p>
                    </div>
                    <div className="text-right flex-1">
                      <p>Envío gratis</p>
                      <p className="text-slate-500">${shippingThreshold.toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-6xl mb-4">🛒</span>
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Agregá productos para empezar a comprar
                </p>
                <button
                  onClick={() => { closeCart(); router.push('/'); }}
                  className="bg-[#303854] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#303854] transition-colors"
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    {/* Image placeholder */}
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                      {item.image && !item.image.startsWith('/products/') ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-3xl">🐾</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#303854] truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm font-bold text-[#303854] mt-1">
                        {formatPrice(item.price, item.currencyCode)}
                      </p>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Talle: <span className="font-bold text-gray-700">{item.selectedSize}</span>
                        </p>
                      )}

                      {/* Quantity controls */}
                      <div className="inline-flex items-center bg-white rounded-full shadow-sm border border-gray-200 mt-2 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-slate-50 hover:text-[#303854] transition-colors disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-slate-50 hover:text-[#303854] transition-colors disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="p-1 text-gray-400 hover:text-[#303854] transition-colors self-start disabled:opacity-50"
                      aria-label="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-xl font-black text-[#303854]">{totalAmount}</span>
              </div>
              <p className="text-xs text-gray-400">
                Envío e impuestos se calculan en el checkout
              </p>
              <button
                onClick={checkout}
                disabled={isLoading}
                className="w-full bg-[#303854] hover:bg-[#303854] text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                id="checkout-button"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Finalizar Compra
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
