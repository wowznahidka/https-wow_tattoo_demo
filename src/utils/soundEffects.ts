// Web Audio API sound synthesizer for studio ambiance, rotary tattoo machine hum, and UI clicks
class StudioSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private machineOscillator: OscillatorNode | null = null;
  private machineGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private isMachineRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Subtle acoustic UI feedback click/tap
  public playClick(freq = 440, duration = 0.04) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Tactile resonant chime for pain map / selection
  public playPulseChime(freq = 520) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  }

  // Rotary tattoo machine subtle atmospheric hum + low pulse
  public toggleMachineHum(enable: boolean) {
    this.isMuted = !enable;
    if (!enable) {
      this.stopMachineHum();
      return;
    }

    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.isMachineRunning) return;

      const now = this.ctx.currentTime;
      
      // Rotary motor fundamental tone (around 85Hz - 110Hz standard tattoo machine frequency)
      this.machineOscillator = this.ctx.createOscillator();
      this.machineGain = this.ctx.createGain();

      this.machineOscillator.type = 'sawtooth';
      this.machineOscillator.frequency.setValueAtTime(92, now);

      // Lowpass filter for smooth organic machine timbre
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);

      this.machineGain.gain.setValueAtTime(0.001, now);
      this.machineGain.gain.linearRampToValueAtTime(0.035, now + 0.8);

      this.machineOscillator.connect(filter);
      filter.connect(this.machineGain);
      this.machineGain.connect(this.ctx.destination);

      this.machineOscillator.start();
      this.isMachineRunning = true;
    } catch {
      // AudioContext blocked until user gesture
    }
  }

  public stopMachineHum() {
    if (this.machineGain && this.ctx) {
      try {
        this.machineGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        setTimeout(() => {
          this.machineOscillator?.stop();
          this.machineOscillator?.disconnect();
          this.machineOscillator = null;
          this.machineGain = null;
          this.isMachineRunning = false;
        }, 350);
      } catch {
        this.isMachineRunning = false;
      }
    } else {
      this.isMachineRunning = false;
    }
  }

  public playMachineHum(durationSeconds = 1.2) {
    this.toggleMachineHum(true);
    setTimeout(() => {
      this.stopMachineHum();
    }, durationSeconds * 1000);
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMachineHum();
    } else {
      this.toggleMachineHum(true);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const studioAudio = new StudioSoundEngine();
