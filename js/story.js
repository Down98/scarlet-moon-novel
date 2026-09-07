/* 장별 대본이 공유하는 등록부. 모든 파일은 로컬 HTML에서도 동작합니다. */
(() => {
  const { assets, squarePortraits, portraits, backgrounds } = window.VN_ASSETS;
  const chapters = ['01. 뜻밖의 방문자', '02. 돌아가는 방법', '03. 머무르는 조건', '04. 끝나지 않는 밤', '05. 답신과 작별'];
  const nodes = {}, endings = {};
  const line = (speaker, text, portrait = 'normal', extra = {}) => ({ speaker, text, portrait, ...extra });
  const r = (text, portrait, extra) => line('레밀리아 스칼렛', text, portrait, extra);
  const n = (text, portrait, extra) => line('', text, portrait, extra);
  const you = (text, portrait, extra) => line('당신', text, portrait, extra);
  const maid = (text, portrait = 'sakuyaNormal', extra) => line('이자요이 사쿠야', text, portrait, extra);
  const thought = (text, portrait = null, extra) => line('당신 · 속마음', text, portrait, extra);
  function scene(prefix, chapter, rows, next, presentation = {}) {
    rows.forEach((row, i) => {
      const id = row.id || `${prefix}-${i}`;
      if (nodes[id]) throw new Error(`중복된 대본 위치: ${id}`);
      nodes[id] = { id, chapter, ...presentation, ...row, next: row.next || (i < rows.length - 1 ? (rows[i + 1].id || `${prefix}-${i + 1}`) : next) };
    });
  }
  function route(id, minimum, accepted, declined, flag = null) {
    if (nodes[id]) throw new Error(`중복된 대본 위치: ${id}`);
    nodes[id] = { id, route: true, minimum, accepted, declined, flag };
  }
  function resolve(id, score, flags = {}) {
    const node = nodes[id];
    return node?.route ? ((node.flag ? flags[node.flag] : score >= node.minimum) ? node.accepted : node.declined) : id;
  }
  window.VN_SCRIPT = { scene, r, n, you, maid, thought, route };
  window.VN_STORY = { version: 4, assets, portraits, backgrounds, squarePortraits, chapters, nodes, endings, resolve, maxScore: 12, maxHistory: 1200, start: 'approach-0' };
})();
