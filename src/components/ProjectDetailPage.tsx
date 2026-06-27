import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Calendar, 
  Briefcase, 
  Layers,
  ChevronRight,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Lightbulb
} from "lucide-react";

import { Project, PROJECTS_LIST_REFERENCE } from "../utils/projectsData";

const ProjectFloatingColors = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sharp transparent lavender geometric circle 1 */}
      <motion.div 
        animate={{ 
          x: [0, 20, 0], 
          y: [0, -15, 0],
          scale: [1, 1.03, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[6%] left-[12%] w-[42vw] h-[42vw] bg-accent/[0.02] rounded-full border border-accent/[0.015]"
      />
      {/* Sharp transparent lavender geometric circle 2, overlapping at middle */}
      <motion.div 
        animate={{ 
          x: [0, -20, 0], 
          y: [0, 20, 0],
          scale: [1, 1.04, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] right-[10%] w-[35vw] h-[35vw] bg-accent/[0.025] rounded-full border border-accent/[0.015]"
      />
      {/* Sharp transparent lavender geometric circle 3, overlapping at bottom */}
      <motion.div 
        animate={{ 
          x: [0, 15, 0], 
          y: [0, -15, 0],
          scale: [1, 1.02, 1] 
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[8%] left-[20%] w-[38vw] h-[38vw] bg-accent/[0.02] rounded-full border border-accent/[0.015]"
      />
      {/* Soft translucent background ambient light glow off to the side to blend nicely */}
      <div className="absolute top-[20%] right-[15%] w-[35vw] h-[35vw] bg-accent/[0.035] rounded-full blur-[120px]" />
      <div className="absolute bottom-[25%] left-[10%] w-[30vw] h-[30vw] bg-accent/[0.03] rounded-full blur-[140px]" />
    </div>
  );
};

const ProjectBubbles = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => {
        const size = Math.random() * 40 + 12;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.08, 0.16, 0.08],
              y: [`${y}%`, `${y - 4}%`, `${y}%`],
              x: [`${x}%`, `${x + 2}%`, `${x}%`]
            }}
            transition={{
              duration: Math.random() * 8 + 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * -10,
            }}
            className="absolute rounded-full bg-accent/20 blur-[8px]"
            style={{ width: size, height: size, top: `${y}%`, left: `${x}%` }}
          />
        );
      })}
    </div>
  );
};

interface ProjectDetailPageProps {
  key?: string;
  project: Project;
  onBack: () => void;
  onNextProject: (nextProj: Project) => void;
}

