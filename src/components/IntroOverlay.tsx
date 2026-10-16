import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface IntroOverlayProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onOpen, isOpen }) => {
  const [animStage, setAnimStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const t1 = setTimeout(() => setAnimStage(1), 300);
    const t2 = setTimeout(() => setAnimStage(2), 700);
    const t3 = setTimeout(() => setAnimStage(3), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  const handleOpenClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  const handleSkip = () => {
    onOpen();
  };

  if (!isOpen && !isExiting) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Opening letter for Wifey"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 transition-all duration-800 ease-out overflow-hidden ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 40%, #1A0D16 0%, #12070F 50%, #0A0408 100%)',
      }}
    >
      {/* Golden candle ember backlight */}
      <div
        className="absolute w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full blur-3xl pointer-events-none opacity-40 animate-candle-glow"
        style={{
          background: 'radial-gradient(circle, rgba(234,213,158,0.3) 0%, rgba(197,160,89,0.1) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating stardust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#EAD59E] opacity-60 animate-gold-shimmer" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#C2637D] opacity-50 animate-float-gentle" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#FAF6F0] opacity-40 animate-gold-shimmer" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wider text-[#EAD59E]/80 hover:text-[#FAF6F0] bg-[#1A0C16]/90 hover:bg-[#2A1323] rounded-full border border-[#C5A059]/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#C5A059]"
        aria-label="Skip introduction"
      >
        <span>{loveStoryConfig.intro.skipButtonText}</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Center Luxury Wax-Sealed Card */}
      <div
        className={`relative z-10 w-full max-w-lg transition-all duration-800 ease-out max-h-[92vh] overflow-y-auto ${
          animStage >= 2
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-10 scale-95'
        }`}
      >
        <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 luxury-editorial-card-elevated text-center overflow-hidden border border-[#C5A059]/40">
          {/* Subtle gold corner filigree */}
          <div className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#EAD59E]">
              <path
                d="M100 0 L100 100 L0 0 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Golden Wax Seal Emblem */}
          <div
            className={`inline-flex items-center justify-center mb-4 sm:mb-6 transition-all duration-700 ${
              animStage >= 1
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-50'
            }`}
          >
            <div className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#8A243E] via-[#5C1629] to-[#360B17] flex items-center justify-center border-2 border-[#EAD59E] shadow-xl shadow-[#C5A059]/20 animate-candle-glow">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#EAD59E] fill-[#EAD59E]" />
            </div>
          </div>

          {/* Small Heading */}
          <div
            className={`transition-all duration-700 delay-100 ${
              animStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#C5A059] mb-1.5 sm:mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAD59E]" />
              <span className="truncate">{loveStoryConfig.intro.smallHeading}</span>
            </p>
          </div>

          {/* Main Heading */}
          <div
            className={`transition-all duration-700 delay-200 ${
              animStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] tracking-tight leading-tight mb-3 sm:mb-4">
              {loveStoryConfig.intro.mainHeading}
            </h1>
          </div>

          {/* Romantic Description */}
          <div
            className={`transition-all duration-700 delay-300 ${
              animStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <p className="text-xs sm:text-base text-[#FAF6F0]/85 font-normal leading-relaxed max-w-md mx-auto mb-6 sm:mb-8 font-serif italic text-balance">
              "{loveStoryConfig.intro.description}"
            </p>
          </div>

          {/* Open Button */}
          <div
            className={`transition-all duration-700 delay-400 ${
              animStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={handleOpenClick}
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] shadow-lg shadow-[#C5A059]/30 hover:shadow-xl hover:shadow-[#C5A059]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAD59E]"
            >
              <span className="truncate">{loveStoryConfig.intro.openButtonText}</span>
              <Heart className="w-4 h-4 text-[#0C060A] fill-[#0C060A] group-hover:scale-110 transition-transform duration-200 shrink-0" />
            </button>
          </div>

          <div
            className={`mt-4 sm:mt-6 text-[9px] sm:text-[10px] text-[#C5A059]/70 tracking-[0.2em] uppercase font-light transition-opacity duration-700 delay-500 ${
              animStage >= 3 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>{loveStoryConfig.meta.subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
