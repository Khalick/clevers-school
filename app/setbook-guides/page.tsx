'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Loader2, Search, X, AlertCircle, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Constants
const API_ENDPOINT = '/api/drive/files';

// Types
interface FileItem {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
    folderId?: string;
    lastModified?: string;
}

interface FetchError {
    message: string;
    status?: number;
}

interface FileCardProps {
    file: FileItem;
    onClick: (file: FileItem) => void;
}

// Set Books Folder Configuration
// Found via inspection script
const SETBOOK_FOLDERS = {
    '127baQy13U9u3NoV33ywrRGBuEpb1CM-g': 'ENGLISH SET BOOKS GUIDES',
    '1ZMRr0-Tf5gHb5V_SGN6ipR2hvMEwD28P': 'ENGLISH SET BOOKS NOTES'
};

// API Service
const DriveService = {
    async fetchFiles(folderId: string): Promise<{ files: FileItem[]; error?: FetchError }> {
        try {
            const response = await fetch(`${API_ENDPOINT}?folderId=${folderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to fetch files (${response.status})`);
            }

            const data = await response.json();
            return { files: data.files };
        } catch (error) {
            console.error('Error fetching files:', error);
            return {
                files: [],
                error: {
                    message: error instanceof Error ? error.message : 'An unexpected error occurred',
                    status: error instanceof Response ? error.status : undefined
                }
            };
        }
    }
};

// Components
const LoadingSpinner = () => (
    <div className="h-full flex items-center justify-center bg-sky-100 min-h-[50vh]" role="status">
        <div className="bg-white p-6 rounded-full shadow-xl">
            <Loader2
                className="h-8 w-8 animate-spin text-blue-600"
                aria-label="Loading set books"
            />
        </div>
        <span className="sr-only">Loading set books...</span>
    </div>
);

const SearchBar = ({
    value,
    onChange,
    onClear
}: {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}) => (
    <div className="relative mt-2 md:mt-0 w-full md:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <Input
            type="search"
            placeholder="Search guides & notes..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-10 w-full md:w-64 bg-white text-black border-gray-300
                       focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search documents"
        />
        {value && (
            <button
                onClick={onClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
            >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
        )}
    </div>
);

const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(file);
        }
    };

    return (
        <div
            className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-200
                       hover:bg-blue-50 hover:border-blue-300 transition-all duration-200
                       cursor-pointer shadow-sm hover:shadow-md bg-white
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => onClick(file)}
            onKeyDown={handleKeyPress}
            role="button"
            tabIndex={0}
            aria-label={`Open ${file.name}`}
        >
            <BookOpen
                className="h-5 w-5 md:h-6 md:w-6 text-slate-500 group-hover:text-blue-600
                          transition-colors mr-3 flex-shrink-0"
                aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-medium text-slate-900 group-hover:text-blue-700 truncate">
                    {file.name}
                </h3>
            </div>
        </div>
    );
};

// Main Component
export default function SetBooksPage() {
    const [allFiles, setAllFiles] = useState<{ [folderId: string]: FileItem[] }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const fetchAllFolders = useCallback(async () => {
        setLoading(true);
        setError(null);

        const results: { [folderId: string]: FileItem[] } = {};
        const errors: string[] = [];

        for (const [folderId, folderName] of Object.entries(SETBOOK_FOLDERS)) {
            const { files, error: fetchError } = await DriveService.fetchFiles(folderId);

            if (fetchError) {
                console.error(`Error fetching ${folderName}:`, fetchError);
                errors.push(`${folderName}: ${fetchError.message}`);
            } else {
                results[folderId] = files.map(f => ({ ...f, folderId }));
            }
        }

        if (Object.keys(results).length === 0 && errors.length > 0) {
            setError("Failed to load set books. Please try again later.");
        }

        setAllFiles(results);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAllFolders();
    }, [fetchAllFolders]);

    // Filter logic
    const filteredGroups = useMemo(() => {
        const groups: { [folderId: string]: FileItem[] } = {};
        const searchTerms = searchQuery.toLowerCase().trim().split(' ');

        Object.entries(allFiles).forEach(([folderId, files]) => {
            const filteredFiles = files.filter(file => {
                if (!searchQuery) return true;
                return searchTerms.every(term =>
                    file.name.toLowerCase().includes(term)
                );
            });

            if (filteredFiles.length > 0) {
                groups[folderId] = filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
            }
        });

        return groups;
    }, [allFiles, searchQuery]);

    const handleDocumentClick = useCallback((file: FileItem) => {
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    }, [router]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col h-full w-full bg-slate-50">
            <div className="flex-1 overflow-y-auto px-4 py-8">
                <div className="relative max-w-4xl mx-auto">

                    <Card className="shadow-xl border-gray-200 bg-white">
                        <CardHeader className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 p-6 bg-blue-600 rounded-t-xl text-white">
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                <BookOpen className="h-6 w-6" />
                                ENGLISH SET BOOKS
                            </CardTitle>
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onClear={() => setSearchQuery('')}
                            />
                        </CardHeader>

                        <CardContent className="p-6">
                            {error && (
                                <Alert variant="destructive" className="mb-6">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {Object.entries(SETBOOK_FOLDERS).map(([folderId, folderName]) => {
                                const files = filteredGroups[folderId];
                                if (!files || files.length === 0) return null;

                                return (
                                    <div key={folderId} className="mb-8 last:mb-0">
                                        <h3 className="text-lg font-bold text-blue-800 mb-3 border-b border-blue-100 pb-2">
                                            {folderName}
                                        </h3>
                                        <div className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-2">
                                            {files.map((file) => (
                                                <FileCard
                                                    key={file.id}
                                                    file={file}
                                                    onClick={handleDocumentClick}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}

                            {!loading && !error && Object.keys(filteredGroups).length === 0 && (
                                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    {searchQuery
                                        ? `No guides found matching "${searchQuery}"`
                                        : "No study guides available at the moment."
                                    }
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
