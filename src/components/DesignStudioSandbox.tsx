import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Sliders, 
  Type, 
  Check, 
  Copy, 
  Sparkles, 
  RotateCcw, 
  X, 
  Compass,
  Code2,
  Sun,
  Moon
} from "lucide-react";

export interface AccentColor {
  id: string;
  name: string;
  hex: string;
  darkHex?: string;
}

export interface FontPairing {
  id: string;
  name: string;
  displayFont: string;
  sansFont: string;
  sampleText: string;
}

export interface PresetTheme {
  id: string;
  name: string;
  accentHex: string;
  fontId: string;
  isDark: boolean;
  radius: string;
  description: string;
}

const ACCENT_COLORS: AccentColor[] = [
  { id: "emerald", name: "Emerald", hex: "#15803D", darkHex: "#34D399" },
  { id: "wine", name: "Wine", hex: "#881337", darkHex: "#FB7185" },
  { id: "amber", name: "Amber", hex: "#B45309", darkHex: "#FBBF24" },
  { id: "sage", name: "Sage", hex: "#4D7C0F", darkHex: "#A3E635" },
  { id: "cobalt", name: "Cobalt", hex: "#2563EB", darkHex: "#60A5FA" },
  { id: "rose", name: "Rose", hex: "#E11D48", darkHex: "#F43F5E" },
  { id: "slate", name: "Slate", hex: "#18181B", darkHex: "#38BDF8" },
  { id: "terracotta", name: "Terracotta", hex: "#C2410C", darkHex: "#FB923C" }
];

const FONT_PAIRINGS: FontPairing[] = [
  { 
    id: "luxe", 
    name: "Serif & Sans", 
    displayFont: '"Cormorant Garamond", "Syne", Georgia, serif',
    sansFont: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
    sampleText: "Luxury Architecture & Design"
  },
  { 
    id: "tech", 
    name: "Geometric & Modern", 
    displayFont: '"Space Grotesk", sans-serif',
    sansFont: '"Inter", ui-sans-serif, system-ui, sans-serif',
    sampleText: "Digital & Spatial Innovation"
  },
  { 
    id: "avant", 
    name: "Avant-Garde", 
    displayFont: '"Syne", sans-serif',
    sansFont: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
    sampleText: "Creative Studio Vision"
  }
];

const PRESET_THEMES: PresetTheme[] = [
  { 
    id: "parisian", 
    name: "Parisian Gallery", 
    accentHex: "#15803D", 
    fontId: "luxe", 
    isDark: false, 
    radius: "1.5rem",
    description: "Light cream canvas with forest green accents."
  },
  { 
    id: "tokyo", 
    name: "Tokyo Cyber", 
    accentHex: "#2563EB", 
    fontId: "tech", 
    isDark: true, 
    radius: "0.5rem",
    description: "Dark mode with sharp cobalt highlights."
  },
  { 
    id: "nordic", 
    name: "Nordic Minimal", 
    accentHex: "#B45309", 
    fontId: "avant", 
    isDark: false, 
    radius: "0.25rem",
    description: "Warm amber accents with clean straight lines."
  },
  { 
    id: "bordeaux", 
    name: "Bordeaux Estate", 
    accentHex: "#881337", 
    fontId: "luxe", 
    isDark: false, 
    radius: "2.5rem",
    description: "Deep burgundy tones with soft rounded curves."
  }
];

