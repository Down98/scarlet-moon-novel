/* 옛 인간의 대역이 아닌, 이번 손님과의 작별. 두 답변 모두 존중합니다. */
(() => {
  const { scene, r, n, you, maid, route } = window.VN_SCRIPT;
  const { nodes, endings } = window.VN_STORY;
  scene('different-tomorrow', 4, [
    n('사쿠야가 현관 쪽으로 먼저 걸었다. 레밀리아는 탁자 위의 빈 받침을 손끝으로 밀었다.', 'normal'),
    r('돌아갈 수 있게 되면, 차가 식기 전에…….', 'softSmile'),
    n('그녀가 스스로 말을 끊었다. 손끝이 받침 가장자리에서 멎었다.', 'sad'),
    n('어젯밤 종이가 따라 했던 말이었다. 이제는 그 말이 누구를 기다리게 했는지, 조금 알 것 같았다.', 'sad'),
    maid('아가씨…….', 'sakuyaTroubled'),
    r('알아, 사쿠야. 이번에는 알아.', 'thinking'),
    n('레밀리아가 나를 보았다. 겹쳐 보던 얼굴이 사라지기를 기다리는 것처럼, 천천히.', 'listening'),
    r('너는 그 인간이 아니지.', 'sad'),
    you('네.'),
    r('그런데도 그 말을 먼저 하려 했네. ……우스운 일이지.', 'reluctant'),
    n('웃어넘길 틈은 있었다. 그렇지만 이번에는, 내 말로 대답하고 싶었다.', 'listening', { choices: [
      { text: '돌아온다면 제 이야기를 가져올게요. 그분의 뒷이야기 말고요.', next: 'my-own-story-0', points: 0, flags: { ownTomorrow: true } },
      { text: '돌아오겠다는 약속은 못 해요. 그래도 오늘 일은 기억할게요.', next: 'an-honest-goodbye-0', points: 0, flags: { ownTomorrow: false } }
    ] })
  ], null, { music: 'memory' });
  nodes['employment-27'].next = 'different-tomorrow-0';

  scene('my-own-story', 4, [
    r('너한테는 너만큼 시끄러운 이야기가 어울리겠지.', 'softSmile'),
    you('그렇게 시끄러웠나요?'),
    r('차를 세 번이나 더 내게 했어. 사쿠야가 셌을 거야.', 'teasing'),
    maid('찻잔은 제가 세었습니다. 이야기는 아가씨께서 기억하고 계시겠지요.', 'sakuyaSmile'),
    r('……사쿠야.', 'flustered'),
    n('메이드는 이번에는 시선을 피하지 않고 미소 지었다.', 'sakuyaSmile')
  ], 'name-before-leaving-0', { music: 'departure' });
  scene('an-honest-goodbye', 4, [
    r('흥. 끝까지 듣기 좋은 말은 안 해 주네.', 'pouting'),
    you('돌아가는 건 무녀께 부탁해도, 다시 찾아오는 길은 아직 모르니까요.'),
    n('레밀리아가 잠깐 눈을 감았다. 어젯밤 내게 했던 말을 기억한 듯했다.', 'thinking'),
    r('……배운 건 있구나.', 'softSmile'),
    maid('출발 시간까지는 아직 여유가 있습니다, 아가씨.', 'sakuyaSmile'),
    n('서두르라는 말이 아니었다. 레밀리아도 그것을 알아들은 듯, 받침에서 손을 뗐다.', 'slightShy')
  ], 'name-before-leaving-0', { music: 'departure' });

  scene('name-before-leaving', 4, [
    r('이름.', 'normal'),
    you('네?'),
    r('이방인이라고만 부르면 다음에 또 그렇게 부르게 될 것 같아서. 네 이름을 말해 봐.', 'listening'),
    n('나는 내 이름을 말했다. 레밀리아는 한 번만, 정확하게 따라 불렀다.', 'softSmile'),
    r('……됐어. 잊어버리면 네가 다시 말하면 되겠지.', 'slightShy'),
    n('사쿠야가 고개를 숙였다. 그 순간만큼은 주인의 표정을 다른 사람에게 보이고 싶지 않은 듯했다.', 'sakuyaSmile'),
    n('탁자 한쪽에는 흰 천에 놓인 오래된 잔이 있었다. 그 옆에는, 내가 쓰던 새 잔이 조금 떨어져 놓여 있었다.', null)
  ], 'farewell-5', { music: 'departure' });
  nodes['farewell-5'].text = '두 찻잔을 뒤로하고 봉투를 챙겼다. 이제는 누군가의 오래된 인사 대신, 오늘의 마지막 인사를 고를 차례였다.';

  // 같은 엔딩에서도 선택한 말이 돌아옵니다. 플래그는 저장/불러오기에 포함됩니다.
  delete nodes['guest-ending-13'].ending;
  nodes['guest-ending-13'].next = 'invitation-memory-check';
  route('invitation-memory-check', 0, 'invitation-story-0', 'invitation-honesty-0', 'ownTomorrow');
  scene('invitation-story', 4, [
    r('다음 이야기는 네 거라고 했지. 제목부터 다른 걸로 해.', 'softSmile'),
    you('그럼, 길을 잃지 않고 찾아온 밤은 어때요?'),
    r('후후. 시작부터 꽤 어려운 이야기네.', 'laugh'),
    n('사쿠야가 문을 열었다. 이번에는 누군가와 닮았기 때문이 아니라, 내가 내 이야기를 하러 돌아올 자리가 생겼다.', null, { ending: 'guest' })
  ], null, { music: 'departure' });
  scene('invitation-honesty', 4, [
    r('약속은 못 한다고 했지. 그럼 이건 약속 대신 귀환 준비를 기다리는 동안 쓰는 거야.', 'softSmile'),
    you('받아도 되는 건가요?'),
    r('내가 네 이름까지 적게 했잖아. 두 번 일하게 하지 마.', 'pouting'),
    n('나는 봉투를 접지 않고 품에 넣었다. 지킬 수 없는 약속을 하지 않아도, 문이 열리는 날은 있었다.', null, { ending: 'guest' })
  ], null, { music: 'departure' });
  endings.guest.note = '오래된 잔은 그대로 두었다. 새 손님의 잔은 그 옆에 놓았다.';
  endings.promise.note = '이번에는, 네 이름으로 문을 두드려.';
})();
