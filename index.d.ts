/**
 * canvas-image-compressor-kb
 * Zero-dependency client-side image compression to exact target KB limits.
 * Powered by EditPDFKit (https://www.editpdfkit.com)
 */
export interface CompressionOptions {
    maxSizeKB: number;
    initialQuality?: number;
    minQuality?: number;
    step?: number;
    mimeType?: 'image/jpeg' | 'image/webp';
}
/**
 * Compresses an HTMLImageElement or Blob/File down to a specific target KB threshold.
 */
export declare function compressImageToKB(source: HTMLImageElement | Blob | File, options: CompressionOptions): Promise<Blob>;
