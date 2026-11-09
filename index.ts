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
export async function compressImageToKB(
  source: HTMLImageElement | Blob | File,
  options: CompressionOptions
): Promise<Blob> {
  const {
    maxSizeKB,
    initialQuality = 0.92,
    minQuality = 0.1,
    step = 0.08,
    mimeType = 'image/jpeg'
  } = options;

  let img: HTMLImageElement;
  if (source instanceof Blob) {
    img = await loadImageFromBlob(source);
  } else {
    img = source;
  }

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  ctx.drawImage(img, 0, 0);

  let quality = initialQuality;
  let currentBlob: Blob = await canvasToBlob(canvas, mimeType, quality);

  while (currentBlob.size / 1024 > maxSizeKB && quality > minQuality) {
    quality = Math.max(minQuality, quality - step);
    currentBlob = await canvasToBlob(canvas, mimeType, quality);
  }

  // If still larger, scale dimensions down proportionally
  if (currentBlob.size / 1024 > maxSizeKB) {
    let scale = 0.9;
    while (currentBlob.size / 1024 > maxSizeKB && scale > 0.2) {
      canvas.width = Math.floor((img.naturalWidth || img.width) * scale);
      canvas.height = Math.floor((img.naturalHeight || img.height) * scale);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      currentBlob = await canvasToBlob(canvas, mimeType, minQuality);
      scale -= 0.1;
    }
  }

  return currentBlob;
}

function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob from canvas'));
      },
      mimeType,
      quality
    );
  });
}

