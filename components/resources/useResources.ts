'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ResourceFile, ResourceSource } from './types';

/**
 * Loads files for any resource source.
 *
 * Replaces `fetchGoogleDriveFiles` redeclared in 106 page files. Crucially it
 * distinguishes an empty folder from a failed request: those 106 copies all
 * caught the error, logged it and returned [], so during a Drive outage every
 * student saw "No documents available at the moment" and no one could tell the
 * difference.
 */

async function fetchDriveFolder(folderId: string): Promise<ResourceFile[]> {
    const res = await fetch(`/api/drive/files?folderId=${encodeURIComponent(folderId)}`);
    if (!res.ok) {
        let detail = `${res.status}`;
        try {
            const body = await res.json();
            if (body?.error) detail = body.error;
        } catch {
            /* response had no JSON body */
        }
        throw new Error(detail);
    }
    const data = await res.json();
    return (data.files ?? []) as ResourceFile[];
}

export interface UseResourcesResult {
    files: ResourceFile[];
    loading: boolean;
    error: string | null;
    reload: () => void;
    /** For 'drive-lazy': per-folder state, keyed by folder id. */
    lazy: Record<string, { files: ResourceFile[]; loading: boolean; error: string | null }>;
    loadFolder: (folderId: string) => void;
}

export function useResources(source: ResourceSource): UseResourcesResult {
    const [files, setFiles] = useState<ResourceFile[]>([]);
    const [loading, setLoading] = useState(source.kind !== 'drive-lazy');
    const [error, setError] = useState<string | null>(null);
    const [lazy, setLazy] = useState<UseResourcesResult['lazy']>({});
    const [nonce, setNonce] = useState(0);

    // Serialised so the effect depends on the source's value, not its identity —
    // callers can pass an object literal without memoising it.
    const key = useMemo(() => JSON.stringify(source), [source]);
    const requestId = useRef(0);

    useEffect(() => {
        const parsed: ResourceSource = JSON.parse(key);
        if (parsed.kind === 'drive-lazy') {
            setLoading(false);
            return;
        }

        const id = ++requestId.current;
        let cancelled = false;
        setLoading(true);
        setError(null);

        (async () => {
            try {
                let result: ResourceFile[] = [];

                if (parsed.kind === 'drive') {
                    result = await fetchDriveFolder(parsed.folderId);
                } else if (parsed.kind === 'drive-multi') {
                    const settled = await Promise.allSettled(
                        parsed.folders.map((f) => fetchDriveFolder(f.id)),
                    );
                    // One unreachable folder must not blank the whole page.
                    const failures = settled.filter((s) => s.status === 'rejected');
                    if (failures.length === settled.length && settled.length > 0) {
                        throw new Error((failures[0] as PromiseRejectedResult).reason?.message ?? 'Request failed');
                    }
                    result = settled.flatMap((s, i) =>
                        s.status === 'fulfilled'
                            ? s.value.map((file) => ({ ...file, sectionId: parsed.folders[i].id }))
                            : [],
                    );
                } else if (parsed.kind === 'firebase') {
                    const { getAllFilesInFolder } = await import('@/lib/firebaseUtils');
                    result = (await getAllFilesInFolder(parsed.folderPath)) as ResourceFile[];
                }

                if (!cancelled && id === requestId.current) setFiles(result);
            } catch (err) {
                if (!cancelled && id === requestId.current) {
                    setFiles([]);
                    setError(err instanceof Error ? err.message : 'Request failed');
                }
            } finally {
                if (!cancelled && id === requestId.current) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [key, nonce]);

    const loadFolder = useCallback(
        (folderId: string) => {
            setLazy((prev) => {
                if (prev[folderId] && !prev[folderId].error) return prev;
                return { ...prev, [folderId]: { files: [], loading: true, error: null } };
            });
            fetchDriveFolder(folderId)
                .then((result) =>
                    setLazy((prev) => ({ ...prev, [folderId]: { files: result, loading: false, error: null } })),
                )
                .catch((err: Error) =>
                    setLazy((prev) => ({
                        ...prev,
                        [folderId]: { files: [], loading: false, error: err.message },
                    })),
                );
        },
        [],
    );

    const reload = useCallback(() => setNonce((n) => n + 1), []);

    return { files, loading, error, reload, lazy, loadFolder };
}