export default function ProjectDetailPage({ project, onBack, onNextProject }: ProjectDetailPageProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  
  // Clean scroll to top whenever the active project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setShowHeader(true);
    lastScrollY.current = 0;
  }, [project]);

  // Scroll logic: hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 60) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up
        setShowHeader(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) return null;

  // Find next project for the footer teaser loop
  const currentIndex = PROJECTS_LIST_REFERENCE.findIndex(p => p.id === project.id);
  const nextProjectIndex = (currentIndex + 1) % PROJECTS_LIST_REFERENCE.length;
  const nextProject = PROJECTS_LIST_REFERENCE[nextProjectIndex];

  // Map contextual metadata based on project ID
  const role = project.role || (project.id === "candle" ? "Brand Owner & Wix Developer" : "Lead UX/UI Designer");
  const timeline = project.year || "3 Months";
  const deliverables = project.deliverables || (
    project.id === "candle" 
      ? ["UX Research", "Wix Store Setup", "E-commerce Optimization", "Brand Identity"] 
      : project.id === "r48"
      ? ["Mobile UX Flow", "Figma Design System", "High-fidelity Prototype", "Interactive Micro-interactions"]
      : ["Students Research", "Product Strategy", "Figma Variables", "UX Audit", "Branding Guidelines"]
  );

  let client = "Self-produced Design Case";
  if (project.id === "candle") {
    client = "Candle&Co. (Boutique E-Commerce)";
  } else if (project.id === "r48") {
    client = "R48 Chef Restaurant (Academic Concept)";
  } else if (project.id === "club") {
    client = "Reichman University (UX/UI Club App)";
  } else if (project.id === "tamir-carmel") {
    client = "Tamir Carmel (Urban Renewal Real Estate)";
  } else if (project.id === "social-robot") {
    client = "HRI Research Lab (Academic HRI Case Study)";
  }

  const coverImage = project.id === "candle" 
    ? "https://i.postimg.cc/ZR6BQrw2/Screenshot-2026-06-16-at-15-14-21.png" 
    : project.image;

  // Custom mapped problem and solution details for higher contextual fidelity
  const problemText = project.id === "candle" 
    ? "Before this, customers could only discover products on social media. There was no single, organized place to browse."
    : project.id === "r48"
    ? "Making table reservations and browsing menus can feel slow and complicated on traditional restaurant sites."
    : project.id === "club"
    ? "Student sign-ups and workshop details were scattered across paper forms and online sheets."
    : project.id === "tamir-carmel"
    ? "Older property owners struggled with cluttered and confusing layouts on real estate websites."
    : "Human-robot interfaces can feel unnatural and lack clear, comforting feedback.";

  const solutionText = project.id === "candle"
    ? "I built a dedicated Wix store to bring all our handmade candles into one clean, well-structured space."
    : project.id === "r48"
    ? "Designed a clean mobile app focused on easy booking and beautiful food photography."
    : project.id === "club"
    ? "Designed a single mobile app with a clear event schedule and a simple registration form."
    : project.id === "tamir-carmel"
    ? "Created a clean, high-contrast website with large fonts and simple, spacious navigation."
    : "Created clear sensory feedback loops and behavior scripts to make interactions more natural.";

  // Title rendering calculations to highlight the last word elegantly in italics
  const titleWords = project.title.toUpperCase().replace("\n", " ").split(" ");
  let firstWords = "";
  let lastWord = "";
  if (titleWords.length > 1) {
    lastWord = titleWords[titleWords.length - 1];
    firstWords = titleWords.slice(0, -1).join(" ");
  } else {
    lastWord = titleWords[0] || "";
    firstWords = "";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#F7F8FA] text-[#1A1A1D] font-sans pb-32 relative overflow-x-hidden"
    >
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[999] origin-left"
      />
      <ProjectFloatingColors />
      <ProjectBubbles />

      {/* Floating Capsule Header - Cohesive with Home page navigation */}
      <motion.div 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ 
          y: showHeader ? 0 : -100, 
          opacity: showHeader ? 1 : 0 
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: "-50%" }}
        className="fixed top-6 left-1/2 z-[150] w-[92vw] max-w-5xl select-none"
      >
        <header className="w-full bg-white/75 backdrop-blur-2xl border border-zinc-200/60 py-3 px-4 sm:px-6 md:px-8 flex justify-between items-center rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">
          {/* Subtle top decoration glow to align with layout highlights */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          
          <button 
            onClick={onBack}
            className="group flex items-center gap-2.5 bg-zinc-900 hover:bg-accent text-white hover:text-white px-4 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/[0.1] hover:shadow-accent/20"
            id="btn-back-portfolio"
          >
            <ArrowLeft className="w-3.5 sm:h-4 sm:w-4 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          <button
            onClick={onBack}
            className="group relative h-9 w-9 sm:h-11 sm:w-11 bg-white rounded-full border border-zinc-200/80 shadow-md overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-accent/40 cursor-pointer"
            id="btn-logo-home"
          >
            {/* Subtle glow / hover effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-accent/5" />
            <img 
              src="https://i.postimg.cc/WFGLJfbW/Gemini-Generated-Image-i4jauyi4jauyi4ja.png" 
              alt="Yoav Anavi Logo" 
              className="w-[70%] h-[70%] object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
            />
          </button>
        </header>
      </motion.div>

      {/* Main Container */}
      <main className="px-4 md:px-12 max-w-7xl mx-auto mt-28 md:mt-36 space-y-16 md:space-y-24 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden bg-white rounded-[2.5rem] border border-zinc-200/60 p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          {/* Decorative Circle 1: Top Right */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-accent/[0.03] border border-accent/[0.08] -top-20 -right-20 pointer-events-none" />
          {/* Decorative Circle 2: Bottom Center-Left */}
          <div className="absolute w-[200px] h-[200px] rounded-full bg-accent/[0.02] border border-accent/[0.05] -bottom-16 left-[20%] pointer-events-none" />

          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* Top Row: Category Left & CTA Right */}
            <div className="flex flex-wrap items-center justify-between gap-4 max-md:flex-col max-md:gap-3">
              {/* Category tag */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>{project.category}</span>
              </div>

              {/* Primary CTA button on the right */}
              {!project.isComingSoon && project.details.figmaLink && (
                <motion.a
                  href={project.details.figmaLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-zinc-900 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  <span>{project.id === "candle" || project.id === "tamir-carmel" ? "Visit Website" : "View Project"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              )}
            </div>

            {/* Center: project title */}
            <div className="py-6 sm:py-10">
              <h1 className="text-4xl sm:text-6xl md:text-[5vw] font-black font-display text-[#1A1A1D] leading-[1.05] tracking-tight uppercase text-center max-w-4xl mx-auto whitespace-pre-line">
                {firstWords}{" "}
                <span className="italic text-accent font-serif font-normal normal-case block sm:inline">
                  {lastWord}
                </span>
              </h1>
            </div>

            {/* Bottom Meta Bar: 3 columns, separated by accent/8 gaps */}
            {!project.isComingSoon && (
              <div className="grid grid-cols-1 max-md:grid-cols-1 md:grid-cols-3 gap-[1px] bg-accent/10 rounded-2xl overflow-hidden mt-6">
                
                {/* Col 1: My Role */}
                <div className="bg-[#F7F8FA] p-4 sm:p-5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1D]/40 block mb-1">
                    My Role
                  </span>
                  <p className="text-sm font-black text-[#1A1A1D] uppercase tracking-tight">
                    {role}
                  </p>
                </div>

                {/* Col 2: Platform / Client */}
                <div className="bg-[#F7F8FA] p-4 sm:p-5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1D]/40 block mb-1">
                    Platform / Client
                  </span>
                  <p className="text-sm font-black text-[#1A1A1D] uppercase tracking-tight">
                    {client}
                  </p>
                </div>

                {/* Col 3: Deliverables */}
                <div className="bg-[#F7F8FA] p-4 sm:p-5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1D]/40 block mb-2">
                    Deliverables
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {deliverables.map((item, index) => (
                      <span 
                        key={index} 
                        className="bg-accent/5 hover:bg-accent hover:text-white text-accent text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-accent/10 transition-all duration-300 select-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>

        {/* --- MOCKUP SECTION --- */}
        <section className="relative w-full bg-accent/[0.03] rounded-[2rem] p-4 sm:p-8 md:p-12 min-h-[240px] flex items-center justify-center overflow-hidden">
          <div className="relative rounded-[1rem] overflow-hidden shadow-xl shadow-accent/10 w-full max-w-5xl">
            <img 
              src={coverImage} 
              alt={project.title} 
              className={`w-full object-cover aspect-[21/9] min-h-[200px] md:min-h-[420px] ${project.isComingSoon ? "grayscale brightness-75" : "brightness-95 hover:scale-[1.01] transition-transform duration-[1.5s]"}`}
            />
            {project.isComingSoon && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-[2px]">
                <span className="inline-block bg-accent text-white text-[11px] font-extrabold uppercase tracking-[0.4em] px-6 py-2.5 rounded-full shadow-lg">
                  Coming Soon
                </span>
              </div>
            )}
          </div>
        </section>

        {/* --- PROBLEM / SOLUTION ROW --- */}
        {!project.isComingSoon && (
          <section className="grid grid-cols-1 max-md:grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem card */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-ink/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-accent">
                <AlertCircle className="w-4 h-4 text-accent" />
                <span className="text-[10px] uppercase tracking-widest font-black">
                  Problem
                </span>
              </div>
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-normal">
                {problemText}
              </p>
            </motion.div>
 
            {/* Solution card */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-ink/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-accent">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-[10px] uppercase tracking-widest font-black">
                  Solution
                </span>
              </div>
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-normal">
                {solutionText}
              </p>
            </motion.div>
          </section>
        )}
 
        {/* --- DESIGN PROCESS SECTION --- */}
        {!project.isComingSoon && project.details.focusAreas && (
          <section className="bg-white border border-ink/5 rounded-[1.5rem] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <h4 className="text-xs md:text-sm uppercase text-[#1A1A1D]/50 tracking-widest mb-6 font-extrabold flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-accent/40 rounded-full" />
              Design Process
            </h4>
            <div className="flex flex-col">
              {project.details.focusAreas.map((area, i) => (
                <div key={i} className="py-5 border-b border-ink/5 last:border-none flex gap-4 md:gap-6 hover:bg-zinc-50/30 rounded-xl px-1 sm:px-2 -mx-1 sm:-mx-2 transition-colors duration-300">
                  <div className="w-[36px] h-[36px] shrink-0 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center text-xs md:text-sm font-black text-accent text-center">
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2.5">
                      <span className="text-base md:text-lg font-black text-[#1A1A1D]">{area.title}</span>
                      <span className="bg-accent/8 text-accent text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Phase 0{i + 1}
                      </span>
                    </div>
                    <p className="text-sm max-md:text-xs md:text-base text-[#1A1A1D]/65 leading-relaxed mt-2">
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Discovery loop: Next Project Teaser */}
        <section className="pt-20 border-t border-zinc-200">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1D]/40 block font-mono">Next Masterpiece</span>
              <h5 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Browse Case Studies</h5>
            </div>

            <div className="md:col-span-8">
              <motion.div 
                whileHover={{ x: 10 }}
                onClick={() => onNextProject(nextProject)}
                className="group flex justify-between items-center bg-[#1A1A1D]/5 hover:bg-[#1A1A1D] rounded-[2.5rem] p-8 md:p-12 cursor-pointer transition-all duration-500 border border-zinc-200/20 hover:border-[#1A1A1D] select-none hover:shadow-2xl shadow-accent/5"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-extrabold text-[#1A1A1D]/50 group-hover:text-white/50 tracking-widest uppercase block">
                    {nextProject.category}
                  </span>
                  <p className="text-2xl sm:text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-[#1A1A1D] group-hover:text-white transition-colors">
                    {nextProject.title.replace("\n", " ")}
                  </p>
                </div>

                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#1A1A1D] group-hover:bg-[#F7F8FA] flex items-center justify-center text-white group-hover:text-black transition-all shadow-md group-hover:scale-110">
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

      </main>
    </motion.div>
  );
}
