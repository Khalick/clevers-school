'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, FileText, Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Types
type FileItem = {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
    folderId: string;
}

type FolderState = {
    isExpanded: boolean;
    files: FileItem[];
    isLoading: boolean;
}

// Google Drive API helper function
const fetchGoogleDriveFiles = async (folderId: string): Promise<FileItem[]> => {
    try {
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
        return data.files.map((file: FileItem) => ({
            ...file,
            folderId
        }));
    } catch (error) {
        console.error('Error fetching files:', error);
        return [];
    }
};

export default function CambridgeOLevel() {
    const [searchQuery, setSearchQuery] = useState('');
    const [folderStates, setFolderStates] = useState<{ [key: string]: FolderState }>({});
    const router = useRouter();

    // Assignment folder IDs and names
    const folderNames: { [key: string]: string } = useMemo(() => ({
        '1R1j5M49g8Gu3NZCjA8Vdjngxbd-rcU9i': 'Travel & Tourism',
        '1QpSpejNKTSASm8yRcsFrlUDP6oz3R6Qv': 'Psychology',
        '1wwqn6owGk6CblgFDeOeC4aOp-shqQZcD': 'Physics',
        '1M4T_hN2M9yQlYOP2OhjpYatcegpEp13S': 'Music',
        '1WFxKtiJZep6U7y7NLDCp0CcJaK5KEe3B': 'Mathematics',
        '1ghELFOvVOlXMPh4WAyDiic8E7F-I1tj1': 'History',
        '17GtQfHsLNEwnb-B0YkUSlxTHb-qcrnNQ': 'Geography',
        '1ZowiQ_E9shnLi9WwtefJadA1yb1z9nBM': 'French',
        '1wMmHzm_MB9EzZ4Y2Ea9sncdCd5I-e5kN': 'English',
        '19-0SDyohKBoNrg6iDdnOzA_07mQQ9qKS': 'Computing',
        '1NGoMD_gadhfEtdP-5BH8mzrMNElqcffS': 'Computer Science',
        '113p7H9X3JEtO9lA_ZmgDDEM9Z8ut622S': 'Chemistry',
        '17_hUXFeVBIV7wiiyRkuddpZgTjc-Etzq': 'Business',
        '1dq4W4lNI18nI6TPO8qjhDdFWIkYeHq7L': 'Biology',
        '1FtDbAxRRUjSwiGE2S5HOY_4YlZ-g-xMU': 'Art & Design',
        '1_Q3PMd5mYEJD66kzeUsw1SVZMswdwjC8': 'Accounting'
    }), []);

    // Initialize folder states
    useEffect(() => {
        const initialStates = Object.keys(folderNames).reduce((acc, folderId) => {
            acc[folderId] = {
                isExpanded: false,
                files: [],
                isLoading: false
            };
            return acc;
        }, {} as { [key: string]: FolderState });
        setFolderStates(initialStates);
    }, [folderNames]);

    const handleFolderClick = async (folderId: string) => {
        // Toggle folder expansion
        setFolderStates(prev => ({
            ...prev,
            [folderId]: {
                ...prev[folderId],
                isExpanded: !prev[folderId].isExpanded,
                isLoading: !prev[folderId].isExpanded && prev[folderId].files.length === 0
            }
        }));

        // If folder is being expanded and has no files, fetch them
        if (!folderStates[folderId].isExpanded && folderStates[folderId].files.length === 0) {
            const files = await fetchGoogleDriveFiles(folderId);
            setFolderStates(prev => ({
                ...prev,
                [folderId]: {
                    ...prev[folderId],
                    files,
                    isLoading: false
                }
            }));
        }
    };

    const handleDocumentClick = (file: FileItem) => {
        router.push(`/document/${encodeURIComponent(file.id)}?fileData=${encodeURIComponent(JSON.stringify(file))}`);
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    const filteredFolders = useMemo(() => {
        if (!searchQuery) return Object.keys(folderNames);

        const lowercaseQuery = searchQuery.toLowerCase().trim();
        return Object.entries(folderNames)
            .filter(([, name]) => name.toLowerCase().includes(lowercaseQuery))
            .map(([id]) => id);
    }, [folderNames, searchQuery]);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-8 bg-background">
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 hidden pointer-events-none"></div>

                    <Card className="shadow-sm h-full backdrop-blur-sm border border-border rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-border">
                            <CardTitle className="text-xl md:text-2xl text-foreground text-center md:text-left font-bold">
                                IGCSE CAMBRIDGE O-LEVEL RESOURCES
                            </CardTitle>
                            <div className="relative mt-2 md:mt-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 w-full md:w-64 bg-card text-foreground border-input focus:ring-ring focus:border-primary"
                                />
                                {searchQuery && (
                                    <Button
                                        onClick={handleSearchClear}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <X className="h-5 w-5 text-muted-foreground hover:text-gray-600" />
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            {filteredFolders.map((folderId) => (
                                <div key={folderId} className="mb-6 last:mb-0 border-b-2 border-blue-950">
                                    <Button
                                        variant="ghost"
                                        className="w-full flex items-center justify-between p-6 text-xl  font-semibold uppercase text-center text-foreground hover:bg-gray-700/20"
                                        onClick={() => handleFolderClick(folderId)}
                                    >
                                        <span>{folderNames[folderId]}</span>
                                        <ChevronRight 
                                            className={`h-5 w-5 transition-transform duration-200 ${
                                                folderStates[folderId]?.isExpanded ? 'rotate-90' : ''
                                            }`}
                                        />
                                    </Button>
                                    
                                    {folderStates[folderId]?.isExpanded && (
                                        <div className="mt-3 grid gap-3 md:gap-4">
                                            {folderStates[folderId]?.isLoading ? (
                                                <div className="flex justify-center p-4">
                                                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                                                </div>
                                            ) : (
                                                folderStates[folderId]?.files.map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className="group flex items-center p-3 md:p-4 rounded-lg border border-border
                                                                 hover:bg-accent hover:border-primary/40 transition-all duration-200
                                                                 cursor-pointer shadow-sm hover:shadow-md bg-card backdrop-blur-sm"
                                                        onClick={() => handleDocumentClick(file)}
                                                    >
                                                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover:text-primary
                                                                           transition-colors mr-3 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm md:text-base font-medium text-foreground group-hover:text-primary line-clamp-2 break-words">
                                                                {file.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {filteredFolders.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground bg-muted rounded-lg border border-border">
                                    No folders found matching &quot;{searchQuery}&quot;
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}