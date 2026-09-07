/* 타이틀 입력은 준비가 끝나거나 사용자가 누락을 확인할 때만 허용합니다. */
(() => {
  const $ = id => document.getElementById(id);
  const screen = $('loading-screen'), app = $('app');
  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    screen.setAttribute('aria-busy', 'false');
    screen.classList.add('leaving');
    setTimeout(() => {
      screen.hidden = true; app.inert = false; app.removeAttribute('aria-hidden');
      $('start').focus({ preventScroll: true });
      document.dispatchEvent(new Event('vn-assets-ready'));
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500);
  }
  async function load() {
    $('loading-actions').hidden = true;
    screen.setAttribute('aria-busy', 'true');
    const result = await VN_PRELOAD.run(({ total, completed, label }) => {
      const percent = Math.floor(completed / total * 100);
      $('loading-progress').value = percent;
      $('loading-percent').textContent = `${percent}%`;
      $('loading-count').textContent = `${total}개 중 ${completed}개 준비 완료`;
      $('loading-status').textContent = `${label}을 불러오고 있습니다.`;
    });
    screen.setAttribute('aria-busy', 'false');
    if (result.failures.length) {
      $('loading-status').textContent = `${result.failures.length}개 파일을 불러오지 못했습니다. 연결을 확인한 뒤 다시 시도해 주세요.`;
      $('loading-actions').hidden = false;
      $('loading-retry').focus({ preventScroll: true });
    } else {
      $('loading-status').textContent = '준비가 끝났습니다. 붉은 밤에 오신 것을 환영합니다.';
      finish();
    }
  }
  $('loading-retry').addEventListener('click', load);
  $('loading-skip').addEventListener('click', finish);
  load();
})();
