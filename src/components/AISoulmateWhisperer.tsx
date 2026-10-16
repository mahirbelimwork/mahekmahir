import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Bot, Copy, Check, RefreshCw, Feather, Stars } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { romanticAudio } from '../utils/romanticAudio';

type LoveMood = 'shayari' | 'midnight' | 'soulmate' | 'playful' | 'vow';

interface MoodOption {
  id: LoveMood;
  label: string;
  emoji: string;
  description: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'shayari',
    label: 'Shayari & Ghazal',
    emoji: '🌹',
    description: 'Poetic Urdu-Hindi couplets of tender longing',
  },
  {
    id: 'midnight',
    label: 'Midnight Thoughts',
    emoji: '💌',
    description: 'Quiet, soft, heartfelt words from the soul',
  },
  {
    id: 'soulmate',
    label: 'Cosmic Soulmate',
    emoji: '✨',
    description: 'Written in the stars before time began',
  },
  {
    id: 'playful',
    label: 'Cute & Smiling',
    emoji: '🌸',
    description: 'Sweet, charming notes to make her blush',
  },
  {
    id: 'vow',
    label: 'Lifetime Vow',
    emoji: '💍',
    description: 'Unshakable devotion for all of our days',
  },
];

// Curated authentic romantic poetry for instant, graceful fallback & offline magic
const FALLBACK_NOTES: Record<LoveMood, string[]> = {
  shayari: [
    "तेरी मुस्कान से रोशन है मेरा सारा जहाँ,\nतू जो पास हो तो फिर किस बात का डर यहाँ?\nलोग ढूँढते हैं जन्नत को किताबों में कहीं,\nमेरा सुकून तो बस तेरे कदमों के निशाँ में है, Wifey। 🌹",
    "हज़ार बार देखा है मैंने तुझे मुड़कर,\nमगर हर बार लगता है पहली नज़र सा सुकून।\nतुम सिर्फ़ मेरी शरीक-ए-हयात नहीं हो,\nमेरी हर सांस, हर दुआ का इकलौता मक़सद हो। ❤️",
    "कागज़ पे क्या लिखूँ तेरी पाकीज़ा मोहब्बत को,\nमेरी आँखों में जो ठहरा है वो सारा जहाँ तुम्हारा है।\nखुदा करे कि उम्र का हर एक लम्हा बस तेरे साथ गुजरे, Wifey। 🌸",
  ],
  midnight: [
    "When the world falls quiet and the stars take over the sky, all my thoughts drift back to you. In a crowded, loud universe, your voice is the only melody that brings stillness to my heart. Goodnight, my beautiful Wifey. 🌙",
    "If I had the power to freeze just one moment in eternity, it would be that quiet breath right before you fall asleep, holding my hand, knowing you are safe and cherished forever. 💌",
    "You don't just share my life, Wifey; you make it worth living. Every corner of my tomorrow belongs to you. ❤️",
  ],
  soulmate: [
    "The universe spent 13.8 billion years crafting galaxies and stardust, only so that two wandering souls could collide at the exact right moment on this planet. You are not an accident, Wifey—you are my predetermined destiny. ✨",
    "Across every lifetime, across every parallel dimension, my soul would still recognize the light in your eyes. You are my home, my anchor, and my forever. 🪐",
    "Some people search their whole lives for a miracle. I just look across the dinner table at you. 💖",
  ],
  playful: [
    "Dear Wifey, science says caffeine gives energy, but honestly, just one smile from you gives me enough dopamine to power an entire city! (Also, you look ridiculously gorgeous today). 🥰",
    "I was going to write a serious intellectual poem, but then I remembered your cute laugh when you steal my hoodies, and now all I can think about is making you chai and giving you forehead kisses! ☕",
    "Quick question, Wifey: Is it legal to look this stunning every single day, or do I need to report you for stealing my breath on a daily basis? 🌸",
  ],
  vow: [
    "I promise to love you when the days are golden and warm, and to love you even tighter when the storm clouds gather. Through every wrinkle, every grey hair, every laugh line—my hand is in yours for the entire journey. 💍",
    "Before God, before the stars, and in the quiet sanctuary of my own soul: I choose you today, I will choose you tomorrow, and I will choose you in every lifetime after this. Forever yours, Wifey. 🤍",
    "My vow to you isn't just words spoken once. It is in the tea I brew for you, the umbrella I hold over you, and the way I look at you when you think nobody is watching. ❤️",
  ],
};

