import React, { useState } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { BioluminescentSparkleTrail } from './components/BioluminescentSparkleTrail';
import { IntroOverlay } from './components/IntroOverlay';
import { HeroSection } from './components/HeroSection';
import { ThreeDHeartSanctuary } from './components/ThreeDHeartSanctuary';
import { BiometricLoveSync } from './components/BiometricLoveSync';
import { QuantumLoveChronometer } from './components/QuantumLoveChronometer';
import { InfiniteLoveLetterGenerator } from './components/InfiniteLoveLetterGenerator';
import { AISoulmateWhisperer } from './components/AISoulmateWhisperer';
import { RomanticLoveQuiz } from './components/RomanticLoveQuiz';
import { RelationshipTimeline } from './components/RelationshipTimeline';
import { StoryCardsStack } from './components/StoryCardsStack';
import { HeartRainOverlay } from './components/HeartRainOverlay';
import { Heart, CloudRain, Orbit, Activity, Clock, Feather, Bot, HelpCircle, BookOpen } from 'lucide-react';
import { loveStoryConfig } from './config/loveStory';

export const App: React.FC = () => {
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [heartRainCount, setHeartRainCount] = useState(0);
  const [heartRainToast, setHeartRainToast] = useState(false);

  const handleOpenIntro = () => {
    setIsIntroOpen(false);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsIntroOpen(true);
    }, 400);
  };

  const handleScrollToStory = () => {
    const el = document.getElementById('story-stack');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToFinal = () => {
    const el = document.getElementById('card-final-letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerHeartRain = () => {
    setHeartRainCount((prev) => prev + 1);
    setHeartRainToast(true);
    setTimeout(() => setHeartRainToast(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#0C060A] text-[#FAF6F0] selection:bg-[#C5A059] selection:text-[#0C060A] overflow-x-hidden">
      {/* Background ambient lighting */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(138, 36, 62, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(197, 160, 89, 0.15) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* Floating golden stardust & rose petals */}
      <FloatingPetals count={22} active={true} />

      {/* Interactive Bioluminescent Touch & Sparkle Trails */}
      <BioluminescentSparkleTrail />

      {/* Screen-Wide Luxury Heart Rain Animation */}
      <HeartRainOverlay rainCount={heartRainCount} />

      {/* Opening Wax-Sealed Intro Overlay */}
      <IntroOverlay
        isOpen={isIntroOpen}
        onOpen={handleOpenIntro}
      />

      {/* Floating Quick Navigation Dock */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full bg-[#180A15]/90 border border-[#C5A059]/40 backdrop-blur-xl shadow-2xl flex items-center gap-1 sm:gap-2 max-w-[95vw] overflow-x-auto"
        aria-label="Quick Experience Navigation"
      >
        <a
          href="#3d-heart-sanctuary"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="3D Heart & Particle Morphing"
        >
          <Orbit className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span className="hidden sm:inline">3D Heart</span>
        </a>

        <a
          href="#biometric-sync"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="Biometric Heart Sync"
        >
          <Activity className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span className="hidden sm:inline">Heart Sync</span>
        </a>

        <a
          href="#love-chronometer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="Live Love Clock"
        >
          <Clock className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span className="hidden sm:inline">Love Clock</span>
        </a>

        <a
          href="#love-letter-generator"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="Infinite Love Letter Generator"
        >
          <Feather className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span className="hidden sm:inline">Letters</span>
        </a>

        <a
          href="#ai-love-oracle"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="AI Love Oracle"
        >
          <Bot className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span className="hidden sm:inline">AI Oracle</span>
        </a>

        <a
          href="#romantic-love-quiz"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="Romantic Love Quiz"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span className="hidden sm:inline">Quiz</span>
        </a>

        <a
          href="#relationship-timeline"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="Milestone Timeline"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span className="hidden sm:inline">Timeline</span>
        </a>

        <a
          href="#story-stack"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#C5A059]/20 transition-colors whitespace-nowrap"
          title="Our Love Story"
        >
          <Heart className="w-3.5 h-3.5 text-[#C2284E] fill-[#C2284E]" />
          <span className="hidden sm:inline">Our Story</span>
        </a>
      </nav>

      {/* Main Content Area */}
      <div id="top" className="relative z-10 pb-16">
        {/* Hero Section */}
        <HeroSection
          onScrollToStory={handleScrollToStory}
          onScrollToFinal={handleScrollToFinal}
        />

        {/* 1. Interactive 3D WebGL Crystal Heart Sanctuary with Real-Time Particle Morphing */}
        <ThreeDHeartSanctuary />

        {/* 2. Biometric Heartbeat Synchronization & Haptic Love Resonance Scanner */}
        <BiometricLoveSync />

        {/* 3. Quantum Love Chronometer (Live Millisecond Precision Clock & Eternity Metrics) */}
        <QuantumLoveChronometer />

        {/* 4. Infinite Love Letter Generator (AI-Inspired Romantic Affirmations with Typewriter Animation) */}
        <InfiniteLoveLetterGenerator />

        {/* 5. Gemini AI Soulmate Love Oracle & Poetry Whisperer */}
        <AISoulmateWhisperer />

        {/* 6. Romantic Love Quiz (Milestones & Memories Challenge) */}
        <RomanticLoveQuiz />

        {/* 7. Horizontal Interactive Timeline */}
        <RelationshipTimeline milestones={loveStoryConfig.milestones} />

        {/* 6. Stacked Cinematic Cards Section (Chapters 1 - 7 + Final Love Letter) */}
        <StoryCardsStack onReplay={handleReplay} />

        {/* Romantic Luxury Footer with Heart Rain Button */}
        <footer className="relative py-12 sm:py-16 px-4 sm:px-6 border-t border-[#C5A059]/25 text-center max-w-5xl mx-auto mb-10 sm:mb-16 space-y-5 sm:space-y-6">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FAF6F0] px-2">
            "{loveStoryConfig.meta.siteTitle}"
          </p>

          {/* Heart Rain Effect Button */}
          <div className="flex flex-col items-center justify-center gap-2 pt-1 w-full">
            <button
              onClick={triggerHeartRain}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] shadow-xl shadow-[#C5A059]/25 hover:shadow-2xl hover:shadow-[#C5A059]/40 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-[#EAD59E]"
              aria-label="Make it rain hearts across the screen"
            >
              <CloudRain className="w-4 h-4 text-[#0C060A] group-hover:-translate-y-0.5 transition-transform shrink-0" />
              <span>Heart Rain Effect</span>
              <Heart className="w-4 h-4 text-[#0C060A] fill-[#0C060A] group-hover:scale-125 transition-transform shrink-0" />
            </button>

            {/* Micro Toast Feedback */}
            <p
              className={`text-sm font-handwriting text-xl sm:text-2xl text-[#EAD59E] transition-opacity duration-300 ${
                heartRainToast ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Raining golden love on you, Wifey! 💖
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#C5A059]/70 font-light tracking-wider flex-wrap">
            <span>Always Yours</span>
            <span aria-hidden="true">✦</span>
            <span>Made with all my heart</span>
            <span aria-hidden="true">✦</span>
            <span>Every single day</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
