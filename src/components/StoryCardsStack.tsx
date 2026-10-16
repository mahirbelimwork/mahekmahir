import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Home,
  Feather,
  Mail,
  Shield,
  Smile,
  ImageIcon,
} from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { LoveNote } from './LoveNote';
import { FinalLoveLetter } from './FinalLoveLetter';

interface StoryCardsStackProps {
  onReplay: () => void;
}

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeSlideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const visualMediaVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.08,
    },
  },
};

export const StoryCardsStack: React.FC<StoryCardsStackProps> = ({ onReplay }) => {
  const { chapters, loveNotes } = loveStoryConfig;
  const [couplePhoto, setCouplePhoto] = useState(
    chapters.chapter2.couplePhotoUrl
  );
  const [isPhotoEditing, setIsPhotoEditing] = useState(false);
  const [tempPhotoUrl, setTempPhotoUrl] = useState(couplePhoto);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  return (
    <div id="story-stack" className="relative max-w-5xl mx-auto px-3.5 sm:px-6 pb-20 sm:pb-28 pt-4 sm:pt-8">
      {/* ----------------- CHAPTER 01: THE SERENDIPITY ----------------- */}
      <section
        id="card-everything-better"
        className="relative lg:sticky lg:top-20 z-10 mb-12 sm:mb-16 lg:mb-28 rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated p-5 sm:p-8 lg:p-12 shadow-2xl transition-all duration-500"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col justify-between h-full min-h-0 lg:min-h-[70vh]"
        >
          {/* Card Top Header */}
          <motion.div
            variants={fadeSlideUpVariants}
            className="flex items-center justify-between border-b border-[#C5A059]/25 pb-3 sm:pb-4 mb-4 sm:mb-6"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C5A059] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAD59E] shrink-0" />
              <span className="truncate">Chapter {chapters.chapter1.number} · {chapters.chapter1.title}</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/50 font-mono shrink-0">
              <span>01</span>
              <span aria-hidden="true">/</span>
              <span>07</span>
            </div>
          </motion.div>

          {/* Staggered Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto py-2 sm:py-6">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <motion.h2
                variants={fadeSlideUpVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] leading-tight text-balance"
              >
                {chapters.chapter1.heading}
              </motion.h2>

              <motion.p
                variants={fadeSlideUpVariants}
                className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/80 leading-relaxed font-light"
              >
                {chapters.chapter1.message}
              </motion.p>

              <motion.div variants={fadeSlideUpVariants} className="pt-1 sm:pt-2">
                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#1A0C16] border border-[#C5A059]/35 inline-block shadow-lg max-w-full">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#EAD59E] font-medium leading-relaxed">
                    "{chapters.chapter1.handwrittenNote}"
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={visualMediaVariants}
              className="lg:col-span-5 flex justify-center items-center pt-2 lg:pt-0"
            >
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#1E0E1B] via-[#2A1123] to-[#120710] p-4 sm:p-6 flex flex-col items-center justify-center border border-[#C5A059]/40 shadow-2xl text-center">
                <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full bg-[#120710] border border-[#C5A059]/50 shadow-md flex items-center justify-center mb-3 animate-candle-glow shrink-0">
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-[#EAD59E] fill-[#EAD59E]/30" />
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-[#FAF6F0]/90 max-w-xs px-2">
                  "{chapters.chapter1.reflection}"
                </p>
                <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-[#C5A059]">
                  <Sparkles className="w-3 h-3 text-[#EAD59E]" />
                  <span>Serenity with You</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeSlideUpVariants}
            className="text-right text-[10px] sm:text-[11px] text-[#C5A059]/70 tracking-widest uppercase font-light pt-4 border-t border-[#C5A059]/15 lg:border-t-0"
          >
            Scroll down to chapter two ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ----------------- CHAPTER 02: THE ABSOLUTE CHOICE ----------------- */}
      <section
        id="card-favourite-person"
        className="relative lg:sticky lg:top-20 z-20 mb-12 sm:mb-16 lg:mb-28 rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated p-5 sm:p-8 lg:p-12 shadow-2xl transition-all duration-500"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col justify-between h-full min-h-0 lg:min-h-[70vh]"
        >
          <motion.div
            variants={fadeSlideUpVariants}
            className="flex items-center justify-between border-b border-[#C5A059]/25 pb-3 sm:pb-4 mb-4 sm:mb-6"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C5A059] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAD59E] shrink-0" />
              <span className="truncate">Chapter {chapters.chapter2.number} · {chapters.chapter2.title}</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/50 font-mono shrink-0">
              <span>02</span>
              <span aria-hidden="true">/</span>
              <span>07</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto py-2 sm:py-6">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left order-2 lg:order-1">
              <motion.h2
                variants={fadeSlideUpVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] leading-tight text-balance"
              >
                {chapters.chapter2.heading}
              </motion.h2>

              <motion.p
                variants={fadeSlideUpVariants}
                className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/80 leading-relaxed font-light"
              >
                {chapters.chapter2.message}
              </motion.p>

              <motion.div variants={fadeSlideUpVariants} className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPhotoEditing(!isPhotoEditing)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EAD59E] hover:text-white px-3.5 py-2 rounded-xl bg-[#1A0C16] border border-[#C5A059]/40 hover:bg-[#251120] transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isPhotoEditing ? 'Close Settings' : 'Customize Couple Photo'}</span>
                </button>
              </motion.div>

              {isPhotoEditing && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1A0C16] border border-[#C5A059]/40 shadow-xl space-y-2 mt-2">
                  <label className="block text-[11px] sm:text-xs font-semibold text-[#EAD59E]">
                    Paste Custom Photo URL:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={tempPhotoUrl}
                      onChange={(e) => setTempPhotoUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="flex-1 px-3 py-2 rounded-lg bg-[#0C060A] border border-[#C5A059]/30 text-xs text-[#FAF6F0] placeholder-[#FAF6F0]/40 focus:outline-none focus:border-[#EAD59E]"
                    />
                    <button
                      onClick={() => {
                        setCouplePhoto(tempPhotoUrl);
                        setIsPhotoEditing(false);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[#0C060A] bg-[#EAD59E] rounded-lg hover:brightness-110 shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <motion.div
              variants={visualMediaVariants}
              className="lg:col-span-6 flex justify-center order-1 lg:order-2 w-full"
            >
              <div className="relative max-w-xs sm:max-w-sm w-full rounded-2xl p-2.5 sm:p-3 bg-[#1A0C16]/90 border border-[#C5A059]/40 shadow-2xl group mx-auto">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#11070F] relative">
                  <img
                    src={couplePhoto}
                    alt="Couple tender moment by fireplace"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C060A]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                    <p className="font-serif italic text-[11px] sm:text-xs text-[#FAF6F0] drop-shadow">
                      "{chapters.chapter2.photoCaption}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeSlideUpVariants}
            className="text-right text-[10px] sm:text-[11px] text-[#C5A059]/70 tracking-widest uppercase font-light pt-4 border-t border-[#C5A059]/15 lg:border-t-0"
          >
            Scroll down ↓
          </motion.div>
        </motion.div>
      </section>

      {/* INTERSTITIAL NOTE 1 */}
      <LoveNote
        text={loveNotes[0].text}
        author={loveNotes[0].author}
        rotation={0.8}
      />

      {/* ----------------- CHAPTER 03: THE UNSPOKEN MAGIC ----------------- */}
      <section
        id="card-little-things"
        className="relative lg:sticky lg:top-20 z-30 mb-12 sm:mb-16 lg:mb-28 rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated p-5 sm:p-8 lg:p-12 shadow-2xl transition-all duration-500"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col justify-between h-full min-h-0 lg:min-h-[70vh]"
        >
          <motion.div
            variants={fadeSlideUpVariants}
            className="flex items-center justify-between border-b border-[#C5A059]/25 pb-3 sm:pb-4 mb-4 sm:mb-6"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C5A059] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAD59E] shrink-0" />
              <span className="truncate">Chapter {chapters.chapter3.number} · {chapters.chapter3.title}</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/50 font-mono shrink-0">
              <span>03</span>
              <span aria-hidden="true">/</span>
              <span>07</span>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-6 my-auto py-2 sm:py-6">
            <div className="max-w-2xl text-left">
              <motion.h2
                variants={fadeSlideUpVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] leading-tight text-balance"
              >
                {chapters.chapter3.heading}
              </motion.h2>

              <motion.p
                variants={fadeSlideUpVariants}
                className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/80 leading-relaxed font-light mt-3 sm:mt-4"
              >
                {chapters.chapter3.message}
              </motion.p>
            </div>

            {/* 3 Luxury Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-2 sm:pt-4">
              {chapters.chapter3.littleThings.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeSlideUpVariants}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#1A0C16]/80 border border-[#C5A059]/30 hover:border-[#EAD59E]/70 shadow-lg transition-all duration-300 text-left flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2A1223] flex items-center justify-center text-[#EAD59E] mb-3 sm:mb-4 border border-[#C5A059]/30 group-hover:scale-105 transition-transform shrink-0">
                      {idx === 0 && <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAD59E]" />}
                      {idx === 1 && <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAD59E]" />}
                      {idx === 2 && <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAD59E]" />}
                    </div>
                    <h3 className="font-serif text-base sm:text-lg text-[#FAF6F0] font-normal mb-1.5 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#FAF6F0]/75 leading-relaxed font-light">
                      "{item.text}"
                    </p>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#C5A059] tracking-widest uppercase mt-3 sm:mt-5 block border-t border-[#C5A059]/20 pt-2">
                    Grace 0{idx + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={fadeSlideUpVariants}
            className="text-right text-[10px] sm:text-[11px] text-[#C5A059]/70 tracking-widest uppercase font-light pt-4 border-t border-[#C5A059]/15 lg:border-t-0"
          >
            Scroll down ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ----------------- CHAPTER 04: THE SAFE HARBOR ----------------- */}
      <section
        id="card-safe-place"
        className="relative lg:sticky lg:top-20 z-40 mb-12 sm:mb-16 lg:mb-28 rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated p-5 sm:p-8 lg:p-12 shadow-2xl transition-all duration-500"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col justify-between h-full min-h-0 lg:min-h-[70vh]"
        >
          <motion.div
            variants={fadeSlideUpVariants}
            className="flex items-center justify-between border-b border-[#C5A059]/25 pb-3 sm:pb-4 mb-4 sm:mb-6"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C5A059] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAD59E] shrink-0" />
              <span className="truncate">Chapter {chapters.chapter4.number} · {chapters.chapter4.title}</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/50 font-mono shrink-0">
              <span>04</span>
              <span aria-hidden="true">/</span>
              <span>07</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto py-2 sm:py-6">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <motion.h2
                variants={fadeSlideUpVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] leading-tight text-balance"
              >
                {chapters.chapter4.heading}
              </motion.h2>

              <motion.p
                variants={fadeSlideUpVariants}
                className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/80 leading-relaxed font-light"
              >
                {chapters.chapter4.message}
              </motion.p>

              <motion.div variants={fadeSlideUpVariants} className="pt-1 sm:pt-2">
                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#1A0C16] border border-[#C5A059]/40 shadow-xl max-w-md">
                  <p className="font-serif italic text-sm sm:text-base lg:text-lg text-[#EAD59E]">
                    "{chapters.chapter4.sanctuaryQuote}"
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-sans text-[#FAF6F0]/60 mt-2">
                    {chapters.chapter4.sanctuaryHighlight}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={visualMediaVariants}
              className="lg:col-span-5 flex justify-center items-center pt-2 lg:pt-0"
            >
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-gradient-to-tr from-[#1E0E1B] via-[#351429] to-[#140810] p-6 sm:p-8 flex flex-col items-center justify-center border-2 border-[#C5A059]/40 shadow-2xl text-center animate-candle-glow">
                <Home className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#EAD59E] mb-2 sm:mb-3 shrink-0" />
                <p className="font-handwriting text-xl sm:text-2xl lg:text-3xl text-[#FAF6F0] font-medium leading-tight">
                  My Peace, My Home
                </p>
                <span className="text-[9px] sm:text-[10px] font-sans text-[#C5A059] mt-1.5 sm:mt-2 uppercase tracking-widest font-semibold">
                  Always Beside You
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeSlideUpVariants}
            className="text-right text-[10px] sm:text-[11px] text-[#C5A059]/70 tracking-widest uppercase font-light pt-4 border-t border-[#C5A059]/15 lg:border-t-0"
          >
            Scroll down ↓
          </motion.div>
        </motion.div>
      </section>

      {/* INTERSTITIAL NOTE 2 */}
      <LoveNote
        text={loveNotes[1].text}
        author={loveNotes[1].author}
        rotation={-1.2}
      />

      {/* ----------------- CHAPTER 05: A THOUSAND REASONS ----------------- */}
      <section
        id="card-thousand-reasons"
        className="relative lg:sticky lg:top-20 z-50 mb-12 sm:mb-16 lg:mb-28 rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated p-5 sm:p-8 lg:p-12 shadow-2xl transition-all duration-500"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col justify-between h-full min-h-0 lg:min-h-[70vh]"
        >
          <motion.div
            variants={fadeSlideUpVariants}
            className="flex items-center justify-between border-b border-[#C5A059]/25 pb-3 sm:pb-4 mb-4 sm:mb-6"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C5A059] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAD59E] shrink-0" />
              <span className="truncate">Chapter {chapters.chapter5.number} · {chapters.chapter5.title}</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/50 font-mono shrink-0">
              <span>05</span>
              <span aria-hidden="true">/</span>
              <span>07</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto py-2 sm:py-6">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left">
              <motion.h2
                variants={fadeSlideUpVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] leading-tight text-balance"
              >
                {chapters.chapter5.heading}
              </motion.h2>

              <motion.p
                variants={fadeSlideUpVariants}
                className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/80 leading-relaxed font-light"
              >
                {chapters.chapter5.message}
              </motion.p>

              <motion.div variants={fadeSlideUpVariants} className="pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={() => setIsLetterOpen(!isLetterOpen)}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] to-[#C5A059] hover:brightness-110 transition-all shadow-md active:scale-95"
                >
                  <Mail className="w-4 h-4 text-[#0C060A]" />
                  <span>{isLetterOpen ? 'Fold Manuscript' : 'Unfold Manuscript ✦'}</span>
                </button>
              </motion.div>
            </div>

            <motion.div
              variants={visualMediaVariants}
              className="lg:col-span-6 flex justify-center w-full"
            >
              <div
                className={`relative max-w-md w-full p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#1A0C16] border border-[#C5A059]/40 shadow-2xl transition-all duration-500 ${
                  isLetterOpen ? 'scale-101 ring-1 sm:ring-2 ring-[#EAD59E]/40' : 'hover:scale-101'
                }`}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-[#C5A059]/20 pb-2">
                  <span className="font-serif italic text-xs text-[#FAF6F0]/70 truncate pr-2">
                    Handwritten Folio · Dedicated to Wifey
                  </span>
                  <Feather className="w-4 h-4 text-[#EAD59E] shrink-0" />
                </div>

                <p className="font-handwriting text-xl sm:text-2xl lg:text-3xl text-[#EAD59E] leading-relaxed mb-3 sm:mb-4">
                  "{chapters.chapter5.loveLetterSnippet}"
                </p>

                {isLetterOpen && (
                  <div className="pt-3 border-t border-[#C5A059]/30 text-xs sm:text-sm font-serif text-[#FAF6F0]/85 space-y-2">
                    {chapters.chapter5.reasons.map((reason, i) => (
                      <p key={i} className="flex items-start gap-2">
                        <span className="text-[#EAD59E] shrink-0">•</span>
                        <span>{reason}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeSlideUpVariants}
            className="text-right text-[10px] sm:text-[11px] text-[#C5A059]/70 tracking-widest uppercase font-light pt-4 border-t border-[#C5A059]/15 lg:border-t-0"
          >
            Scroll down to our vows ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ----------------- CHAPTER 06: THE SACRED VOWS ----------------- */}
      <section
        id="card-promise"
        className="relative lg:sticky lg:top-20 z-60 mb-12 sm:mb-16 lg:mb-28 rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated p-5 sm:p-8 lg:p-12 shadow-2xl transition-all duration-500"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col justify-between h-full min-h-0 lg:min-h-[70vh]"
        >
          <motion.div
            variants={fadeSlideUpVariants}
            className="flex items-center justify-between border-b border-[#C5A059]/25 pb-3 sm:pb-4 mb-4 sm:mb-6"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C5A059] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAD59E] shrink-0" />
              <span className="truncate">Chapter {chapters.chapter6.number} · {chapters.chapter6.title}</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/50 font-mono shrink-0">
              <span>06</span>
              <span aria-hidden="true">/</span>
              <span>07</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto py-2 sm:py-6">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <motion.h2
                variants={fadeSlideUpVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#FAF6F0] leading-tight text-balance"
              >
                {chapters.chapter6.heading}
              </motion.h2>

              <motion.p
                variants={fadeSlideUpVariants}
                className="text-sm sm:text-base lg:text-lg text-[#FAF6F0]/80 leading-relaxed font-light"
              >
                {chapters.chapter6.message}
              </motion.p>

              <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                {chapters.chapter6.promises.map((promise, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeSlideUpVariants}
                    className="p-3 sm:p-4 rounded-xl bg-[#1A0C16] border border-[#C5A059]/30 hover:border-[#EAD59E]/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-3.5 h-3.5 text-[#EAD59E] fill-[#EAD59E] shrink-0" />
                      <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#C5A059]">
                        {promise.title}
                      </span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm lg:text-base text-[#FAF6F0]/90 leading-relaxed">
                      "{promise.text}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              variants={visualMediaVariants}
              className="lg:col-span-5 flex justify-center items-center pt-2 lg:pt-0"
            >
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#1E0E1B] via-[#2D1225] to-[#120710] p-4 sm:p-6 flex flex-col items-center justify-center border border-[#C5A059]/40 shadow-2xl text-center">
                <Shield className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#EAD59E] mb-2 sm:mb-3 shrink-0" />
                <p className="font-serif font-normal text-lg sm:text-xl text-[#FAF6F0]">
                  My Lifelong Vow
                </p>
                <p className="font-handwriting text-xl sm:text-2xl text-[#EAD59E] mt-1.5 sm:mt-2">
                  "Always choosing you"
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeSlideUpVariants}
            className="text-right text-[10px] sm:text-[11px] text-[#C5A059]/70 tracking-widest uppercase font-light pt-4 border-t border-[#C5A059]/15 lg:border-t-0"
          >
            Scroll down for the final love letter ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ----------------- CHAPTER 07: THE GRAND FINALE ----------------- */}
      <section
        id="card-final-letter"
        className="relative lg:sticky lg:top-20 z-70 mb-10 min-h-0 lg:min-h-[82vh] rounded-2xl sm:rounded-3xl luxury-editorial-card-elevated overflow-hidden shadow-2xl flex items-center justify-center"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full"
        >
          <FinalLoveLetter onReplay={onReplay} />
        </motion.div>
      </section>
    </div>
  );
};
