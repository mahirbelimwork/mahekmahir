import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Feather,
  Heart,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  FastForward,
  Share2,
  BookMarked,
  X,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoogleGenAI } from '@google/genai';
import { romanticAudio } from '../utils/romanticAudio';

type AffirmationTone = 'destiny' | 'devotion' | 'gratitude' | 'vows' | 'shayari' | 'midnight';

interface ToneOption {
  id: AffirmationTone;
  label: string;
  emoji: string;
  desc: string;
}

const TONES: ToneOption[] = [
  {
    id: 'destiny',
    label: 'Cosmic Destiny',
    emoji: '🌌',
    desc: 'Written in the constellations across all universes',
  },
  {
    id: 'devotion',
    label: 'Tender Devotion',
    emoji: '🕊️',
    desc: 'Soft, delicate vows of everyday adoration',
  },
  {
    id: 'gratitude',
    label: 'Daily Gratitude',
    emoji: '✨',
    desc: 'Cherishing her laughter, warmth, and gentle touch',
  },
  {
    id: 'vows',
    label: 'Eternal Vows',
    emoji: '💍',
    desc: 'Unwavering promise of lifetime loyalty and protection',
  },
  {
    id: 'shayari',
    label: 'Poetic Shayari',
    emoji: '🌹',
    desc: 'Profound Hindi & Urdu couplets of royal romance',
  },
  {
    id: 'midnight',
    label: 'Midnight Whispers',
    emoji: '🌙',
    desc: 'Intimate, quiet confessions under the moonlit sky',
  },
];

const PRESET_NICKNAMES = ['My Beloved Wife', 'Wifey', 'Meri Jaan', 'My Queen', 'My Sweet Angel'];

// Extensive curated romantic affirmations library (guarantees infinite delight even offline)
const CURATED_AFFIRMATIONS: Record<AffirmationTone, string[]> = {
  destiny: [
    "Before time had a name and before the stars lit the heavens, my soul was already searching for yours. In a galaxy of eight billion people, finding you wasn't just serendipity—it was destiny keeping its sacred promise.",
    "If the universe offered me a million lifetimes in a million parallel worlds, I would walk every single path until I arrived at your door again. You are my only home in this vast cosmos.",
    "You are the poem God wrote into the sky when He decided the earth needed something breathtaking. Meeting you, marrying you, loving you—it is the highest blessing of my existence.",
    "Some people spend their entire lives searching for proof of magic. All I ever have to do is hold your hand, look into your eyes, and feel the sacred gravity between our hearts.",
  ],
  devotion: [
    "To love you is the easiest, most natural rhythm of my life. Just as the tide answers the moon, my thoughts gravitate toward your smile with every breath I take.",
    "Every ordinary moment becomes sacred when shared with you. The morning sunlight feels warmer, the quiet evening feels sweeter, and the world feels safer when you are by my side.",
    "My heart is permanently anchored to the cadence of your voice. When you laugh, every worry dissolves into thin air. You are my sanctuary and my deepest peace.",
    "I love you not only for who you are, but for the gentle, tender kindness you bring into every room you enter. You make our home feel like paradise on earth.",
  ],
  gratitude: [
    "Thank you for being my constant light on cloudy days. Your patience, your caring gestures, and the warmth of your embrace make every struggle worth fighting for.",
    "I am grateful for the little things that belong only to us—the shared glances across a crowded room, the steaming cups of tea, and the sweet way you rest your head on my shoulder.",
    "You have given me a life richer and more colorful than any dream I could have dreamed as a boy. Having you as my wife is the greatest privilege of my lifetime.",
    "Thank you for loving me with all my flaws and making me want to become the best husband in the world. You are my greatest inspiration.",
  ],
  vows: [
    "I vow to choose you every morning when I open my eyes, and every evening before I sleep. Through sunny valleys and stormy winters, my hand will remain forever clasped in yours.",
    "My promise to you does not waver with time or age. In twenty years, fifty years, or across eternity, I will still look at you with the exact same awe and reverence I hold right now.",
    "I promise to be your safest shelter, your loudest cheerleader, your most attentive listener, and your forever partner through every chapter our story writes.",
    "No matter what tomorrow brings, know with absolute certainty: you will never walk alone. My loyalty, my heart, and my life belong irrevocably to you.",
  ],
  shayari: [
    "तेरी मुस्कान से रोशन है मेरा सारा जहाँ,\nतू जो पास हो तो फिर किस बात का डर यहाँ?\nलोग ढूँढते हैं जन्नत को किताबों में कहीं,\nमेरा सुकून तो बस तेरे कदमों के निशाँ में है। 🌹",
    "कागज़ पे क्या लिखूँ तेरी पाकीज़ा मोहब्बत को,\nमेरी आँखों में जो ठहरा है वो सारा जहाँ तुम्हारा है।\nखुदा करे कि उम्र का हर एक लम्हा बस तेरे साथ गुजरे, मेरी शरीक-ए-हयात। ❤️",
    "हज़ार बार देखा है मैंने तुझे मुड़कर,\nमगर हर बार लगता है पहली नज़र सा सुकून।\nतुम सिर्फ़ मेरी शरीक-ए-हयात नहीं हो,\nमेरी हर सांस, हर दुआ का इकलौता मक़सद हो। ✨",
    "तू मेरी ज़िंदगी का वो खूबसूरत फैसला है,\nजिस पर मुझे हर रोज़, हर लम्हा नाज़ होता है।\nखुदा सलामत रखे हमारी इस मोहब्बत को हमेशा। 💍",
  ],
  midnight: [
    "When the world falls into silent sleep, my mind wanders back to the soft warmth of your breath against my neck. There is no palace on earth as peaceful as lying beside you under the quiet stars.",
    "In the stillness of the midnight hour, I whisper a prayer of gratitude to the heavens for blessing me with a wife as pure-hearted and radiant as you. Sleep peacefully, my love.",
    "The night is quiet, but my heart is loud with thoughts of you. Even in my dreams, I find myself seeking your hand. Goodnight, my forever angel.",
    "Underneath this vast canvas of moonlight, know that every beat of my heart beats only your name. You are my beginning, my middle, and my never-ending love story.",
  ],
};

