/* 短い音だけを Web Audio で合成。BGM は別のローカル WAV ファイルです。 */
(() => {
  const { tone, noise } = window.VN_AUDIO_PRIMITIVES;
  const play = (ctx, output, name) => {
    const t = (...args) => tone(ctx, output, ...args);
    if (window.VN_AUDIO_FOLEY.play(ctx, output, name)) return;
    if (name === 'hover') t(1180, .055, .04, 'sine', 0, 1480);
    if (name === 'click') { t(900, .045, .06, 'sine', 0, 650); }
    if (name === 'advance') { noise(ctx, output, .075, .075, 2400); t(620, .08, .08, 'sine', 0, 430); }
    if (name === 'choice') { t(659, .14, .065); t(988, .2, .05, 'sine', .065); }
    if (name === 'save') { t(523, .16, .07); t(784, .25, .05, 'sine', .09); }
    if (name === 'knock') for (const delay of [0, .18]) { noise(ctx, output, .09, .18, 650, delay); t(150, .13, .13, 'sine', delay, 80); }
    if (name === 'door') { noise(ctx, output, .5, .15, 380); t(76, .55, .14, 'sine', 0, 42); }
    if (name === 'paper') noise(ctx, output, .27, .075, 3500);
    if (name === 'bell') { t(1319, 1.1, .07); t(2638, .65, .025); }
    if (name === 'glimpse') { t(196, 1.0, .055, 'sine', 0, 185); t(207, .9, .045); }
    if (name === 'timeStop') { t(1760, .35, .045, 'sine', 0, 440); noise(ctx, output, .2, .09, 1800); }
    if (name === 'clock') { t(880, .045, .06); t(660, .05, .04, 'sine', .35); }
    if (name === 'seal') { noise(ctx, output, .45, .14, 1800); [220,330,440].forEach((f, i) => t(f, .5, .045, 'triangle', i * .04, f * .5)); }
  };
  function text(ctx, output, speaker, index) {
    if (!speaker || speaker.includes('속마음')) return;
    const base = speaker === '레밀리아 스칼렛' ? 740 : speaker === '이자요이 사쿠야' ? 580 : speaker === '파츄리 널릿지' ? 490 : speaker === '하쿠레이 레이무' ? 660 : 440;
    tone(ctx, output, base * [1, 1.04, .97, 1.015][index % 4], .031, .035, 'sine', 0, base * .82);
  }
  window.VN_AUDIO_SYNTH = { play, text };
})();
