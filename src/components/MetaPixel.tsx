'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: Record<string, unknown>) => void;
    _fbq?: any;
  }
}

function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.fbq?.('track', 'PageView');
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1713785829975280');
      fbq('track', 'PageView');
    `;
    script.async = true;
    document.head.appendChild(script);

    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.src = 'https://www.facebook.com/tr?id=1713785829975280&ev=PageView&noscript=1';
    img.style.display = 'none';
    noscript.appendChild(img);
    document.head.appendChild(noscript);
  }, []);

  return (
    <Suspense fallback={null}>
      <MetaPixelTracker />
    </Suspense>
  );
}
