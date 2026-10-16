import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Heart,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  Gift,
  Smile,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/romanticAudio';
import { loveStoryConfig } from '../config/loveStory';

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  sweetMessage: string;
  romanticFact: string;
}

const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When the whole world feels chaotic, who does my heart call 'Home'?",
    category: "Sanctuary of Love",
    options: [
      "A peaceful quiet island",
      "Always and only you, Wifey ❤️",
      "A cozy mountain cabin",
      "A five-star luxury resort",
    ],
    correctIndex: 1,
    sweetMessage: "Exactly, my love! 'If home were a person, it would always be you.'",
    romanticFact: "My heart beats at its calmest and happiest rhythm whenever you are nearby.",
  },
  {
    id: 2,
    question: "If I could live a million parallel lifetimes, what would I choose every time?",
    category: "Eternal Vows",
    options: [
      "To travel to all outer planets",
      "To find you and choose you all over again ✨",
      "To win the biggest lottery",
      "To live forever in solitude",
    ],
    correctIndex: 1,
    sweetMessage: "100% True! Aaj, kal, aur har janam—I'd choose you every single time.",
    romanticFact: "No reality could ever be complete without your hand in mine.",
  },
  {
    id: 3,
    question: "What is your secret superpower that instantly dispels my worst mood?",
    category: "The Little Things",
    options: [
      "Your radiant smile and gentle hugs 🌸",
      "Sending me memes at 2 AM",
      "Stealing all the blankets",
      "Winning every single argument",
    ],
    correctIndex: 0,
    sweetMessage: "Spot on, Jaan! Just one look into your eyes melts away every stress.",
    romanticFact: "Science says dopamine brings joy, but your smile is pure celestial magic.",
  },
  {
    id: 4,
    question: "How long did destiny and the stars take to align our souls together?",
    category: "Cosmic Connection",
    options: [
      "Just a few weeks of planning",
      "13.8 billion years of stardust in the making 🌌",
      "A random Tuesday afternoon coincidence",
      "Three or four calendar months",
    ],
    correctIndex: 1,
    sweetMessage: "Yes! In a cosmos of infinite stars, finding you was written in destiny.",
    romanticFact: "You are my favorite miracle in the entire universe.",
  },
  {
    id: 5,
    question: "Complete our sacred lifetime promise: 'I love you, Wifey...'",
    category: "Sacred Devotion",
    options: [
      "...Only when you make tea",
      "...As long as we agree on movies",
      "...Aaj, kal, aur har janam! 💍❤️",
      "...Until next weekend",
    ],
    correctIndex: 2,
    sweetMessage: "Always and forever! 'Aaj, kal, aur har janam.'",
    romanticFact: "My love for you grows deeper with every sunrise.",
  },
  {
    id: 6,
    question: "Which of these moments with you is my ultimate luxury in life?",
    category: "Heartbeat Moments",
    options: [
      "Quietly holding hands with nowhere to rush ☕",
      "Attending fancy red-carpet galas",
      "Endless social media scrolling",
      "Buying expensive watches",
    ],
    correctIndex: 0,
    sweetMessage: "You know me so well! A quiet glance, your hand in mine—that is all the luxury I'll ever need.",
    romanticFact: "The best memories in life are the quiet ones spent laughing with you.",
  },
];

