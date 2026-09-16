import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, ExternalLink, Printer, Check, Copy, FileText, ArrowUpRight } from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/Yoav_Anavi_CV.pdf?v=" + Date.now());
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Yoav_Anavi_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.warn("Direct blob download failed, falling back to direct link", e);
      window.open("/Yoav_Anavi_CV.pdf", "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("yoavanavi1@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-stone-100 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-ink/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0A5CA8]/10 text-[#0A5CA8] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-ink font-sans">Yoav Anavi — CV / Resume</h3>
                  <p className="text-[10px] sm:text-xs text-ink/50 font-medium">Updated 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-3.5 sm:px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isDownloading ? "Downloading..." : "Download PDF"}</span>
                  <span className="sm:hidden">PDF</span>
                </button>

                <a
                  href="/Yoav_Anavi_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-ink/5 hover:bg-ink/10 text-ink rounded-full transition-colors cursor-pointer"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={handlePrint}
                  className="hidden md:flex p-2 bg-ink/5 hover:bg-ink/10 text-ink rounded-full transition-colors cursor-pointer"
                  title="Print"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-2 bg-ink/5 hover:bg-ink/10 text-ink rounded-full transition-colors ml-1 cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body - CV Document Preview */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-[#E9EBEF] flex justify-center items-start">
              <div 
                id="cv-printable-document"
                className="w-full max-w-[780px] bg-white shadow-xl rounded-lg p-6 sm:p-10 md:p-12 text-[#1A1A1E] font-sans text-left leading-normal border border-zinc-200 select-text"
              >
                {/* CV Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#0A5CA8]/20 pb-6 mb-6">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A5CA8] tracking-tight mb-1">
                      YOAV ANAVI
                    </h1>
                  </div>

                  <div className="text-right sm:text-right flex flex-col gap-1 text-[11px] sm:text-xs font-semibold text-zinc-700">
                    <p className="flex items-center gap-1.5 sm:justify-end">
                      <span>TEL AVIV-YAFO</span>
                      <span>|</span>
                      <a href="tel:0543455947" className="hover:text-[#0A5CA8] transition-colors">054-3455947</a>
                      <span>|</span>
                      <button 
                        onClick={handleCopyEmail}
                        className="hover:text-[#0A5CA8] transition-colors inline-flex items-center gap-1"
                        title="Click to copy email"
                      >
                        YOAVANAVI1@GMAIL.COM
                        {copiedEmail ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                      </button>
                    </p>
                    <p className="flex items-center gap-1.5 sm:justify-end">
                      <span>PORTFOLIO:</span>
                      <a 
                        href="https://yoavanaviportfolio.netlify.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0A5CA8] underline hover:opacity-80 transition-opacity flex items-center gap-0.5"
                      >
                        YOAVANAVIPORTFOLIO.NETLIFY.APP
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </p>
                    <p className="flex items-center gap-1.5 sm:justify-end">
                      <span>LINKEDIN:</span>
                      <a 
                        href="https://linkedin.com/in/yoav-anavi" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0A5CA8] underline hover:opacity-80 transition-opacity flex items-center gap-0.5"
                      >
                        LINKEDIN.COM/IN/YOAV-ANAVI
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </p>
                  </div>
                </div>

                {/* PROFILE SECTION */}
                <div className="mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-2">
                    PROFILE
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal">
                    Communications and HCI student at Reichman University, blending operational and leadership background from
                    Unit 8200 with hands-on experience in product, UX/UI, and AI workflows. Bringing business understanding,
                    product mindset, and a proven ability to take real-world challenges and translate them into working products
                    and solutions.
                  </p>
                </div>

                {/* EXPERIENCE SECTION */}
                <div className="mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    EXPERIENCE
                  </h2>

                  <div className="space-y-4">
                    {/* Role 1 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        INTERN- Product manager & AI GTM ENGINEER <span className="font-normal text-zinc-500">|</span> ZIMARK <span className="font-normal text-zinc-500">|</span> July 2026 - September 2026
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Spearheaded the end-to-end conceptualization and building of a cross-functional platform in a startup, delivering an integrated solution for sales teams, clients, and executive leadership in real time.</li>
                        <li>Conducted research, insights analysis, and ideation sessions using Claude and Gemini to translate complex requirements into precise product specifications.</li>
                        <li>Designed 24 interactive prototypes in Figma and built the platform using Lovable.</li>
                      </ul>
                    </div>

                    {/* Role 2 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Manager of UX/UI Student Club <span className="font-normal text-zinc-500">|</span> Reichman University <span className="font-normal text-zinc-500">|</span> 2025 - Present
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Grew the club into one of the most sought-after communities at Reichman through strategic branding and operations. Attracted industry speakers and professors to present, significantly amplifying campus reputation.</li>
                        <li>Led digital projects and initiatives, including product requirements and UX definition for the club's central registration app to optimize user experience.</li>
                      </ul>
                    </div>

                    {/* Role 3 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Operations & Logistics Manager (Reserves) <span className="font-normal text-zinc-500">|</span> IDF <span className="font-normal text-zinc-500">|</span> 2023 - Present
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Managed large-scale operations and logistics systems, ensuring rapid decision-making and executing complex tasks under high-pressure environments and tight deadlines.</li>
                      </ul>
                    </div>

                    {/* Role 4 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Digital Procurement & Technology Operations <span className="font-normal text-zinc-500">|</span> Unit 8200 <span className="font-normal text-zinc-500">|</span> 2021 – 2022
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Led tech procurement projects, maintaining ongoing coordination and interface management between senior command, R&D teams, and vendors.</li>
                        <li>Implemented resource management models that bridged technical solutions with organizational strategy.</li>
                      </ul>
                    </div>

                    {/* Role 5 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Assistant to Base Commander <span className="font-normal text-zinc-500">|</span> Unit 8200 <span className="font-normal text-zinc-500">|</span> 2018 – 2021
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Awarded Certificate of Excellence for managing complex staff operations and critical cross-organizational technological interfaces.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PROJECTS SECTION */}
                <div className="mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    PROJECTS
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        CANDLE & CO. <span className="font-normal text-zinc-500">|</span> Founder & E-Commerce Creator
                      </h3>
                      <ul className="mt-1 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Founded and built an independent e-commerce brand for handmade candles from scratch, managing the full product lifecycle, end-to-end UX/UI design, and storefront execution.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        UX/UI CLUB COMMUNITY APP <span className="font-normal text-zinc-500">|</span> Rapid Emergency Response
                      </h3>
                      <ul className="mt-1 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Led the rapid product definition and UX design for the student community registration app, delivering an agile digital solution under emergency conditions to maintain community engagement.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* EDUCATION SECTION */}
                <div className="mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    EDUCATION
                  </h2>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                      Reichman University <span className="font-normal text-zinc-500">|</span> 2024 - Present
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-700 pl-4 font-normal">
                      B.A. in Communications & HCI
                    </p>
                  </div>
                </div>

                {/* SKILLS & TOOLS SECTION */}
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    SKILLS & TOOLS
                  </h2>

                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">Design & Product:</strong> Figma, UI/UX Principles, Wireframing, Prototyping, Product Definition.
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">AI & Tech:</strong> Claude, Gemini, Lovable, AI Workflows.
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">Languages:</strong> Hebrew (Native), English (Fluent).
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
