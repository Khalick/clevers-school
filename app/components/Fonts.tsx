import localFont from "next/font/local";

/**
 * GeistMono was loaded here too — 66 KB on every page load for a single
 * `font-mono` span on the subscribe page. Dropped; Tailwind's font-mono now
 * falls back to the system monospace stack, which is indistinguishable at that
 * size and costs nothing.
 */
export const geistSans = localFont({
  src: "GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
