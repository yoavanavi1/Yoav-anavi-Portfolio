import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Calendar, 
  Briefcase, 
  Layers,
  ChevronRight,
  Sparkles,
  ExternalLink
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

  // Dynamic gallery item captions
  let galleryCaptions = {
    img1Title: "Exhibit A: UI Structure & Typography Hierarchy",
    img1Tag: "Figma Layer Block",
    img2Title: "Exhibit B: Flow Mockup",
    img2Desc: "Optimized interactive mobile blueprint viewport",
    img3Title: "Exhibit C: Component System Assembly",
    img3Tag: "Widescreen Layout Preview"
  };

  if (project.id === "candle") {
    galleryCaptions = {
      img1Title: "Exhibit A: Custom Wix Desktop Storefront",
      img1Tag: "Live Storefront System",
      img2Title: "Exhibit B: Production Catalog UX",
      img2Desc: "Streamlined browsing with responsive, tactile card previews",
      img3Title: "Exhibit C: Wix Mobile Cart & Checkout UX",
      img3Tag: "Mobile Checkout Screen"
    };
  } else if (project.id === "tamir-carmel") {
    galleryCaptions = {
      img1Title: "Exhibit A: Interactive Projects Map",
      img1Tag: "Tactile Map Interaction",
      img2Title: "Exhibit B: Mobile Accessibility Optimization",
      img2Desc: "High-contrast text sizing and spacious grid navigation for all audiences",
      img3Title: "Exhibit C: Unified Design System Architecture",
      img3Tag: "Desktop Portal System"
    };
  } else if (project.id === "r48") {
    galleryCaptions = {
      img1Title: "Exhibit A: Gastronomy Presentation Interface",
      img1Tag: "Framer Design Showcase",
      img2Title: "Exhibit B: Interactive Reservation System",
      img2Desc: "High-fidelity micro-interactions for rapid table bookings",
      img3Title: "Exhibit C: Spatial Brand Cohesion",
      img3Tag: "Modular Visual System"
    };
  } else if (project.id === "club") {
    galleryCaptions = {
      img1Title: "Exhibit A: UX Strategy Sessions",
      img1Tag: "Product Definition Phase",
      img2Title: "Exhibit B: Figma Component Library & Variables",
      img2Desc: "Systematized structures and elements optimized for rapid iterations",
      img3Title: "Exhibit C: Peer Interactive Environments",
      img3Tag: "Student Community Hub"
    };
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#F7F8FA] text-[#1A1A1D] font-sans pb-32 relative overflow-x-hidden"
    >
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
      <main className="px-4 md:px-12 max-w-7xl mx-auto mt-28 md:mt-36 space-y-20 md:space-y-32 relative z-10">
        
        {/* Intro Hero Section */}
        <section className="space-y-8 md:space-y-12">
          {/* Tag & Year */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#1A1A1D]/60">
            <span className="bg-[#1A1A1D]/5 px-4 py-2 rounded-full uppercase tracking-widest text-[10px] font-bold">
              {project.category}
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-display text-[#1A1A1D] leading-[0.9] tracking-tight uppercase whitespace-pre-line max-w-5xl">
            {project.title.replace("\n", " ")}
          </h1>

          {!project.isComingSoon && (
            <>
              <div className="w-full h-[1px] bg-zinc-200/60" />

              {/* Parameters Metadata Grid */}
              <div className="w-full relative overflow-hidden rounded-[2.5rem] bg-white border border-zinc-200/60 p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(79,70,229,0.04)] group/param mt-8">
                {/* Accent glow mimicking the home screen cards */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover/param:opacity-100 transition-opacity duration-700" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                  
                  {/* Design Role */}
                  <div className="space-y-3 flex flex-col md:border-r border-zinc-200/60 md:pr-8 last:border-r-0">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-accent/5 text-accent border border-accent/10">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#1A1A1D]/40 font-mono">My Design Role</span>
                    </div>
                    <p className="text-lg font-black text-[#1A1A1D] tracking-tight pl-0.5">{role}</p>
                  </div>

                  {/* Project Context / Client */}
                  <div className="space-y-3 flex flex-col md:border-r border-zinc-200/60 md:px-8 last:border-r-0">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-accent/5 text-accent border border-accent/10">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#1A1A1D]/40 font-mono">Context / Client</span>
                    </div>
                    <p className="text-lg font-black text-[#1A1A1D] tracking-tight pl-0.5">{client}</p>
                  </div>

                  {/* Scope & Deliverables */}
                  <div className="space-y-4 flex flex-col md:pl-8">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-accent/5 text-accent border border-accent/10">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#1A1A1D]/40 font-mono">Scope & Deliverables</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {deliverables.map((item, index) => (
                        <span 
                          key={index} 
                          className="bg-zinc-50 hover:bg-[#1A1A1D] hover:text-white text-[#1A1A1D]/80 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-zinc-200/80 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-default select-none"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </section>

        {/* Huge Edge-to-Edge Feature Visual Cover */}
        <section className="relative overflow-hidden rounded-[3rem] shadow-2xl shadow-black/5 bg-zinc-100 group">
          <img 
            src={coverImage} 
            alt={project.title} 
            className={`w-full object-cover aspect-[21/9] min-h-[300px] md:min-h-[500px] brightness-90 transition-all duration-[1.5s] ${project.isComingSoon ? "grayscale group-hover:scale-100" : "grayscale group-hover:grayscale-0 group-hover:scale-[1.01]"}`}
            style={{ contentVisibility: "auto" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          
          {project.isComingSoon ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-[2px]">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-4 max-w-md"
              >
                <span className="inline-block bg-accent text-white text-[11px] font-extrabold uppercase tracking-[0.4em] px-6 py-2.5 rounded-full shadow-lg">
                  Coming Soon
                </span>
                <p className="text-white/85 text-sm md:text-base font-medium px-4 tracking-wide">
                  This creative interaction and HRI research case study is currently being assembled and will be available soon.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="absolute bottom-8 left-8 right-8 text-white hidden md:flex items-center justify-between">
              <span className="text-sm font-mono tracking-wider font-semibold">Primary Cover Interface Showcase</span>
              <span className="text-xs tracking-widest uppercase italic bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">Active Prototyping</span>
            </div>
          )}
        </section>

        {/* Narrative columns: The Challenge & Approach */}
        {!project.isComingSoon && (
          <section className="grid lg:grid-cols-12 gap-12 md:gap-20 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent font-mono italic">Creative Statement</span>
                <div className="w-8 h-[1px] bg-accent/30" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight text-[#1A1A1D] leading-tight">
                The Objective & Strategy
              </h2>
              <p className="text-lg md:text-xl font-light text-[#1A1A1D]/60 leading-relaxed italic border-l-2 border-accent/40 pl-6">
                {project.details.overview}
              </p>
            </div>

            {/* Phases / Focus Areas Card Layout */}
            <div className="lg:col-span-7 space-y-12">
              <div className="grid gap-8">
                {project.details.focusAreas && project.details.focusAreas.map((area, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.03)" }}
                    className="bg-white/60 p-8 md:p-10 rounded-[2.5rem] border border-zinc-200/50 transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 text-5xl font-black font-display text-accent/5 select-none leading-none">
                      PHASE 0{i + 1}
                    </div>
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">
                          {i + 1}
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500/90 font-mono">
                          {area.title}
                        </h4>
                      </div>
                      <div className="w-10 h-[1.5px] bg-accent/40 rounded-full" />
                      <p className="text-base md:text-lg text-zinc-600 font-medium leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}



        {/* Large Premium Call to Action */}
        {!project.isComingSoon && project.details.figmaLink && (
          <section className="bg-zinc-900 text-white rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 group select-none">
            {/* Ambient Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none select-none blur-3xl" />
            
            <div className="space-y-4 max-w-xl z-10 relative">
              <span className="bg-white/10 text-white border border-white/20 text-[10px] font-extrabold uppercase tracking-[0.4em] px-4 py-2 rounded-full italic inline-block inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-white" /> {(project.id === "candle" || project.id === "tamir-carmel") ? "Live Website Platform" : "Live Prototype Check"}
              </span>
              <h4 className="text-2xl md:text-4xl font-black font-display uppercase tracking-tight leading-none text-white">
                {(project.id === "candle" || project.id === "tamir-carmel") ? "Experience the platform live" : "Experience the design in real-time"}
              </h4>
            </div>

            <div className="z-10 relative shrink-0 w-full md:w-auto">
              <motion.a 
                href={project.details.figmaLink}
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-5 bg-[#F7F8FA] text-black hover:bg-accent hover:text-white px-8 py-5 md:px-10 md:py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-xl group border border-transparent"
              >
                {project.details.buttonLabel || "Explore Project Prototype"}
                <div className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-white/20 flex items-center justify-center text-black group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </motion.a>
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