export const RomanticLoveQuiz: React.FC = () => {
  const [questions] = useState<QuizQuestion[]>(DEFAULT_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [unlockedPass, setUnlockedPass] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;

  const triggerCelebrationConfetti = () => {
    // Rich multi-directional royal gold and pink heart confetti
    const count = 45;
    confetti({
      particleCount: count,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#EAD59E', '#D4AF37', '#C2637D', '#FAF6F0'],
    });
    confetti({
      particleCount: count,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#EAD59E', '#D4AF37', '#C2637D', '#FAF6F0'],
    });

    // Audio chime feedback
    romanticAudio.playCelebrationChimes();
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      triggerCelebrationConfetti();
    } else {
      romanticAudio.playMicroSparkle();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      romanticAudio.playCrystalChime(587.33);
    } else {
      // Finished Quiz
      setShowResults(true);
      triggerGrandFinaleCelebration();
    }
  };

  const triggerGrandFinaleCelebration = () => {
    romanticAudio.playCelestialChord();
    const end = Date.now() + 2500;
    const colors = ['#EAD59E', '#D4AF37', '#C2637D', '#E295A8', '#FAF6F0'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setShowResults(false);
    setUnlockedPass(false);
    romanticAudio.playCelestialChord();
  };

  return (
    <section
      id="romantic-love-quiz"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-14"
      aria-label="Romantic Love Quiz"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="relative inline-block mb-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#C5A059] via-[#8A243E] to-[#EAD59E] flex items-center justify-center p-1 shadow-2xl animate-candle-glow mx-auto">
            <div className="w-full h-full rounded-full bg-[#160813] flex items-center justify-center border border-[#EAD59E]/40">
              <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#EAD59E]" />
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-[#EAD59E] absolute -top-1 -right-1 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#200D1C] border border-[#C5A059]/30 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-3">
          <Heart className="w-3 h-3 text-[#EAD59E] fill-[#EAD59E]" />
          <span>Interactive Soulmate Challenge</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF6F0] tracking-tight leading-tight mb-3">
          The Romantic Love Quiz
        </h2>

        <p className="text-sm sm:text-base text-[#FAF6F0]/75 font-serif italic">
          "How well do you know my heart, our unspoken promises, and our timeless memories?"
        </p>
      </div>

      {/* Main Quiz Container */}
      {!showResults ? (
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1C0D19] via-[#120710] to-[#0A0408] border-2 border-[#C5A059]/40 shadow-2xl overflow-hidden">
          {/* Top Progress & Milestone Counter */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C5A059]/20">
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] block">
                {currentQ.category}
              </span>
              <span className="text-xs text-[#FAF6F0]/70 font-medium">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
            </div>

            {/* Score tracker */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#260E21] border border-[#C5A059]/30">
              <Trophy className="w-3.5 h-3.5 text-[#EAD59E]" />
              <span className="text-xs font-semibold text-[#EAD59E]">
                Love Points: {score}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#200D1C] h-1.5 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C5A059] via-[#EAD59E] to-[#D4AF37]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-serif text-[#FAF6F0] font-normal leading-snug mb-6 text-balance">
                "{currentQ.question}"
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let buttonStyle =
                    'bg-[#190915]/90 border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:bg-[#251021] text-[#FAF6F0]/90';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      buttonStyle =
                        'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-900/30 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle =
                        'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-900/30';
                    } else {
                      buttonStyle = 'bg-[#150711]/60 border-transparent text-[#FAF6F0]/40 opacity-50';
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!isAnswerSubmitted ? { scale: 1.015 } : {}}
                      whileTap={!isAnswerSubmitted ? { scale: 0.98 } : {}}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all relative ${buttonStyle}`}
                    >
                      <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-sm sm:text-base leading-snug flex-1">{option}</span>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Celebratory Note / Explanation on submit */}
              <AnimatePresence>
                {isAnswerSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 sm:p-5 rounded-2xl bg-[#260E21] border border-[#C5A059]/40 mb-6 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      {selectedOption === currentQ.correctIndex ? (
                        <>
                          <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                            Sweet Soulmate Match! 💖
                          </span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                            Aww, almost! The answer is still pure love:
                          </span>
                        </>
                      )}
                    </div>
                    <p className="font-serif italic text-sm sm:text-base text-[#FAF6F0]">
                      "{currentQ.sweetMessage}"
                    </p>
                    <p className="text-xs text-[#FAF6F0]/65 font-sans">
                      ✦ {currentQ.romanticFact}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next / Continue Button */}
              {isAnswerSubmitted && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] shadow-lg shadow-[#C5A059]/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>{currentIndex + 1 === totalQuestions ? 'View Final Results' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4 text-[#0C060A]" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Grand Results & Golden Pass Reward */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1E0E1B] via-[#140812] to-[#0A0408] border-2 border-[#C5A059]/60 shadow-2xl text-center overflow-hidden"
        >
          {/* Medallion Trophy */}
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#C5A059] via-[#8A243E] to-[#EAD59E] flex items-center justify-center p-1 shadow-2xl animate-candle-glow mx-auto">
              <div className="w-full h-full rounded-full bg-[#180A15] flex items-center justify-center border border-[#EAD59E]/40">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-[#EAD59E]" />
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-[#EAD59E] absolute top-0 right-1/3 animate-spin" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-2">
            Soulmate Test Results
          </p>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FAF6F0] mb-3">
            {score === totalQuestions
              ? 'Flawless 100% Soulmate Connection! 👑'
              : 'Endlessly Cherished & Adored! ❤️'}
          </h3>

          <p className="font-serif italic text-lg sm:text-xl text-[#FAF6F0]/85 max-w-xl mx-auto mb-6">
            "You scored <span className="text-[#EAD59E] font-bold">{score}/{totalQuestions}</span>. But even if you scored zero, you would still hold 100% of my heart forever."
          </p>

          {/* Interactive Golden Pass Claim */}
          <div className="my-8 max-w-lg mx-auto">
            {!unlockedPass ? (
              <button
                onClick={() => {
                  setUnlockedPass(true);
                  triggerCelebrationConfetti();
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] shadow-xl shadow-[#C5A059]/40 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
              >
                <Gift className="w-4 h-4 text-[#0C060A] group-hover:rotate-12 transition-transform" />
                <span>Claim Your Golden Couple's Pass 🎟️</span>
                <Heart className="w-4 h-4 text-[#0C060A] fill-[#0C060A]" />
              </button>
            ) : (
              /* Revealed Golden Voucher */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gradient-to-r from-[#291324] via-[#1C0B18] to-[#291324] border-2 border-dashed border-[#C5A059] shadow-2xl relative text-center"
              >
                <div className="absolute top-2 right-3 text-[10px] uppercase font-bold tracking-widest text-[#EAD59E] bg-[#C5A059]/20 px-2.5 py-0.5 rounded-full border border-[#C5A059]/30">
                  LIFETIME VALIDITY
                </div>

                <div className="flex items-center justify-center gap-2 mb-2 text-[#EAD59E]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-widest">
                    OFFICIAL ROYAL VOUCHER
                  </span>
                  <Sparkles className="w-4 h-4" />
                </div>

                <h4 className="font-serif text-xl sm:text-2xl text-[#FAF6F0] font-bold mb-2">
                  Unlimited Forehead Kisses & Warm Chai Pass ☕💖
                </h4>

                <p className="font-serif italic text-sm text-[#FAF6F0]/80 mb-4">
                  "Redeemable at any hour of any day for tight hugs, unconditional listening, head massages, and unlimited cups of fresh cardamom chai."
                </p>

                <div className="text-[11px] text-[#C5A059] tracking-wider uppercase font-medium border-t border-[#C5A059]/20 pt-3 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#EAD59E]" />
                  <span>Signed by Your Devoted Husband · Non-Transferable ❤️</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FAF6F0]/80 hover:text-[#FAF6F0] bg-[#230D1F] hover:bg-[#30132B] border border-[#C5A059]/30 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#EAD59E]" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};
