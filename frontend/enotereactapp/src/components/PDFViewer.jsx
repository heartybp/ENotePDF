import React, { useEffect, useRef, useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.mjs';
import HTMLFlipBook from 'react-pageflip';

GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const PDFViewer = ({ pdfFile }) => {
  const [pages, setPages] = useState([]);
  const bookRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      const loadingTask = getDocument(pdfFile);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const pages = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        pages.push(canvas.toDataURL());
      }
      setPages(pages);
    };

    if (pdfFile) {
      loadPDF();
    }
  }, [pdfFile]);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      {pages.length > 0 && (
        <HTMLFlipBook width={400} height={600} ref={bookRef}>
          {pages.map((page, index) => (
            <div key={index} className="page">
              <img src={page} alt={`Page ${index + 1}`} style={{ width: '100%', height: '100%' }} />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default PDFViewer;



// renderContext object specifies the parameters required for rendering a PDF page onto a canvas element
// this code only currently renders the 1st page of the pdf


// Pseudocode:
// 1. Import React and hooks (useEffect, useRef).
// 2. Import pdfjsLib and pdfjsWorker from pdfjs-dist.
// 3. Set pdfjsLib.GlobalWorkerOptions.workerSrc to pdfjsWorker.

// 4. Define a PDFViewer component that takes pdfFile as a prop.
//    a. Create a canvas reference using useRef hook.

// 5. Use useEffect hook with pdfFile as a dependency.
//    a. If pdfFile is provided:
//       i. Load the PDF document using pdfjsLib.getDocument(pdfFile).
//       ii. Once loaded, get the first page of the document.
//       iii. Define a scale 
//       iv. Create a viewport for the page with the defined scale.
//       v. Get the canvas element from the reference.
//       vi. Set canvas height and width based on the viewport.
//       vii. Create a renderContext with the canvas context and viewport.
//       viii. Render the page on the canvas using page.render(renderContext).

// 6. Return a canvas element with the reference set to canvasRef.

// 7. Export the PDFViewer component.
