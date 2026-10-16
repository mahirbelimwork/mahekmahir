import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveStoryConfig } from '../config/loveStory';

interface FinalLoveLetterProps {
  onReplay: () => void;
}

export const FinalLoveLetter: React.FC<FinalLoveLetterProps> = ({ onReplay }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const triggerCelebration = () => {
    setHugCount((prev) => prev + 1);
    setIsRevealed(true);

    const end = Date.now() + 1800;
    const colors = ['#EAD59E', '#D4AF37', '#C2637D', '#E295A8', '#FAF6F0'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle'],
        scalar: 1.2,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors,
        shapes: ['circle'],
        scalar: 1.2,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Center luxury heart burst
    confetti({
      particleCount: 65,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#EAD59E', '#D4AF37', '#C2637D', '#FAF6F0'],
      disableForReducedMotion: true,
    });
  };

  const ch7 = loveStoryConfig.chapters.chapter7;

  return (
    <div className="w-full text-center flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12">
      {/* Decorative luxury medallion */}
      <div className="relative mb-4 sm:mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-tr from-[#C5A059] via-[#8A243E] to-[#EAD59E] flex items-center justify-center p-1 shadow-2xl animate-candle-glow">
          <div className="w-full h-full rounded-full bg-[#140811] flex items-center justify-center border border-[#EAD59E]/40">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#EAD59E] fill-[#EAD59E]/30" />
          </div>
        </div>
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAD59E] absolute -top-1 -right-1 animate-gold-shimmer" />
      </div>

      <div className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C5A059] mb-2 sm:mb-3">
        Chapter {ch7.number} · {ch7.title}
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] tracking-tight leading-tight max-w-2xl mx-auto mb-3 sm:mb-4 text-balance">
        {ch7.heading}
      </h2>

      <p className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/80 font-serif italic max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
        "{ch7.supportingMessage}"
      </p>

      {/* Hug Action Button */}
      <div className="mb-6 sm:mb-8 w-full sm:w-auto">
        <button
          onClick={triggerCelebration}
          className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-11 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] shadow-2xl shadow-[#C5A059]/30 hover:shadow-[#C5A059]/50 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-[#EAD59E]"
        >
          <span>{ch7.finalButtonLabel}</span>
          <Heart className="w-4 h-4 text-[#0C060A] fill-[#0C060A] group-hover:scale-125 transition-transform duration-200" />
        </button>
        {hugCount > 0 && (
          <p className="text-xs text-[#EAD59E] font-medium mt-2 tracking-wider uppercase">
            Hugs sent: {hugCount} ❤️
          </p>
        )}
      </div>

      {/* Revealed Final Love Certificate */}
      <div
        className={`transition-all duration-1000 transform max-w-xl w-full ${
          isRevealed
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none hidden'
        }`}
      >
        <div className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1C0D19] via-[#140811] to-[#0D050A] border-2 border-[#C5A059]/50 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-2 sm:mb-3">
            Certificate of Eternal Devotion
          </p>

          <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FAF6F0] font-bold leading-tight py-2 sm:py-4 text-balance">
            {ch7.finalRevealedMessage}
          </p>

          <div className="pt-3 sm:pt-4 flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#C5A059]/75 font-serif italic border-t border-[#C5A059]/20 mt-3 sm:mt-4">
            <span>Forever and always</span>
            <span aria-hidden="true">✦</span>
            <span>Made with all my heart</span>
          </div>
        </div>

        {/* Replay option */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={onReplay}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FAF6F0]/80 hover:text-[#EAD59E] bg-[#1A0C16] hover:bg-[#251120] border border-[#C5A059]/30 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{ch7.replayButtonLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
