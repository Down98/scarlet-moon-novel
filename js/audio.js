/* 파일 직접 열기에서도 재생되는 두 HTMLAudioElement와 독립 효과음 채널. */
(() => {
  'use strict';
  const defaults = { master: .7, music: .46, effects: .55, text: .25, muted: false };
  let preferences = { ...defaults, ...window.VN_STORAGE.data.settings.audio };
  const players = [new Audio(), new Audio()];
  players.forEach(player => { player.loop = true; player.preload = 'none'; player.volume = 0; });
  let desired = 'moon', active = 0, unlocked = false, context, effectGain, textGain;
  let generation = 0, frame, lastText = 0, sceneGain, lastHover = -Infinity;
  const trackKeys = ['', ''];
  const canPlay = () => unlocked && !preferences.muted && !document.hidden;
  const volume = () => preferences.master * preferences.music;
  function emit() { document.dispatchEvent(new CustomEvent('vn-audio-change')); }
  function fail() {
    document.dispatchEvent(new CustomEvent('vn-audio-error', { detail: '음악 파일을 읽지 못했습니다. assets/audio 폴더를 확인해 주세요.' }));
  }
  players.forEach(player => player.addEventListener('error', fail));

  function ramp(token) {
    cancelAnimationFrame(frame);
    const from = players.map(player => player.volume), started = performance.now();
    const tick = now => {
      if (token !== generation) return;
      const progress = Math.min(1, (now - started) / 1400);
      const eased = progress * progress * (3 - 2 * progress);
      players.forEach((player, i) => { player.volume = from[i] + ((i === active ? volume() : 0) - from[i]) * eased; });
      if (progress < 1) frame = requestAnimationFrame(tick);
      else players.forEach((player, i) => { if (i !== active) player.pause(); });
    };
    frame = requestAnimationFrame(tick);
  }
  function startDesired() {
    if (!canPlay()) return;
    const token = ++generation;
    cancelAnimationFrame(frame);
    if (trackKeys[active] !== desired) {
      active = 1 - active;
      players[active].pause();
      players[active].volume = 0;
      players[active].src = `assets/audio/${desired}.wav`;
      trackKeys[active] = desired;
    }
    const result = players[active].play();
    result?.then(() => { if (token === generation && canPlay()) { ramp(token); emit(); } })
      .catch(error => { if (token === generation && error.name !== 'AbortError' && error.name !== 'NotAllowedError') fail(); });
  }
  function unlock() {
    if (!unlocked) unlocked = true;
    if (!context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        try {
          context = new AudioContext(); effectGain = context.createGain(); textGain = context.createGain();
          effectGain.connect(context.destination); textGain.connect(context.destination); updateGains();
        } catch { /* 음악 재생은 Web Audio 지원과 별개로 유지합니다. */ }
      }
    }
    if (context?.state === 'suspended' && !document.hidden) context.resume().catch(() => {});
    if (players[active].paused || trackKeys[active] !== desired) startDesired();
    emit();
  }
  function stopSceneEffects() {
    if (sceneGain) { sceneGain.disconnect(); sceneGain = null; }
  }
  function pause() { stopSceneEffects(); ++generation; cancelAnimationFrame(frame); players.forEach(player => player.pause()); }
  function updateGains() {
    const master = preferences.muted ? 0 : preferences.master;
    if (context && effectGain) {
      effectGain.gain.setTargetAtTime(master * preferences.effects, context.currentTime, .02);
      textGain.gain.setTargetAtTime(master * preferences.text, context.currentTime, .02);
    }
  }
  function configure(value) {
    const wasMuted = preferences.muted;
    preferences = { ...defaults, ...value };
    updateGains();
    if (preferences.muted) pause();
    else if (wasMuted) startDesired();
    else if (canPlay()) ramp(generation);
    emit();
  }
  function music(key) {
    if (!window.VN_AUDIO_CUES.tracks[key] || desired === key) return;
    desired = key; startDesired(); emit();
  }
  function effect(name, scene = false) {
    if (!name || context?.state !== 'running' || !canPlay() || preferences.master <= 0 || preferences.effects <= 0) return;
    if (scene && !sceneGain) { sceneGain = context.createGain(); sceneGain.connect(effectGain); }
    window.VN_AUDIO_SYNTH.play(context, scene ? sceneGain : effectGain, name);
  }
  function text(speaker, char, index) {
    if (!/[\p{L}\p{N}]/u.test(char) || !canPlay() || context?.state !== 'running' || preferences.text === 0) return;
    if (context.currentTime - lastText < .068) return;
    lastText = context.currentTime;
    window.VN_AUDIO_SYNTH.text(context, textGain, speaker, index);
  }
  document.addEventListener('pointerdown', event => { if (!event.target.closest('#sound-toggle')) unlock(); }, { capture: true });
  document.addEventListener('keydown', event => { if (!event.target.closest('#sound-toggle') && !event.repeat && !event.ctrlKey && !event.metaKey && !event.altKey) unlock(); }, { capture: true });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button && !button.disabled && button.id !== 'dialogue' && !button.closest('#choices')) effect('click');
  }, { capture: true });
  document.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const button = event.target.closest('button');
    if (!button || button.disabled || button.id === 'dialogue' || button.contains(event.relatedTarget)) return;
    const now = performance.now();
    if (now - lastHover < 90) return;
    lastHover = now;
    effect('hover');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { pause(); context?.suspend().catch(() => {}); }
    else if (unlocked) { context?.resume().catch(() => {}); startDesired(); }
  });
  window.addEventListener('pagehide', pause);
  window.VN_AUDIO = {
    defaults, unlock, configure, music, effect, text, stopSceneEffects,
    scene(node, restoring) { stopSceneEffects(); music(window.VN_AUDIO_CUES.forNode(node)); if (!restoring) effect(window.VN_AUDIO_CUES.effect(node), true); },
    get status() { return { unlocked, muted: preferences.muted, track: desired, title: window.VN_AUDIO_CUES.tracks[desired],
      playing: !players[active].paused, currentTime: players[active].currentTime, volume: players[active].volume,
      readyState: players[active].readyState, effectsState: context?.state || 'locked' }; }
  };
})();
