/* 손님이 떠난 뒤의 시점 전환. 친구의 방문으로 끝나는 정상 배웅 후일담. */
(() => {
  const { scene, r, n } = window.VN_SCRIPT;
  const { nodes } = window.VN_STORY;
  const p = (text, portrait = 'patchouliNormal', extra = {}) => ({ speaker: '파츄리 널릿지', text, portrait, ...extra });

  nodes['maid-reply-4'].portrait = 'sakuyaChiding';
  nodes['call-maid-2'].portrait = 'sakuyaAlarmed';
  nodes['call-maid-3'].portrait = 'sakuyaAlarmed';

  const conversation = () => [
    n('사쿠야와 손님의 발소리가 정원 너머로 멀어졌다. 문이 닫힌 뒤에도 레밀리아는 한동안 빈 현관을 바라보았다.', 'backLook', { sfx: 'door' }),
    n('대홀에 남은 것은 레밀리아뿐이었다. 그녀는 탁자로 돌아와, 손님이 쓰던 받침을 손끝으로 바로 놓았다.', 'reluctant', { sfx: 'cupSet' }),
    n('그때 도서관으로 이어지는 회랑 끝에 그림자 하나가 섰다. 긴 치맛자락, 커다란 모자, 펼쳐 든 책의 윤곽만 어둠 속에서 갈라졌다.', 'patchouliFull', { entrance: 'silhouette' }),
    n('그림자는 책장을 한 장 넘긴 뒤, 느긋하게 대홀 쪽으로 걸어왔다.', 'patchouliFull', { entrance: 'silhouette', sfx: 'paper' }),
    n('작은 발소리가 가까워졌다. 기둥의 그림자를 벗어나자 보랏빛 머리카락과 모자에 달린 초승달 장식이 석양을 받았다.', 'patchouliFull', { entrance: 'reveal', sfx: 'carpetSteps' }),
    n('파츄리 널릿지는 책갈피를 끼우고 레밀리아 앞에 멈췄다. 늘 도서관 안에서 보던, 별다른 표정 없는 얼굴이었다.', 'patchouliFull', { entrance: 'reveal' }),
    r('파체? 웬일로 도서관 밖까지 나왔어?', 'interested'),
    p('차 마시러.'),
    r('종을 울리면 가져다줄 텐데.', 'watchful'),
    p('사쿠야는 방금 나갔잖아.'),
    n('파츄리는 의자를 빼 앉았다. 레밀리아가 찻주전자를 잡는 것을 보고도 책을 다시 펼치지 않았다.', 'patchouliNormal'),
    r('내가 따라 주는 걸 기다리는 거야?', 'pouting'),
    p('주전자를 잡았으니까.', 'patchouliTalking'),
    n('레밀리아는 작게 코웃음을 치고 잔을 채웠다. 파츄리는 당연하다는 듯 두 손으로 잔을 받았다.', 'softSmile', { sfx: 'teaPour' }),
    p('레미. 어젯밤 일은 안 물어봐?', 'patchouliNormal', { music: 'memory' }),
    r('……처음에는 적인 줄 알았어. 또 누가 결투하러 온 줄 알고.', 'reluctant', { music: 'memory' }),
    p('그 인간 말고. 도서관에서 나온 낱장 이야기.', 'patchouliNormal', { music: 'memory' }),
    n('레밀리아의 손이 찻주전자 뚜껑 위에서 멎었다. 파츄리는 입가에 잔을 댄 채 기다렸다.', 'flustered', { music: 'memory' }),
    r('……그쪽 얘기였니.', 'embarrassed', { music: 'memory' }),
    p('네 쪽 이야기도 듣고는 있지만.', 'patchouliSmile', { music: 'memory' }),
    r('일부러 헷갈리게 물었지?', 'teasing', { music: 'memory' }),
    p('네가 먼저 대답했어.', 'patchouliNormal', { music: 'memory' }),
    n('친구의 무표정이 오히려 짓궂을 때가 있었다. 레밀리아는 주전자를 내려놓고 제 잔을 당겼다.', 'pouting', { sfx: 'cupSet', music: 'memory' }),
    p('봉인은 고쳤어. 사쿠야가 가져온 낱장도 원래 책에 넣었고.', 'patchouliTalking', { music: 'memory' }),
    r('다시 나올 수는?', 'listening', { music: 'memory' }),
    p('이번엔 책장까지 묶어 뒀어. 책이 심심하다고 돌아다니는 건 여기까지야.', 'patchouliNormal', { music: 'memory' }),
    p('네 기억을 그런 식으로 건드리게 할 생각은 없었어. 미안해.', 'patchouliSorry', { music: 'memory' }),
    r('알아. 네가 그런 장난을 칠 친구였으면, 진작 네 도서관을 잠갔겠지.', 'softSmile', { music: 'memory' }),
    p('열쇠는 내가 만들었는데.', 'patchouliNormal', { music: 'memory' }),
    n('레밀리아가 웃었다. 파츄리도 그제야 잔 너머로 아주 조금 눈매를 풀었다.', 'softSmile', { music: 'memory' }),
    r('그 책은 누가 듣고 싶어 하는 말을 골랐겠지. ……내가 너무 잘 들어 줬나 봐.', 'sad', { music: 'memory' }),
    p('그 말이 정말 그 사람의 대답이었다면 좋겠다고 생각했어?', 'patchouliNormal', { music: 'memory' }),
    n('레밀리아는 오래된 잔이 놓인 흰 천을 보았다. 이번에는 눈길을 급히 거두지 않았다.', 'sad', { music: 'memory' }),
    r('잠깐은. 그 인간까지 닮아 보였으니까.', 'sad', { music: 'memory' }),
    r('처음에는 잔을 놓는 버릇만 보였어. 나중엔 뜨거운 잔을 옆으로 잡는 게 신경 쓰이더라. ……그 애는 안 그랬거든.', 'reluctant', { music: 'memory' }),
    p('꽤 자세히 봤네.', 'patchouliTalking', { music: 'memory' }),
    r('내 손님이었잖아.', 'slightShy', { music: 'memory' }),
    n('파츄리는 더 캐묻지 않았다. 대신 오래된 잔 옆에 놓인 새 잔을 한 번 보고, 천천히 차를 마셨다.', 'patchouliNormal', { music: 'memory' }),
    r('……차를 마시러 왔다는 말, 전부는 아니지?', 'watchful'),
    p('네가 혼자 남을 것 같아서. 책은 잠깐 덮어도 되니까.', 'patchouliNormal'),
    n('대답에는 위로하는 기색도, 대단한 일을 했다는 기색도 없었다. 그래서 레밀리아도 농담으로 밀어내지 않았다.', 'softSmile'),
    r('그럼 한 잔 더 마셔. 사쿠야가 돌아올 때까진 내가 따라 줄게.', 'softSmile'),
    p('도서관 밖으로 나온 보람이 있네.', 'patchouliSmile')
  ];

  // 엔딩별 마지막 위치를 고정해 중간 저장에서도 원래 엔딩이 정확히 이어집니다.
  // 배드 엔딩은 배웅이 아니므로 이 장면으로 합류하지 않습니다.
  const endings = {
    home: { from: ['home-ending-4', 'formal-farewell-4'], last: '빈 손님 자리는 그대로였다. 레밀리아는 돌아온다는 약속을 보태지 않았다. 지금 맞은편에는, 차가 식기 전에 잔을 내미는 친구가 있었다.' },
    promise: { from: ['promise-ending-10'], last: '다음 방문이 언제일지는 아무도 몰랐다. 레밀리아는 문 쪽을 한 번 보고, 친구의 잔을 채웠다. 기다리는 동안의 저녁까지 비워 둘 필요는 없었다.' },
    guest: { from: ['invitation-story-3', 'invitation-honesty-3'], last: '초대장의 이름은 손님과 함께 문밖으로 나갔다. 오래된 잔도, 새 손님의 잔도 치우지 않은 채, 두 친구의 찻잔 사이로 저녁이 조금 더 흘렀다.' }
  };
  for (const [ending, { from, last }] of Object.entries(endings)) {
    const prefix = `patchouli-${ending}`;
    scene(prefix, 4, [...conversation(), n(last, null, { ending })], null, {
      period: 'dusk', background: 'hall', music: 'tea',
      chapterTitle: '후일담. 책을 덮고 나온 친구', chapterNumber: '—'
    });
    for (const id of from) { delete nodes[id].ending; nodes[id].next = `${prefix}-0`; }
  }
})();
