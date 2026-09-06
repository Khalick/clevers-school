'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

import EmptyResources from '@/app/components/EmptyResources';
// Types
type FileItem = {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
    folderId: string; // Added to track which folder the file came from
}

// Google Drive API helper function
const fetchGoogleDriveFiles = async (folderIds: string[]): Promise<FileItem[]> => {
    try {
        // Fetch files from all folders in parallel
        const filesPromises = folderIds.map(async (folderId) => {
            const response = await fetch(`/api/drive/files?folderId=${folderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch files from folder ${folderId}`);
            }

            const data = await response.json();
            // Add folderId to each file object
            return data.files.map((file: FileItem) => ({
                ...file,
                folderId
            }));
        });

        // Wait for all requests to complete
        const filesArrays = await Promise.all(filesPromises);
        // Flatten the arrays of files into a single array
        return filesArrays.flat();
    } catch (error) {
        console.error('Error fetching files:', error);
        return [];
    }
};

export default function PP1Plan() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Replace these with your Google Drive folder IDs
    const folderIds = useMemo(() => [
        '1swJLleVaNYTd1fowDVK0FVFufTfSSzGH', // First folder
        '1ev2n_kcoaKxQvgZpYBxboHC_AtXeUEfG'          // Second folder
    ], []);

    // Add folder names mapping
    const folderNames: { [key: string]: string } = {
        '1swJLleVaNYTd1fowDVK0FVFufTfSSzGH': 'PP1 Lesson Plans',
        '1ev2n_kcoaKxQvgZpYBxboHC_AtXeUEfG': 'Additional Lesson Plans'
    };

    useEffect(() => {
        const fetchFiles = async () => {
            const filesList = await fetchGoogleDriveFiles(folderIds);
            setMaterial(filesList);
            setLoading(false);
        };
        fetchFiles();
    }, [folderIds]);

    // Memoized filtered files based on search query
    const filteredMaterial = useMemo(() => {
        if (!searchQuery) return material;

        const lowercaseQuery = searchQuery.toLowerCase().trim();
        return material.filter(file =>
            file.name.toLowerCase().includes(lowercaseQuery)
        );
    }, [material, searchQuery]);

    // Group files by folder
    const groupedFiles = useMemo(() => {
        return filteredMaterial.reduce((acc, file) => {
            const folderId = file.folderId;
            if (!acc[folderId]) {
                acc[folderId] = [];
            }
            acc[folderId].push(file);
            return acc;
        }, {} as { [key: string]: FileItem[] });
    }, [filteredMaterial]);

    const handleDocumentClick = (file: FileItem) => {
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-background">
                <div className="bg-gray-800/80 p-6 rounded-full shadow-xl">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-background">
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 hidden pointer-events-none"></div>

                    <Card className="shadow-sm backdrop-blur-sm border border-border rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-border">
                            <div className="relative mt-2 md:mt-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 w-full md:w-64 bg-card text-foreground border-input focus:ring-ring focus:border-primary"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={handleSearchClear}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <X className="h-5 w-5 text-muted-foreground hover:text-gray-600" />
                                    </button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            {Object.entries(groupedFiles).map(([folderId, files]) => (
                                <div key={folderId} className="mb-6 last:mb-0">
                                    <h2 className="text-lg font-semibold text-foreground mb-3">
                                        {folderNames[folderId]}
                                    </h2>
                                    <div className="grid gap-3 md:gap-4">
                                        {files.map((file) => (
                                            <div
                                                key={file.id}
                                                className="group flex items-center p-3 md:p-4 rounded-lg border border-border
                                                         hover:bg-accent hover:border-primary/40 transition-all duration-200
                                                         cursor-pointer shadow-sm hover:shadow-md bg-card backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                onClick={() => handleDocumentClick(file)}
                                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDocumentClick(file); } }}
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`Open ${file.name}`}
                                            >
                                                <FileText className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground group-hover:text-primary
                                                                   transition-colors mr-3 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm md:text-base font-medium text-foreground group-hover:text-primary line-clamp-2 break-words">
                                                        {file.name}
                                                    </h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {filteredMaterial.length === 0 && (
                                <EmptyResources searchQuery={searchQuery} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}