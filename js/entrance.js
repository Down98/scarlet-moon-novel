/* 대본의 entrance 지시를 인물의 조명/거리 연출로 변환합니다. */
(() => {
  const portrait = document.getElementById('portrait');
  let previousPortrait = null;

  function apply(cue, immediate) {
    portrait.classList.toggle('entrance-instant', immediate);
    if (cue) portrait.dataset.entrance = cue;
    else delete portrait.dataset.entrance;
    if (immediate) {
      // 최종 상태를 확정한 뒤 전환을 다시 허용합니다.
      portrait.getBoundingClientRect();
      portrait.classList.remove('entrance-instant');
    }
  }

  window.VN_ENTRANCE = {
    show(node, restoring = false) {
      const changed = previousPortrait !== node.portrait;
      // 같은 그림으로 다음 대사를 읽어도 진행 중인 접근 연출은 이어집니다.
      if (changed || restoring || node.entrance) {
        apply(node.entrance || null, changed || restoring);
      }
      previousPortrait = node.portrait;
    },
    reset() {
      apply(null, true);
      previousPortrait = null;
    }
  };
})();
