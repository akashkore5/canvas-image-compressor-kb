# canvas-image-compressor-kb

A lightweight, zero-dependency browser utility to compress images down to a strict, exact target kilobyte (KB) threshold using HTML5 Canvas.

Extracted from the high-performance document processing engine powering [EditPDFKit](https://www.editpdfkit.com).

## Live Interactive Demo
Try the full in-browser studio with zero server uploads:
👉 **[https://www.editpdfkit.com/tools/compress-image-50kb](https://www.editpdfkit.com/tools/compress-image-50kb)**

---

## Features
- **Strict KB Targeting**: Guarantees output size below your defined threshold (e.g. 50KB or 100KB for passport, visa, or job portal uploads).
- **100% Client-Side**: Operates entirely in the browser memory using HTML5 Canvas. Zero remote server uploads.
- **Adaptive Compression**: Dynamically modulates lossy JPEG/WebP quality buffers before performing proportional dimensional downscaling if necessary.

---

## Installation

```bash
npm install canvas-image-compressor-kb
```

---

## Usage

```typescript
import { compressImageToKB } from 'canvas-image-compressor-kb';

const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  
  // Compress strictly under 50 KB
  const compressedBlob = await compressImageToKB(file, {
    maxSizeKB: 50,
    initialQuality: 0.92,
    mimeType: 'image/jpeg'
  });

  console.log(`Final size: ${(compressedBlob.size / 1024).toFixed(2)} KB`);
});
```

---

## Related Free Document Tools
- [Compress PDF In-Browser](https://www.editpdfkit.com/tools/compress-pdf)
- [PDF to Word Converter](https://www.editpdfkit.com/tools/pdf-to-word)
- [Add Page Numbers to PDF](https://www.editpdfkit.com/tools/page-numbers-pdf)
- [140+ Client-Side Document Tools](https://www.editpdfkit.com)

---

## License
MIT © [EditPDFKit](https://www.editpdfkit.com)

