'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { usePathname } from 'next/navigation';

export interface PageTransitionProps {
  children: React.ReactNode;
}

function PathnameWatcher({ onChange }: { onChange: (path: string) => void }) {
  const pathname = usePathname();
  useEffect(() => {
    onChange(pathname);
  }, [pathname, onChange]);
  return null;
}

/**
 * PageTransition
 * 
 * Reusable client-side route transition component.
 * - Applies a short, subtle fade (200-250ms) upon internal page navigation.
 * - Avoids full-screen loading overlays or white flashes.
 * - Preserves native browser scroll and back/forward navigation.
 * - Strictly respects prefers-reduced-motion.
 * - Wrapped in Suspense to ensure seamless static generation in Next.js 16.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const [isFading, setIsFading] = useState(false);

  const handlePathChange = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    setIsFading(true);
    const timer = setTimeout(() => {
      setIsFading(false);
    }, 40);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PathnameWatcher onChange={handlePathChange} />
      </Suspense>
      <div
        className={`w-full min-h-full flex-1 flex flex-col transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          isFading ? 'opacity-80' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}

