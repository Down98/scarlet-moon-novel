/* 사쿠야의 등장, 업무 대화, 안내. 기존 장면 사이에 연결해 저장 위치를 유지합니다. */
(() => {
  const { scene, r, n, you, maid } = window.VN_SCRIPT;
  const nodes = window.VN_STORY.nodes;

  scene('maid-arrival', 1, [
    maid('부르셨습니까, 아가씨.'),
    n('은빛 머리의 메이드가 고개를 숙였다. 종이와 펜을 내려놓는 손끝에 군더더기가 없었다.', 'sakuyaNormal'),
    maid('그런데 이분은…… 누구의 안내로 들어오셨습니까?', 'sakuyaSuspicious'),
    you('아무도 안 계셔서요. 노크도 하고 불러 봤는데 대답이 없어서…….', 'sakuyaSuspicious'),
    r('메이링이 자리를 비웠대. 그 얘기는 이따가 하지.'),
    maid('……돌아오는 대로 확인하겠습니다.', 'sakuyaTroubled'),
    r('지금은 레이무에게 맡길 일이 있어. 이 인간이 바깥으로 돌아가고 싶다나.'),
    maid('이자요이 사쿠야입니다. 홍마관의 메이드장을 맡고 있습니다. 아가씨께서 말씀하시는 동안 잠시 기다려 주시겠어요?', 'sakuyaNormal')
  ], 'letter-plan-3');
  nodes['letter-plan-2'].text = '복도에서 발소리가 한 번 들렸다. 고개를 돌렸을 때는 은빛 머리의 메이드가 탁자 곁에 서 있었다.';
  nodes['letter-plan-2'].next = 'maid-arrival-0';
  nodes['letter-plan-3'].text = '심부름까지 부탁드리게 됐네요. 죄송합니다.';
  nodes['letter-plan-3'].portrait = 'sakuyaNormal';
  nodes['letter-plan-4'].text = '인사는 그 정도면 됐어. 네가 들어오기 직전에 본 걸 순서대로 말해 봐.';

  scene('maid-letter', 1, [
    r('사쿠야, 이걸 신사로. 직접 답을 듣고 와. 이 인간은 그동안 여기 두겠어.'),
    maid('알겠습니다. 돌아오실 곳을 확인할 만한 소지품이 있으시면 챙겨 두십시오.', 'sakuyaSerious'),
    you('휴대전화에 사진이 있긴 한데…… 통신은 안 돼요.', 'sakuyaSerious'),
    maid('지금 다른 곳으로 전할 수 있는지는 모르겠습니다. 다만 무녀께 보여 드릴 단서는 되겠지요.', 'sakuyaSerious'),
    n('사쿠야는 편지를 접어 품에 넣었다. 불가능한 일을 쉽게 약속하지 않는 말투는 이 집의 주인과 닮아 있었다.', 'sakuyaNormal'),
    maid('차를 한 번 더 준비한 뒤 신사로 가겠습니다. 그동안 아가씨께 실례가 없도록 부탁드립니다.', 'sakuyaNormal')
  ], 'terms-0');
  nodes['letter-plan-14'].next = 'maid-letter-0';

  scene('maid-tea', 2, [
    n('출발 준비를 마친 사쿠야가 작은 쟁반을 들고 돌아왔다. 새 찻잔과 따뜻한 주전자가 놓였다.', 'sakuyaSmile'),
    maid('차가 식기 전에 한 잔 더 준비했습니다. 설탕은 이쪽입니다.', 'sakuyaSmile'),
    you('고맙습니다. 편지 전하러 가시는 데 늦어지는 건 아니에요?', 'sakuyaSmile'),
    maid('제 일의 순서는 제가 정합니다. 손님께서는 찻잔부터 내려놓으셔도 괜찮습니다.', 'sakuyaNormal'),
    n('긴장한 채 빈 잔을 쥐고 있었다는 걸 그제야 알아차렸다.', 'sakuyaNormal'),
    r('사쿠야. 내 차도.'),
    maid('이미 오른편에 놓아 두었습니다, 아가씨.', 'sakuyaSmile'),
    n('레밀리아가 오른쪽을 보았다. 사쿠야는 더 설명하지 않고 조용히 물러났다.', 'normal')
  ], 'outside-story-0');
  nodes['accept-terms-2'].next = 'maid-tea-0';
  nodes['negotiate-3'].next = 'maid-tea-0';

  scene('maid-reply', 4, [
    maid('다녀왔습니다. 하쿠레이 신사에서 받은 답신입니다.', 'sakuyaNormal'),
    you('레이무 씨를 만나셨어요?', 'sakuyaNormal'),
    maid('예. 먼저 편지를 읽으시고, 필요한 준비를 하시면 됩니다.', 'sakuyaSerious'),
    r('그 무녀, 깨웠다고 불평하진 않았니?'),
    maid('그 말씀도 전해 드려야 할까요?', 'sakuyaTroubled'),
    r('……편지만 줘.'),
    n('사쿠야가 봉투를 내밀었다. 두 사람의 대화만으로도 신사에서 어떤 인사를 받았는지 조금 짐작할 수 있었다.', 'sakuyaNormal')
  ], 'reply-0');
  nodes['long-memory-15'].next = 'maid-reply-0';

  scene('maid-room', 4, [
    maid('손님방은 준비해 두었습니다. 안내해 드리겠습니다.', 'sakuyaSmile'),
    you('저 때문에 일이 많이 늘었네요.', 'sakuyaSmile'),
    maid('아가씨께서 허락하신 일입니다. 그 허락을 불편하게 만들지만 않으시면 됩니다.', 'sakuyaNormal'),
    you('닫힌 문은 열지 말라고 하셨어요. 다른 것도 조심할 게 있나요?', 'sakuyaNormal'),
    maid('아는 목소리가 들려도 다른 방에 들어가지 마십시오. 도움이 필요하면 방의 종을 울려 주세요.', 'sakuyaSerious'),
    you('……알겠습니다.', 'sakuyaSerious'),
    r('사쿠야. 너무 길게 설명하지 마. 난 이제 잘 거야.'),
    maid('예, 아가씨. 편히 쉬십시오.', 'sakuyaSmile')
  ], 'after-rest-0');
  nodes['reply-24'].next = 'maid-room-0';

  scene('maid-departure', 4, [
    maid('신사로 출발할 준비가 되었습니다. 두고 가시는 물건은 없습니까?', 'sakuyaNormal'),
    you('네. 휴대전화도 챙겼어요.', 'sakuyaNormal'),
    maid('밖에서는 제 안내를 따라 주세요. 길을 안다고 생각되셔도 혼자 움직이지 마시고요.', 'sakuyaSerious'),
    n('처음 만났을 때의 의심은 사라졌지만, 사쿠야의 안내에는 여전히 빈틈이 없었다.', 'sakuyaNormal')
  ], 'farewell-0');
  nodes['thanks-plan-2'].next = 'maid-departure-0';
  nodes['thanks-truth-4'].next = 'maid-departure-0';

  scene('eviction-order', 4, [
    r('사쿠야. 이자를 밖으로 내보내. 더는 손님이 아니야.', 'disdain'),
    maid('분부대로 하겠습니다, 아가씨.', 'sakuyaNormal'),
    you('잠깐만요. 아직 할 말이…….', 'sakuyaNormal'),
    n('메이드가 내 앞을 가로막았다. 미소가 사라진 얼굴을 마주한 순간, 남은 말이 목 안에서 멎었다.', 'sakuyaCold')
  ], 'eviction-door-0');
  nodes['expulsion-5'].next = 'eviction-order-0';

  scene('eviction-door', 4, [
    n('사쿠야가 손목을 잡았다. 눈을 한 번 깜빡였을 뿐인데, 발밑의 대리석이 차가운 돌계단으로 바뀌어 있었다.', 'sakuyaCold'),
    maid('안내는 여기까지입니다.', 'sakuyaCold'),
    you('다시 한 번만 아가씨께 말씀드리게 해 주세요.', 'sakuyaCold'),
    maid('아가씨의 결정은 내려졌습니다. 돌아가십시오.', 'sakuyaCold'),
    n('사쿠야는 문을 반쯤 닫고 마지막으로 나를 보았다. 그 시선에는 망설임도, 위로도 없었다.', 'sakuyaCold'),
    maid('다시 문을 두드리지 마십시오.', 'sakuyaCold')
  ], 'expulsion-6', { background: 'doorstep', location: '홍마관 · 문 앞' });
  nodes['expulsion-6'].text = '사쿠야가 안쪽으로 물러났다. 문이 닫히자, 밝은 창들이 있는 저택 앞에 나 혼자 남았다.';
  for (const node of Object.values(nodes)) {
    if (node.id.startsWith('eviction-')) {
      node.chapterTitle = '종장. 닫힌 문';
      node.chapterNumber = '—';
    }
    if (['expulsion-6', 'expulsion-7', 'expulsion-8'].includes(node.id)) {
      node.background = 'doorstep';
      node.location = '홍마관 · 문 앞';
      delete node.backdrop;
    }
  }
})();
