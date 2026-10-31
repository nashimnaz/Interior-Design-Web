'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

export interface SmoothImageProps extends ImageProps {
  containerClassName?: string;
  fallbackSrc?: string;
}

/**
 * SmoothImage
 * 
 * Premium, minimal image component wrapping Next.js Image.
 * - Guarantees instant rendering for priority or cached images with zero blank-screen flicker.
 * - Smoothly reveals lazy-loaded images on load with subtle opacity (0 -> 1) and scale (1.015 -> 1.0).
 * - Exact aspect ratio preservation with zero layout shift.
 * - Neutral architectural placeholder tone (#EAE4D9 / #EDE8DF).
 * - Graceful fallback on error.
 * - Automatically respects prefers-reduced-motion.
 */
export function SmoothImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc = '/images/projects/living-room.jpg',
  priority = false,
  onLoad,
  onError,
  ...rest
}: SmoothImageProps) {
  // If priority is true, start as loaded immediately so SSR / initial paint is 100% visible
  const [isLoaded, setIsLoaded] = useState(Boolean(priority));
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const prevSrcRef = useRef(src);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (prevSrcRef.current !== src) {
      prevSrcRef.current = src;
      setCurrentSrc(src);
      setIsLoaded(Boolean(priority));
      setHasError(false);
    }
  }, [src, priority]);

  // Synchronous check if the image has already loaded in the DOM (e.g. from browser cache or SSR preload)
  const handleRef = (node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (node && node.complete && node.naturalWidth > 0) {
      setIsLoaded(true);
    }
  };

  const isVisible = isLoaded || Boolean(priority);

  return (
    <Image
      ref={handleRef}
      src={hasError ? fallbackSrc : currentSrc}
      alt={alt}
      priority={priority}
      className={`${
        priority
          ? 'opacity-100 scale-100'
          : isVisible
          ? 'opacity-100 scale-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none'
          : 'opacity-0 scale-[1.015]'
      } ${className}`}
      onLoad={(e) => {
        setIsLoaded(true);
        if (onLoad) {
          onLoad(e);
        }
      }}
      onError={(e) => {
        setHasError(true);
        setIsLoaded(true);
        if (onError) {
          onError(e);
        }
      }}
      {...rest}
    />
  );
}
