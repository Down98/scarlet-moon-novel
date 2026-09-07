/* 브라우저 저장소를 사용할 수 없는 환경에서도 게임은 계속 실행됩니다. */
(() => {
  // 개정 대본은 별도 저장 영역을 사용합니다. 이전 버전 기록은 삭제하지 않습니다.
  const key = 'scarlet-moon-v2';
  let available = true;
  const audioDefaults = { master: .7, music: .46, effects: .55, text: .25, muted: false };
  let data = { slots: [null, null, null], auto: null, settings: { speed: 32, delay: 2500, audio: { ...audioDefaults } }, endings: [] };
  const valid = value => value && typeof value === 'object' && typeof value.node === 'string'
    && !!window.VN_STORY.nodes[value.node] && !window.VN_STORY.nodes[value.node].route
    && Number.isFinite(value.score) && value.score >= 0 && value.score <= window.VN_STORY.maxScore
    && (value.version === undefined || (Number.isInteger(value.version) && value.version >= 1 && value.version <= window.VN_STORY.version))
    && (value.period === undefined || ['night', 'dusk'].includes(value.period))
    && (value.flags === undefined || (value.flags && typeof value.flags === 'object' && !Array.isArray(value.flags)
      && Object.keys(value.flags).every(key => ['heardEcho', 'ownTomorrow'].includes(key) && typeof value.flags[key] === 'boolean')))
    && Array.isArray(value.history) && value.history.length <= window.VN_STORY.maxHistory
    && value.history.every(item => item && typeof item.speaker === 'string' && typeof item.text === 'string');
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    if (raw && typeof raw === 'object') {
      data.slots = [0, 1, 2].map(i => valid(raw.slots?.[i]) ? raw.slots[i] : null);
      data.auto = valid(raw.auto) ? raw.auto : null;
      data.endings = Array.isArray(raw.endings) ? [...new Set(raw.endings.filter(x => window.VN_STORY.endings[x]))] : [];
      if (Number.isFinite(raw.settings?.speed)) data.settings.speed = Math.max(0, Math.min(65, raw.settings.speed));
      if (Number.isFinite(raw.settings?.delay)) data.settings.delay = Math.max(1500, Math.min(6000, raw.settings.delay));
      for (const setting of ['master', 'music', 'effects', 'text']) {
        const value = raw.settings?.audio?.[setting];
        if (Number.isFinite(value)) data.settings.audio[setting] = Math.max(0, Math.min(1, value));
      }
      if (typeof raw.settings?.audio?.muted === 'boolean') data.settings.audio.muted = raw.settings.audio.muted;
    }
    localStorage.setItem(key, JSON.stringify(data));
  } catch { available = false; }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(data)); available = true; return true; }
    catch { available = false; return false; }
  }
  window.VN_STORAGE = {
    get available() { return available; },
    get data() { return data; },
    valid,
    snapshot(state) { return { version: window.VN_STORY.version, node: state.node, score: state.score, period: state.period || 'night', flags: { ...state.flags }, history: state.history.slice(-window.VN_STORY.maxHistory).map(x => ({ ...x })), date: new Date().toISOString() }; },
    save(state, slot = 'auto') {
      const value = this.snapshot(state);
      if (slot === 'auto') data.auto = value; else data.slots[slot] = value;
      return persist();
    },
    settings(settings) { data.settings = { ...settings }; return persist(); },
    ending(id) { if (!data.endings.includes(id)) data.endings.push(id); return persist(); }
  };
})();
