/* 두 배경 레이어를 교차 전환합니다. 저장을 불러오면 해당 장소를 즉시 복원합니다. */
(() => {
  const first = document.querySelector('.scenery');
  const second = first.cloneNode(false);
  first.after(second);
  const layers = [first, second];
  first.style.opacity = '1';
  second.style.opacity = '0';
  let active = 0, current = 'hall';
  const app = document.getElementById('app');
  const catalog = window.VN_ASSETS.backgrounds;
  function frame(layer) {
    const background = catalog[layer.dataset.scene];
    if (!background) return;
    const [x, y] = matchMedia('(max-width: 760px)').matches ? background.mobilePosition : background.position;
    layer.style.backgroundPosition = `${x}% ${y}%`;
    const width = layer.clientWidth, height = layer.clientHeight;
    const coverWidth = Math.max(width, height * background.aspect);
    const coverHeight = coverWidth / background.aspect;
    const anchor = background.effectAnchor || [.64, .65];
    layer.style.setProperty('--glimpse-x', `${(width - coverWidth) * x / 100 + coverWidth * anchor[0]}px`);
    layer.style.setProperty('--glimpse-y', `${(height - coverHeight) * y / 100 + coverHeight * anchor[1]}px`);
    layer.style.setProperty('--glimpse-width', `${coverWidth * .12}px`);
    layer.style.setProperty('--glimpse-height', `${coverHeight * .05}px`);
  }
  function assign(layer, key) {
    layer.dataset.scene = key;
    layer.style.backgroundImage = `url("${catalog[key].src}")`;
    frame(layer);
  }
  assign(first, current);
  const resize = () => layers.forEach(frame);
  if (window.ResizeObserver) new ResizeObserver(resize).observe(app);
  else window.addEventListener('resize', resize);
  window.VN_BACKGROUND = {
    resolve(key = 'hall', period = 'night') {
      return period === 'dusk' ? (catalog[key]?.dusk || key) : key;
    },
    show(key = 'hall', immediate = false) {
      if (key === current) return;
      const background = catalog[key];
      if (!background) throw new Error(`알 수 없는 배경: ${key}`);
      const next = 1 - active;
      if (immediate) layers.forEach(layer => layer.classList.add('background-instant'));
      assign(layers[next], key);
      layers[next].style.opacity = '1';
      layers[active].style.opacity = '0';
      if (immediate) {
        first.getBoundingClientRect();
        layers.forEach(layer => layer.classList.remove('background-instant'));
      }
      active = next;
      current = key;
      app.dataset.background = key;
    }
  };
  app.dataset.background = current;
  Object.values(window.VN_ASSETS.backgrounds).forEach(({ src }) => { const img = new Image(); img.src = src; });
})();
