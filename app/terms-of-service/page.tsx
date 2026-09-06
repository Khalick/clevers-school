import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms of Service | Clevers Schools Resources',
    description:
        'The terms on which Clevers Schools Resources provides access to its educational materials, including subscription, payment and acceptable use.',
};

/**
 * The footer has linked to /terms-of-service since launch and no route existed,
 * so it 404'd on every page.
 *
 * The terms below describe how the service actually behaves, read from the code:
 * a KES 1,005 subscription (app/subscribe, app/api/subscription/create) valid for
 * a fixed period with no auto-renewal, paid by Daraja STK push, granting document
 * downloads that are logged per user.
 *
 * It is factual, not legal advice. Have it reviewed before you rely on it.
 */
export default function TermsOfService() {
    return (
        <article className="max-w-2xl space-y-8 pb-4">
            <p className="text-sm text-muted-foreground">
                Last updated {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long' })}
            </p>

            <p className="leading-relaxed">
                These terms apply when you use Clevers Schools Resources. By creating an
                account or subscribing, you agree to them.
            </p>

            <Section title="What we provide">
                <p className="leading-relaxed">
                    Access to educational materials — KCSE past papers and marking schemes,
                    CBC notes and curriculum designs, IGCSE resources, revision booklets,
                    topic tests, schemes of work and lesson plans. We add and update material
                    over time, and the exact contents of any section may change.
                </p>
            </Section>

            <Section title="Accounts">
                <List
                    items={[
                        'You are responsible for keeping your password confidential and for activity on your account.',
                        'Give accurate details when you register, so we can reach you about your subscription.',
                        'Tell us promptly if you believe someone else is using your account.',
                    ]}
                />
            </Section>

            <Section title="Subscriptions and payment">
                <List
                    items={[
                        'A subscription costs KES 1,005 and runs for the period shown at checkout.',
                        'Payment is taken by M-Pesa. You authorise it on your own handset; we never see your PIN.',
                        'Subscriptions do not renew automatically. Access ends on the expiry date shown in your account unless you subscribe again.',
                        'Access begins once Safaricom confirms your payment. If money leaves your account but access is not granted, contact us with your M-Pesa confirmation code and we will resolve it.',
                    ]}
                />
            </Section>

            <Section title="Using the materials">
                <p className="leading-relaxed">
                    Your subscription is for your own teaching or study. You may download and
                    print materials for that purpose.
                </p>
                <List
                    items={[
                        'Do not resell, republish or redistribute the materials.',
                        'Do not share your account credentials or bulk-download material for distribution.',
                        'Do not attempt to disrupt the service or access parts of it you are not entitled to.',
                    ]}
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Downloads are recorded against your account. We may suspend accounts used
                    in breach of these terms.
                </p>
            </Section>

            <Section title="Third-party examination material">
                <p className="leading-relaxed">
                    Some materials originate from examination bodies and other third parties
                    and remain their property. They are provided here for revision and
                    teaching. If you hold rights in material published here and want it
                    removed, contact us and we will act on your request.
                </p>
            </Section>

            <Section title="Availability">
                <p className="leading-relaxed">
                    We work to keep the service available, but we cannot guarantee
                    uninterrupted access. Documents are hosted on third-party storage, and
                    access may occasionally be interrupted for maintenance or reasons outside
                    our control.
                </p>
            </Section>

            <Section title="Changes to these terms">
                <p className="leading-relaxed">
                    We may update these terms. The date at the top of this page shows when
                    they last changed. Continuing to use the service after a change means you
                    accept the updated terms.
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
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
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
