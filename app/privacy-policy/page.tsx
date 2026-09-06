import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy | Clevers Schools Resources',
    description:
        'What personal information Clevers Schools Resources collects, why it is collected, who it is shared with, and how to request its deletion.',
};

/**
 * The footer has linked to /privacy-policy since launch and no route existed,
 * so it 404'd on every page — on a service that takes M-Pesa payments.
 *
 * The content below describes what the application actually does, read from the
 * code: NextAuth credentials sign-in, MongoDB collections (users, subscriptions,
 * orders, downloads, mpesa_transactions), Daraja STK push for payment, Google
 * Drive and Firebase Storage for documents, Resend for password-reset email, and
 * Sentry plus Vercel Analytics for monitoring.
 *
 * It is factual, not legal advice. Have it reviewed before you rely on it.
 */
export default function PrivacyPolicy() {
    return (
        <article className="max-w-2xl space-y-8 pb-4">
            <p className="text-sm text-muted-foreground">
                Last updated {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long' })}
            </p>

            <section className="space-y-3">
                <p className="leading-relaxed">
                    This page explains what personal information Clevers Schools Resources
                    collects when you use this site, why we collect it, and what you can ask
                    us to do with it.
                </p>
            </section>

            <Section title="What we collect">
                <List
                    items={[
                        'Account details — your name, email address and a securely hashed password, created when you register.',
                        'Subscription and payment records — the M-Pesa phone number you enter at checkout, the transaction reference returned by Safaricom, the amount, and the start and expiry dates of your subscription.',
                        'Download activity — which documents you download and when, so we can support your account and understand which resources are used.',
                        'Technical data — standard server logs, plus error reports and performance measurements used to keep the site working.',
                    ]}
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                    We do not receive or store your M-Pesa PIN. Payment is authorised on your
                    handset by Safaricom.
                </p>
            </Section>

            <Section title="Why we collect it">
                <List
                    items={[
                        'To create and secure your account and let you sign in.',
                        'To take payment and to know whether your subscription is active.',
                        'To give you access to the resources your subscription covers.',
                        'To respond when you contact us for support.',
                        'To find and fix faults on the site.',
                    ]}
                />
            </Section>

            <Section title="Who we share it with">
                <p className="leading-relaxed">
                    We do not sell your personal information. We share only what is necessary
                    with the services that run this platform:
                </p>
                <List
                    items={[
                        'Safaricom M-Pesa (Daraja) — to request and confirm payment.',
                        'Google Drive and Firebase Storage — where the documents themselves are hosted.',
                        'Our email provider — to send password-reset messages.',
                        'Our hosting, error-monitoring and analytics providers — to operate and maintain the site.',
                    ]}
                />
            </Section>

            <Section title="How long we keep it">
                <p className="leading-relaxed">
                    Account, subscription and payment records are kept while your account is
                    open and afterwards for as long as we are required to retain financial
                    records. You can ask us to close your account and delete your personal
                    information at any time.
                </p>
            </Section>

            <Section title="Your choices">
                <p className="leading-relaxed">
                    You can ask us to show you the information we hold about you, correct it,
                    or delete it. Contact us using the details below and we will respond.
                </p>
            </Section>

            <Section title="Cookies">
                <p className="leading-relaxed">
                    We use cookies that are necessary for the site to work — principally to
                    keep you signed in. We also collect anonymous usage and performance
                    measurements.
                </p>
            </Section>

            <Section title="Contact us">
                <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <a className="text-primary hover:underline" href="mailto:info@clevers.co.ke">
                            info@clevers.co.ke
                        </a>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <a className="text-primary hover:underline" href="tel:+254725449122">
                            +254 725 449 122
                        </a>
                    </li>
                </ul>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    See also our{' '}
                    <Link href="/terms-of-service" className="text-primary hover:underline">
                        Terms of Service
                    </Link>
                    .
                </p>
            </Section>
        </article>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {children}
        </section>
    );
}

function List({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className="flex gap-2.5 leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
