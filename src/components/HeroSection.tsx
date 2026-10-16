import React from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface HeroSectionProps {
  onScrollToStory: () => void;
  onScrollToFinal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToStory,
  onScrollToFinal,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-6 pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (Action) */}
      <header className="flex items-center justify-between gap-8 py-4 mb-8 border-b border-[#C5A059]/25">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          className="text-xl sm:text-2xl font-serif font-normal text-[#FAF6F0] tracking-tight whitespace-nowrap shrink-0 hover:text-[#EAD59E] transition-colors"
        >
          For My Wifey <span className="text-[#C5A059]">✦</span>
        </a>

        {/* Zone 2: Clean Nav Links (No song references) */}
        <nav
          className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#FAF6F0]/70"
          aria-label="Main Navigation"
        >
          <a
            href="#story-stack"
            className="hover:text-[#EAD59E] transition-colors whitespace-nowrap shrink-0"
          >
            The Story
          </a>
          <a
            href="#card-favourite-person"
            className="hover:text-[#EAD59E] transition-colors whitespace-nowrap shrink-0"
          >
            Memories
          </a>
          <a
            href="#card-safe-place"
            className="hover:text-[#EAD59E] transition-colors whitespace-nowrap shrink-0"
          >
            Sanctuary
          </a>
          <a
            href="#card-promise"
            className="hover:text-[#EAD59E] transition-colors whitespace-nowrap shrink-0"
          >
            Promises
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onScrollToFinal}
            className="px-5 py-2 text-[11px] font-semibold tracking-widest uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] to-[#C5A059] hover:brightness-110 rounded-full transition-all duration-200 shadow-md shadow-[#C5A059]/20 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#EAD59E]"
          >
            Final Letter
          </button>
        </div>
      </header>

      {/* Hero Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto py-4">
        {/* Left Column: Typographic composition */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
            <span className="w-8 h-px bg-[#C5A059]" aria-hidden="true" />
            <span>{loveStoryConfig.hero.editionKicker}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#FAF6F0] leading-[1.12] tracking-tight text-balance">
            {loveStoryConfig.hero.mainHeading}
          </h1>

          <p className="text-base sm:text-lg text-[#FAF6F0]/80 font-light leading-relaxed max-w-xl">
            {loveStoryConfig.hero.supportingText}
          </p>

          {/* Luxury gold callout */}
          <div className="pt-2">
            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-[#1C0D19]/80 border border-[#C5A059]/40 shadow-xl shadow-black/40 backdrop-blur-md">
              <p className="font-handwriting text-2xl sm:text-3xl text-[#EAD59E] font-medium leading-snug">
                "{loveStoryConfig.hero.handwrittenNote}"
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onScrollToStory}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] hover:shadow-lg hover:shadow-[#C5A059]/30 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#EAD59E]"
            >
              <span>Explore Our Chapters</span>
              <Heart className="w-4 h-4 text-[#0C060A] fill-[#0C060A] group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={onScrollToFinal}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] hover:text-[#EAD59E] bg-[#1A0C16] hover:bg-[#251120] border border-[#C5A059]/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Read Final Vows</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Fashion Twilight Couple Editorial Framing */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Background glowing halo */}
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#8A243E]/30 via-[#C5A059]/25 to-transparent opacity-60 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Framed Photograph Container */}
            <div className="relative rounded-3xl p-3 bg-[#1A0C16]/90 backdrop-blur-xl border border-[#C5A059]/40 shadow-2xl overflow-hidden group">
              <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#11070F] relative">
                <img
                  src={loveStoryConfig.hero.heroImageUrl}
                  alt="Romantic luxury evening twilight portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  loading="eager"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C060A]/80 via-transparent to-transparent opacity-70" />

                {/* Floating caption */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#140811]/90 backdrop-blur-md border border-[#C5A059]/30 shadow-md flex items-center justify-between">
                  <span className="text-xs font-serif italic text-[#FAF6F0] font-normal">
                    "A Little World Made Just for You"
                  </span>
                  <span className="text-[11px] font-sans font-semibold text-[#EAD59E] tracking-wider uppercase">
                    Wifey ❤️
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex flex-col items-center justify-center pt-8 text-center">
        <button
          onClick={onScrollToStory}
          className="group inline-flex flex-col items-center text-xs tracking-widest uppercase text-[#C5A059]/80 hover:text-[#EAD59E] transition-colors focus-visible:outline-2 focus-visible:outline-[#EAD59E]"
          aria-label={loveStoryConfig.hero.scrollHint}
        >
          <span className="mb-2 font-medium">{loveStoryConfig.hero.scrollHint}</span>
          <div className="w-8 h-8 rounded-full bg-[#1A0C16] border border-[#C5A059]/40 flex items-center justify-center group-hover:translate-y-1 transition-transform duration-200 shadow-xs">
            <ChevronDown className="w-4 h-4 text-[#EAD59E]" />
          </div>
        </button>
      </div>
    </section>
  );
};
