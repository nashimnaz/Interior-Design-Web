'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

export interface SmoothImageProps extends ImageProps {
  containerClassName?: string;
  fallbackSrc?: string;
}

/**
 * SmoothImage
 * 
 * Premium, minimal image component wrapping Next.js Image.
 * - Smoothly reveals the image on load with subtle opacity (0 -> 1) and scale (1.015 -> 1.0).
 * - Exact aspect ratio preservation with zero layout shift.
 * - Neutral architectural placeholder tone (#EAE4D9 / #EDE8DF).
 * - Graceful fallback on error (prevents broken image icons).
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <Image
      src={hasError ? fallbackSrc : currentSrc}
      alt={alt}
      priority={priority}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.015]'
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
