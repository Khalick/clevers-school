'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Loader2, Search, X, AlertCircle } from "lucide-react";
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
    parents?: string[];
    folderId?: string; // We add this manually
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

// Assignments Folder Configuration
const ASSIGNMENT_FOLDERS = {
    '14QQQPHK-0ltcGH95OJEqpssTL9PVGdXi': '2024 AUGUST HOLIDAY ASSIGNMENTS',
    '1b5WplAKi8iU-rsWKb6_WIJQpCnx3GwU1': '2024 APRIL HOLIDAY ASSIGNMENTS',
    '16fdWwikTK60bK5YaGJpUvC8cHmNYt8-c': '2020 FORM 1-4 ASSIGNMENTS (Revision)'
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
    <div className="h-full flex items-center justify-center bg-amber-300 min-h-[50vh]" role="status">
        <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
            <Loader2
                className="h-8 w-8 animate-spin text-emerald-500"
                aria-label="Loading documents"
            />
        </div>
        <span className="sr-only">Loading documents...</span>
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
            placeholder="Search assignments..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-10 w-full md:w-64 bg-white text-black border-gray-300
                       focus:ring-emerald-500 focus:border-emerald-500"
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
            className="group flex items-center p-3 md:p-4 rounded-lg border border-gray-700
                       hover:bg-gray-700/50 hover:border-emerald-600/50 transition-all duration-200
                       cursor-pointer shadow-sm hover:shadow-md bg-white backdrop-blur-sm
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            onClick={() => onClick(file)}
            onKeyDown={handleKeyPress}
            role="button"
            tabIndex={0}
            aria-label={`Open ${file.name}`}
        >
            <FileText
                className="h-5 w-5 md:h-6 md:w-6 text-blue-800 group-hover:text-emerald-400
                          transition-colors mr-3 flex-shrink-0"
                aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-medium text-blue-900 group-hover:text-emerald-300 truncate">
                    {file.name}
                </h3>
            </div>
        </div>
    );
};

// Main Component
export default function SecondaryAssignments() {
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

        for (const [folderId, folderName] of Object.entries(ASSIGNMENT_FOLDERS)) {
            const { files, error: fetchError } = await DriveService.fetchFiles(folderId);

            if (fetchError) {
                console.error(`Error fetching ${folderName}:`, fetchError);
                errors.push(`${folderName}: ${fetchError.message}`);
            } else {
                // Add folderId to files for filtering if needed later
                results[folderId] = files.map(f => ({ ...f, folderId }));
            }
        }

        if (Object.keys(results).length === 0 && errors.length > 0) {
            setError("Failed to load assignments. Please try again later.");
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
        <div className="flex flex-col h-full w-full bg-amber-50">
            <div className="flex-1 overflow-y-auto px-4 py-8">
                <div className="relative max-w-4xl mx-auto">

                    <Card className="shadow-2xl border-gray-200 bg-white/90 backdrop-blur">
                        <CardHeader className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 p-6 bg-emerald-50 rounded-t-xl">
                            <CardTitle className="text-2xl font-bold text-emerald-800 text-center md:text-left mb-4 md:mb-0">
                                SECONDARY SCHOOL ASSIGNMENTS
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

                            {Object.entries(ASSIGNMENT_FOLDERS).map(([folderId, folderName]) => {
                                const files = filteredGroups[folderId];
                                if (!files || files.length === 0) return null;

                                return (
                                    <div key={folderId} className="mb-8 last:mb-0">
                                        <h3 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-100 pb-2">
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
                                        ? `No assignments found matching "${searchQuery}"`
                                        : "No assignments available at the moment."
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
