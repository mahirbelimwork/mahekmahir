import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoveNoteProps {
  text: string;
  author?: string;
  rotation?: number;
}

export const LoveNote: React.FC<LoveNoteProps> = ({
  text,
  author = 'Forever Yours',
  rotation = -0.7,
}) => {
  return (
    <div className="py-14 sm:py-20 px-4 flex justify-center items-center">
      <div
        className="relative max-w-xl w-full p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#1C0D19]/90 via-[#150913]/95 to-[#11060E] border border-[#C5A059]/40 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-[#EAD59E]/60"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Subtle decorative gold stamp */}
        <div className="flex items-center justify-between mb-4 border-b border-[#C5A059]/20 pb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C5A059] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#EAD59E]" />
            <span>Memoir Note</span>
          </span>
          <span className="text-[11px] font-serif italic text-[#FAF6F0]/60">
            For Wifey
          </span>
        </div>

        <p className="font-handwriting text-2xl sm:text-3xl text-[#EAD59E] font-medium leading-relaxed text-center py-2">
          "{text}"
        </p>

        {/* Footer mark */}
        <div className="mt-3 text-right">
          <span className="text-[11px] font-sans uppercase tracking-widest text-[#C5A059]/70">
            — {author}
          </span>
        </div>
      </div>
    </div>
  );
};
