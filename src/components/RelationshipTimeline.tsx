import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Flame,
  Home,
  Infinity as InfinityIcon,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from 'lucide-react';
import { RelationshipMilestone } from '../config/loveStory';

interface RelationshipTimelineProps {
  milestones: RelationshipMilestone[];
}

export const RelationshipTimeline: React.FC<RelationshipTimelineProps> = ({
  milestones,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedMilestone = milestones[selectedIndex] || milestones[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : milestones.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : 0));
  };

  const getIcon = (iconName: RelationshipMilestone['iconName'], active: boolean) => {
    const className = `w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
      active ? 'text-[#0C060A] scale-110' : 'text-[#EAD59E] group-hover:scale-110'
    }`;

    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Heart':
        return <Heart className={`${className} ${active ? 'fill-[#0C060A]' : ''}`} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Home':
        return <Home className={className} />;
      case 'Infinity':
        return <InfinityIcon className={className} />;
      default:
        return <Heart className={className} />;
    }
  };

  return (
    <section
      id="relationship-timeline"
      className="relative max-w-5xl mx-auto px-3.5 sm:px-6 py-12 sm:py-16 my-4"
      aria-label="Relationship Milestones Timeline"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span>Our Cherished Timeline</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#FAF6F0] tracking-tight">
          Milestones Along the Way
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF6F0]/75 font-light leading-relaxed">
          Tap each milestone to unveil the quiet chapters that shaped our world.
        </p>
      </div>

      {/* Horizontal Interactive Timeline Track */}
      <div className="relative mb-8 sm:mb-10">
        {/* Luminous Golden Thread Line (Desktop) */}
        <div
          className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent -translate-y-1/2 z-0"
          aria-hidden="true"
        />

        {/* Milestone Nodes: Horizontal Scrollable on Mobile, Distributed on Desktop */}
        <div className="relative z-10 flex md:grid md:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 px-1 no-scrollbar snap-x snap-mandatory">
          {milestones.map((milestone, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <button
                key={milestone.id}
                onClick={() => setSelectedIndex(idx)}
                className={`group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 min-w-[140px] md:min-w-0 snap-center shrink-0 border cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EAD59E] ${
                  isSelected
                    ? 'bg-[#1F0E1B] border-[#EAD59E] shadow-xl shadow-[#C5A059]/20'
                    : 'bg-[#140811]/80 hover:bg-[#1A0C16] border-[#C5A059]/25 hover:border-[#C5A059]/50'
                }`}
                aria-pressed={isSelected}
                aria-label={`View ${milestone.title}`}
              >
                {/* Node Orb with Icon */}
                <div
                  className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2.5 transition-all duration-300 shadow-md ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[#EAD59E] to-[#C5A059] shadow-[#C5A059]/40 scale-105 animate-candle-glow'
                      : 'bg-[#1C0D19] border border-[#C5A059]/40 group-hover:border-[#EAD59E]/70'
                  }`}
                >
                  {getIcon(milestone.iconName, isSelected)}

                  {/* Active selection ping dot */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#EAD59E] ring-2 ring-[#0C060A]" />
                  )}
                </div>

                {/* Milestone Phase Tag */}
                <span
                  className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-mono mb-1 transition-colors ${
                    isSelected ? 'text-[#EAD59E] font-semibold' : 'text-[#C5A059]/70'
                  }`}
                >
                  {milestone.phase}
                </span>

                {/* Milestone Title */}
                <span
                  className={`text-xs sm:text-sm font-serif font-medium leading-snug line-clamp-2 transition-colors ${
                    isSelected ? 'text-[#FAF6F0]' : 'text-[#FAF6F0]/75 group-hover:text-[#FAF6F0]'
                  }`}
                >
                  {milestone.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Swipe / Arrow Hints */}
        <div className="flex md:hidden items-center justify-between mt-2 px-2 text-[11px] text-[#C5A059]/70 font-mono">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 hover:text-[#FAF6F0] p-1"
            aria-label="Previous milestone"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          <span>{selectedIndex + 1} / {milestones.length}</span>
          <button
            onClick={handleNext}
            className="flex items-center gap-1 hover:text-[#FAF6F0] p-1"
            aria-label="Next milestone"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Smooth Animated Milestone Details Reveal Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMilestone.id}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated p-5 sm:p-8 lg:p-10 border border-[#C5A059]/35 shadow-2xl overflow-hidden"
        >
          {/* Subtle gold corner stamp */}
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <Bookmark className="w-10 h-10 text-[#EAD59E]" />
          </div>

          <div className="max-w-3xl space-y-4 sm:space-y-5 text-left">
            {/* Phase Kicker & Subtitle */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="px-2.5 py-1 rounded-full bg-[#EAD59E]/15 border border-[#EAD59E]/30 text-[#EAD59E] font-mono uppercase tracking-widest">
                {selectedMilestone.phase}
              </span>
              <span className="text-[#C5A059] font-serif italic text-xs sm:text-sm">
                "{selectedMilestone.subtitle}"
              </span>
            </div>

            {/* Main Milestone Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#FAF6F0] leading-tight">
              {selectedMilestone.title}
            </h3>

            {/* Narrative Prose */}
            <p className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/85 font-light leading-relaxed">
              {selectedMilestone.narrative}
            </p>

            {/* Romantic Quote Card */}
            <div className="pt-2">
              <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#140811] border border-[#C5A059]/40 inline-block shadow-md max-w-full">
                <p className="font-handwriting text-xl sm:text-2xl text-[#EAD59E] font-medium leading-snug">
                  "{selectedMilestone.quote}"
                </p>
              </div>
            </div>

            {/* Quick Navigation Footer */}
            <div className="pt-4 flex items-center justify-between border-t border-[#C5A059]/20 text-xs">
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#EAD59E] transition-colors py-1 px-2 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Chapter</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="flex items-center gap-1.5">
                {milestones.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === selectedIndex
                        ? 'w-6 bg-[#EAD59E]'
                        : 'bg-[#C5A059]/30 hover:bg-[#C5A059]/60'
                    }`}
                    aria-label={`Jump to milestone ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#EAD59E] transition-colors py-1 px-2 rounded-lg"
              >
                <span className="hidden sm:inline">Next Chapter</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
