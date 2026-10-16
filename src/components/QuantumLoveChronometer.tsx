import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart, Sparkles, Sun, Edit3, Check } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalSeconds: number;
}

export const QuantumLoveChronometer: React.FC = () => {
  // Default start date or loaded from localStorage (defaulting to 2 years ago as an elegant baseline)
  const defaultStartDate = '2023-04-14T18:30:00';
  const [startDateStr, setStartDateStr] = useState<string>(() => {
    return localStorage.getItem('wifey_love_start_date') || defaultStartDate;
  });
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDateStr, setTempDateStr] = useState(startDateStr.slice(0, 10));

  const [time, setTime] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    let animId: number;

    const updateCounter = () => {
      const start = new Date(startDateStr).getTime();
      const now = Date.now();
      const diffMs = Math.max(0, now - start);

      const totalSeconds = Math.floor(diffMs / 1000);
      const milliseconds = Math.floor(diffMs % 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      const totalDays = Math.floor(totalHours / 24);

      // Approximate calendar breakdown
      const years = Math.floor(totalDays / 365.25);
      const remainingDaysAfterYears = totalDays - Math.floor(years * 365.25);
      const months = Math.floor(remainingDaysAfterYears / 30.44);
      const days = Math.floor(remainingDaysAfterYears % 30.44);

      setTime({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        totalSeconds,
      });

      animId = requestAnimationFrame(updateCounter);
    };

    updateCounter();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [startDateStr]);

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempDateStr) {
      const fullDate = `${tempDateStr}T12:00:00`;
      setStartDateStr(fullDate);
      localStorage.setItem('wifey_love_start_date', fullDate);
      setIsEditingDate(false);
      romanticAudio.playCrystalChime(783.99);
    }
  };

  // Heartbeats calculated based on ~72 BPM
  const heartbeats = Math.floor(time.totalSeconds * 1.2).toLocaleString();
  const sunrises = (time.years * 365 + time.months * 30 + time.days).toLocaleString();

  return (
    <section
      id="love-chronometer"
      className="relative max-w-5xl mx-auto px-3.5 sm:px-6 py-12 sm:py-16 my-4 text-center"
      aria-label="Quantum Love Chronometer"
    >
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
          <Clock className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span>Real-Time Quantum Love Clock</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#FAF6F0] tracking-tight">
          Every Second Loved, Counted in Real Time
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF6F0]/75 font-light leading-relaxed max-w-lg mx-auto">
          Time is the canvas of our devotion. Every millisecond since you walked into my life has been pure magic.
        </p>
      </div>

      {/* Main Chronometer Card */}
      <div className="relative mx-auto max-w-3xl rounded-3xl luxury-editorial-card-elevated border border-[#C5A059]/40 shadow-2xl p-6 sm:p-10 bg-gradient-to-b from-[#180B15]/95 via-[#10060D] to-[#0A0408]">
        {/* Date Selector Top Affordance */}
        <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-4 mb-8">
          <div className="flex items-center gap-2 text-xs text-[#FAF6F0]/75">
            <Calendar className="w-4 h-4 text-[#EAD59E]" />
            <span className="font-serif italic text-sm">
              Journey Began: {new Date(startDateStr).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <button
            onClick={() => setIsEditingDate(!isEditingDate)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#200D1A] border border-[#C5A059]/30 text-[10px] sm:text-xs text-[#EAD59E] hover:border-[#EAD59E] transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditingDate ? 'Cancel' : 'Set Our Date'}</span>
          </button>
        </div>

        {/* Date Editing Form Modal / Drawer */}
        {isEditingDate && (
          <form
            onSubmit={handleSaveDate}
            className="mb-8 p-4 rounded-2xl bg-[#140610] border border-[#C5A059]/30 flex flex-wrap items-center justify-center gap-3 animate-fade-in"
          >
            <span className="text-xs text-[#FAF6F0]/80">Pick your anniversary or first date:</span>
            <input
              type="date"
              value={tempDateStr}
              onChange={(e) => setTempDateStr(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#220E1C] border border-[#C5A059]/40 text-[#FAF6F0] text-xs focus:outline-none focus:border-[#EAD59E]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#EAD59E] to-[#C5A059] text-[#0C060A] text-xs font-semibold hover:brightness-110"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Date</span>
            </button>
          </form>
        )}

        {/* Live Quantum Digits Display */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {/* Years */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#140710]/90 border border-[#C5A059]/25 flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-serif font-light text-[#EAD59E]">
              {time.years}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF6F0]/60 mt-1">
              Years
            </span>
          </div>

          {/* Months */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#140710]/90 border border-[#C5A059]/25 flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-serif font-light text-[#EAD59E]">
              {time.months}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF6F0]/60 mt-1">
              Months
            </span>
          </div>

          {/* Days */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#140710]/90 border border-[#C5A059]/25 flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-serif font-light text-[#EAD59E]">
              {time.days}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF6F0]/60 mt-1">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#140710]/90 border border-[#C5A059]/25 flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-serif font-light text-[#EAD59E]">
              {String(time.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF6F0]/60 mt-1">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#140710]/90 border border-[#C5A059]/25 flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-serif font-light text-[#EAD59E]">
              {String(time.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF6F0]/60 mt-1">
              Mins
            </span>
          </div>

          {/* Seconds + Live Milliseconds */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#140710]/90 border border-[#EAD59E]/40 flex flex-col items-center shadow-lg shadow-[#EAD59E]/10">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-4xl font-serif font-medium text-[#FAF6F0]">
                {String(time.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-[#EAD59E] ml-1">
                .{String(Math.floor(time.milliseconds / 10)).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#EAD59E] mt-1 font-semibold">
              Live Secs
            </span>
          </div>
        </div>

        {/* Live Eternity Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-left">
          {/* Metric 1 */}
          <div className="p-4 rounded-2xl bg-[#160813]/90 border border-[#C5A059]/20 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#280F1E] border border-[#C2284E]/40 text-[#C2284E] shrink-0">
              <Heart className="w-5 h-5 fill-[#C2284E] animate-pulse" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A059]/80">
                Heartbeats Beaten for You
              </span>
              <span className="text-lg font-serif text-[#FAF6F0] font-semibold">
                ~{heartbeats}
              </span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-2xl bg-[#160813]/90 border border-[#C5A059]/20 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#280F1E] border border-[#C5A059]/40 text-[#EAD59E] shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A059]/80">
                Days & Sunrises Together
              </span>
              <span className="text-lg font-serif text-[#FAF6F0] font-semibold">
                {sunrises} Days
              </span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-2xl bg-[#160813]/90 border border-[#C5A059]/20 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#280F1E] border border-[#C5A059]/40 text-[#EAD59E] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A059]/80">
                Promise of Tomorrow
              </span>
              <span className="text-lg font-serif text-[#FAF6F0] font-semibold">
                ∞ Infinity
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#C5A059]/75 font-serif italic text-center mt-6">
          "And if I had to count every star in the night sky to prove it, I would gladly start today."
        </p>
      </div>
    </section>
  );
};
