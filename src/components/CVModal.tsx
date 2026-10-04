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
                      Yoav Anavi
                    </h1>
                  </div>

                  <div className="text-right sm:text-right flex flex-col gap-1 text-[11px] sm:text-xs font-semibold text-zinc-700">
                    <p className="flex items-center gap-1.5 sm:justify-end">
                      <span>Address: 10 Moshe Perlok St., Tel Aviv</span>
                      <span>|</span>
                      <span>Phone: <a href="tel:0543455947" className="hover:text-[#0A5CA8] transition-colors">054-3455947</a></span>
                    </p>
                    <p className="flex items-center gap-1.5 sm:justify-end">
                      <span>Email: </span>
                      <button 
                        onClick={handleCopyEmail}
                        className="hover:text-[#0A5CA8] transition-colors inline-flex items-center gap-1"
                        title="Click to copy email"
                      >
                        yoavanavi1@gmail.com
                        {copiedEmail ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                      </button>
                    </p>
                    <p className="flex items-center gap-1.5 sm:justify-end">
                      <span>Portfolio:</span>
                      <a 
                        href="https://yoavanaviportfolio.netlify.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0A5CA8] underline hover:opacity-80 transition-opacity flex items-center gap-0.5"
                      >
                        yoavanaviportfolio.netlify.app
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </p>
                    <p className="flex items-center gap-1.5 sm:justify-end">
                      <span>LinkedIn:</span>
                      <a 
                        href="https://linkedin.com/in/yoav-anavi" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0A5CA8] underline hover:opacity-80 transition-opacity flex items-center gap-0.5"
                      >
                        linkedin.com/in/yoav-anavi
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
                    Communications student specializing in HCI at Reichman University, with experience leading digital products from requirements to a working version. Combines design thinking, business understanding and advanced use of AI tools, together with management experience from Unit 8200.
                  </p>
                </div>

                {/* EDUCATION SECTION */}
                <div className="mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    EDUCATION
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
                        B.A. in Communications, HCI specialization (3rd year) <span className="font-normal text-zinc-500">|</span> Reichman University <span className="font-normal text-zinc-500">|</span> 2024 - Present
                      </h3>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
                        Head of the UX/UI Club <span className="font-normal text-zinc-500">|</span> Reichman University <span className="font-normal text-zinc-500">|</span> 2025 - Present
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Lead the club's strategy and team management: building work plans, recruiting and training department managers, and preserving the community's culture</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PROFESSIONAL EXPERIENCE SECTION */}
                <div className="mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    PROFESSIONAL EXPERIENCE
                  </h2>

                  <div className="space-y-4">
                    {/* Role 1 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Product Management & AI GTM Engineering Intern <span className="font-normal text-zinc-500">|</span> Zimark <span className="font-normal text-zinc-500">|</span> Jul 2026 - Sep 2026
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Identified a fragmented sales process (20+ messages per deal across email, WhatsApp and Drive) and built ZDR, an internal platform for the sales and marketing teams that centralizes files, tasks and client communication in one shared link. From writing the PRD and designing 24 screens in Figma to a working app with users, permissions and a database, built with AI.</li>
                        <li>Conducted competitive research and led feedback and improvement cycles with internal stakeholders.</li>
                      </ul>
                    </div>

                    {/* Role 2 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        CANDLE & CO <span className="font-normal text-zinc-500">|</span> Founder & Designer
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Founded an independent candle brand and designed its full brand identity, including the logo. Built a Wix catalog of 50-60 products that replaced searching through Instagram posts, making ordering faster and clearer for customers.</li>
                      </ul>
                    </div>

                    {/* Role 3 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        UX/UI Club Community App
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Led the end-to-end design of the sign-up and onboarding flow under emergency conditions, creating a simple experience that kept the community active.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* MILITARY SERVICE SECTION */}
                <div className="mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    MILITARY SERVICE
                  </h2>

                  <div className="space-y-4">
                    {/* Role 1 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Operations & Logistics Manager <span className="font-normal text-zinc-500">|</span> Reserves <span className="font-normal text-zinc-500">|</span> 2023 - Present
                      </h3>
                    </div>

                    {/* Role 2 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Digital Procurement & Technology Operations Manager <span className="font-normal text-zinc-500">|</span> Unit 8200 <span className="font-normal text-zinc-500">|</span> 2021 - 2022
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Led complex technology procurement projects, matching the right technology to the organization's needs.</li>
                      </ul>
                    </div>

                    {/* Role 3 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Base Commander Assistant & Deputy <span className="font-normal text-zinc-500">|</span> Unit 8200 <span className="font-normal text-zinc-500">|</span> 2018 - 2021
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Coordinated technology projects across departments to improve operations. Received an award of excellence for managing strategic projects.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* SKILLS SECTION */}
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0A5CA8] uppercase tracking-wide mb-3">
                    SKILLS
                  </h2>

                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">Product Design & Building:</strong> Figma, UX/UI, prototyping, AI tools (Lovable, Claude)
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">Product Management:</strong> Writing PRDs, defining requirements, QA, managing teams and stakeholders
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">Languages:</strong> Hebrew (native), English (fluent)
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
