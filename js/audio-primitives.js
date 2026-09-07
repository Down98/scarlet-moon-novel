/* UI 음과 생활 효과음이 공유하는 짧은 합성음 재료. */
(() => {
  function tone(ctx, output, frequency, duration, volume, type = 'sine', delay = 0, endFrequency = frequency) {
    const at = ctx.currentTime + delay;
    const oscillator = ctx.createOscillator(), gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, at);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, at + duration);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(volume, at + Math.min(.006, duration / 4));
    gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    oscillator.connect(gain); gain.connect(output);
    oscillator.start(at); oscillator.stop(at + duration + .02);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }
  function noise(ctx, output, duration, volume, cutoff, delay = 0) {
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 2;
    const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    source.buffer = buffer; filter.type = 'lowpass'; filter.frequency.value = cutoff; gain.gain.value = volume;
    source.connect(filter); filter.connect(gain); gain.connect(output); source.start(ctx.currentTime + delay);
    source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  }
  window.VN_AUDIO_PRIMITIVES = { tone, noise };
})();
