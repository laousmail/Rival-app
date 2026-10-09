let audio: AudioContext | null = null

/** Short cue after a tap. Never plays on its own, and never plays while muted. */
export function playCue(kind: 'complete' | 'victory' | 'defeat', muted: boolean): void {
  if (muted || typeof window === 'undefined') return
  const Context = window.AudioContext
  if (!Context) return
  audio ??= new Context()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'square'
  osc.frequency.value = kind === 'defeat' ? 160 : kind === 'victory' ? 520 : 392
  gain.gain.value = 0.04
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + 0.1)
}
