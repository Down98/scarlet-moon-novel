/* 감정 연출 보정. 기존 장면 ID는 저장 호환성을 위해 유지합니다. */
(() => {
  const { scene, r, n, you, maid } = window.VN_SCRIPT;
  const { nodes, endings } = window.VN_STORY;
  // 가벼운 불평과 경계, 애도를 구별하고 상대 대사에서도 감정을 유지합니다.
  const portraits = {
    'return-9': 'pouting', 'return-16': 'watchful', 'return-17': 'watchful',
    'return-18': 'listening', 'return-19': 'listening', 'offer-trade-0': 'interested',
    'terms-3': 'watchful', 'terms-10': 'watchful', 'offer-distance-0': 'pouting',
    'own-choice-0': 'listening', 'own-choice-1': 'listening',
    'reply-1': 'pouting', 'reply-9': 'reluctant', 'reply-13': 'pouting',
    'guest-ending-12': 'sad', 'guest-ending-13': 'softSmile',
    'outside-story-15': 'sad', 'outside-story-16': 'sad', 'outside-story-17': 'sad',
    'long-memory-3': 'sad', 'long-memory-4': 'sad', 'long-memory-5': 'sad',
    'long-memory-6': 'sad', 'long-memory-7': 'sad',
    'cup-memory-4': 'sad', 'unspoken-name-1': 'sad', 'unspoken-name-2': 'sad',
    'unspoken-name-3': 'reluctant', 'unspoken-name-4': 'watchful', 'unspoken-name-5': 'watchful',
    'unspoken-name-9': 'softSmile', 'unspoken-name-12': 'sad',
    'stopped-second-10': 'reluctant', 'stopped-second-12': 'watchful'
  };
  for (const [id, portrait] of Object.entries(portraits)) nodes[id].portrait = portrait;

  const hurt = {
    'insult-early': [
      n('레밀리아가 눈을 깜빡였다. 화가 난 줄 알았는데, 먼저 사라진 것은 기대하는 듯한 눈빛이었다.', 'sad'),
      r('……그렇게 생각했구나.', 'sad'),
      you('잠깐, 저는 돌아가는 길을…….', 'sad'),
      r('길을 묻는 말과, 사람을 깎아내리는 말은 다르잖아.', 'sad')
    ],
    'insult-house': [
      n('레밀리아의 손이 찻잔 앞에서 멈췄다. 잔을 거두기보다 먼저, 시선이 낮아졌다.', 'sad'),
      r('네가 쉬고 싶다는 방도, 마시려는 차도 그 하인이 준비하는 거야.', 'sad'),
      r('……고맙다는 말까지 바라진 않았어. 그래도 그런 식으로 말할 줄은.', 'sad')
    ],
    'insult-fate': [
      n('책이 천천히 닫혔다. 레밀리아는 대꾸하려다 입술을 다물었다.', 'sad', { sfx: 'paper' }),
      r('……아무것도 모른다고, 처음부터 말했는데.', 'sad'),
      you('지금 장난할 상황이 아니라니까요!', 'sad'),
      r('장난…… 그래. 네 눈에는 그렇게 보였구나.', 'sad')
    ],
    'insult-late': [
      n('봉투를 내밀던 손이 멈췄다. 레밀리아는 내 얼굴을 한 번 더 확인하고, 천천히 손을 거두었다.', 'sad'),
      r('어젯밤 이야기를…… 나는 꽤 오래 듣고 있었는데.', 'sad'),
      you('지금까지 기다렸잖아요.', 'sad'),
      r('……기다린 건 너만이 아니었나 봐.', 'sad')
    ]
  };
  for (const [prefix, rows] of Object.entries(hurt)) {
    rows.forEach((row, index) => Object.assign(nodes[`${prefix}-${index}`], row, { music: 'memory' }));
    nodes[`${prefix}-${rows.length - 1}`].next = 'mistaken-memory-0';
  }
  scene('mistaken-memory', 4, [
    n('그녀는 내 얼굴 너머를 보았다. 조금 전의 말에 대답할 사람을, 이 자리에 없는 누군가에게서 찾는 것처럼.', 'sad'),
    r('내가…… 착각했었나 보네.', 'sad'),
    r('그 애는…….', 'hollow', { effect: 'memory-haze' }),
    n('뒷말은 나오지 않았다. 레밀리아는 무릎 위에서 손을 쥐었다. 누구에게도 들려줄 생각이 없었던 말이 새어 나온 듯했다.', 'hollow'),
    maid('아가씨…….', 'sakuyaTroubled'),
    n('언제부터 곁에 있었는지, 메이드가 낮게 불렀다. 레밀리아는 한동안 그 부름에도 고개를 들지 못했다.', 'sakuyaTroubled'),
    r('……알아. 이 인간은 그 애가 아니야.', 'sad'),
    r('멋대로 겹쳐 본 건 내 잘못이겠지.', 'sad'),
    n('레밀리아가 눈을 들었다. 흐려졌던 시선이 이제는 정확히 내게 닿았다. 슬픔을 눌러 삼킨 자리에 날 선 분노가 남았다.', 'angry', { music: 'exile' }),
    r('하지만 그게, 네 무례까지 받아 주겠다는 뜻은 아니야.', 'furious', { music: 'exile' })
  ], 'expulsion-0', { music: 'memory', chapterTitle: '종장. 닫힌 문', chapterNumber: '—' });

  const rejection = [
    n('레밀리아가 문을 가리켰다. 떨리던 손끝이 곧게 펴졌다.', 'angry'),
    r('나가. 지금 당장.', 'furious'),
    you('밖은 위험하다고 하셨잖아요.', 'angry'),
    r('그래서 경고했어. 그게 내 집과 내 사람을 모욕해도 된다는 허락은 아니야.', 'angry'),
    you('잠깐만요. 방금 말씀하신 그 사람은…….', 'angry'),
    r('그만. 네 입으로 그 애를 묻지 마. 안내도, 손님 대접도 끝이야.', 'furious')
  ];
  rejection.forEach((row, index) => Object.assign(nodes[`expulsion-${index}`], row));
  nodes['eviction-order-0'].portrait = 'angry';
  nodes['eviction-order-1'].portrait = nodes['eviction-order-2'].portrait = 'sakuyaSerious';
  nodes['expulsion-8'].text = '마지막으로 본 것은 고개를 돌리던 그녀의 얼굴이었다. 내가 잃은 것은 돌아갈 길의 안내만이 아니었다. 나를 통해 누군가를 기다렸던 마음도, 이제는 내게 닿지 않을 것이다.';
  endings.expelled.description = '잠깐 겹쳐 보았던 얼굴, 끝내 이어지지 못한 기억.\n그녀는 슬픔을 삼키고, 내게 내어 주었던 자리를 거두었다.';
})();
