import React, { useState, useRef, useEffect, useCallback } from "react";
import "daisyui/dist/full.css";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import { FaEdit, FaDownload, FaSyncAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";

const Resume = ({ data, onEdit, onGenerateAnother, isViewMode = false }) => {
  const resumeRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [currentHeight, setCurrentHeight] = useState(0);

  const RESUME_WIDTH = 800;

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      // Use clientWidth for more accurate available width
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth < RESUME_WIDTH && containerWidth > 0) {
        setScale(containerWidth / RESUME_WIDTH);
      } else {
        setScale(1);
      }
    }
    if (resumeRef.current) {
      setCurrentHeight(resumeRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    // Observe the resume content for height changes
    const resizeObserver = new ResizeObserver(updateScale);
    if (resumeRef.current) {
      resizeObserver.observe(resumeRef.current);
    }
    
    // Safety delay for fonts/images
    const timer = setTimeout(updateScale, 1000);
    
    return () => {
      window.removeEventListener("resize", updateScale);
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [updateScale, selectedTemplate, data]);

  const templates = [
    { id: "classic", name: "Classic", icon: "📄", desc: "Standard & clean layout" },
    { id: "modern", name: "Modern", icon: "✨", desc: "Contemporary & bold design" },
    { id: "creative", name: "Creative", icon: "🎨", desc: "Unique & vibrant style" },
    { id: "professional", name: "Professional", icon: "💼", desc: "Corporate & structural" },
    { id: "elegant", name: "Elegant", icon: "✒️", desc: "Minimalist & sophisticated" },
  ];

  const handleDownloadImage = async () => {
    if (resumeRef.current) {
      try {
        const loadingToast = toast.loading("Generating high-resolution image...");
        const dataUrl = await htmlToImage.toPng(resumeRef.current, {
          quality: 1,
          pixelRatio: 3, // 3x resolution for crispness
          backgroundColor: '#ffffff',
        });
        
        const link = document.createElement("a");
        link.download = `${data.personalInformation.fullName.replace(/\s+/g, '_')}_Resume.png`;
        link.href = dataUrl;
        link.click();
        
        toast.dismiss(loadingToast);
        toast.success("Image downloaded!");
      } catch (err) {
        toast.error("Failed to generate image.");
        console.error(err);
      }
    }
  };

  const handleDownloadPdf = async () => {
    if (resumeRef.current) {
      try {
        const loadingToast = toast.loading("Generating professional PDF...");
        const dataUrl = await htmlToImage.toPng(resumeRef.current, { 
          quality: 1.0,
          pixelRatio: 3 
        });
        
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${data.personalInformation.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
        
        toast.dismiss(loadingToast);
        toast.success("PDF downloaded!");
      } catch (err) {
        toast.error("Failed to generate PDF.");
        console.error(err);
      }
    }
  };

  const renderTemplate = () => {
    const props = { data, resumeRef };
    switch (selectedTemplate) {
      case "modern": return <ModernTemplate {...props} />;
      case "creative": return <CreativeTemplate {...props} />;
      case "professional": return <ProfessionalTemplate {...props} />;
      case "elegant": return <ElegantTemplate {...props} />;
      default: return <ClassicTemplate {...props} />;
    }
  };

  const scaledHeight = currentHeight * scale;

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto gap-6 sm:gap-8 p-2 sm:p-4">
      {/* Template Selection & Controls */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-base-200 p-4 sm:p-6 rounded-2xl shadow-sm border border-base-300 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
           <span className="text-sm font-bold uppercase text-base-content/60">Template:</span>
           <span className="badge badge-primary badge-lg font-bold border-2 px-6">
             {templates.find(t => t.id === selectedTemplate)?.name || "Classic"}
           </span>
           <button 
             onClick={() => setIsExploreModalOpen(true)}
             className="btn btn-ghost btn-sm text-primary gap-2"
           >
             Change Template <FaSyncAlt />
           </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {!isViewMode && (
            <button onClick={onEdit} className="btn btn-ghost btn-sm gap-2">
              <FaEdit /> Edit
            </button>
          )}
          <div className="dropdown dropdown-end dropdown-hover">
            <button tabIndex={0} className="btn btn-primary btn-sm gap-2 shadow-lg shadow-primary/20">
              <FaDownload /> Download
            </button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
              <li><button onClick={handleDownloadPdf}>Format: PDF (Better for Print)</button></li>
              <li><button onClick={handleDownloadImage}>Format: PNG (High-Res Image)</button></li>
            </ul>
          </div>
          {onGenerateAnother && (
            <button onClick={onGenerateAnother} className="btn btn-ghost btn-sm">
              Generate New
            </button>
          )}
        </div>
      </div>

      {/* Explore Templates Modal */}
      {isExploreModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative border border-base-300">
            <div className="p-6 border-b border-base-200 flex justify-between items-center">
              <h3 className="font-extrabold text-2xl text-primary uppercase tracking-tight">Select a Professional Template</h3>
              <button 
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setIsExploreModalOpen(false)}
              >✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setIsExploreModalOpen(false);
                  }}
                  className={`card bg-base-100 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all border-2 ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'border-base-200'}`}
                >
                  <div className="card-body items-center text-center p-6">
                    <span className="text-5xl mb-4">{template.icon}</span>
                    <h2 className="card-title text-xl font-bold">{template.name}</h2>
                    <p className="text-base-content/60 text-sm">{template.desc}</p>
                    <button className={`btn btn-sm mt-4 w-full ${selectedTemplate === template.id ? 'btn-primary' : 'btn-outline'}`}>
                      {selectedTemplate === template.id ? 'Active' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resume Container with Fixed Area and Internal Scaling */}
      <div 
        ref={containerRef} 
        className="w-full overflow-hidden p-0 flex justify-center bg-base-300/10 rounded-xl border border-base-300/30"
        style={{ height: scaledHeight > 0 ? `${scaledHeight}px` : '600px' }}
      >
        <div 
          style={{
            width: `${RESUME_WIDTH}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            height: `${currentHeight}px`,
          }}
          className="transition-all duration-300 ease-in-out shadow-2xl bg-white"
        >
          {renderTemplate()}
        </div>
      </div>
      
      <div className="alert alert-info shadow-lg max-w-md bg-info/10 border-info/20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span className="text-xs font-medium">Tip: Use the PDF format for the highest quality printing and professional applications.</span>
      </div>
    </div>
  );
};

export default Resume;
