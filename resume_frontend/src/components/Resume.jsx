import React, { useState } from "react";
import "daisyui/dist/full.css";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";

const Resume = ({ data, onEdit, onGenerateAnother }) => {
  const resumeRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);

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
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto gap-8 p-4">
      {/* Template Explorer Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center bg-base-200 p-6 rounded-2xl shadow-inner border border-base-300 gap-4">
        <h3 className="text-xl font-bold flex flex-col sm:flex-row items-center gap-3">
           <span>Current Template:</span>
           <span className="badge badge-primary badge-lg badge-outline border-2">{templates.find(t => t.id === selectedTemplate)?.name || "Classic"}</span>
        </h3>
        <button 
           onClick={() => setIsExploreModalOpen(true)}
           className="btn btn-primary shadow-lg hover:scale-105 transition-all text-lg"
        >
           Explore Templates 🔍
        </button>
      </div>

      {/* Explore Templates Modal */}
      {isExploreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
              onClick={() => setIsExploreModalOpen(false)}
            >✕</button>
            <h3 className="font-extrabold text-3xl mb-8 text-center text-primary border-b-2 border-base-200 pb-4">
              Explore Resume Templates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setIsExploreModalOpen(false);
                  }}
                  className={`card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all border-4 ${selectedTemplate === template.id ? 'border-primary ring-4 ring-primary/20 bg-primary/5' : 'border-transparent'}`}
                >
                  <div className="card-body items-center text-center p-6">
                    <span className="text-6xl mb-4 drop-shadow-md">{template.icon}</span>
                    <h2 className="card-title text-2xl font-bold">{template.name}</h2>
                    <p className="text-base-content/70 font-medium">{template.desc}</p>
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

      {/* Resume Preview */}
      <div className="w-full overflow-x-auto p-4 flex justify-center bg-base-300/30 rounded-3xl border-2 border-dashed border-base-300">
        <div className="min-w-[800px] hover:scale-[1.01] transition-transform duration-500 shadow-2xl">
           {renderTemplate()}
        </div>
      </div>

      {/* Actions */}
      <section className="flex flex-wrap justify-center gap-4 py-6 bg-base-200/50 w-full rounded-2xl border border-base-200">
        <button 
          onClick={onGenerateAnother} 
          className="btn btn-accent btn-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          Generate Another
        </button>
        <button 
          onClick={onEdit} 
          className="btn btn-success btn-lg shadow-lg hover:scale-105 active:scale-95 transition-all text-white"
        >
          Edit Information
        </button>
        <button 
          onClick={handleDownloadPdf} 
          className="btn btn-primary btn-lg shadow-xl hover:scale-110 active:scale-95 transition-all px-10"
        >
          Download PDF
        </button>
      </section>
    </div>
  );
};

export default Resume;
