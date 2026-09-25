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
                    Possesses strong design skills and a deep understanding of user experience, combining a command and operational background from Unit 8200 with the advanced application of AI tools. Proven ability to translate complex business and operational challenges into accessible and seamless digital products, leading processes from end to end and working effectively in a dynamic environment.
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
                        INTERN- Product manager & AI GTM ENGINEER <span className="font-normal text-zinc-500">|</span> ZIMARK <span className="font-normal text-zinc-500">|</span> July2026 - September 2026
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Led the end-to-end design and development of the ZDR platform, a sales management system.</li>
                        <li>Conducted in-depth market research utilizing AI tools like Claude and Gemini.</li>
                        <li>Defined precise product requirements and developed the product into a live, functioning platform using the Lovable platform.</li>
                      </ul>
                    </div>

                    {/* Role 2 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Manager of UX/UI Student Club <span className="font-normal text-zinc-500">|</span> Reichman University <span className="font-normal text-zinc-500">|</span> 2025 - Present
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Co-chair of the UX/UI Club at Reichman University, leading an expanded team of department managers.</li>
                        <li>Provides strategic leadership, develops work plans, and mentors team managers to uphold the club's core DNA.</li>
                        <li>Recruits and trains functional managers to ensure operational success and continued community growth.</li>
                      </ul>
                    </div>

                    {/* Role 3 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Operations & Logistics Manager (Reserves) <span className="font-normal text-zinc-500">|</span> IDF <span className="font-normal text-zinc-500">|</span> 2023 - Present
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Managed operational and logistical systems.</li>
                        <li>Performed under high-pressure conditions and met strict deadlines.</li>
                        <li>Led and supervised personnel during complex missions.</li>
                      </ul>
                    </div>

                    {/* Role 4 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Digital Procurement & Technology Operations <span className="font-normal text-zinc-500">|</span> Unit 8200 <span className="font-normal text-zinc-500">|</span> 2021 – 2022
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Managed strategic technological procurement projects, coordinating cross-functional interfaces between senior command, R&D teams, and external suppliers.</li>
                        <li>Led resource optimization initiatives that aligned advanced technical solutions with organizational goals.</li>
                      </ul>
                    </div>

                    {/* Role 5 */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        Assistant to Base Commander <span className="font-normal text-zinc-500">|</span> Unit 8200 <span className="font-normal text-zinc-500">|</span> 2018 – 2021
                      </h3>
                      <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>Served as Deputy Base Commander, managing complex staff operations.</li>
                        <li>Directed critical cross-organizational technological interfaces to enhance operational efficiency.</li>
                        <li>Received a Certificate of Excellence for exceptional leadership.</li>
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
                        <li>End-to-end establishment and management of an independent e-commerce brand for handmade candles, with full responsibility for the entire product lifecycle.</li>
                        <li>Comprehensive UX/UI optimization, with a focus on streamlining the checkout process to reduce site abandonment.</li>
                        <li>Utilization of high-quality imagery to showcase fine details and increase the store's conversion rate.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                        UX/UI CLUB COMMUNITY APP <span className="font-normal text-zinc-500">|</span> Rapid Emergency Response
                      </h3>
                      <ul className="mt-1 space-y-1 text-[11px] sm:text-xs text-zinc-700 list-disc list-outside ml-4 leading-relaxed font-normal">
                        <li>End-to-end UX/UI design and onboarding flow optimization for the UX/UI Club mobile application.</li>
                        <li>Spearheaded the rapid development of an efficient digital solution under emergency constraints, successfully maintaining high community engagement.</li>
                        <li>Defined intuitive user flows and interactive wireframes to ensure a seamless and accessible registration experience for community members.</li>
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
                        <strong className="font-bold text-zinc-900">Product and Design:</strong> Figma, UX/UI philosophies, wireframing, interactive prototyping, and brand transformation.
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">AI and Technology:</strong> Advanced AI integration (Gemini, Claude), Lovable workflows, and AI-driven development.
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-zinc-800">
                      <span className="text-zinc-400">•</span>
                      <span>
                        <strong className="font-bold text-zinc-900">Management and Leadership:</strong> Project management, multidisciplinary teamwork, GTM strategy, and startup ecosystem collaboration.
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
