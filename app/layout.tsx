
import { Analytics } from "@vercel/analytics/react";
import type { Viewport } from 'next';
import { metadata } from '@/lib/metadata';
import { SITE_URL } from '@/lib/constants';
import { geistSans } from './components/Fonts';
import { SpeedInsights } from "@vercel/speed-insights/next"
import MetaTags from './components/MetaTags';
import StructuredData from './components/StructuredData';
import AppLayout from "./components/AppLayout";
import Footer from "./components/Footer";
import AuthProvider from "@/providers";
import PaymentCheck from '@/app/components/PaymentCheck';
import { Toaster } from '@/components/ui/toaster';
import "./globals.css";
export { metadata };

/** Tints the Android browser chrome with the brand green, and pins the zoom
 *  behaviour. Next warns about themeColor inside `metadata`, so it lives here. */
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#008a44' },
        { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
    ],
    width: 'device-width',
    initialScale: 1,
    // Not maximumScale/userScalable — capping zoom is an accessibility failure.
};



const SITE_NAME = 'Clevers Schools Resources';
const SITE_DESCRIPTION = 'Access official IGCSE past papers, Cambridge resources, and Edexcel materials. Expert-curated lesson plans and teaching resources for international curriculum schools in Kenya.';

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Clevers Schools",
    url: SITE_URL,
    logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/image.png`,
        contentUrl: `${SITE_URL}/image.png`,
        width: "112",
        height: "112",
        alternateName: "Clevers Schools Logo"
    },
    sameAs: [
        "https://www.facebook.com/cleversschools",
        "https://twitter.com/oritz_sir",

    ],
    contactPoint: [{
        "@type": "ContactPoint",
        telephone: "+25425449122",
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: ["en", "sw"],
        hoursAvailable: "Mo-Fr 08:00-17:00 EAT"
    }],
    address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressRegion: "Nairobi",
        addressLocality: "Nairobi",
        postalCode: "00100",
        streetAddress: "Your Street Address"
    }
};

// Website Schema optimized for Google Search
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
        "@id": `${SITE_URL}/#organization`
    },
    potentialAction: [{
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
    }],
    inLanguage: ["en-KE", "sw-KE"]
};

// BreadcrumbList Schema for better navigation structure
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    // Previously advertised /junior, /senior and /elementary — none of which
    // are real routes. These are the actual top-level sections.
    itemListElement: [
        { name: "Home", item: SITE_URL },
        { name: "KCSE Past Papers", item: `${SITE_URL}/kcse` },
        { name: "County Mocks", item: `${SITE_URL}/mocks` },
        { name: "National School Exams", item: `${SITE_URL}/nationals` },
        { name: "Secondary", item: `${SITE_URL}/secondary` },
        { name: "Primary & CBC", item: `${SITE_URL}/grade1to6Resources` },
        { name: "IGCSE", item: `${SITE_URL}/igcse` },
        { name: "College", item: `${SITE_URL}/college` },
    ].map((entry, i) => ({ "@type": "ListItem", position: i + 1, ...entry })),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const paid = true;
  

  return (
    <PaymentCheck paid={paid}>
    <AuthProvider>
      <html 
        lang="en" 
        className="h-full"
        suppressHydrationWarning
      >
        <head>
        <link rel="icon" href="/favicon.ico"/>
          <MetaTags />
          <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify([
                                organizationSchema,
                                websiteSchema,
                                breadcrumbSchema
                            ])
                        }}
                    />
          <StructuredData />
        </head>
        <body 
          className={`${geistSans.variable} antialiased min-h-full bg-background text-foreground`}
        >
         
          <AppLayout>{children}</AppLayout>
          {/* Without this, every toast() call in the app is silent — sign-in
              errors, download confirmations and payment feedback included. */}
          <Toaster />
          <Analytics />
          
          <SpeedInsights />
        </body>
      </html>
    </AuthProvider>
  </PaymentCheck>
  );
}