export const AISoulmateWhisperer: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<LoveMood>('shayari');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize with a default heartfelt shayari on first load
  useEffect(() => {
    const initial = FALLBACK_NOTES.shayari[0];
    setGeneratedText(initial);
    setDisplayText(initial);
  }, []);

  // Smooth typewriter reveal effect
  useEffect(() => {
    if (!generatedText) return;
    let idx = 0;
    setDisplayText('');

    const interval = window.setInterval(() => {
      idx += 2; // type 2 chars at a time for elegant speed
      setDisplayText(generatedText.slice(0, idx));
      if (idx % 8 === 0) {
        romanticAudio.playMicroSparkle();
      }
      if (idx >= generatedText.length) {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [generatedText]);

  const handleGenerate = async () => {
    setIsLoading(true);
    romanticAudio.playCelestialChord();

    const moodObj = MOODS.find((m) => m.id === selectedMood);
    const moodName = moodObj?.label || 'Romantic';
    const apiKey = process.env.GEMINI_API_KEY;

    try {
      if (apiKey && apiKey.length > 5) {
        const ai = new GoogleGenAI({ apiKey });
        const promptTopic = customPrompt.trim()
          ? `Focus on this special thought or memory: "${customPrompt.trim()}".`
          : `Write something uniquely tailored for my Wifey.`;

        const userPrompt = `
You are writing a deeply heartfelt, premium romantic love message from a devoted husband to his beloved wife (called "Wifey").
Style / Theme: ${moodName} (${moodObj?.description}).
${promptTopic}
Guidelines:
- Tone: Extremely romantic, elegant, poetic, authentic, deeply emotional, warm.
- Length: 2 to 4 beautiful sentences or couplets.
- If Shayari is selected, write authentic, meaningful Hindi/Urdu poetry with high poetic grace.
- Use emojis tastefully (🌹, ❤️, ✨).
- Address her lovingly as "Wifey" or "Meri Jaan".
        `.trim();

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            temperature: 0.85,
          },
        });

        const output = response.text?.trim();
        if (output && output.length > 10) {
          setGeneratedText(output);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // In case of network glitch or missing key, seamlessly fallback
    }

    // High quality offline fallback
    const fallbackList = FALLBACK_NOTES[selectedMood];
    const randomPick = fallbackList[Math.floor(Math.random() * fallbackList.length)];
    setGeneratedText(randomPick);
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!displayText) return;
    navigator.clipboard.writeText(displayText);
    setCopied(true);
    romanticAudio.playCrystalChime(880);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="ai-love-oracle"
      className="relative max-w-5xl mx-auto px-3.5 sm:px-6 py-12 sm:py-16 my-4 text-center"
      aria-label="AI Soulmate Love Oracle"
    >
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
          <Bot className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span>Gemini Intelligence · Soulmate Whisperer</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#FAF6F0] tracking-tight">
          AI Love Oracle for Wifey
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF6F0]/75 font-light leading-relaxed max-w-lg mx-auto">
          Harnessing the intelligence of the stars to express the infinite depths of love that words often fail to capture.
        </p>
      </div>

      {/* Main Console Box */}
      <div className="relative mx-auto max-w-3xl rounded-3xl luxury-editorial-card-elevated border border-[#C5A059]/40 shadow-2xl p-5 sm:p-8 md:p-10 bg-gradient-to-b from-[#180B15]/95 via-[#10060D] to-[#0A0408]">
        {/* Mood Selector Tabs */}
        <div className="mb-6">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A059] mb-3 text-left">
            Select Romantic Theme:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {MOODS.map((m) => {
              const isActive = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMood(m.id);
                    romanticAudio.playCrystalChime(659.25);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 text-xs ${
                    isActive
                      ? 'bg-gradient-to-b from-[#3D1426] to-[#1C0A15] border border-[#EAD59E] shadow-lg shadow-[#EAD59E]/15 text-[#FAF6F0] scale-102'
                      : 'bg-[#140610] border border-[#C5A059]/25 text-[#FAF6F0]/70 hover:border-[#C5A059]/60 hover:text-[#FAF6F0]'
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span className="font-serif font-medium text-xs truncate max-w-full">
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Custom Thought Input */}
        <div className="mb-6 text-left">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A059] mb-2">
            Optional Focus (e.g. "her gentle eyes", "our morning coffee", "forever"):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Leave empty for spontaneous celestial inspiration..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#140610] border border-[#C5A059]/30 text-xs text-[#FAF6F0] placeholder:text-[#FAF6F0]/30 focus:outline-none focus:border-[#EAD59E] transition-colors"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EAD59E] via-[#D4AF37] to-[#C5A059] text-[#0C060A] text-xs font-semibold tracking-wider uppercase hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all shadow-md shrink-0"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Weaving...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#0C060A]" />
                  <span>Whisper Love ✨</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Poetry Display Board */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#1E0E1B]/90 via-[#130610] to-[#0D040A] border border-[#C5A059]/35 p-6 sm:p-8 min-h-[170px] flex flex-col justify-between shadow-inner">
          {/* Top Status */}
          <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-3 mb-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#EAD59E]">
              <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="uppercase tracking-widest text-[10px]">
                {MOODS.find((m) => m.id === selectedMood)?.label}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] text-[#C5A059] hover:text-[#EAD59E] transition-colors font-sans"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Note</span>
                </>
              )}
            </button>
          </div>

          {/* Poetry Text with Typewriter */}
          <div className="py-2 my-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <Stars className="w-8 h-8 text-[#EAD59E] animate-spin" />
                <p className="text-xs font-mono text-[#FAF6F0]/60 tracking-widest uppercase">
                  Reading the stars of our love...
                </p>
              </div>
            ) : (
              <p className="font-serif italic text-lg sm:text-2xl text-[#FAF6F0] leading-relaxed whitespace-pre-line text-balance drop-shadow-sm">
                "{displayText}"
              </p>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-4 border-t border-[#C5A059]/15 flex items-center justify-between text-[11px] text-[#FAF6F0]/50 font-serif">
            <span>Always dedicated to Wifey</span>
            <span className="flex items-center gap-1 text-[#EAD59E]">
              <Heart className="w-3 h-3 fill-[#EAD59E]" />
              <span>Forever & Always</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
