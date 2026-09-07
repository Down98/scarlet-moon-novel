/* 기존 대사 ID 사이에 원인·이동·회수 장면을 연결합니다. */
(() => {
  const { scene, r, n, you, maid } = window.VN_SCRIPT;
  const { nodes } = window.VN_STORY;
  function insert(after, prefix, chapter, rows, presentation = {}) {
    const next = nodes[after].next;
    scene(prefix, chapter, rows, next, presentation);
    nodes[after].next = `${prefix}-0`;
  }
  insert('intro-23', 'a-familiar-pause', 0, [
    you('길만 여쭤보고 갈 생각이었어요. 먼저 허락을 받았어야 했는데…….', 'normal'),
    n('레밀리아가 대답하려다 멈췄다. 문 앞을 돌아보는 내 몸짓에서, 뜻밖의 것을 본 얼굴이었다.', 'listening'),
    r('……길만 묻고 간다더니.', 'sad'),
    you('네? 제가 뭐라고 잘못 말했나요?', 'sad'),
    r('아니. 네 용건부터 마저 말해.', 'watchful')
  ]);
  insert('cup-memory-22', 'tea-before-dispatch', 2, [
    maid('그럼 신사로 다녀오겠습니다. 무녀께서 주무시면 날이 밝기를 기다려 답을 받겠습니다.', 'sakuyaNormal'),
    r('메이링에게도 전해. 문은 안쪽에서 다시 잠그고, 창가의 기척도 확인하라고.', 'watchful'),
    maid('이미 정문으로 돌아왔다는 보고가 있었습니다. 파츄리 님은 남은 낱장과 책등을 살피고 계십니다.', 'sakuyaSerious'),
    r('파체한테는 이따 차 한 잔 하라고 해. 제본만 하다 찻주전자까지 책으로 착각하겠어.', 'softSmile'),
    n('사쿠야가 편지를 확인하고 대홀을 나갔다. 현관 쪽 발소리가 멀어진 뒤, 레밀리아가 내 쪽으로 몸을 돌렸다.', 'normal', { sfx: 'footsteps' })
  ], { music: 'tea' });
  // 이 선택 당시 사쿠야는 신사에 있습니다. 돌아오기 전에는 추방을 집행하지 않습니다.
  insert('insult-fate-3', 'an-unread-reply', 3, [
    n('레밀리아는 더 대답하지 않았다. 내가 변명할 말을 찾는 동안, 시계추만 같은 자리를 오갔다.', 'sad'),
    n('얼마나 지났을까. 바깥문이 열리는 소리가 났다. 돌아온 메이드는 답신 봉투를 꺼내려다, 대홀의 침묵을 보고 손을 멈췄다.', 'sakuyaTroubled', { sfx: 'door' })
  ], { music: 'memory' });
  insert('unspoken-name-11', 'what-the-maid-knows', 3, [
    you('사쿠야 씨도 그분을 아세요?', 'sad'),
    r('그 잔을 어디에 놓아야 하는지는 알아. 내가 치우라는 말을 하지 않았다는 것도.', 'reluctant'),
    n('누구를 기억하는지는 말하지 않고, 지금 곁에 있는 사람이 지켜 준 것만 이야기했다.', 'sad')
  ], { music: 'memory' });
  insert('stopped-second-22', 'an-echo-is-not-an-answer', 4, [
    you('그럼 저한테 말을 건 것도, 제가 아는 사람이라서가 아니고요?', 'listening'),
    r('대답이 돌아오는 쪽으로 간 거야. 네가 불안해서 귀를 기울였든, 내가 잠깐 멈춰 섰든.', 'reluctant'),
    r('그 종이가 널 여기 데려온 건 아니야. 바깥으로 통하는 경계를 여는 일과는 다른 마법이니까.', 'listening')
  ], { background: 'guestroom', music: 'unease' });
  insert('after-rest-7', 'a-mended-binding', 4, [
    maid('파츄리 님께서 회수를 마치셨습니다. 손님방에 남은 문양도 지웠습니다.', 'sakuyaNormal'),
    you('그 붉은빛도 종이 때문이었을까요?', 'sakuyaNormal'),
    maid('같은 빛을 보셨을 수는 있습니다. 침구에는 이상이 없었습니다. 확인하지 못한 것까지 단정하지는 않겠습니다.', 'sakuyaNormal'),
    r('들었지. 이제 네가 챙길 건 종잇조각 말고 이 봉투야.', 'softSmile')
  ], { period: 'dusk', music: 'departure' });
  for (const ending of ['home', 'promise', 'guest']) {
    const p = (text, portrait = 'patchouliNormal') => ({ speaker: '파츄리 널릿지', text, portrait });
    insert(`patchouli-${ending}-25`, `binding-${ending}`, 4, [
      p('오래된 소리를 기록해 둔 책이야. 상한 책등을 갈다가 봉인실이 끊어졌어.', 'patchouliTalking'),
      p('흩어진 낱장은 대답을 찾아 움직였고. 메이링이 창밖에서 돌려보낸 한 장을 끝까지 회수하지 못했지.', 'patchouliSorry'),
      r('그 애가 했던 말도 그 안에 있었겠네.', 'sad'),
      p('기록에는 있었어. 그 뒤에 이어 붙인 말까지 그 사람의 말인 건 아니고.'),
      n('레밀리아는 고개를 끄덕였다. 답을 들을 수 없는 사람의 목소리에, 새 대답을 시켰던 것은 종이 쪽이었다.', 'sad')
    ], { period: 'dusk', background: 'hall', music: 'memory', chapterTitle: '후일담. 책을 덮고 나온 친구', chapterNumber: '—' });
  }
})();
