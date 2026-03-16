import React, { useState, useRef, useEffect, useCallback } from "react";
import "daisyui/dist/full.css";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";

const Resume = ({ data, onEdit, onGenerateAnother }) => {
  const resumeRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const RESUME_WIDTH = 800;

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth - 32; // account for padding
      if (containerWidth < RESUME_WIDTH) {
        setScale(containerWidth / RESUME_WIDTH);
      } else {
        setScale(1);
      }
    }
  }, []);

  useEffect(() => {
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [updateScale]);

  const templates = [
    { id: "classic", name: "Classic", icon: "📄", desc: "Standard & clean layout" },
    { id: "modern", name: "Modern", icon: "✨", desc: "Contemporary & bold design" },
    { id: "creative", name: "Creative", icon: "🎨", desc: "Unique & vibrant style" },
    { id: "professional", name: "Professional", icon: "💼", desc: "Corporate & structural" },
    { id: "elegant", name: "Elegant", icon: "✒️", desc: "Minimalist & sophisticated" },
  ];

  const handleDownloadPdf = () => {
    toPng(resumeRef.current, { quality: 1.0 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        // A4 size: 210mm x 297mm
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${data.personalInformation.fullName}_Resume.pdf`);
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate data={data} resumeRef={resumeRef} />;
      case "creative":
        return <CreativeTemplate data={data} resumeRef={resumeRef} />;
      case "professional":
        return <ProfessionalTemplate data={data} resumeRef={resumeRef} />;
      case "elegant":
        return <ElegantTemplate data={data} resumeRef={resumeRef} />;
      case "classic":
      default:
        return <ClassicTemplate data={data} resumeRef={resumeRef} />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto gap-6 sm:gap-8 p-2 sm:p-4">
      {/* Template Explorer Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-base-200 p-4 sm:p-6 rounded-2xl shadow-inner border border-base-300 gap-4">
        <h3 className="text-lg sm:text-xl font-bold flex flex-col sm:flex-row items-center gap-3">
           <span>Current Template:</span>
           <span className="badge badge-primary badge-lg badge-outline border-2">{templates.find(t => t.id === selectedTemplate)?.name || "Classic"}</span>
        </h3>
        <button 
           onClick={() => setIsExploreModalOpen(true)}
           className="btn btn-primary shadow-lg hover:scale-105 transition-all text-base sm:text-lg w-full sm:w-auto"
        >
           Explore Templates 🔍
        </button>
      </div>

      {/* Explore Templates Modal */}
      {isExploreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative p-4 sm:p-6">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
              onClick={() => setIsExploreModalOpen(false)}
            >✕</button>
            <h3 className="font-extrabold text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-center text-primary border-b-2 border-base-200 pb-4">
              Explore Resume Templates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setIsExploreModalOpen(false);
                  }}
                  className={`card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all border-4 ${selectedTemplate === template.id ? 'border-primary ring-4 ring-primary/20 bg-primary/5' : 'border-transparent'}`}
                >
                  <div className="card-body items-center text-center p-4 sm:p-6">
                    <span className="text-4xl sm:text-6xl mb-4 drop-shadow-md">{template.icon}</span>
                    <h2 className="card-title text-xl sm:text-2xl font-bold">{template.name}</h2>
                    <p className="text-base-content/70 font-medium text-sm sm:text-base">{template.desc}</p>
                    <div className="card-actions mt-4 w-full">
                      <button className={`btn w-full ${selectedTemplate === template.id ? 'btn-primary shadow-md' : 'btn-outline'}`}>
                        {selectedTemplate === template.id ? 'Selected' : 'Use Template'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview - Auto-scaling wrapper */}
      <div ref={containerRef} className="w-full overflow-hidden p-2 sm:p-4 flex justify-center bg-base-300/30 rounded-2xl sm:rounded-3xl border-2 border-dashed border-base-300">
        <div 
          style={{
            width: `${RESUME_WIDTH}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            marginBottom: scale < 1 ? `${-(1 - scale) * (resumeRef.current?.offsetHeight || 0)}px` : '0px',
          }}
          className="shadow-2xl transition-transform duration-300"
        >
           {renderTemplate()}
        </div>
      </div>

      {/* Actions */}
      <section className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 py-4 sm:py-6 bg-base-200/50 w-full rounded-2xl border border-base-200 px-4">
        <button 
          onClick={onGenerateAnother} 
          className="btn btn-accent btn-md sm:btn-lg shadow-lg hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
        >
          Generate Another
        </button>
        <button 
          onClick={onEdit} 
          className="btn btn-success btn-md sm:btn-lg shadow-lg hover:scale-105 active:scale-95 transition-all text-white w-full sm:w-auto"
        >
          Edit Information
        </button>
        <button 
          onClick={handleDownloadPdf} 
          className="btn btn-primary btn-md sm:btn-lg shadow-xl hover:scale-110 active:scale-95 transition-all px-6 sm:px-10 w-full sm:w-auto"
        >
          Download PDF
        </button>
      </section>
    </div>
  );
};

export default Resume;

