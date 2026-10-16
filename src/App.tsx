import React, { useState } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { IntroOverlay } from './components/IntroOverlay';
import { HeroSection } from './components/HeroSection';
import { StoryCardsStack } from './components/StoryCardsStack';
import { HeartRainOverlay } from './components/HeartRainOverlay';
import { Heart, CloudRain, Sparkles } from 'lucide-react';
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
    <div className="relative min-h-screen bg-[#0C060A] text-[#FAF6F0] selection:bg-[#C5A059] selection:text-[#0C060A]">
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
      <FloatingPetals count={26} active={true} />

      {/* Screen-Wide Luxury Heart Rain Animation */}
      <HeartRainOverlay rainCount={heartRainCount} />

      {/* Opening Wax-Sealed Intro Overlay */}
      <IntroOverlay
        isOpen={isIntroOpen}
        onOpen={handleOpenIntro}
      />

      {/* Main Content Area */}
      <div id="top" className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onScrollToStory={handleScrollToStory}
          onScrollToFinal={handleScrollToFinal}
        />

        {/* Stacked Cinematic Cards Section (Chapters 1 - 7) */}
        <StoryCardsStack onReplay={handleReplay} />

        {/* Quiet Romantic Luxury Footer with Heart Rain Button */}
        <footer className="relative py-16 px-6 border-t border-[#C5A059]/25 text-center max-w-5xl mx-auto mb-16 space-y-6">
          <p className="font-serif italic text-2xl text-[#FAF6F0]">
            "{loveStoryConfig.meta.siteTitle}"
          </p>

          {/* Heart Rain Effect Button */}
          <div className="flex flex-col items-center justify-center gap-2 pt-2">
            <button
              onClick={triggerHeartRain}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] shadow-xl shadow-[#C5A059]/25 hover:shadow-2xl hover:shadow-[#C5A059]/40 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#EAD59E]"
              aria-label="Make it rain hearts across the screen"
            >
              <CloudRain className="w-4 h-4 text-[#0C060A] group-hover:-translate-y-0.5 transition-transform" />
              <span>Heart Rain Effect</span>
              <Heart className="w-4 h-4 text-[#0C060A] fill-[#0C060A] group-hover:scale-125 transition-transform" />
            </button>

            {/* Micro Toast Feedback */}
            <p
              className={`text-sm font-handwriting text-2xl text-[#EAD59E] transition-opacity duration-300 ${
                heartRainToast ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Raining golden love on you, Wifey! 💖
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-xs text-[#C5A059]/70 font-light tracking-wider">
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
