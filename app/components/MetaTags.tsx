/**
 * Head tags that Next's Metadata API does not cover.
 *
 * This used to also emit og:*, twitter:* and viewport tags — all of which
 * lib/metadata.ts and the `viewport` export in app/layout.tsx already produce.
 * Every page therefore shipped two of each, with the duplicates pointing at
 * https://resources.clevers.co.ke (a domain that does not resolve) and at a
 * third-party OG image behind an expiring token. Crawlers were being given two
 * conflicting answers for the canonical URL and preview image of every page.
 *
 * Those are gone; lib/metadata.ts is now the single source, and it derives
 * everything from SITE_URL.
 */
export default function MetaTags() {
  return (
    <>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:; img-src 'self' https: data: blob:; font-src 'self' https: data:;"
      />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    </>
  );
}
