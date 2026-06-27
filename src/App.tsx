import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "motion/react";
import { 
  ArrowRight, 
  Linkedin, 
  Instagram,
  ArrowUpRight,
  ArrowDown,
  Check,
  Mail,
  Phone,
  X,
  Layers,
  Cpu,
  Camera,
  AppWindow,
  Users,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Accessibility,
  Moon,
  Type,
  Link,
  Activity,
  Eye
} from "lucide-react";
import React, { useState, useEffect, useRef, ReactNode, FormEvent } from "react";
import ProjectDetailPage from "./components/ProjectDetailPage";
import { PROJECTS_LIST_REFERENCE } from "./utils/projectsData";

// --- Components ---

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Set up springs for smooth trailing motion
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Use velocity to stretch the cursor in motion
  const vx = useVelocity(cursorX);
  const vy = useVelocity(cursorY);

  const scaleX = useTransform([vx, vy], ([valX, valY]) => {
    const speed = Math.sqrt(Number(valX) ** 2 + Number(valY) ** 2);
    return 1 + speed / 1000;
  });

  const rotate = useTransform([vx, vy], ([valX, valY]) => {
    return Math.atan2(Number(valY), Number(valX)) * (180 / Math.PI);
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scaleX,
        rotate,
      }}
    />
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sharp transparent lavender geometric circle 1 */}
      <motion.div 
        animate={{ 
          x: [0, 15, 0], 
          y: [0, -10, 0],
          scale: [1, 1.02, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[6%] left-[12%] w-[42vw] h-[42vw] bg-accent/[0.04] rounded-full border border-accent/[0.03] hidden md:block"
      />
      {/* Sharp transparent lavender geometric circle 2, overlapping at bottom */}
      <motion.div 
        animate={{ 
          x: [0, -15, 0], 
          y: [0, 15, 0],
          scale: [1, 1.03, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[2%] left-[30%] w-[32vw] h-[32vw] bg-accent/[0.05] rounded-full border border-accent/[0.03] hidden md:block"
      />
      {/* Soft translucent background ambient light glow off to the side to blend nicely */}
      <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-accent/5 rounded-full blur-[100px]" />
    </div>
  );
};

const BubblesParticles = () => {
  const particles = React.useMemo(() => {
    return [...Array(9)].map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * -10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => {
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.04, 0.10, 0.04],
              y: [`${p.y}vh`, `${p.y - 5}vh`, `${p.y}vh`],
              x: [`${p.x}vw`, `${p.x + 3}vw`, `${p.x}vw`]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className="absolute rounded-full bg-accent/20 blur-[3px]"
            style={{ width: p.size, height: p.size, top: `${p.y}vh`, left: `${p.x}vw` }}
          />
        );
      })}
    </div>
  );
};

const FloatingLogo = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [0, 1]);
  const y = useTransform(scrollY, [0, 400], [-100, 0]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="fixed top-6 left-6 md:top-8 md:left-8 z-[60] group pointer-events-auto"
    >
      <motion.div
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 40px 10px rgba(79, 70, 229, 0.4)",
          borderColor: "rgba(79, 70, 229, 0.5)"
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="h-12 w-12 max-md:h-10 max-md:w-10 md:h-16 md:w-16 bg-white rounded-full border border-ink/5 shadow-xl shadow-accent/5 overflow-hidden flex items-center justify-center relative transition-colors duration-500 cursor-pointer"
        onClick={() => {
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {/* Sparkle effects on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent/20 blur-3xl animate-pulse" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full blur-[2px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], rotate: [0, -180, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent rounded-full blur-[1px]" 
          />
        </div>

        <img 
          src="https://i.postimg.cc/WFGLJfbW/Gemini-Generated-Image-i4jauyi4jauyi4ja.png" 
          alt="Yoav Anavi Logo" 
          className="w-[80%] h-[80%] md:w-[60%] md:h-[60%] object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
        />
      </motion.div>
    </motion.div>
  );
};

const AccessibilityIcon = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="42" 
        stroke="currentColor" 
        strokeWidth="7" 
      />
      {/* Head */}
      <circle 
        cx="50" 
        cy="26" 
        r="8.5" 
        fill="currentColor" 
      />
      {/* Torso & Outstretched Arms */}
      <rect 
        x="26" 
        y="37" 
        width="48" 
        height="9" 
        rx="4.5" 
        fill="currentColor" 
      />
      {/* Left Leg */}
      <path 
        d="M45.5 44 L39 74" 
        stroke="currentColor" 
        strokeWidth="9" 
        strokeLinecap="round" 
      />
      {/* Right Leg */}
      <path 
        d="M54.5 44 L61 74" 
        stroke="currentColor" 
        strokeWidth="9" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

const FloatingAccessibility = ({
  isUltraDark, setIsUltraDark,
  isLargeText, setIsLargeText,
  isDyslexicFont, setIsDyslexicFont,
  isHighlightLinks, setIsHighlightLinks,
  isReduceMotion, setIsReduceMotion,
  showAccMenu, setShowAccMenu
}: {
  isUltraDark: boolean; setIsUltraDark: (v: boolean) => void;
  isLargeText: boolean; setIsLargeText: (v: boolean) => void;
  isDyslexicFont: boolean; setIsDyslexicFont: (v: boolean) => void;
  isHighlightLinks: boolean; setIsHighlightLinks: (v: boolean) => void;
  isReduceMotion: boolean; setIsReduceMotion: (v: boolean) => void;
  showAccMenu: boolean; setShowAccMenu: (v: boolean) => void;
}) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [0, 1]);
  const y = useTransform(scrollY, [0, 400], [-100, 0]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAccMenu(false);
      }
    };
    if (showAccMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccMenu]);

  const toggleOption = (opt: string) => {
    if (opt === "dark") setIsUltraDark(!isUltraDark);
    if (opt === "text") setIsLargeText(!isLargeText);
    if (opt === "dys") setIsDyslexicFont(!isDyslexicFont);
    if (opt === "link") setIsHighlightLinks(!isHighlightLinks);
    if (opt === "motion") setIsReduceMotion(!isReduceMotion);
  };

  const resetAll = () => {
    setIsUltraDark(false);
    setIsLargeText(false);
    setIsDyslexicFont(false);
    setIsHighlightLinks(false);
    setIsReduceMotion(false);
  };

  return (
    <motion.div 
      ref={menuRef}
      style={{ opacity, y }}
      className="fixed top-6 right-6 md:top-8 md:right-8 z-[60] pointer-events-auto flex flex-col items-end"
    >
      <motion.div
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 40px 10px rgba(79, 70, 229, 0.4)",
          borderColor: "rgba(79, 70, 229, 0.5)"
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className={`h-12 w-12 max-md:h-10 max-md:w-10 md:h-16 md:w-16 rounded-full border shadow-xl flex items-center justify-center relative cursor-pointer transition-colors duration-500 ${
          showAccMenu 
            ? "bg-[#4F46E5] border-[#4F46E5] text-white" 
            : "bg-white border-ink/5 text-ink hover:text-accent"
        }`}
        onClick={() => setShowAccMenu(!showAccMenu)}
        aria-label="Accessibility Menu"
      >
        <AccessibilityIcon className="w-6 h-6 max-md:w-5 max-md:h-5" />
      </motion.div>

      <AnimatePresence>
        {showAccMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-4 w-72 max-sm:w-[70vw] bg-white/95 backdrop-blur-2xl border border-ink/10 rounded-2xl p-5 shadow-2xl z-[70] text-left flex flex-col gap-4 overflow-hidden"
            dir="ltr"
          >
            <div className="flex justify-between items-center border-b border-ink/10 pb-2 mb-1">
              <div className="flex items-center gap-2">
                <AccessibilityIcon className="w-5 h-5 text-accent" />
                <h3 className="font-display font-black text-sm tracking-wide text-ink">Accessibility</h3>
              </div>
              <button 
                onClick={resetAll}
                className="text-[10px] font-black uppercase tracking-wider text-accent/80 hover:text-accent transition-colors flex items-center gap-1 bg-ink/5 px-2.5 py-1 rounded-full cursor-pointer"
              >
                Reset
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => toggleOption("dark")}
                className={`flex items-center justify-between w-full p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isUltraDark 
                    ? "bg-accent/10 border-accent/30 text-accent font-bold" 
                    : "bg-transparent border-ink/5 hover:bg-ink/5 text-ink/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg ${isUltraDark ? "bg-accent text-white" : "bg-ink/5 text-ink/70"}`}>
                    <Moon className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black">Dark Mode</div>
                    <div className="text-[9px] text-ink/40">High contrast dark theme</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isUltraDark ? "border-accent bg-accent" : "border-ink/20 bg-transparent"}`}>
                  {isUltraDark && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>

              <button
                onClick={() => toggleOption("text")}
                className={`flex items-center justify-between w-full p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isLargeText 
                    ? "bg-accent/10 border-accent/30 text-accent font-bold" 
                    : "bg-transparent border-ink/5 hover:bg-ink/5 text-ink/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg ${isLargeText ? "bg-accent text-white" : "bg-ink/5 text-ink/70"}`}>
                    <Type className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black">Large Text Size</div>
                    <div className="text-[9px] text-ink/40">Increase content scale</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isLargeText ? "border-accent bg-accent" : "border-ink/20 bg-transparent"}`}>
                  {isLargeText && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>

              <button
                onClick={() => toggleOption("dys")}
                className={`flex items-center justify-between w-full p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isDyslexicFont 
                    ? "bg-accent/10 border-accent/30 text-accent font-bold" 
                    : "bg-transparent border-ink/5 hover:bg-ink/5 text-ink/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg ${isDyslexicFont ? "bg-accent text-white" : "bg-ink/5 text-ink/70"}`}>
                    <Eye className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black">Dyslexic Font</div>
                    <div className="text-[9px] text-ink/40">Highly legible typography</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isDyslexicFont ? "border-accent bg-accent" : "border-ink/20 bg-transparent"}`}>
                  {isDyslexicFont && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>

              <button
                onClick={() => toggleOption("link")}
                className={`flex items-center justify-between w-full p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isHighlightLinks 
                    ? "bg-accent/10 border-accent/30 text-accent font-bold" 
                    : "bg-transparent border-ink/5 hover:bg-ink/5 text-ink/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg ${isHighlightLinks ? "bg-accent text-white" : "bg-ink/5 text-ink/70"}`}>
                    <Link className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black">Highlight Links</div>
                    <div className="text-[9px] text-ink/40">Outline interactive paths</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isHighlightLinks ? "border-accent bg-accent" : "border-ink/20 bg-transparent"}`}>
                  {isHighlightLinks && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>

              <button
                onClick={() => toggleOption("motion")}
                className={`flex items-center justify-between w-full p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isReduceMotion 
                    ? "bg-accent/10 border-accent/30 text-accent font-bold" 
                    : "bg-transparent border-ink/5 hover:bg-ink/5 text-ink/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg ${isReduceMotion ? "bg-accent text-white" : "bg-ink/5 text-ink/70"}`}>
                    <Activity className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black">Reduce Motion</div>
                    <div className="text-[9px] text-ink/40">Disable animations & effects</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isReduceMotion ? "border-accent bg-accent" : "border-ink/20 bg-transparent"}`}>
                  {isReduceMotion && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SectionReveal = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Marquee = ({ text, speed = 25 }: { text: string; speed?: number }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap py-20 max-md:py-10 border-y border-ink/5 uppercase font-display bg-white/30 backdrop-blur-sm">
      <motion.div 
        className="animate-marquee-css flex items-center"
        style={{ animationDuration: `${speed}s` }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {[...Array(5)].map((_, j) => (
              <span key={j} className="text-3xl max-md:text-2xl md:text-6xl font-black px-12 flex items-center text-ink/10 hover:text-accent transition-colors duration-500">
                {text}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- DATA ---

const PROJECTS = PROJECTS_LIST_REFERENCE;

const JOURNEY_CARDS = [
  {
    title: "Design & Research",
    description: "Figma, UI/UX Principles, Wireframing, Prototyping, User Research, Design Systems.",
    icon: <Layers className="w-8 h-8" />
  },
  {
    title: "AI & Innovation",
    description: "Deep familiarity with Generative AI tools and AI driven workflows.",
    icon: <Cpu className="w-8 h-8" />
  },
  {
    title: "Content & Social",
    description: "Content creation, social media moderation, and digital storytelling.",
    icon: <Camera className="w-8 h-8" />
  },
  {
    title: "Software",
    description: "Full proficiency in Microsoft Office, SAP ERP.",
    icon: <AppWindow className="w-8 h-8" />
  },
  {
    title: "Interpersonal",
    description: "Creative problem solving, team collaboration, content creation, and project management.",
    icon: <Users className="w-8 h-8" />
  }
];

const useTypewriter = (text: string, trigger: boolean) => {
  const [output, setOutput] = useState("");
  useEffect(() => {
    if (!trigger) return;
    setOutput("");
    let i = 0;
    const interval = setInterval(() => {
      setOutput(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [trigger, text]);
  return output;
};

// --- Subcomponents ---

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  const [inView, setInView] = useState(false);
  const typed = useTypewriter(title.toUpperCase(), inView);

  return (
    <SectionReveal>
      <motion.div
        onViewportEnter={() => setInView(true)}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-ink/10 pb-6 mb-4 md:mb-12 lg:mb-20 gap-4">
          <h4 className="text-5xl md:text-[8vw] lg:text-[7vw] font-black font-display uppercase tracking-[-0.05em] italic transition-colors duration-500">{typed}</h4>
          {subtitle && (
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-ink/30 italic sm:text-right">{subtitle}</span>
          )}
        </div>
      </motion.div>
    </SectionReveal>
  );
};

const ProjectItem = ({ project, index, onOpen }: { project: any, index: number, onOpen: (p: any) => void, key?: string | number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => {
        if (!project.isComingSoon) {
          onOpen(project);
        }
      }}
      className={`group min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center py-12 max-md:py-8 md:py-32 border-b border-ink/10 md:border-none last:border-none ${project.isComingSoon ? "cursor-default" : "cursor-pointer"}`}
    >
      <div className={`grid lg:grid-cols-12 gap-8 md:gap-20 items-stretch`}>
        
        {/* Image Container */}
        <div className={`lg:col-span-6 flex flex-col ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative overflow-hidden rounded-2xl max-md:rounded-[1.5rem] md:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:shadow-[0_45px_90px_-20px_rgba(79,70,229,0.2)] flex-1">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover aspect-[16/10] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* View Project Overlay on Desktop */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-[#1A1A1D] text-white hover:bg-[#4F46E5] px-10 py-5 rounded-full text-xs md:text-sm font-black uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-all duration-500 cursor-pointer">
                {project.isComingSoon ? "Coming Soon" : "View Project"}
              </span>
            </div>
          </div>
        </div>

        {/* Typography Content */}
        <div className={`lg:col-span-6 flex flex-col ${isEven ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'}`}>
          <div className="space-y-6 md:space-y-8 flex flex-col items-start pt-2 lg:pt-6 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {project.isComingSoon && (
                  <span className="bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full italic animate-pulse">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-4xl max-md:text-3xl md:text-6xl lg:text-[4vw] font-black font-display text-ink uppercase tracking-tight leading-[0.98] whitespace-pre-line text-left">
                {project.title}
              </h3>
            </div>
            
            <p className="text-lg md:text-xl font-medium text-ink/40 leading-relaxed max-w-md text-left">
              {project.description.split('.')[0]}.
            </p>

            {/* Problem / Solution / Result Section */}
            {!project.isComingSoon && (
              <SectionReveal delay={0.1} className="w-full space-y-4 pt-6 border-t border-ink/10">
                <div className="flex flex-col gap-3.5 max-w-lg">
                  {[
                    {
                      label: "Problem",
                      text: project.problem || "Human-robot interfaces can feel unnatural and lack clear, comforting feedback."
                    },
                    {
                      label: "Solution",
                      text: project.solution || "Created clear sensory feedback loops and behavior scripts to make interactions more natural."
                    },
                    {
                      label: "Result",
                      text: project.result || "Refined the robot's physical and auditory responses during field tests."
                    }
                  ].map((row, rIdx) => (
                    <div key={rIdx} className="flex items-stretch gap-4 text-left">
                      <div className="w-[84px] max-md:w-[60px] shrink-0 pr-4 border-r border-ink/10 flex items-start">
                        <span className="text-accent text-[10px] max-md:text-[9px] font-bold uppercase tracking-widest block pt-0.5">
                          {row.label}
                        </span>
                      </div>
                      <p className="text-ink/50 font-medium text-sm leading-relaxed flex-1 py-0.5">
                        {row.text}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            )}

            <div className="pt-4">
              {project.isComingSoon ? (
                <span className="inline-flex items-center justify-center gap-3 bg-ink/5 text-ink/40 px-8 py-4 rounded-full text-xs md:text-sm font-black uppercase tracking-[0.15em] border border-ink/10 cursor-default select-none">
                  Coming Soon
                </span>
              ) : (
                <motion.span
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block max-md:w-full"
                >
                  <span className="inline-flex items-center justify-center gap-3 bg-[#1A1A1D] hover:bg-accent hover:shadow-xl hover:shadow-accent/20 text-white px-8 py-4 max-md:w-full max-md:justify-center rounded-full text-xs md:text-sm font-black uppercase tracking-[0.15em] transition-all duration-300 border border-transparent cursor-pointer">
                    View Project <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </motion.span>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};


const MobileJourneyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    if (activeIndex < JOURNEY_CARDS.length - 1) setActiveIndex(activeIndex + 1);
  };
  const prevCard = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  return (
    <div className="w-full flex flex-col items-center bg-stone-50/50 rounded-[2rem] border border-ink/5 p-4 py-8 mb-8 overflow-hidden relative">
      <div className="w-full relative h-[320px] flex items-center justify-center perspective-1000">
        {JOURNEY_CARDS.map((card, i) => {
          const diff = i - activeIndex;
          const isActive = diff === 0;

          return (
            <motion.div
              key={i}
              className={`absolute w-[260px] max-sm:w-[240px] h-[280px] bg-white/90 backdrop-blur-md border border-white/40 rounded-[2rem] p-7 flex flex-col justify-between`}
              initial={false}
              animate={{ 
                x: diff * 220, 
                scale: isActive ? 1.05 : 0.85,
                opacity: Math.abs(diff) > 1 ? 0 : (isActive ? 1 : 0.6),
                zIndex: isActive ? 10 : 0,
                boxShadow: isActive ? "0 30px 60px -15px rgba(0,0,0,0.15)" : "0 10px 20px -10px rgba(0,0,0,0.05)",
                filter: isActive ? "blur(0px)" : "blur(2px)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => setActiveIndex(i)}
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                {card.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black font-display uppercase tracking-tight">{card.title}</h4>
                <p className="text-[12px] font-medium text-ink/60 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-6 z-20">
        <button 
          onClick={prevCard} 
          disabled={activeIndex === 0}
          className="w-12 h-12 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink hover:bg-accent hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextCard} 
          disabled={activeIndex === JOURNEY_CARDS.length - 1}
          className="w-12 h-12 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink hover:bg-accent hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink shadow-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const DraggableJourney = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [zIndices, setZIndices] = useState<number[]>(JOURNEY_CARDS.map((_, i) => i));

  const bringToFront = (index: number) => {
    setActiveCard(index);
    const newZIndices = [...zIndices];
    const maxZ = Math.max(...newZIndices);
    newZIndices[index] = maxZ + 1;
    setZIndices(newZIndices);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const timer = setTimeout(() => {
      // Briefly bring the first card to front to hint interaction
      bringToFront(0);
      
      setTimeout(() => {
        setActiveCard(null);
        setZIndices(JOURNEY_CARDS.map((_, i) => i));
      }, 1200);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  if (isMobile) {
    return <MobileJourneyCarousel />;
  }

  const getInitialPos = (i: number) => {
    const total = JOURNEY_CARDS.length;
    const center = Math.floor(total / 2);
    const diff = i - center;
    
    // Spread them out in an arc
    return {
      x: diff * (isMobile ? 45 : 200),
      y: Math.abs(diff) * (isMobile ? 12 : 35),
      rotate: diff * (isMobile ? 5 : 8)
    };
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActiveCard(null);
      setZIndices(JOURNEY_CARDS.map((_, i) => i));
    }
  };

  return (
    <div 
      className="relative h-[650px] md:h-[950px] w-full bg-stone-50/50 rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-ink/5 p-4 md:p-8 flex items-center justify-center perspective-1000 mb-12"
      onClick={handleContainerClick}
    >
      {/* Interactive Helper Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-12 left-12 flex items-center gap-4 text-ink/30 z-20 pointer-events-none"
      >
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          ))}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest italic">Drag & explore</span>
      </motion.div>

      {JOURNEY_CARDS.map((card, i) => {
        const initial = getInitialPos(i);
        return (
          <motion.div
            key={i}
            drag
            dragConstraints={{ left: -800, right: 800, top: -600, bottom: 600 }}
            dragElastic={0.2}
            onDragStart={() => bringToFront(i)}
            onTap={() => bringToFront(i)}
            // Use onClick for opening card instead of onTap if we want
            onClick={(e) => {
              e.stopPropagation();
              bringToFront(i);
            }}
            initial={{ 
              rotate: initial.rotate, 
              x: initial.x, 
              y: initial.y,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              opacity: activeCard !== null && activeCard !== i ? 0.7 : 1, 
              scale: activeCard === i ? 1.15 : 1,
              zIndex: activeCard === i ? Math.max(...zIndices) + 10 : zIndices[i],
              rotate: activeCard === i ? 0 : initial.rotate,
              x: activeCard === i ? 0 : initial.x,
              y: activeCard === i ? (isMobile ? -80 : -100) : initial.y,
              filter: activeCard !== null && activeCard !== i ? "blur(3px)" : "blur(0px)",
            }}
            whileHover={activeCard === i ? { 
              scale: 1.18, 
              boxShadow: "0 50px 100px -15px rgba(0,0,0,0.2)"
            } : { 
              scale: 1.05,
              y: initial.y - 20,
              rotate: initial.rotate * 0.8,
              boxShadow: "0 40px 80px -15px rgba(0,0,0,0.15)"
            }}
            whileDrag={{ 
              scale: 1.1, 
              cursor: "grabbing",
              boxShadow: "0 50px 100px -20px rgba(0,0,0,0.2)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute w-[280px] md:w-[340px] aspect-[4/5] bg-white/80 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 cursor-grab active:cursor-grabbing flex flex-col justify-between group overflow-hidden"
            style={{
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)",
            }}
          >
            {/* Card Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                {card.icon}
              </div>
              <h4 className="text-2xl font-black font-display uppercase tracking-tight text-ink mb-4 leading-tight">
                {card.title}
              </h4>
              <div className="w-8 h-[2px] bg-ink/20 mb-6" />
            </div>

            <div className="relative z-10">
              <p className="text-sm md:text-base text-ink/70 leading-relaxed font-medium">
                {card.description}
              </p>
            </div>

            {/* Decorative Corner */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-700" />
          </motion.div>
        );
      })}

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 md:gap-6">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            const nextIndex = activeCard === null ? 0 : (activeCard - 1 + JOURNEY_CARDS.length) % JOURNEY_CARDS.length;
            bringToFront(nextIndex);
          }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink hover:bg-accent hover:text-white hover:border-accent hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl hover:shadow-accent/20 group"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            const nextIndex = activeCard === null ? 0 : (activeCard + 1) % JOURNEY_CARDS.length;
            bringToFront(nextIndex);
          }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink hover:bg-accent hover:text-white hover:border-accent hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl hover:shadow-accent/20 group"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Safe storage wrapper to prevent crashes in sandboxed iframes
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("localStorage is blocked or unavailable in this environment:", e);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("localStorage is blocked or unavailable in this environment:", e);
    }
  }
};

// --- Main App ---

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Accessibility states with hydration from localStorage
  const [isUltraDark, setIsUltraDark] = useState(() => safeLocalStorage.getItem("acc-ultra-dark") === "true");
  const [isLargeText, setIsLargeText] = useState(() => safeLocalStorage.getItem("acc-large-text") === "true");
  const [isDyslexicFont, setIsDyslexicFont] = useState(() => safeLocalStorage.getItem("acc-dyslexic") === "true");
  const [isHighlightLinks, setIsHighlightLinks] = useState(() => safeLocalStorage.getItem("acc-highlight") === "true");
  const [isReduceMotion, setIsReduceMotion] = useState(() => safeLocalStorage.getItem("acc-reduce-motion") === "true");
  const [showAccMenu, setShowAccMenu] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    if (isUltraDark) {
      root.classList.add("ultra-dark");
      safeLocalStorage.setItem("acc-ultra-dark", "true");
    } else {
      root.classList.remove("ultra-dark");
      safeLocalStorage.setItem("acc-ultra-dark", "false");
    }

    if (isLargeText) {
      root.classList.add("large-text");
      safeLocalStorage.setItem("acc-large-text", "true");
    } else {
      root.classList.remove("large-text");
      safeLocalStorage.setItem("acc-large-text", "false");
    }

    if (isDyslexicFont) {
      root.classList.add("dyslexic-font");
      safeLocalStorage.setItem("acc-dyslexic", "true");
    } else {
      root.classList.remove("dyslexic-font");
      safeLocalStorage.setItem("acc-dyslexic", "false");
    }

    if (isHighlightLinks) {
      root.classList.add("highlight-links");
      safeLocalStorage.setItem("acc-highlight", "true");
    } else {
      root.classList.remove("highlight-links");
      safeLocalStorage.setItem("acc-highlight", "false");
    }

    if (isReduceMotion) {
      root.classList.add("reduce-motion");
      safeLocalStorage.setItem("acc-reduce-motion", "true");
    } else {
      root.classList.remove("reduce-motion");
      safeLocalStorage.setItem("acc-reduce-motion", "false");
    }
  }, [isUltraDark, isLargeText, isDyslexicFont, isHighlightLinks, isReduceMotion]);

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 400], [0, 1]);
  const navY = useTransform(scrollY, [0, 400], [-100, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) setShowWelcome(false);
      else setShowWelcome(true);
      
      // Show scroll-to-top button after scrolling past a certain threshold (e.g., 500px or half window height)
      if (window.scrollY > (window.innerHeight * 0.8)) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);
    setSendSuccess(false);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms access key is missing. Please add it to your environment variables.");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          subject: `New Message from ${contactForm.name} (Portfolio)`,
          from_name: "Yoav Anavi Portfolio",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSendSuccess(true);
        setContactForm({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (err: any) {
      console.error('Failed to send contact form:', err);
      setSendError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const [displayed, setDisplayed] = useState("");
  const fullName = "Yoav Anavi";
  useEffect(() => {
    if (!showWelcome) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [showWelcome]);

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-white relative" dir="ltr">
      <CustomCursor />
      <div className="noise" />
      <FloatingAccessibility 
        isUltraDark={isUltraDark} setIsUltraDark={setIsUltraDark}
        isLargeText={isLargeText} setIsLargeText={setIsLargeText}
        isDyslexicFont={isDyslexicFont} setIsDyslexicFont={setIsDyslexicFont}
        isHighlightLinks={isHighlightLinks} setIsHighlightLinks={setIsHighlightLinks}
        isReduceMotion={isReduceMotion} setIsReduceMotion={setIsReduceMotion}
        showAccMenu={showAccMenu} setShowAccMenu={setShowAccMenu}
      />

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetailPage 
            key={selectedProject.id}
            project={selectedProject} 
            onBack={() => {
              setSelectedProject(null);
              setTimeout(() => {
                const projSec = document.getElementById("projects");
                if (projSec) {
                  projSec.scrollIntoView({ behavior: "instant" });
                }
              }, 100);
            }} 
            onNextProject={(nextProj) => setSelectedProject(nextProj)}
          />
        ) : (
          <motion.div
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingLogo />

            {/* Welcome Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.section 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          >
            <BubblesParticles />
            <div className="text-center relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[12vw] max-sm:text-[16vw] font-black font-display uppercase tracking-[-0.05em] leading-[0.8] mb-6 hover:text-accent transition-colors duration-700"
              >
                {displayed}
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-2xl max-sm:tracking-[0.15em] md:text-4xl font-black font-display uppercase tracking-[0.4em] text-ink/10 italic"
              >
                UX UI Designer
              </motion.h2>
            </div>
            
            <motion.a 
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-16 max-sm:bottom-8 flex flex-col items-center gap-4 z-10 group cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-accent">VIEW MY STORY</span>
                <motion.div
                  animate={{ 
                    y: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowDown className="w-6 h-6 text-accent" />
                </motion.div>
              </div>
            </motion.a>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        style={{ opacity: navOpacity, y: navY }}
        className="fixed bottom-8 top-auto md:bottom-auto md:top-8 left-1/2 -translate-x-1/2 z-50 h-[50px] md:h-16 px-4 md:px-8 flex items-center justify-between w-[92vw] md:w-auto bg-white/70 backdrop-blur-2xl rounded-full border border-ink/5 shadow-2xl shadow-accent/5 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        <div className="flex gap-1 sm:gap-6 md:gap-8 items-center w-full justify-between md:justify-start">
          {["Home", "About", "Projects", "Contact"].map((item) => (
             <motion.a 
               key={item} 
               href={`#${item.toLowerCase()}`} 
               onMouseEnter={() => setHoveredNav(item)}
               onMouseLeave={() => setHoveredNav(null)}
               onClick={(e) => {
                 e.preventDefault();
                 const element = document.getElementById(item.toLowerCase());
                 if (element) {
                   const offset = 80;
                   const bodyRect = document.body.getBoundingClientRect().top;
                   const elementRect = element.getBoundingClientRect().top;
                   const elementPosition = elementRect - bodyRect;
                   const offsetPosition = elementPosition - offset;
                   
                   window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                   });
                 }
               }}
               className="relative px-3 max-sm:px-2 sm:px-3 md:px-4 py-2 text-[10px] max-sm:text-[8px] sm:text-[11px] md:text-base font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.3em] hover:text-white transition-colors duration-300 block z-10 text-center flex-1 md:flex-none"
             >
               <span className="relative z-10">{item}</span>
               {hoveredNav === item && (
                 <motion.div
                   layoutId="nav-pill"
                   className="absolute inset-0 bg-accent rounded-full shadow-lg shadow-accent/20"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                 />
               )}
             </motion.a>
           ))}
         </div>
      </motion.nav>

      <div className="px-4 md:px-12 max-w-screen-2xl mx-auto space-y-12 md:space-y-24">
        
        {/* Intro Section */}
        <section id="home" ref={heroRef} className="min-h-screen pt-32 md:pt-48 pb-16 flex flex-col justify-center relative overflow-hidden">
          <FloatingElements />
          
          <div className="w-full relative z-10 pt-16">
            <div id="about" className="grid lg:grid-cols-12 gap-8 md:gap-32 items-center">
            <SectionReveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 bg-zinc-200/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-300/50 shadow-[0_10px_30px_rgba(0,0,0,0.04)] mb-12 select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-75" />
                </div>
                <span className="text-[10px] max-sm:text-[9px] md:text-xs font-extrabold uppercase tracking-[0.25em] text-zinc-600/90 italic">Available for new projects</span>
              </div>
              
              <h3 className="text-5xl max-sm:text-[11vw] sm:text-7xl md:text-8xl lg:text-[8vw] font-black font-display uppercase tracking-[-0.04em] leading-[0.95] mb-4 md:mb-12 hover:text-accent transition-colors duration-500 overflow-visible py-4">
                UX UI <br /> <span className="italic text-accent uppercase">DESIGNER.</span>
              </h3>

              <div className="space-y-8 md:space-y-12 max-w-4xl">
                <div className="max-w-4xl text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem] leading-[1.3] font-display border-l-4 border-accent pl-6 md:pl-10 py-1 select-none flex flex-col gap-1.5 md:gap-3">
                  <p className="font-light text-ink/50 transition-colors duration-500 hover:text-ink whitespace-nowrap">
                    most designers make things <span className="underline decoration-accent/20 decoration-2 underline-offset-4">look good</span>,
                  </p>
                  <p className="font-black text-ink tracking-tight hover:text-accent transition-colors duration-300">
                    I make things <span className="text-accent italic">look right!</span>
                  </p>
                </div>
                
                <div className="flex flex-row flex-wrap xl:flex-nowrap items-center justify-center lg:justify-start lg:ml-6 gap-2 sm:gap-4 pt-2 md:pt-12 overflow-visible w-[90%] mx-auto sm:mx-0 sm:w-auto">
                  <motion.a 
                    href="#projects"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById("projects");
                      if (element) {
                        const offset = 80;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = element.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;
                        
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="w-[48%] sm:w-[190px] min-w-0 sm:min-w-[190px] h-[40px] max-sm:h-[44px] sm:h-[56px] bg-[#1A1A1D] text-white rounded-full font-black uppercase tracking-[0.1em] text-[10px] sm:text-[13px] md:text-sm shadow-xl shadow-ink/10 hover:bg-accent hover:shadow-accent/30 transition-all flex items-center justify-center gap-1 sm:gap-3 group relative z-10 px-2 sm:px-4"
                  >
                    <span className="relative z-10">View Projects</span> <ArrowRight className="w-[12px] h-[12px] sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.a>
                  <motion.a 
                    href="#contact"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById("contact");
                      if (element) {
                        const offset = 80;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = element.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;
                        
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="w-[48%] sm:w-[190px] min-w-0 sm:min-w-[190px] h-[40px] max-sm:h-[44px] sm:h-[56px] bg-white border border-ink/10 rounded-full font-black uppercase tracking-[0.1em] text-[10px] sm:text-[14px] transition-all flex items-center justify-center gap-1 sm:gap-3 shadow-sm hover:shadow-md relative z-10 px-2 sm:px-4"
                  >
                    <span className="relative z-10">Get in touch</span>
                  </motion.a>
                  <motion.a 
                    href="/Yoav_Anavi_CV.pdf?v=3"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Yoav_Anavi_CV.pdf"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-[98%] max-sm:w-full max-sm:mt-2 max-sm:h-[44px] sm:w-[190px] sm:flex-none h-[40px] sm:h-[56px] bg-accent text-white rounded-full font-black uppercase tracking-[0.1em] text-[10px] sm:text-[14px] transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-accent/20 relative z-10 mt-2 sm:mt-0"
                  >
                    <span className="relative z-10 whitespace-nowrap">Download CV</span> <Download className="w-[12px] h-[12px] sm:w-[18px] sm:h-[18px] relative z-10" />
                  </motion.a>
                </div>
              </div>
            </SectionReveal>
            
            <SectionReveal className="lg:col-span-12 xl:col-span-5 flex justify-center lg:justify-center" delay={0.2}>
              <motion.div 
                ref={imgRef}
                onMouseMove={(e) => {
                  const rect = imgRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  setTilt({ x: y * -15, y: x * 15 });
                }}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                whileHover={{ scale: 1.02 }}
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="relative perspective-1000 w-[85%] mx-auto md:w-full mt-8 md:mt-0"
              >
                <div className="relative aspect-[4/5] rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl group border-[16px] max-md:border-[8px] border-white bg-white max-md:mx-auto">
                  <img 
                    src="https://i.postimg.cc/bNnyxPYD/Whats-App-Image-2026-05-18-at-11-26-11.jpg" 
                    alt="Yoav Anavi" 
                    className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200";
                    }}
                  />

                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-accent/15 blur-[60px] animate-pulse" />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/15 blur-[60px] animate-pulse delay-700" />
                <div className="absolute -top-8 -left-8 w-40 h-40 bg-accent/10 blur-[50px] animate-pulse delay-300" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/10 blur-[50px] animate-pulse delay-1000" />
              </motion.div>
            </SectionReveal>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="projects" className="pt-12 pb-4 md:py-24">
          <SectionHeader title="Projects" />

          <div className="space-y-0">
            {PROJECTS.map((project, i) => (
              <ProjectItem key={project.id} project={project} index={i} onOpen={setSelectedProject} />
            ))}
          </div>
        </section>



        {/* Journey Section */}
        <section id="journey" className="pt-4 pb-4 md:pb-24 md:pt-24">
          <SectionHeader title="Skills" />
          <SectionReveal>
            <DraggableJourney />
          </SectionReveal>
          
          <div className="mt-4 md:mt-16">
            <Marquee text="Figma ✦ Generative AI ✦ UI/UX ✦ User Research ✦ Wireframing ✦ Strategy" speed={30} />
          </div>
        </section>

        {/* Contact Section */}
        <footer id="contact" className="py-8 md:py-24 flex flex-col items-center w-full">
          <SectionReveal className="w-full">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-6xl max-md:text-4xl max-md:leading-[1] md:text-[11.5vw] font-black font-display uppercase tracking-[-0.07em] leading-[0.8] mb-16 cursor-default select-none relative z-10"
                >
                  <span className="block overflow-visible">
                    <motion.span 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="block text-ink transition-colors duration-300 cursor-pointer"
                    >
                      Let's create
                    </motion.span>
                  </span>
                  <span className="block overflow-visible">
                    <motion.span 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="block italic text-ink transition-colors duration-300 origin-left cursor-pointer"
                    >
                      something
                    </motion.span>
                  </span>
                  <span className="block overflow-visible">
                    <motion.span 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="block text-ink transition-colors duration-300 cursor-pointer"
                    >
                      beautiful
                    </motion.span>
                  </span>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="block text-accent transition-all duration-500 font-display italic origin-left relative cursor-pointer"
                  >
                    together!
                    <motion.span 
                      className="absolute -bottom-2 left-0 w-full h-[3px] bg-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    />
                  </motion.span>
                </motion.h2>

                {/* Contact Form Section */}
                <div className="relative z-20 w-full max-w-2xl mx-auto mt-20">
                  <AnimatePresence mode="wait">
                    {sendSuccess ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-[#1A1A1D] text-white p-16 rounded-[2.5rem] shadow-2xl text-center"
                      >
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                          <Check className="w-10 h-10" />
                        </div>
                        <h5 className="text-3xl font-black uppercase tracking-tight mb-4">Message Sent!</h5>
                        <p className="text-white/80 mb-8 italic">I've received your message and will respond to your email shortly.</p>
                        <button 
                          onClick={() => setSendSuccess(false)}
                          className="bg-[#F7F8FA] hover:bg-accent text-[#1A1A1D] hover:text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-colors duration-300"
                        >
                          Send another
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/40 backdrop-blur-xl p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-ink/5 shadow-2xl text-left"
                      >
                        <div className="flex justify-between items-center mb-10">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent block mb-2 italic">Direct Connection</span>
                            <h5 className="text-2xl font-black uppercase tracking-tight">Drop a message</h5>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">Available now</span>
                            </div>
                            <span className="text-[10px] font-medium text-ink/30 italic">Usually replies within 24h</span>
                          </div>
                        </div>

                        <form onSubmit={handleContactSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-ink/40 ml-8">Full Name</label>
                              <input 
                                required
                                type="text" 
                                name="name"
                                value={contactForm.name}
                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                placeholder="Yoav Anavi"
                                className="w-full bg-white/50 border border-ink/5 focus:border-accent/40 rounded-full px-8 py-4 max-md:h-[48px] outline-none transition-all font-medium"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-ink/40 ml-8">Your Email</label>
                              <input 
                                required
                                type="email" 
                                name="email"
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                placeholder="hello@world.com"
                                className="w-full bg-white/50 border border-ink/5 focus:border-accent/40 rounded-full px-8 py-4 max-md:h-[48px] outline-none transition-all font-medium"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-ink/40 ml-8">Message</label>
                            <textarea 
                              required
                              name="message"
                              rows={4}
                              value={contactForm.message}
                              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                              placeholder="Describe your vision..."
                              className="w-full bg-white/50 border border-ink/5 focus:border-accent/40 rounded-[2rem] px-8 py-6 outline-none transition-all font-medium resize-none"
                            />
                          </div>

                          {sendError && (
                            <div className="bg-red-50 text-red-500 text-xs font-bold p-4 rounded-2xl flex items-center gap-3">
                              <X className="w-4 h-4" /> {sendError}
                            </div>
                          )}

                          <button 
                            type="submit"
                            disabled={isSending}
                            className="bg-black text-white w-full py-6 max-md:py-4 rounded-full font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-accent transition-all group overflow-hidden relative"
                          >
                            {isSending ? (
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              <>
                                Send Message 
                                <motion.div 
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </motion.div>
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <motion.div 
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1],
                      x: [0, 50, -50, 0],
                      y: [0, -50, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-64 h-64 border-2 border-accent/10 rounded-full"
                  />
                  <motion.div 
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.5, 1],
                      x: [0, -100, 100, 0],
                      y: [0, 100, -100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 w-80 h-80 border border-accent/5 rounded-[3rem]"
                  />
                </div>
              </div>
              
               <div className="flex flex-col items-center mt-16 mb-24 w-full max-w-4xl">
                {/* Links */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-24 w-full text-center relative">
                  
                  {/* Email Actions Popup */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowEmailOptions(!showEmailOptions)}
                      className="block group text-left cursor-pointer"
                    >
                      <span className="text-sm md:text-base font-black uppercase tracking-widest text-accent mb-4 block text-center lg:text-left">Email Me</span>
                      <span className="text-xl max-md:text-base max-md:break-all md:text-2xl font-black font-display border-b-2 border-ink/5 group-hover:border-accent group-hover:text-accent transition-all pb-2">
                        yoavanavi1@gmail.com
                      </span>
                    </button>

                    <AnimatePresence>
                      {showEmailOptions && (
                        <>
                          {/* Invisible backdrop to catch clicks outside */}
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setShowEmailOptions(false)}
                          />
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white border border-ink/10 rounded-2xl shadow-2xl p-2 z-50 min-w-[220px] flex flex-col gap-1 overflow-hidden"
                          >
                            <a 
                              href="mailto:yoavanavi1@gmail.com"
                              onClick={() => setShowEmailOptions(false)}
                              className="text-left px-4 py-3 rounded-xl hover:bg-ink/5 transition-colors text-sm font-bold flex items-center gap-3 group"
                            >
                              <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-white transition-colors">
                                <Mail className="w-4 h-4" />
                              </div>
                              Default Email App
                            </a>
                            <a 
                              href="https://mail.google.com/mail/?view=cm&fs=1&to=yoavanavi1@gmail.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setShowEmailOptions(false)}
                              className="text-left px-4 py-3 rounded-xl hover:bg-ink/5 transition-colors text-sm font-bold flex items-center gap-3 group"
                            >
                              <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-white transition-colors">
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457Z"/></svg>
                              </div>
                              Gmail
                            </a>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText("yoavanavi1@gmail.com");
                                setCopiedEmail(true);
                                setTimeout(() => setCopiedEmail(false), 2000);
                              }}
                              className="text-left px-4 py-3 rounded-xl hover:bg-ink/5 transition-colors text-sm font-bold flex items-center gap-3 group"
                            >
                              <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-white transition-colors">
                                {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>}
                              </div>
                              {copiedEmail ? "Copied!" : "Copy Address"}
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  <a href="tel:0543455947" className="block group">
                    <span className="text-sm md:text-base font-black uppercase tracking-widest text-accent mb-4 block">Call Me</span>
                    <span className="text-xl md:text-2xl font-black font-display border-b-2 border-ink/5 group-hover:border-accent group-hover:text-accent transition-all pb-2">
                      +972 54-3455947
                    </span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/yoav-anavi-64981a232/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block group"
                  >
                    <span className="text-sm md:text-base font-black uppercase tracking-widest text-accent mb-4 block">Socials</span>
                    <span className="flex items-center gap-2 text-xl md:text-2xl font-black font-display border-b-2 border-ink/5 group-hover:border-accent group-hover:text-accent transition-all pb-2">
                      LinkedIn <ArrowUpRight className="w-5 h-5 text-ink/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 border-t border-ink/10 pt-8 md:pt-16 w-full justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-ink/10 italic text-center md:text-left">
                 <p>Tel Aviv, Israel Based ✦ Global Creative Services</p>
                 <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                   <p>Yoav Anavi Design Studio © {new Date().getFullYear()}</p>
                 </div>
              </div>
            </div>
          </SectionReveal>
        </footer>

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-28 right-6 md:bottom-12 md:right-12 z-[100] w-12 h-12 md:w-14 md:h-14 bg-black text-white hover:bg-accent rounded-full flex items-center justify-center shadow-xl shadow-ink/20 hover:-translate-y-1 hover:shadow-accent/30 transition-all group cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        </div>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
