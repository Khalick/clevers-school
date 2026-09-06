import type { LucideIcon } from 'lucide-react';
import {
    FileText,
    FileSpreadsheet,
    Presentation,
    FileImage,
    FileArchive,
    FileVideo,
    File as FileIcon,
} from 'lucide-react';

import type { ResourceFile } from './types';

/**
 * Icon, colour and label for a file.
 *
 * Every row on every listing page used the same grey FileText icon, so a folder
 * of 60 documents was 60 visually identical lines. Distinguishing PDFs from
 * marking-scheme spreadsheets and Word documents is the single biggest
 * scanability win available here, and it costs nothing — mimeType already comes
 * back from the Drive API.
 */
export interface FileMeta {
    Icon: LucideIcon;
    /** Foreground colour class for the icon. */
    tone: string;
    /** Background tint for the icon tile. */
    tint: string;
    label: string;
}

const PDF: FileMeta = { Icon: FileText, tone: 'text-red-600 dark:text-red-400', tint: 'bg-red-50 dark:bg-red-950/40', label: 'PDF' };
const DOC: FileMeta = { Icon: FileText, tone: 'text-blue-600 dark:text-blue-400', tint: 'bg-blue-50 dark:bg-blue-950/40', label: 'Word' };
const SHEET: FileMeta = { Icon: FileSpreadsheet, tone: 'text-emerald-600 dark:text-emerald-400', tint: 'bg-emerald-50 dark:bg-emerald-950/40', label: 'Sheet' };
const SLIDE: FileMeta = { Icon: Presentation, tone: 'text-amber-600 dark:text-amber-400', tint: 'bg-amber-50 dark:bg-amber-950/40', label: 'Slides' };
const IMAGE: FileMeta = { Icon: FileImage, tone: 'text-violet-600 dark:text-violet-400', tint: 'bg-violet-50 dark:bg-violet-950/40', label: 'Image' };
const VIDEO: FileMeta = { Icon: FileVideo, tone: 'text-pink-600 dark:text-pink-400', tint: 'bg-pink-50 dark:bg-pink-950/40', label: 'Video' };
const ZIP: FileMeta = { Icon: FileArchive, tone: 'text-orange-600 dark:text-orange-400', tint: 'bg-orange-50 dark:bg-orange-950/40', label: 'Archive' };
const OTHER: FileMeta = { Icon: FileIcon, tone: 'text-muted-foreground', tint: 'bg-muted', label: 'File' };

const BY_EXTENSION: Record<string, FileMeta> = {
    pdf: PDF,
    doc: DOC, docx: DOC, rtf: DOC, odt: DOC, txt: DOC,
    xls: SHEET, xlsx: SHEET, csv: SHEET, ods: SHEET,
    ppt: SLIDE, pptx: SLIDE, odp: SLIDE,
    png: IMAGE, jpg: IMAGE, jpeg: IMAGE, gif: IMAGE, webp: IMAGE, svg: IMAGE,
    mp4: VIDEO, mov: VIDEO, avi: VIDEO, mkv: VIDEO,
    zip: ZIP, rar: ZIP, '7z': ZIP, tar: ZIP, gz: ZIP,
};

export function fileMeta(file: ResourceFile): FileMeta {
    const mime = (file.mimeType ?? '').toLowerCase();

    if (mime) {
        if (mime.includes('pdf')) return PDF;
        if (mime.includes('spreadsheet') || mime.includes('excel') || mime.includes('csv')) return SHEET;
        if (mime.includes('presentation') || mime.includes('powerpoint')) return SLIDE;
        if (mime.includes('word') || mime.includes('document') || mime.startsWith('text/')) return DOC;
        if (mime.startsWith('image/')) return IMAGE;
        if (mime.startsWith('video/')) return VIDEO;
        if (mime.includes('zip') || mime.includes('compressed')) return ZIP;
        if (mime.includes('folder')) return OTHER;
    }

    // Firebase items carry no mimeType, so fall back to the extension.
    const ext = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : '';
    return BY_EXTENSION[ext] ?? OTHER;
}

/** "2.4 MB". Returns null when the backend gave us no size. */
export function formatSize(size?: string): string | null {
    const bytes = Number(size);
    if (!size || Number.isNaN(bytes) || bytes <= 0) return null;
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit += 1;
    }
    return `${value >= 10 || unit === 0 ? Math.round(value) : value.toFixed(1)} ${units[unit]}`;
}

/** "12 Mar 2024". Returns null when the backend gave us no date. */
export function formatDate(iso?: string): string | null {
    if (!iso) return null;
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
}
