import Image from 'next/image';

/**
 * Brand mark.
 *
 * Was a 500x500 341 KB PNG rendered through `fill` with
 * `sizes="(max-width: 768px) 100vw, 128px"` — which told phones to request a
 * full-viewport-width image for a mark displayed at ~112px. The source is now
 * 256x256 / 83 KB, and explicit intrinsic dimensions let Next serve a correctly
 * sized WebP instead.
 */
export const Logo = ({ className = '' }) => (
    <Image
        src="/image.png"
        alt="Clevers Schools"
        width={112}
        height={48}
        sizes="112px"
        priority
        className={`h-10 w-auto object-contain ${className}`}
    />
);
