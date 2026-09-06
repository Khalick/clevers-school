'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    Loader2,
    Download,
    Lock,
    FileText,
    FileSpreadsheet,
    Presentation,
    File as FileIcon,
    Check,
    ShieldCheck,
    Smartphone,
    CalendarDays,
    AlertCircle,
    ArrowLeft,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

/**
 * The paywall. Every one of the 174 listing pages funnels here.
 *
 * Was: a filename and a single padlock button captioned "GET ACCESS" on an
 * orange background — no context about the document, no explanation of what a
 * subscription buys, and a dead end for signed-out users.
 *
 * Also fixes two blocking defects carried by the old version:
 *   1. `router.push('/auth')` (twice) — app/auth/page.tsx does not exist, so the
 *      sign-in path from the paywall was a 404. Now /auth/signin with a
 *      callbackUrl back to this document.
 *   2. Firebase-backed files ({name, url}, no `id`) failed the
 *      `!parsedData.id` guard with "Invalid file data format", so every document
 *      under /college/year-1..3 and /research/* was undownloadable. Identity is
 *      now id OR url.
 */

const SUBSCRIPTION_AMOUNT = 1005;

interface FileItem {
    id?: string;
    name: string;
    webViewLink?: string;
    mimeType?: string;
    /** Firebase Storage download URL — these items carry no Drive id. */
    url?: string;
}

interface UserSubscription {
    isSubscribed: boolean;
    expiryDate: string;
}

interface SessionUser {
    id: string;
}

/** Icon and label from mime type, falling back to the filename extension. */
function describeFile(file: FileItem | null) {
    const mime = file?.mimeType ?? '';
    const ext = (file?.name ?? '').split('.').pop()?.toLowerCase() ?? '';

    if (mime.includes('pdf') || ext === 'pdf') {
        return { Icon: FileText, label: 'PDF document', tone: 'text-destructive' };
    }
    if (mime.includes('word') || mime.includes('document') || ['doc', 'docx'].includes(ext)) {
        return { Icon: FileText, label: 'Word document', tone: 'text-track-kcse' };
    }
    if (mime.includes('sheet') || mime.includes('excel') || ['xls', 'xlsx', 'csv'].includes(ext)) {
        return { Icon: FileSpreadsheet, label: 'Spreadsheet', tone: 'text-primary' };
    }
    if (mime.includes('presentation') || ['ppt', 'pptx'].includes(ext)) {
        return { Icon: Presentation, label: 'Presentation', tone: 'text-track-igcse' };
    }
    return { Icon: FileIcon, label: 'Document', tone: 'text-muted-foreground' };
}

const DocumentPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    const [fileData, setFileData] = useState<FileItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCheckSubscription = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch('/api/subscription/check/');
            if (!response.ok) throw new Error('Subscription check failed');
            setSubscription(await response.json());
        } catch (err) {
            setError('We could not check your subscription status.');
            console.error('Subscription error:', err);
        }
    }, []);

    const handleFileDownload = async () => {
        if (!session?.user || !fileData) return;

        setIsProcessing(true);
        setError(null);

        try {
            const user = session.user as SessionUser;
            await fetch('/api/downloads/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    fileId: fileData.id ?? fileData.name,
                    fileName: fileData.name,
                    downloadDate: new Date().toISOString(),
                }),
            });

            // Firebase items carry a direct URL and no Drive id.
            if (!fileData.id && fileData.url) {
                window.open(fileData.url, '_blank', 'noopener,noreferrer');
                toast({ title: 'Opening document', description: fileData.name });
                return;
            }

            const downloadResponse = await fetch(`/api/downloads/file/${fileData.id}`);
            if (!downloadResponse.ok) throw new Error('File download failed');

            const contentDisposition = downloadResponse.headers.get('content-disposition');
            const fileName = contentDisposition
                ? decodeURIComponent(contentDisposition.split('filename=')[1].replace(/['"]/g, ''))
                : fileData.name;

            const blob = await downloadResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast({ title: 'Download started', description: fileName });
        } catch (err) {
            setError('We could not download this file. Please try again.');
            toast({
                title: 'Download failed',
                description: 'Please try again in a moment.',
                variant: 'destructive',
            });
            console.error('Download error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const returnUrl = () =>
        typeof window === 'undefined'
            ? ''
            : encodeURIComponent(window.location.pathname + window.location.search);

    const handleDownload = () => {
        if (!session) {
            router.push(`/auth/signin?callbackUrl=${returnUrl()}`);
            return;
        }
        if (!subscription?.isSubscribed) {
            router.push(`/subscribe?returnUrl=${returnUrl()}`);
            return;
        }
        handleFileDownload();
    };

    useEffect(() => {
        const initializePage = async () => {
            if (!isMounted) return;
            try {
                const fileDataParam = searchParams.get('fileData');
                if (fileDataParam) {
                    const parsedData: FileItem = JSON.parse(decodeURIComponent(fileDataParam));
                    // Drive items have an id; Firebase items only a url.
                    if (!parsedData.name || (!parsedData.id && !parsedData.url)) {
                        throw new Error('Invalid file data format');
                    }
                    setFileData(parsedData);
                }
                if (session?.user) await handleCheckSubscription();
            } catch (err) {
                setError('We could not read this document’s details.');
                console.error('Initialization error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        initializePage();
    }, [searchParams, session, isMounted, handleCheckSubscription]);

    if (!isMounted) return null;

    if (isLoading || status === 'loading') {
        return (
            <div className="flex min-h-[40vh] items-center justify-center" role="status">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
                <span className="sr-only">Loading document</span>
            </div>
        );
    }

    if (!fileData) {
        return (
            <div className="mx-auto max-w-lg py-10 text-center">
                <FileIcon className="mx-auto mb-4 h-10 w-10 text-muted-foreground" aria-hidden="true" />
                <h1 className="text-xl font-semibold">Document not found</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    This link may be incomplete or out of date. Browse the section it came from
                    to find the file again.
                </p>
                <Button asChild variant="outline" className="mt-5 gap-2">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to resources
                    </Link>
                </Button>
            </div>
        );
    }

    const { Icon, label, tone } = describeFile(fileData);
    const isSubscribed = Boolean(subscription?.isSubscribed);

    return (
        <div className="space-y-6">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                {/* Document identity */}
                <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
                            <Icon className={`h-7 w-7 ${tone}`} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                            <h1 className="break-words text-xl font-semibold leading-snug sm:text-2xl">
                                {fileData.name}
                            </h1>
                            <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
                        </div>
                    </div>

                    {isSubscribed ? (
                        <div className="mt-6">
                            <Button onClick={handleDownload} disabled={isProcessing} size="lg" className="w-full gap-2 sm:w-auto">
                                {isProcessing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Download className="h-4 w-4" />
                                )}
                                {isProcessing ? 'Preparing your download…' : 'Download document'}
                            </Button>
                            {subscription?.expiryDate && (
                                <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                                    Subscription active until{' '}
                                    {new Date(subscription.expiryDate).toLocaleDateString('en-KE', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-secondary px-4 py-3">
                            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
                            <p className="text-sm text-secondary-foreground">
                                {session
                                    ? 'This document is included with a subscription.'
                                    : 'Sign in and subscribe to download this document.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* The offer */}
                {!isSubscribed && (
                    <aside className="rounded-xl border border-border bg-card p-6">
                        <p className="text-sm text-muted-foreground">Full access</p>
                        <p className="mt-1 text-3xl font-semibold tracking-tight text-primary">
                            KES {SUBSCRIPTION_AMOUNT.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">for 12 months</p>

                        <ul className="mt-5 space-y-2.5 text-sm">
                            {[
                                'Unlimited downloads, every section',
                                'KCSE, CBC, IGCSE and college material',
                                'New resources added through the year',
                            ].map((b) => (
                                <li key={b} className="flex items-start gap-2">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>

                        <Button onClick={handleDownload} size="lg" className="mt-6 w-full">
                            {session ? 'Subscribe to download' : 'Sign in to download'}
                        </Button>

                        {!session && (
                            <Button asChild variant="outline" className="mt-2 w-full">
                                <Link href="/auth/signup">Create a free account</Link>
                            </Button>
                        )}

                        <ul className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Smartphone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                Pay with M-Pesa
                            </li>
                            <li className="flex items-center gap-2">
                                <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                Full year, no auto-renewal
                            </li>
                            <li className="flex items-center gap-2">
                                <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                Secure checkout
                            </li>
                        </ul>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default DocumentPage;
