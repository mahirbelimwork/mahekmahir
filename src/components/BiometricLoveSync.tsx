import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Heart, ShieldCheck, Sparkles, Activity, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/romanticAudio';

export const BiometricLoveSync: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [activeBpm, setActiveBpm] = useState(78);
  const timerRef = useRef<number | null>(null);
  const audioIntervalRef = useRef<number | null>(null);

  // Stop scanning helper
  const stopScanning = useCallback(() => {
    setIsScanning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
    if (!isSynced) {
      setProgress(0);
    }
  }, [isSynced]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, []);

  const startScanning = () => {
    if (isSynced) return;
    setIsScanning(true);

    // Initial audio cue & haptic
    romanticAudio.playHeartbeat();
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(60);
    }

    // Audio heartbeats every 550ms
    audioIntervalRef.current = window.setInterval(() => {
      romanticAudio.playHeartbeat();
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([40, 50, 40]);
      }
    }, 520);

    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds hold to sync

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentPct);
      setActiveBpm(78 + Math.floor((currentPct / 100) * 44)); // BPM rises up to 122

      if (currentPct % 20 === 0) {
        romanticAudio.playScanTone(currentPct / 100);
      }

      if (currentPct >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
        setIsScanning(false);
        setIsSynced(true);

        // Celebration
        romanticAudio.playCelebrationChimes();
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([100, 80, 100, 150]);
        }

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EAD59E', '#D4AF37', '#F4C2D0', '#C2284E', '#FAF6F0'],
        });
      }
    }, 30);
  };

  const handleReset = () => {
    setIsSynced(false);
    setProgress(0);
    setActiveBpm(78);
    romanticAudio.playCrystalChime(523.25);
  };

  return (
    <section
      id="biometric-sync"
      className="relative max-w-5xl mx-auto px-3.5 sm:px-6 py-12 sm:py-16 my-4 text-center"
      aria-label="Biometric Heart Synchronization"
    >
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
          <Activity className="w-3.5 h-3.5 text-[#EAD59E] animate-pulse" />
          <span>Biometric Resonance Technology</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#FAF6F0] tracking-tight">
          Synchronize Our Heartbeats
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF6F0]/75 font-light leading-relaxed max-w-lg mx-auto">
          Hold your thumb or finger on the biometric scanner below to measure the resonance frequency between our two hearts.
        </p>
      </div>

      {/* Main Biometric Holographic Console */}
      <div className="relative mx-auto max-w-2xl rounded-3xl luxury-editorial-card-elevated border border-[#C5A059]/40 shadow-2xl overflow-hidden p-6 sm:p-10 bg-gradient-to-b from-[#180B15]/95 via-[#10060D] to-[#0A0408]">
        {/* Holographic Top Status */}
        <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-4 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#EAD59E]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="tracking-widest uppercase text-[10px] sm:text-xs">
              {isSynced ? 'STATUS: SYNCHRONIZED' : isScanning ? 'STATUS: SCANNING RESONANCE...' : 'STATUS: SENSOR READY'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#FAF6F0]/70 text-[10px] sm:text-xs">
            <span>HEART RATE:</span>
            <span className="text-[#EAD59E] font-semibold">{activeBpm} BPM</span>
          </div>
        </div>

        {!isSynced ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-6">
            {/* The Fingerprint Scanner Pad */}
            <div className="relative flex items-center justify-center">
              {/* Pulsing Aura Rings */}
              {isScanning && (
                <>
                  <div className="absolute inset-0 -m-6 rounded-full border border-[#EAD59E]/40 animate-ping opacity-60" />
                  <div className="absolute inset-0 -m-12 rounded-full border border-[#C2284E]/30 animate-pulse opacity-40" />
                </>
              )}

              {/* Progress Radial Ring SVG */}
              <svg className="w-44 h-44 sm:w-52 sm:h-52 transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="78"
                  stroke="rgba(197, 160, 89, 0.15)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="78"
                  stroke="url(#goldGradient)"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="490"
                  strokeDashoffset={490 - (490 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF6F0" />
                    <stop offset="50%" stopColor="#EAD59E" />
                    <stop offset="100%" stopColor="#C2284E" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Touch Target */}
              <button
                type="button"
                onMouseDown={startScanning}
                onMouseUp={stopScanning}
                onMouseLeave={stopScanning}
                onTouchStart={startScanning}
                onTouchEnd={stopScanning}
                className={`absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center transition-all duration-300 select-none ${
                  isScanning
                    ? 'bg-gradient-to-b from-[#3D1426] to-[#1A0914] scale-95 shadow-inner shadow-[#EAD59E]/50'
                    : 'bg-gradient-to-b from-[#220E1C] to-[#120710] hover:scale-105 shadow-xl shadow-black/80 border border-[#C5A059]/40 active:scale-95'
                }`}
                aria-label="Touch and hold to scan"
              >
                {/* Laser Scanning Bar */}
                {isScanning && (
                  <motion.div
                    animate={{ y: [-38, 38, -38] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="absolute w-24 h-0.5 bg-gradient-to-r from-transparent via-[#FAF6F0] to-transparent shadow-[0_0_12px_#FAF6F0] z-10 pointer-events-none"
                  />
                )}

                <Fingerprint
                  className={`w-14 h-14 sm:w-16 sm:h-16 transition-colors duration-300 ${
                    isScanning ? 'text-[#FAF6F0] drop-shadow-[0_0_15px_rgba(234,213,158,0.9)]' : 'text-[#EAD59E]'
                  }`}
                />

                <span className="text-[10px] font-mono tracking-widest uppercase text-[#FAF6F0]/70 mt-1">
                  {isScanning ? `${progress}%` : 'HOLD TO SYNC'}
                </span>
              </button>
            </div>

            {/* Simulated Live ECG Waveform */}
            <div className="w-full max-w-md bg-[#130710]/90 rounded-2xl p-3 border border-[#C5A059]/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Heart className={`w-4 h-4 text-[#C2284E] fill-[#C2284E] ${isScanning ? 'animate-bounce' : 'animate-pulse'}`} />
                <span className="text-[11px] font-mono text-[#FAF6F0]/70">ECG MONITOR</span>
              </div>
              <div className="h-6 flex-1 overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 30" preserveAspectRatio="none">
                  <path
                    d={
                      isScanning
                        ? "M 0 15 L 40 15 L 45 8 L 50 25 L 55 5 L 60 22 L 65 15 L 140 15 L 145 8 L 150 25 L 155 5 L 160 22 L 165 15 L 200 15"
                        : "M 0 15 L 80 15 L 85 9 L 90 23 L 95 6 L 100 20 L 105 15 L 200 15"
                    }
                    fill="none"
                    stroke={isScanning ? "#EAD59E" : "#C5A059"}
                    strokeWidth="1.8"
                    className={isScanning ? "animate-pulse" : ""}
                  />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-[#EAD59E]">
                {isScanning ? 'RESONATING' : 'IDLE'}
              </span>
            </div>

            <p className="text-xs text-[#C5A059]/80 font-serif italic">
              "Touch with your finger and don't let go until the light shines completely."
            </p>
          </div>
        ) : (
          /* Synchronized Certificate Revealed */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="py-4 space-y-6 text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#361324] border border-[#EAD59E]/40 text-[#EAD59E] text-xs font-mono uppercase tracking-widest shadow-lg shadow-[#EAD59E]/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Soulmate Compatibility Verified</span>
              </div>

              {/* Big Heart Resonance Icon */}
              <div className="relative inline-flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#C2284E] via-[#8A243E] to-[#EAD59E] flex items-center justify-center shadow-2xl shadow-[#C2284E]/40 animate-pulse">
                  <Heart className="w-12 h-12 text-[#FAF6F0] fill-[#FAF6F0]" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#EAD59E] animate-bounce" />
              </div>

              <div className="space-y-3 max-w-lg mx-auto">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF6F0]">
                  Two Hearts. One Eternal Rhythm.
                </h3>
                <p className="text-sm sm:text-base text-[#FAF6F0]/85 font-light leading-relaxed">
                  Our resonance frequencies have locked in perfect harmony. Every beat of my heart was always tuned to find yours, Wifey.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto pt-2 text-left">
                <div className="p-3 rounded-xl bg-[#140710]/90 border border-[#C5A059]/25">
                  <span className="block text-[9px] font-mono text-[#C5A059] uppercase tracking-wider">Sync Ratio</span>
                  <span className="text-base font-semibold text-[#EAD59E] font-serif">100.00%</span>
                </div>
                <div className="p-3 rounded-xl bg-[#140710]/90 border border-[#C5A059]/25">
                  <span className="block text-[9px] font-mono text-[#C5A059] uppercase tracking-wider">Entanglement</span>
                  <span className="text-base font-semibold text-[#EAD59E] font-serif">Infinite</span>
                </div>
                <div className="p-3 rounded-xl bg-[#140710]/90 border border-[#C5A059]/25 col-span-2 sm:col-span-1">
                  <span className="block text-[9px] font-mono text-[#C5A059] uppercase tracking-wider">Bond Expiry</span>
                  <span className="text-base font-semibold text-[#EAD59E] font-serif">Never</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#0C060A] bg-gradient-to-r from-[#EAD59E] to-[#C5A059] hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#0C060A]" />
                  <span>Sync Again</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
