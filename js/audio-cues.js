/* 대본의 명시적 music/sfx가 기본 장면 분류보다 우선합니다. */
(() => {
  const tracks = {
    moon: '붉은 달의 초대', mist: '호수로 돌아가는 안개', scarlet: '작은 주인의 왈츠',
    tea: '식지 않은 찻잔', memory: '두 번째 찻잔', unease: '닫힌 책장',
    departure: '네 이름으로 두드리는 문', exile: '응답 없는 문'
  };
  function forNode(node) {
    if (node.music) return node.music;
    if (/^(expulsion|eviction|insult)-/.test(node.id)) return 'exile';
    if (node.background === 'guestroom') return 'unease';
    if (node.background === 'distant' || node.background === 'doorstep') return 'mist';
    if (node.chapter === 0 || node.chapter === 1) return 'scarlet';
    if (node.chapter === 2) return 'tea';
    if (/^(long-memory|honest-answer|quiet-answer)-/.test(node.id)) return 'memory';
    if (node.chapter === 3) return 'unease';
    if (/^(reply|maid-reply|maid-room)-/.test(node.id)) return 'scarlet';
    return 'departure';
  }
  const effects = { 'doorstep-1': 'knock', 'doorstep-7': 'door', 'intro-0': 'door',
    'letter-plan-0': 'bell', 'maid-arrival-0': 'timeStop', 'reply-0': 'paper',
    'room-glimpse-0': 'glimpse', 'eviction-door-0': 'timeStop', 'expulsion-7': 'door',
    'intro-4': 'footsteps', 'letter-plan-2': 'footsteps', 'guestroom-0': 'carpetSteps',
    'after-rest-1': 'footsteps', 'maid-tea-0': 'cupRattle', 'maid-tea-1': 'teaPour',
    'accept-terms-1': 'cupSet', 'negotiate-3': 'cupSet', 'outside-story-12': 'cupRattle',
    'praise-7': 'teaPour', 'long-memory-7': 'cupSet', 'cup-memory-0': 'cupSet',
    'cup-memory-18': 'cupSet', 'quiet-answer-2': 'paper', 'maid-letter-4': 'paper' };
  window.VN_AUDIO_CUES = { tracks, forNode, effect: node => node.sfx || effects[node.id] };
})();