export const DesignStudioSandbox: React.FC<{
  isUltraDark: boolean;
  setIsUltraDark: (v: boolean) => void;
}> = ({ isUltraDark, setIsUltraDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState<AccentColor>(ACCENT_COLORS[0]);
  const [customHex, setCustomHex] = useState<string>("#15803D");
  const [activeFont, setActiveFont] = useState<FontPairing>(FONT_PAIRINGS[0]);
  const [activeRadius, setActiveRadius] = useState<string>("1.5rem");
  const [glowIntensity, setGlowIntensity] = useState<"none" | "subtle" | "vibrant">("subtle");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"presets" | "colors" | "typography" | "export">("presets");

  // Apply CSS root variables dynamically
  useEffect(() => {
    const root = document.documentElement;
    const effectiveHex = activeColor.id === "custom" ? customHex : (isUltraDark && activeColor.darkHex ? activeColor.darkHex : activeColor.hex);
    
    root.style.setProperty("--color-accent", effectiveHex);
    root.style.setProperty("--font-display", activeFont.displayFont);
    root.style.setProperty("--font-sans", activeFont.sansFont);
  }, [activeColor, customHex, activeFont, isUltraDark]);

  const handleApplyPreset = (preset: PresetTheme) => {
    const foundColor = ACCENT_COLORS.find(c => c.hex === preset.accentHex) || {
      id: "custom",
      name: preset.name,
      hex: preset.accentHex
    };
    const foundFont = FONT_PAIRINGS.find(f => f.id === preset.fontId) || FONT_PAIRINGS[0];
    
    setActiveColor(foundColor);
    setCustomHex(preset.accentHex);
    setActiveFont(foundFont);
    setActiveRadius(preset.radius);
    setIsUltraDark(preset.isDark);
  };

  const resetDesignSystem = () => {
    setActiveColor(ACCENT_COLORS[0]);
    setCustomHex(ACCENT_COLORS[0].hex);
    setActiveFont(FONT_PAIRINGS[0]);
    setActiveRadius("1.5rem");
    setGlowIntensity("subtle");
    setIsUltraDark(false);
  };

  const getExportCSS = () => {
    const hex = activeColor.id === "custom" ? customHex : activeColor.hex;
    return `:root {
  --color-accent: ${hex};
  --font-display: ${activeFont.displayFont};
  --font-sans: ${activeFont.sansFont};
  --border-radius-base: ${activeRadius};
  --theme-mode: ${isUltraDark ? "dark" : "light"};
}`;
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div 
        className="fixed bottom-6 left-6 z-[60] pointer-events-auto"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-black/10 dark:border-white/10 px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          aria-label="Open Design Studio"
        >
          <Sliders className="w-4 h-4 text-accent transition-transform duration-300 group-hover:rotate-90" />
          <span className="text-xs font-bold tracking-wide text-ink dark:text-white font-sans">
            Design Studio
          </span>
        </button>
      </motion.div>

      {/* Workbench Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 text-ink dark:text-white rounded-3xl border border-black/10 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-black/5 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-ink dark:text-white">
                      Design Studio
                    </h2>
                    <p className="text-xs text-ink/50 dark:text-white/50">
                      Customize theme presets, colors, and typography.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={resetDesignSystem}
                    title="Reset to default"
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-ink/50 hover:text-ink transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-ink/50 hover:text-ink transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Minimal Navigation Tabs */}
              <div className="flex border-b border-black/5 dark:border-zinc-800 px-6 gap-1 bg-zinc-50/50 dark:bg-zinc-900/50 overflow-x-auto py-2">
                {[
                  { id: "presets", label: "Presets", icon: Compass },
                  { id: "colors", label: "Colors", icon: Palette },
                  { id: "typography", label: "Typography", icon: Type },
                  { id: "export", label: "Export CSS", icon: Code2 }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        active 
                          ? "bg-white dark:bg-zinc-800 text-accent shadow-sm border border-black/5 dark:border-zinc-700" 
                          : "text-ink/60 dark:text-white/60 hover:text-ink dark:hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* 1. PRESETS TAB */}
                {activeTab === "presets" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PRESET_THEMES.map((preset) => (
                        <div
                          key={preset.id}
                          onClick={() => handleApplyPreset(preset)}
                          className="p-4 rounded-2xl border border-black/5 dark:border-zinc-800 hover:border-accent bg-zinc-50/50 dark:bg-zinc-900/40 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-bold text-sm text-ink dark:text-white group-hover:text-accent transition-colors">
                                {preset.name}
                              </h4>
                              <div 
                                className="w-4 h-4 rounded-full border border-black/10"
                                style={{ backgroundColor: preset.accentHex }}
                              />
                            </div>
                            <p className="text-xs text-ink/60 dark:text-white/60">
                              {preset.description}
                            </p>
                          </div>

                          <div className="mt-3 text-[11px] font-medium text-accent">
                            Apply Theme →
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mode Toggle */}
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/5 dark:border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isUltraDark ? <Moon className="w-4 h-4 text-accent" /> : <Sun className="w-4 h-4 text-accent" />}
                        <span className="text-xs font-medium text-ink dark:text-white">
                          Dark Mode
                        </span>
                      </div>
                      <button
                        onClick={() => setIsUltraDark(!isUltraDark)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border border-black/10 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-ink dark:text-white"
                      >
                        {isUltraDark ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. COLORS TAB */}
                {activeTab === "colors" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {ACCENT_COLORS.map((color) => {
                        const isSelected = activeColor.id === color.id;
                        return (
                          <button
                            key={color.id}
                            onClick={() => {
                              setActiveColor(color);
                              setCustomHex(color.hex);
                            }}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "border-accent bg-accent/5 ring-1 ring-accent"
                                : "border-black/5 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40"
                            }`}
                          >
                            <div 
                              className="w-5 h-5 rounded-lg flex items-center justify-center text-white shrink-0"
                              style={{ backgroundColor: color.hex }}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-medium text-ink dark:text-white truncate">
                                {color.name}
                              </span>
                              <span className="text-[10px] font-mono opacity-50">
                                {color.hex}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Hex */}
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/5 dark:border-zinc-800 flex items-center gap-3">
                      <input
                        type="color"
                        value={customHex}
                        onChange={(e) => {
                          setCustomHex(e.target.value);
                          setActiveColor({
                            id: "custom",
                            name: "Custom Tint",
                            hex: e.target.value
                          });
                        }}
                        className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent shrink-0"
                      />
                      <input
                        type="text"
                        value={customHex}
                        onChange={(e) => {
                          setCustomHex(e.target.value);
                          setActiveColor({
                            id: "custom",
                            name: "Custom Tint",
                            hex: e.target.value
                          });
                        }}
                        placeholder="#15803D"
                        className="flex-1 px-3 py-2 rounded-xl border border-black/10 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-mono text-ink dark:text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                )}

                {/* 3. TYPOGRAPHY TAB */}
                {activeTab === "typography" && (
                  <div className="space-y-3">
                    {FONT_PAIRINGS.map((font) => {
                      const isSelected = activeFont.id === font.id;
                      return (
                        <button
                          key={font.id}
                          onClick={() => setActiveFont(font)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                            isSelected
                              ? "border-accent bg-accent/5 ring-1 ring-accent"
                              : "border-black/5 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-ink dark:text-white">
                              {font.name}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] bg-accent text-white font-medium px-2 py-0.5 rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          
                          <div className="p-3 bg-white dark:bg-zinc-950 rounded-xl border border-black/5 dark:border-zinc-800">
                            <span 
                              className="text-lg font-bold block text-ink dark:text-white"
                              style={{ fontFamily: font.displayFont }}
                            >
                              {font.sampleText}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* EXPORT CSS TAB */}
                {activeTab === "export" && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-ink dark:text-white">
                        Root CSS Variables
                      </span>
                      <button
                        onClick={() => copyCode(getExportCSS())}
                        className="flex items-center gap-1.5 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full shadow hover:bg-accent/90 transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? "Copied" : "Copy CSS"}
                      </button>
                    </div>

                    <pre className="p-4 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed dir-ltr">
                      {getExportCSS()}
                    </pre>
                  </div>
                )}

                {/* Token Preview */}
                <div className="pt-4 border-t border-black/5 dark:border-zinc-800">
                  <div 
                    className={`p-4 border border-black/5 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between gap-4 transition-all ${
                      glowIntensity === "vibrant" ? "shadow-lg shadow-accent/20" : glowIntensity === "subtle" ? "shadow-sm" : "shadow-none"
                    }`}
                    style={{ borderRadius: activeRadius }}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                        Live Preview
                      </span>
                      <h4 
                        className="text-base font-bold text-ink dark:text-white"
                        style={{ fontFamily: activeFont.displayFont }}
                      >
                        Sample Interface Card
                      </h4>
                    </div>

                    <button 
                      className="px-4 py-2 bg-accent text-white text-xs font-bold rounded-lg cursor-pointer"
                      style={{ borderRadius: activeRadius }}
                    >
                      Action
                    </button>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-black/5 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 bg-ink dark:bg-white text-white dark:text-black text-xs font-bold rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Close & Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
