'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllFilesInFolder } from "@/lib/firebaseUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

type FileItem = {
    name: string;
    url: string;
}

type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
    return (
        <div className="flex items-center justify-center space-x-4 mt-6">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center bg-muted text-foreground border-border hover:bg-accent"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
            </Button>
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md border border-border">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center bg-muted text-foreground border-border hover:bg-accent"
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </div>
    );
}

export default function Page() {
    const [material, setMaterial] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();
    const folderPath = 'gs://clevers-school-resources.appspot.com/WEEKLY QUIZES/JUNIOR SECONDARY/GRADE 6';
    useEffect(() => {
        const fetchFiles = async () => {
            const filesList = await getAllFilesInFolder(folderPath);
            setMaterial(filesList);
            setLoading(false);
        };
        fetchFiles();
    }, [folderPath]);

    const handleDocumentClick = (file: FileItem) => {
        const searchParams = new URLSearchParams({
            fileData: JSON.stringify(file)
        });
        router.push(`/document/${encodeURIComponent(file.name)}?${searchParams.toString()}`);
    };

    const totalPages = Math.ceil(material.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFiles = material.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
            <div 
                id="content-area"
                className="flex-1 overflow-y-auto px-4 py-8 bg-background"
            >
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 hidden pointer-events-none"></div>
                    
                    <Card className="shadow-sm  backdrop-blur-sm border border-border rounded-xl relative">
                        <CardHeader className="space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-border">
                            <CardTitle className="text-xl md:text-2xl text-foreground text-center md:text-left font-bold">
                                All Study Materials
                            </CardTitle>
                            <div className="text-sm text-muted-foreground text-center md:text-right bg-gray-700/50 px-3 py-1 rounded-full">
                                {material.length} {material.length === 1 ? 'document' : 'documents'} available
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <div className="grid gap-3 md:gap-4">
                                {currentFiles.map((file) => (
                                    <div
                                        key={file.name}
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
                                            <h3 className="text-base font-semibold text-foreground group-hover:text-primary line-clamp-2 break-words">
                                                {file.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {material.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground bg-muted rounded-lg border border-border">
                                    No documents available at the moment
                                </div>
                            )}
                            {material.length > itemsPerPage && (
                                <PaginationControls
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}