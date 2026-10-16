// Procedural Romantic Audio Synthesizer using Web Audio API
// 100% Zero external audio files, pure browser acoustic synthesis

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a dreamy crystal music-box bell chime
  public playCrystalChime(frequency: number = 587.33, delay: number = 0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);

      // Warm harmonic overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(frequency * 2, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.04, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 1.7);
      osc2.stop(now + 1.2);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Play a soft romantic arpeggio chord (D major / F# minor dream chord)
  public playCelestialChord() {
    if (this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73]; // A4, C#5, E5, A5, C#6
    notes.forEach((freq, idx) => {
      this.playCrystalChime(freq, idx * 0.08);
    });
  }

  // Play gentle heartbeat pulse
  public playHeartbeat() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [0, 0.22].forEach((offset) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, now + offset);
        osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.18);

        gain.gain.setValueAtTime(0, now + offset);
        gain.gain.linearRampToValueAtTime(0.18, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.22);
      });
    } catch {
      // Ignored
    }
  }

  // Play scanning shimmer frequency
  public playScanTone(progress: number) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch rises as progress nears 100%
      const baseFreq = 320 + progress * 400;
      osc.frequency.setValueAtTime(baseFreq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Ignored
    }
  }

  // Play celebratory royal fanfare chords
  public playCelebrationChimes() {
    if (this.isMuted) return;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    chords.forEach((freq, idx) => {
      this.playCrystalChime(freq, idx * 0.1);
    });
  }

  // Play delicate micro sparkle for typing or touch trails
  public playMicroSparkle() {
    if (this.isMuted) return;
    const freqs = [880, 1046.5, 1174.66, 1318.51, 1567.98];
    const pick = freqs[Math.floor(Math.random() * freqs.length)];
    this.playCrystalChime(pick, 0);
  }

  // Play subtle organic typewriter key tap sound
  public playTypewriterTap() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.035);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignored
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
