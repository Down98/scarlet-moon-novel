/* 대리석/카펫 발걸음과 도자기·차 소리. 외부 샘플 없이 로컬 합성합니다. */
(() => {
  const { tone, noise } = window.VN_AUDIO_PRIMITIVES;
  const names = ['footsteps', 'carpetSteps', 'cupSet', 'cupRattle', 'teaPour'];
  function play(ctx, output, name) {
    if (!names.includes(name)) return false;
    const t = (...args) => tone(ctx, output, ...args);
    const n = (...args) => noise(ctx, output, ...args);
    if (name === 'footsteps' || name === 'carpetSteps') {
      const soft = name === 'carpetSteps';
      [0, .39, .81, 1.22].forEach((delay, i) => {
        const level = [1, .84, .72, .6][i];
        n(.13, level * (soft ? .15 : .22), soft ? 520 : 1550, delay);
        t(soft ? 95 : 145, .16, level * .12, 'sine', delay, 62);
        if (!soft) { n(.035, .09 * level, 3300, delay); t(320, .11, .025 * level, 'sine', delay + .025); }
      });
    }
    const clink = (delay, level) => {
      n(.04, .045 * level, 4800, delay);
      [1640, 2587, 3918].forEach((f, i) => t(f, [.48, .27, .16][i], [.10, .042, .017][i] * level, 'sine', delay));
      t(230, .09, .07 * level, 'sine', delay, 165);
    };
    if (name === 'cupSet') clink(0, 1);
    if (name === 'cupRattle') { clink(0, .85); clink(.12, .65); clink(.28, .4); }
    if (name === 'teaPour') {
      for (let i = 0; i < 12; i++) {
        const delay = i * .075;
        n(.16, .045, 1800 + i * 70, delay);
        t(520 + (i % 4) * 83, .065, .025, 'sine', delay, 360 + i * 16);
      }
      clink(1.04, .35);
    }
    return true;
  }
  window.VN_AUDIO_FOLEY = { play, names };
})();
