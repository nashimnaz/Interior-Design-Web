import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#F7F4EE] flex flex-col items-center justify-center px-6 py-20 text-center select-none">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="mb-10 inline-block focus:outline-none">
          <Image
            src="/images/excorto-logo.png"
            alt="Excorto Builders & Interiors"
            width={240}
            height={58}
            priority
            unoptimized
            style={{ width: 'auto' }}
            className="h-[44px] md:h-[52px] w-auto object-contain"
          />
        </Link>

        {/* 404 Serif Headline */}
        <p className="text-[12.5px] font-semibold tracking-[0.24em] text-[#8F5E3B] uppercase mb-3">
          Error 404
        </p>
        <h1 className="font-serif text-[42px] sm:text-[54px] font-normal text-[#161B18] leading-[1.1] tracking-[-0.015em] mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#555C56] leading-[1.65] max-w-[360px] mb-8">
          The architectural space you are looking for does not exist or may have been relocated.
        </p>

        {/* Return Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#344637] text-white hover:bg-[#253328] text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(52,70,55,0.2)] active:scale-95"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
