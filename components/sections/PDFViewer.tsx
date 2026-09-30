"use client";

import { useState, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PDFViewer() {
  const [ReactPdf, setReactPdf] = useState<any>(null);
  const [scale, setScale] = useState(1.0);
  const [baseWidth, setBaseWidth] = useState(800);
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    // Dynamic import to prevent SSR issues with pdf.js
    import("react-pdf").then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
      setReactPdf(mod);
    });

    const updateWidth = () => {
      setBaseWidth(Math.min(window.innerWidth - 64, 900));
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!ReactPdf) {
    return (
      <div className="w-[800px] h-[1130px] max-w-[95%] flex items-center justify-center bg-white/5 animate-pulse shadow-[0_0_40px_rgba(54,217,230,0.1)] z-10 relative">
        <div className="font-mono text-xs text-[#36D9E6] tracking-widest uppercase">Loading PDF Engine...</div>
      </div>
    );
  }

  const { Document, Page } = ReactPdf;

  const handleZoomIn = () => setScale((prev: number) => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setScale((prev: number) => Math.max(prev - 0.15, 0.5));

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-[#0B0E12]/80 backdrop-blur-md border border-[#69737D]/30 rounded-full px-4 py-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={handleZoomOut} className="p-2 text-[#69737D] hover:text-[#36D9E6] transition-colors rounded-full hover:bg-[#36D9E6]/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>
        <div className="font-mono text-[10px] text-[#E8EDF2] min-w-[50px] text-center tracking-widest">
          {Math.round(scale * 100)}%
        </div>
        <button onClick={handleZoomIn} className="p-2 text-[#69737D] hover:text-[#36D9E6] transition-colors rounded-full hover:bg-[#36D9E6]/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>
      </div>

      <div className="z-10 relative overflow-hidden bg-white max-w-[95%] shadow-[0_0_40px_rgba(54,217,230,0.1)] transition-all duration-300">
        <Document 
          file="/resume.pdf" 
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center"
          loading={
            <div className="w-[800px] h-[1130px] max-w-full flex items-center justify-center bg-white/5 animate-pulse">
              <div className="font-mono text-xs text-[#36D9E6] tracking-widest uppercase">Rendering Document...</div>
            </div>
          }
        >
          {Array.from(new Array(numPages || 1), (el, index) => (
            <Page 
              key={`page_${index + 1}`} 
              pageNumber={index + 1} 
              width={baseWidth * scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="bg-white"
            />
          ))}
        </Document>
      </div>
    </>
  );
}
