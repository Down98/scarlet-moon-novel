/* 객실의 청결함을 둘러싼, 끝내 해명되지 않는 짧은 오해. */
(() => {
  const { scene, r, n, you, maid, thought } = window.VN_SCRIPT;
  const nodes = window.VN_STORY.nodes;

  scene('guestroom', 4, [
    n('사쿠야를 따라 복도를 걸었다. 자기 방으로 향하던 레밀리아도 손님방 문 앞에서 잠시 걸음을 멈췄다.', null),
    n('문이 열렸다. 부드러운 등불 아래 하얀 침구와 반듯한 협탁이 보였다. 창 너머에는 푸른 빛이 고여 있었다.', null),
    thought('……생각보다 깨끗하네.'),
    n('방 안을 둘러보는 내 시선을 따라, 사쿠야가 희미하게 미소 지었다.', 'sakuyaSmile'),
    maid('청소는 특기입니다.', 'sakuyaSmile'),
    n('평범한 말인데, 「청소」라는 단어가 묘하게 또렷이 들렸다.', 'sakuyaSmile'),
    you('……청소요?', 'sakuyaSmile'),
    r('…….', 'watchful'),
    n('문가에 선 레밀리아와 눈이 마주쳤다. 그녀는 아주 잠깐 사쿠야 쪽을 보더니, 슬쩍 시선을 돌렸다.', 'hiding'),
    thought('어…… 아니지……? 내가 이상하게 받아들인 거지……?', 'hiding'),
    you('저기, 레밀리아. 혹시 이 방…….', 'watchful'),
    r('…….', 'hiding'),
    n('레밀리아는 대답하지 않았다. 갑자기 커튼의 무늬가 무척 궁금해진 사람처럼 창가만 바라보았다.', 'hiding'),
    maid('이 방에서는 아무 일도 없었습니다. 안심하셔도 됩니다.', 'sakuyaSmile'),
    you('이 방에서는……요?', 'sakuyaSmile'),
    maid('침구도 깨끗한 것으로 준비했습니다. 편히 쉬십시오.', 'sakuyaSmile'),
    n('정중한 미소가 조금도 흐트러지지 않았다. 안심하라는 말은 들었는데, 궁금한 것은 오히려 하나 늘었다.', 'sakuyaNormal'),
    thought('……괜찮겠지, 뭐…….'),
    n('나는 침대 쪽으로 고개를 돌렸다. 적어도 지금 눈앞에 보이는 이불은 아주 평범해 보였다.', null)
  ], 'maid-room-6', { background: 'guestroom' });

  scene('room-glimpse', 4, [
    n('고개를 내리던 순간, 이불 끝의 접힌 틈에 붉은빛이 아주 옅게 스친 듯했다.', null, { effect: 'red-glimpse' }),
    thought('……지금, 뭔가 붉은 게 보이지 않았나?'),
    n('눈을 한 번 깜빡이고 다시 보았다. 같은 자리에는 등불에 물든 천과 옅은 그림자만 보였다. 조금 전 보았던 것의 경계는 찾을 수 없었다.', null),
    thought('등불이 비친 거겠지. 아니면…… 아니, 아무 일도 없었다고 했으니까…….')
  ], 'guestroom-17', { background: 'guestroom' });
  nodes['guestroom-16'].next = 'room-glimpse-0';
  nodes['guestroom-18'].text = '나는 더 확인하는 대신 침대 가장자리에 조심스럽게 앉았다. 이불 아래를 들춰 볼 생각은 하지 않기로 했다.';

  nodes['maid-room-5'].next = 'guestroom-0';
  // 문가의 두 사람이 인사를 마치고 떠난 뒤에도 손님방을 유지합니다.
  nodes['maid-room-6'].background = 'guestroom';
  nodes['maid-room-7'].background = 'guestroom';
  nodes['after-rest-0'].background = 'guestroom';
})();
