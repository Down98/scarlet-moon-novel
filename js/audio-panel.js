/* 음량 UI는 대사/저장 패널과 별도로 관리합니다. */
(() => {
  function mount(container, getSettings, commit) {
    const section = document.createElement('section');
    section.className = 'audio-settings';
    section.innerHTML = '<h3>소리</h3><p class="panel-description">작은 소리로 시작합니다. 음악과 대사 소리를 따로 조절할 수 있어요.</p>';
    const controls = [];
    for (const [key, label] of [['master', '전체 음량'], ['music', '배경음악'], ['effects', '클릭 · 장면 효과음'], ['text', '텍스트 소리']]) {
      const row = document.createElement('div'); row.className = 'setting-row';
      const name = document.createElement('label'); name.htmlFor = `audio-${key}`; name.textContent = label;
      const output = document.createElement('small'); name.append(output);
      const input = document.createElement('input'); input.id = `audio-${key}`; input.type = 'range'; input.min = 0; input.max = 100; input.step = 1;
      input.addEventListener('input', () => { commit({ ...getSettings(), [key]: Number(input.value) / 100 }); refresh(); });
      row.append(name, input); section.append(row); controls.push({ key, input, output });
    }
    const actions = document.createElement('div'); actions.className = 'audio-actions';
    const mute = document.createElement('button'); mute.className = 'audio-button';
    mute.addEventListener('click', () => { commit({ ...getSettings(), muted: !getSettings().muted }); refresh(); });
    const preview = document.createElement('button'); preview.className = 'audio-button'; preview.textContent = '효과음 들어보기';
    preview.addEventListener('click', () => { window.VN_AUDIO.unlock(); window.VN_AUDIO.effect('choice'); });
    const playing = document.createElement('p'); playing.className = 'panel-description';
    actions.append(mute, preview); section.append(actions, playing); container.append(section);
    function refresh() {
      const settings = getSettings();
      controls.forEach(({ key, input, output }) => { input.value = Math.round(settings[key] * 100); output.textContent = `${input.value}%`; });
      mute.textContent = settings.muted ? '소리 켜기' : '전체 음소거'; mute.setAttribute('aria-pressed', String(settings.muted));
      preview.disabled = settings.muted || settings.master === 0 || settings.effects === 0;
      playing.textContent = `현재 장면의 음악 · ${window.VN_AUDIO.status.title}`;
    }
    refresh();
    return refresh;
  }
  window.VN_AUDIO_PANEL = { mount };
})();
