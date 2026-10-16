/**
 * Romantic Wedding Ambient Melody Synthesizer using Web Audio API
 * Plays gentle romantic arpeggios (Canon in D / Wedding Chime progression)
 * Completely offline, reliable, zero external MP3 dependencies.
 */

class RomanticWeddingAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private step: number = 0;

  // Chord notes for romantic wedding progression in D Major / F# minor / G / A / B minor
  private readonly chords: number[][] = [
    // D major: D4, F#4, A4, D5
    [293.66, 369.99, 440.0, 587.33],
    // A major: A3, C#4, E4, A4
    [220.0, 277.18, 329.63, 440.0],
    // B minor: B3, D4, F#4, B4
    [246.94, 293.66, 369.99, 493.88],
    // F# minor: F#3, A3, C#4, F#4
    [185.0, 220.0, 277.18, 369.99],
    // G major: G3, B3, D4, G4
    [196.0, 246.94, 293.66, 392.0],
    // D major: D3, F#3, A3, D4
    [146.83, 185.0, 220.0, 293.66],
    // G major: G3, B3, D4, B4
    [196.0, 246.94, 293.66, 493.88],
    // A major: A3, C#4, E4, C#5
    [220.0, 277.18, 329.63, 554.37],
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playNote(freq: number, startTime: number, duration: number = 2.4, isRoot: boolean = false) {
    if (!this.ctx || !this.gainNode) return;

    // Dual oscillator for rich, warm rhodes/acoustic chime timbre
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = isRoot ? 'sine' : 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Subtle detune for rich warmth and chorus feel
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.002, startTime);

    // Gentle acoustic bell envelope: quick soft attack, long natural exponential decay
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(isRoot ? 0.28 : 0.16, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc1.start(startTime);
    osc2.start(startTime);

    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  private tick = () => {
    if (!this.isPlaying || !this.ctx) return;

    const chordIndex = Math.floor(this.step / 4) % this.chords.length;
    const noteIndex = this.step % 4;
    const currentChord = this.chords[chordIndex];
    const freq = currentChord[noteIndex];

    const now = this.ctx.currentTime;
    // Play the arpeggio note
    this.playNote(freq, now, 2.2, noteIndex === 0);

    // Play bass pedal note at start of chord
    if (noteIndex === 0) {
      const bassFreq = currentChord[0] / 2;
      this.playNote(bassFreq, now, 3.2, true);
    }

    this.step++;
    // schedule next tick (approx 480ms per 16th/8th note)
    this.timerId = window.setTimeout(this.tick, 490);
  };

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.tick();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new RomanticWeddingAudio();