interface SavedLetter {
  id: string;
  recipient: string;
  tone: string;
  text: string;
  timestamp: string;
}

export const InfiniteLoveLetterGenerator: React.FC = () => {
  const [recipient, setRecipient] = useState<string>('My Beloved Wife');
  const [selectedTone, setSelectedTone] = useState<AffirmationTone>('destiny');
  const [personalFocus, setPersonalFocus] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [letterCount, setLetterCount] = useState<number>(1);
  const [fullLetterText, setFullLetterText] = useState<string>('');
  const [typedLetterText, setTypedLetterText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [savedLetters, setSavedLetters] = useState<SavedLetter[]>([]);
  const [showKeepsakesModal, setShowKeepsakesModal] = useState<boolean>(false);
  const [letterKey, setLetterKey] = useState<number>(0);

  const typewriterTimerRef = useRef<number | null>(null);

  // Load saved letters from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('romantic_keepsake_letters');
      if (stored) {
        setSavedLetters(JSON.parse(stored));
      }
    } catch {
      // Ignored
    }

    // Set initial default letter
    const initialText = CURATED_AFFIRMATIONS.destiny[0];
    setFullLetterText(initialText);
    setTypedLetterText(initialText);
  }, []);

  // Save to localStorage whenever savedLetters changes
  const saveLetterToKeepsakes = () => {
    if (!fullLetterText || isSaved) return;

    const newLetter: SavedLetter = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      recipient: recipient.trim() || 'My Beloved Wife',
      tone: TONES.find((t) => t.id === selectedTone)?.label || 'Cosmic Destiny',
      text: fullLetterText,
      timestamp: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newLetter, ...savedLetters];
    setSavedLetters(updated);
    setIsSaved(true);
    try {
      localStorage.setItem('romantic_keepsake_letters', JSON.stringify(updated));
    } catch {
      // Ignored
    }

    romanticAudio.playCelebrationChimes();
  };

  const removeSavedLetter = (id: string) => {
    const updated = savedLetters.filter((item) => item.id !== id);
    setSavedLetters(updated);
    try {
      localStorage.setItem('romantic_keepsake_letters', JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  // Typewriter Engine
  const startTypewriter = (text: string) => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
    }

    setIsTyping(true);
    setTypedLetterText('');
    let currentIdx = 0;

    typewriterTimerRef.current = window.setInterval(() => {
      // Increment 1 to 2 chars at a time for organic feel
      currentIdx += 2;
      const slice = text.slice(0, currentIdx);
      setTypedLetterText(slice);

      if (soundEnabled && currentIdx % 6 === 0) {
        romanticAudio.playTypewriterTap();
      }

      if (currentIdx >= text.length) {
        if (typewriterTimerRef.current) {
          clearInterval(typewriterTimerRef.current);
        }
        setIsTyping(false);
        if (soundEnabled) {
          romanticAudio.playMicroSparkle();
        }
      }
    }, 28);
  };

  // Instant skip / finish typewriter
  const handleInstantReveal = () => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
    }
    setTypedLetterText(fullLetterText);
    setIsTyping(false);
  };

  // Generate Action (via Gemini API with seamless offline fallback)
  const handleGenerateLetter = async () => {
    setIsGenerating(true);
    setIsSaved(false);
    setCopied(false);
    romanticAudio.playCelestialChord();

    // Small celebratory confetti
    confetti({
      particleCount: 25,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#EAD59E', '#D4AF37', '#C2637D', '#FAF6F0'],
      disableForReducedMotion: true,
    });

    const activeTone = TONES.find((t) => t.id === selectedTone);
    const toneTitle = activeTone?.label || 'Romantic';
    const targetRecipient = recipient.trim() || 'My Beloved Wife';
    const apiKey = process.env.GEMINI_API_KEY;

    let generatedResult = '';

    // Attempt Gemini Generation
    if (apiKey && apiKey.length > 5) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const focusPrompt = personalFocus.trim()
          ? `Incorporate this personal sentiment or memory: "${personalFocus.trim()}".`
          : `Create a timeless, romantic affirmation.`;

        const systemPrompt = `
You are writing a deeply heartfelt, poetic, luxurious love affirmation letter from a devoted husband to his wife.
Recipient Name / Addressed To: "${targetRecipient}".
Theme: ${toneTitle} - ${activeTone?.desc}.
${focusPrompt}

Rules:
1. Write 2 to 4 deeply moving, exquisite sentences (or if Poetic Shayari is selected, write 2 to 4 authentic Hindi/Urdu couplets).
2. Tone: Royal, timeless, genuine, profoundly tender, and romantic. No corporate or robotic phrasing.
3. Address her warmly with her title/name: "${targetRecipient}".
4. Conclude naturally with unconditional love.
5. Do not include salutations like "Dear..." or "Sincerely..." in the body text itself, just the poetic content.
        `.trim();

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: systemPrompt,
          config: {
            temperature: 0.88,
          },
        });

        const textOutput = response.text?.trim();
        if (textOutput && textOutput.length > 20) {
          generatedResult = textOutput;
        }
      } catch {
        // Fallback gracefully below
      }
    }

    // High Quality Curated Fallback
    if (!generatedResult) {
      const list = CURATED_AFFIRMATIONS[selectedTone];
      const randomIdx = Math.floor(Math.random() * list.length);
      generatedResult = list[randomIdx];
    }

    setFullLetterText(generatedResult);
    setLetterCount((prev) => prev + 1);
    setLetterKey((prev) => prev + 1);
    setIsGenerating(false);

    // Trigger Typewriter
    startTypewriter(generatedResult);
  };

  const handleCopy = () => {
    if (!fullLetterText) return;
    const shareMessage = `💌 To ${recipient}:\n\n"${fullLetterText}"\n\n— Forever & Always Yours ❤️`;
    navigator.clipboard.writeText(shareMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
      romanticAudio.playMicroSparkle();
    });
  };

  const triggerHeartShower = () => {
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#EAD59E', '#D4AF37', '#C2637D', '#E295A8'],
      shapes: ['circle'],
    });
    romanticAudio.playCelebrationChimes();
  };

  return (
    <section
      id="love-letter-generator"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-14"
      aria-label="Infinite Love Letter Generator"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Medallion */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="relative inline-block mb-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#C5A059] via-[#8A243E] to-[#EAD59E] flex items-center justify-center p-1 shadow-2xl animate-candle-glow mx-auto">
            <div className="w-full h-full rounded-full bg-[#160813] flex items-center justify-center border border-[#EAD59E]/40">
              <Feather className="w-6 h-6 sm:w-7 sm:h-7 text-[#EAD59E]" />
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-[#EAD59E] absolute -top-1 -right-1 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#200D1C] border border-[#C5A059]/30 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-3">
          <Sparkles className="w-3 h-3 text-[#EAD59E]" />
          <span>AI-Powered Romantic Affirmations</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF6F0] tracking-tight leading-tight mb-3">
          Infinite Love Letter Generator
        </h2>

        <p className="text-sm sm:text-base text-[#FAF6F0]/75 font-serif italic max-w-2xl mx-auto">
          "Every word written into the stars, crafted exclusively for the queen of my heart."
        </p>
      </div>

      {/* Control Panel: Personalization & Mood Selection */}
      <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#170914]/80 border border-[#C5A059]/30 backdrop-blur-md shadow-2xl mb-8 space-y-6">
        {/* Recipient Personalization */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#EAD59E] mb-2">
            Addressed To:
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {PRESET_NICKNAMES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setRecipient(name)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  recipient === name
                    ? 'bg-[#C5A059] text-[#0C060A] font-semibold shadow-md shadow-[#C5A059]/30'
                    : 'bg-[#220E1E] text-[#FAF6F0]/70 hover:text-[#FAF6F0] hover:bg-[#2F142A] border border-[#C5A059]/20'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Or enter a custom name..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D050B]/90 border border-[#C5A059]/30 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/30 focus:outline-none focus:border-[#EAD59E] transition-colors"
          />
        </div>

        {/* Affirmation Tone Grid */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#EAD59E] mb-2.5">
            Select Tone of Affirmation:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {TONES.map((tone) => {
              const isSelected = selectedTone === tone.id;
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setSelectedTone(tone.id)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#2D1225] to-[#1C0917] border-[#C5A059] shadow-lg shadow-[#C5A059]/20 scale-[1.02]'
                      : 'bg-[#120710]/70 border-[#C5A059]/20 hover:border-[#C5A059]/40 hover:bg-[#1A0B17]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{tone.emoji}</span>
                    <span
                      className={`text-xs font-semibold tracking-wide ${
                        isSelected ? 'text-[#EAD59E]' : 'text-[#FAF6F0]/80'
                      }`}
                    >
                      {tone.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#FAF6F0]/60 line-clamp-1">{tone.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Focus / Memory Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#EAD59E] mb-2">
            Special Thought or Memory (Optional):
          </label>
          <input
            type="text"
            value={personalFocus}
            onChange={(e) => setPersonalFocus(e.target.value)}
            placeholder="e.g., her contagious laugh, our late night conversations, rainy evening tea..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#0D050B]/90 border border-[#C5A059]/30 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/30 focus:outline-none focus:border-[#EAD59E] transition-colors"
          />
        </div>

        {/* Generate Button & Secondary Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleGenerateLetter}
            disabled={isGenerating}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] shadow-xl shadow-[#C5A059]/30 hover:shadow-2xl hover:shadow-[#C5A059]/50 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 text-[#0C060A] animate-spin" />
                <span>Crafting Love Note...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#0C060A] group-hover:rotate-45 transition-transform" />
                <span>Generate Love Letter #{letterCount}</span>
                <Heart className="w-4 h-4 text-[#0C060A] fill-[#0C060A] group-hover:scale-125 transition-transform" />
              </>
            )}
          </button>

          {/* Quick Settings & Keepsake Box Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full bg-[#200D1C] border border-[#C5A059]/30 text-[#EAD59E] hover:bg-[#2E1328] transition-colors"
              title={soundEnabled ? 'Mute typewriter sound' : 'Enable typewriter sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setShowKeepsakesModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#200D1C] border border-[#C5A059]/30 text-xs font-medium text-[#EAD59E] hover:bg-[#2E1328] transition-colors"
            >
              <BookMarked className="w-4 h-4 text-[#EAD59E]" />
              <span>Keepsake Box</span>
              {savedLetters.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#C5A059] text-[#0C060A] text-[10px] font-bold">
                  {savedLetters.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* The Love Letter Display: Vintage Obsidian & Gold Parchment */}
      <div className="relative">
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1C0D19] via-[#120710] to-[#0A0408] border-2 border-[#C5A059]/50 shadow-2xl overflow-hidden">
          {/* Subtle gold foil border shimmer */}
          <div className="absolute inset-0 border border-[#EAD59E]/20 rounded-3xl pointer-events-none" />

          {/* Wax Seal Stamp (Top Right Corner) */}
          <div className="absolute top-5 sm:top-7 right-5 sm:right-7 flex items-center justify-center">
            <div
              onClick={triggerHeartShower}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#B32043] via-[#851631] to-[#540D1E] border-2 border-[#EAD59E]/60 shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform group"
              title="Click to shower hearts"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAF6F0] fill-[#FAF6F0]/80 group-hover:scale-125 transition-transform" />
              <span className="text-[7px] font-bold uppercase tracking-widest text-[#EAD59E] -mt-0.5">
                SEALED
              </span>
            </div>
          </div>

          {/* Letter Header */}
          <div className="mb-6 sm:mb-8 pr-14">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-1">
              {TONES.find((t) => t.id === selectedTone)?.label} Affirmation
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#FAF6F0] font-normal">
              Dear {recipient.trim() || 'My Beloved Wife'},
            </h3>
          </div>

          {/* Letter Body with Live Typewriter Animation */}
          <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center my-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={letterKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <p className="font-serif text-lg sm:text-2xl lg:text-3xl text-[#FAF6F0] font-normal leading-relaxed tracking-wide whitespace-pre-line text-balance">
                  {typedLetterText}
                  {isTyping && (
                    <span className="inline-block w-2.5 h-6 sm:h-7 bg-[#EAD59E] ml-1.5 animate-pulse align-middle" />
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Instant Reveal Helper (shown during typing) */}
          {isTyping && (
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleInstantReveal}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A1125] text-[11px] text-[#EAD59E] hover:bg-[#381631] transition-colors border border-[#C5A059]/20"
              >
                <FastForward className="w-3 h-3 text-[#EAD59E]" />
                <span>Instant Reveal</span>
              </button>
            </div>
          )}

          {/* Letter Footer Signature */}
          <div className="pt-6 sm:pt-8 border-t border-[#C5A059]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/70 font-serif italic">
                Forever & unreservedly yours,
              </p>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#EAD59E] font-bold mt-1">
                With all my heart ❤️
              </p>
            </div>

            {/* Letter Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FAF6F0] bg-[#240E20] hover:bg-[#33142D] border border-[#C5A059]/40 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied! 💌</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#EAD59E]" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>

              {/* Save to Keepsakes */}
              <button
                type="button"
                onClick={saveLetterToKeepsakes}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FAF6F0] bg-[#240E20] hover:bg-[#33142D] border border-[#C5A059]/40 transition-colors shadow-sm"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-[#EAD59E]" />
                    <span className="text-[#EAD59E]">Saved in Box</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-[#EAD59E]" />
                    <span>Save Note</span>
                  </>
                )}
              </button>

              {/* Heart Confetti Shower */}
              <button
                type="button"
                onClick={triggerHeartShower}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] to-[#C5A059] hover:brightness-110 transition-all shadow-sm"
                title="Shower with hearts"
              >
                <Heart className="w-3.5 h-3.5 fill-[#0C060A]" />
                <span className="hidden sm:inline">Kiss</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keepsakes Modal / Drawer */}
      <AnimatePresence>
        {showKeepsakesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#180A15] border-2 border-[#C5A059]/50 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/30">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-full bg-[#C5A059]/20 text-[#EAD59E]">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-[#FAF6F0]">
                      Love Letter Keepsake Box
                    </h3>
                    <p className="text-xs text-[#FAF6F0]/60">
                      {savedLetters.length} preserved love {savedLetters.length === 1 ? 'letter' : 'letters'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowKeepsakesModal(false)}
                  className="p-2 rounded-full bg-[#261022] text-[#FAF6F0]/70 hover:text-[#FAF6F0] hover:bg-[#34162E] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Letters List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {savedLetters.length === 0 ? (
                  <div className="text-center py-12 text-[#FAF6F0]/50 space-y-2">
                    <Heart className="w-10 h-10 mx-auto text-[#C5A059]/40" />
                    <p className="text-sm font-serif">Your Keepsake Box is empty.</p>
                    <p className="text-xs">
                      Click "Save Note" on any generated letter to preserve it forever.
                    </p>
                  </div>
                ) : (
                  savedLetters.map((letter) => (
                    <div
                      key={letter.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#210D1D]/90 border border-[#C5A059]/30 hover:border-[#C5A059]/60 transition-colors relative group"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#C5A059] mb-2 font-medium">
                        <span className="uppercase tracking-wider">
                          To {letter.recipient} · {letter.tone}
                        </span>
                        <span>{letter.timestamp}</span>
                      </div>
                      <p className="font-serif text-sm sm:text-base text-[#FAF6F0]/90 leading-relaxed whitespace-pre-line">
                        "{letter.text}"
                      </p>
                      <div className="mt-3 pt-2 border-t border-[#C5A059]/20 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(letter.text);
                            romanticAudio.playMicroSparkle();
                          }}
                          className="inline-flex items-center gap-1 text-xs text-[#EAD59E] hover:underline"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeSavedLetter(letter.id)}
                          className="text-rose-400/70 hover:text-rose-400 p-1 transition-colors"
                          title="Remove from Keepsake Box"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Close Button */}
              <div className="pt-3 border-t border-[#C5A059]/30 text-right">
                <button
                  type="button"
                  onClick={() => setShowKeepsakesModal(false)}
                  className="px-5 py-2 rounded-full bg-[#C5A059] text-[#0C060A] text-xs font-semibold tracking-wider uppercase hover:bg-[#EAD59E] transition-colors"
                >
                  Close Box
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
