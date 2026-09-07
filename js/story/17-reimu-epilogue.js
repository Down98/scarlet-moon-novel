/* 물건은 먼저 신사로, 손님은 배웅 뒤에. 레이무의 추측은 아직 답이 아닙니다. */
(() => {
  const { scene, r, n, you, maid } = window.VN_SCRIPT;
  const { nodes, endings } = window.VN_STORY;
  const reimu = (text, portrait = 'reimuNormal', extra = {}) => ({ speaker: '하쿠레이 레이무', text, portrait, ...extra });
  const thought = (text, portrait = 'reimuThinking', extra = {}) => ({ speaker: '레이무 · 속마음', text, portrait, ...extra });

  const next = nodes['maid-letter-3'].next;
  scene('a-thread-in-the-letter', 1, [
    you('사진 말고 이것도 있어요. 그 문 같은 곳을 지난 뒤에 소매에 걸려 있었는데요.', 'sakuyaNormal'),
    n('접어 둔 손수건을 폈다. 빛바랜 매듭끈 한 토막이 나왔다. 장식인지, 떨어진 부적의 일부인지 알 수 없었다.', null),
    maid('원래 가지고 계시던 물건은 아니군요. 무녀께 먼저 보여 드려도 되겠습니까?', 'sakuyaSerious'),
    you('네. 어디서 붙었는지 알 수 있다면 부탁드릴게요.', 'sakuyaNormal'),
    n('사쿠야는 끈을 새 종이에 따로 싸고, 발견한 경위를 적었다. 편지와 섞이지 않도록 작은 꾸러미를 봉투 곁에 챙겼다.', 'sakuyaNormal', { sfx: 'paper' }),
    r('다음엔 모르는 물건이 붙었으면 먼저 말해. 주머니 속까지 내가 알아맞힐 수는 없으니까.', 'watchful')
  ], next);
  nodes['maid-letter-3'].next = 'a-thread-in-the-letter-0';
  // 물건은 새벽의 첫 방문에 전달되어, 저녁까지 레이무가 보관합니다.
  nodes['maid-reply-0'].text = '다녀왔습니다. 신사에서 받은 답신입니다. 매듭끈은 무녀께서 직접 살펴보겠다며 맡아 두셨습니다.';
  nodes['reply-5'].text = '네가 본 문과 종이, 소매에 붙었던 끈을 함께 확인하겠대. 표식이 있던 곳부터 낮에 살펴보겠다네.';

  const rows = () => [
    n('같은 시각, 하쿠레이 신사. 세전함 앞에는 참배객 대신 저녁 그림자가 길게 누워 있었다.', null),
    n('레이무는 툇마루에 앉아 옆에 놓인 종이 꾸러미를 풀었다. 새벽에 사쿠야가 편지와 함께 가져온 매듭끈이었다.', 'reimuNormal', { sfx: 'paper' }),
    reimu('표식은 바람에 닳아 있고, 남은 건 이것뿐이라…….', 'reimuThinking'),
    thought('바깥에서 넘어온 인간에게 붙어 있었다고 했지.'),
    thought('그런데 이건 낯설지가 않아. 이쪽 세계에 오래 남아 있던 것 같은…… 잔재.'),
    n('끈은 아무 소리도 내지 않았다. 레이무는 손가락을 가까이 댔다가 멈췄다. 무엇이 익숙한지 이름을 붙이려 할수록 감각이 흐려졌다.', 'reimuThinking'),
    thought('어디서 느꼈더라. 물건에 밴 건지, 그걸 거쳐 간 누군가의 흔적인지.', 'reimuEyesClosed', { music: 'memory' }),
    thought('과거에…… 죽은 사람이 다시 돌아올 수 있나?', 'reimuEyesClosed', { music: 'memory' }),
    thought('몸이 돌아온 게 아니라…… 영혼이 전생한 거라면?', 'reimuThinking', { music: 'memory' }),
    thought('하지만 익숙한 기척 하나로 같은 영혼이라고 할 수는 없지. 오래된 물건이 다른 사람에게 묻어 온 걸 수도 있고.', 'reimuEyesClosed', { music: 'memory' }),
    n('편지에는 길을 잃었다는 사정만 적혀 있었다. 레이무는 모르는 얼굴에 옛 이름을 붙이려던 생각을 멈췄다.', 'reimuThinking', { music: 'memory' }),
    reimu('아, 직접 봐야지 알 수 있는데, 이런 건…….', 'reimuStopThinking', { music: 'tea' }),
    reimu('본인을 만나 보지도 않고 뭘 이렇게 생각해.', 'reimuSigh', { music: 'tea' }),
    n('그녀는 끈을 다시 종이 안에 접어 넣었다. 단서 하나를 얻었다고, 답까지 얻은 것은 아니었다.', 'reimuNormal', { sfx: 'paper', music: 'tea' }),
    reimu('……언제 오는 거지.', 'reimuBored', { music: 'tea' }),
    n('참배길 아래를 내다보았다. 올라오는 사람은 없고, 나뭇잎 스치는 소리만 돌계단을 타고 왔다.', 'reimuBored', { music: 'tea' }),
    reimu('해 지고 오라고는 했지만. 기다리는 쪽 시간도 생각해 주면 좋겠네.', 'reimuBored', { music: 'tea' }),
    n('레이무는 턱을 괴었다. 조금 전까지 생과 사를 헤아리던 눈이, 이제는 빈 세전함 쪽으로 느리게 돌아갔다.', 'reimuBored', { music: 'tea' }),
    reimu('오는 김에 동전이라도 한 닢 넣고 가려나…….', 'reimuSigh', { music: 'tea' }),
    n('이내 고개가 하늘 쪽으로 기울었다. 처마 너머에서 저녁 구름이 천천히 갈라지고 있었다.', 'reimuNormal', { music: 'departure' }),
    n('시선은 신사의 지붕을 지나, 아직 빛이 남은 하늘로 올라갔다. 멀리 뜬 달 아래로 바람이 흘렀다.', null, { background: 'shrineSky', framing: 'sky', music: 'departure' }),
    n('신사로 이어지는 길에는 아직 발소리가 닿지 않았다. 답을 듣게 될 밤은, 이제 막 시작되고 있었다.', null, { background: 'shrineSky', framing: 'sky', music: 'departure' })
  ];
  for (const ending of ['home', 'promise', 'guest']) {
    const previous = Object.values(nodes).find(node => node.id.startsWith(`patchouli-${ending}-`) && node.ending === ending);
    if (!previous) throw new Error(`레이무 에필로그 연결점 없음: ${ending}`);
    const prefix = `reimu-${ending}`, dialogue = rows();
    dialogue[dialogue.length - 1].ending = ending;
    scene(prefix, 4, dialogue, null, {
      period: 'dusk', background: 'shrine', narrator: '신사의 저녁', music: 'unease',
      chapterTitle: '에필로그. 아직 오지 않은 대답', chapterNumber: '—'
    });
    delete previous.ending; previous.next = `${prefix}-0`;
    endings[ending].continued = true;
  }
})();
