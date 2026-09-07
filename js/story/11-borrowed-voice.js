/* 방 밖으로 나가지 않아도 진행되는 작은 사건. 선택에 따라 들은 단서가 저장됩니다. */
(() => {
  const { scene, r, n, you, maid, thought, route } = window.VN_SCRIPT;
  const { nodes } = window.VN_STORY;

  scene('book-whisper', 4, [
    n('두 사람이 떠난 뒤, 문 아래로 얇은 종이 한 장이 미끄러져 들어왔다.', null, { sfx: 'paper' }),
    n('낡은 책에서 떨어진 듯한 종이였다. 가장자리에는 오래된 잉크 자국이 남았고, 가운데에는 눌러 말린 꽃잎 하나가 붙어 있었다.', null),
    thought('바람이 들어올 곳이 있나……?'),
    n('종이 가장자리에서 붉은 실 같은 빛이 움직였다. 그 순간, 닫힌 문 너머로 목소리가 났다.', null, { effect: 'red-glimpse' }),
    n('“차가 식기 전에 돌아올게.”', null),
    thought('누가 인사를 하는 거지?'),
    n('발소리는 없었다. 목소리는 한 번 더 같은 말을 했다. 끝의 숨소리까지 똑같았다.', null, { choices: [
      { text: '종을 울리고, 종이에서 물러난다.', next: 'call-maid-0', points: 0, flags: { heardEcho: false } },
      { text: '문은 열지 않고, 목소리에 누구냐고 묻는다.', next: 'answer-echo-0', points: 0, flags: { heardEcho: true } }
    ] })
  ], null, { background: 'guestroom', music: 'unease' });
  nodes['maid-room-7'].next = 'book-whisper-0';

  scene('call-maid', 4, [
    n('종의 손잡이를 힘껏 눌렀다. 맑은 소리가 방 안에 한 번 울렸다.', null, { sfx: 'bell' }),
    n('문밖의 목소리가 끊겼다. 대신 종이 위의 꽃잎이 살아 있는 것처럼 한 번 떨렸다.', null),
    maid('손을 대지 마십시오.', 'sakuyaSerious'),
    n('어느새 사쿠야가 나와 종이 사이에 서 있었다. 문이 열린 소리는 듣지 못했다.', 'sakuyaSerious')
  ], 'stopped-second-0', { background: 'guestroom', music: 'unease' });

  scene('answer-echo', 4, [
    you('누구세요? 여기는 손님방인데…….', null),
    n('목소리가 끊겼다. 종이 위에 잉크 한 방울이 번졌다.', null),
    n('“이번에는, 기다리지 않아도 돼.”', null),
    thought('방금 말이 바뀌었어.'),
    n('나도 모르게 한 걸음 다가갔다. 종이가 내 발치로 더 미끄러졌다.', null),
    maid('거기까지입니다.', 'sakuyaSerious', { sfx: 'timeStop' }),
    n('문득 사쿠야가 앞을 막고 있었다. 내 손에는 언제 잡았는지 모를 종의 손잡이가 들려 있었다.', 'sakuyaSerious'),
    maid('모르는 목소리에는 대답도 하지 마십시오. 이번에는 제가 가까이 있었습니다.', 'sakuyaSerious')
  ], 'stopped-second-0', { background: 'guestroom', music: 'unease' });

  scene('stopped-second', 4, [
    n('초침이 한 칸 움직이는 사이, 종이 밑에 은쟁반이 놓이고 내 몸은 침대 곁으로 옮겨져 있었다. 그 사이의 움직임은 하나도 기억나지 않았다.', 'sakuyaSerious', { effect: 'time-fracture', sfx: 'timeStop' }),
    you('방금…… 언제 옮기신 거예요?', 'sakuyaSerious'),
    maid('확인하실 시간은 나중에 드리겠습니다. 이미 제 뒤로 모셨습니다. 거기 계세요.', 'sakuyaNormal'),
    r('사쿠야. 무슨 소리였어?', 'backLook'),
    n('문가의 레밀리아는 평소보다 말이 없었다. 잠들려다 나온 것 같았다.', 'normal'),
    maid('도서관의 낱장이 여기까지 들어왔습니다. 파츄리 님께서 회수 중이신 종이와 같은 문양입니다.', 'sakuyaSerious'),
    r('호수 쪽에서 보였다는 종잇조각이 이거였나. 돌아와서 창문을 긁더니, 이번에는 복도로 돌았네.', 'thinking'),
    you('종이가 말을 했어요. 차가 식기 전에 돌아온다고…….'),
    n('레밀리아가 한 걸음 들어오다 멈췄다.', 'sad'),
    maid('아가씨……. 손님이 보고 계십니다.', 'sakuyaTroubled'),
    r('알아.', 'disdain'),
    n('레밀리아는 이번에는 고개를 돌리지 않았다. 나를 지나쳐, 꽃잎이 붙은 종이를 똑바로 보았다.', 'thinking'),
    r('그 목소리는 어디서 주웠니?', 'possessive'),
    n('대답 대신 종이 위의 잉크가 둥글게 모였다. 누군가의 이름을 쓰려는 것처럼.', null, { effect: 'red-glimpse' }),
    r('쓰지 마.', 'angry'),
    n('작은 손끝에서 붉은 빛이 갈라졌다. 장미 가시 같은 빛이 종이의 네 귀퉁이를 눌렀다.', 'disdain', { effect: 'scarlet-seal', sfx: 'seal' }),
    r('내 손님 목소리까지 흉내 내면, 다음엔 책등째 태워 버릴 거야.', 'disdain'),
    n('시계가 짧게 한 번 울렸다. 사쿠야는 쟁반 위의 종이를 접어 붉은 빛이 새지 않도록 덮었다.', 'sakuyaSerious', { sfx: 'clock' }),
    maid('파츄리 님께 돌려드리겠습니다. 문양을 다시 잠가 달라고 말씀드리지요.', 'sakuyaNormal'),
    you('그 목소리의 주인도, 책 안에 있는 건가요?'),
    r('아니.', 'sad'),
    n('이번 대답만큼은 너무 빨랐다.', 'sad'),
    r('그 책은 예전에 들은 말을 남겨 두는 기록이야. 풀려난 낱장은 가까운 사람의 반응을 따라 말을 이어 붙이고. 그 사람의 지금 마음을 전하는 게 아니야.', 'thinking'),
    you('그러면, 방금 건…….'),
    r('네가 대답해 줄 필요 없는 말.', 'reluctant')
  ], 'echo-detail-check', { background: 'guestroom', music: 'unease' });

  route('echo-detail-check', 0, 'heard-detail-0', 'safe-detail-0', 'heardEcho');
  scene('heard-detail', 4, [
    you('그런데 마지막에는 기다리지 않아도 된다고 했어요.'),
    n('레밀리아가 사쿠야의 쟁반을 보았다. 접힌 종이에는 이제 아무 글자도 없었다.', 'hollow'),
    r('……누가 그런 허락을 구했대.', 'hollow'),
    maid('아가씨. 이건 제가 가져가겠습니다.', 'sakuyaTroubled'),
    n('사쿠야는 레밀리아가 고개를 끄덕일 때까지 쟁반을 들고 기다렸다.', 'sakuyaTroubled')
  ], 'after-echo-0', { background: 'guestroom', music: 'memory' });
  scene('safe-detail', 4, [
    maid('손님께서는 종을 울린 뒤 물러나 계셨습니다.', 'sakuyaNormal'),
    r('그래. 말을 듣는 인간도 하나쯤 있어야지.', 'watchful'),
    you('솔직히, 무서워서요.'),
    r('무서울 때 호기심까지 챙길 필요는 없어.', 'reluctant')
  ], 'after-echo-0', { background: 'guestroom', music: 'memory' });

  scene('after-echo', 4, [
    n('사쿠야가 나간 뒤에도 레밀리아는 잠깐 문가에 남았다.', 'backThink'),
    you('그 잔은…… 오래 쓰신 건가요?'),
    r('네가 태어나기 전부터 있었겠지.', 'sad'),
    you('깨지지 않게 돌려드릴게요. 다음에 쓰게 되면요.'),
    n('그녀가 돌아보았다. 이번에는 내 손이 아니라, 내 얼굴을 먼저 보았다.', 'backLook'),
    r('다른 잔을 줄 거야. 너는 뜨거우면 손잡이 대신 잔 옆을 잡더라.', 'softSmile'),
    thought('내가 그런 것까지 보고 있었구나.', 'slightShy'),
    r('……이젠 자. 더 큰 소리를 내면 잠을 깨운 값도 받을 거야.', 'pouting'),
    you('아까는 와 주셔서 고마웠어요.'),
    r('내 집에서 시끄럽게 굴길래 온 거야.', 'hiding'),
    n('문이 닫히기 직전, 그녀의 목소리가 한 번 더 들렸다.', null),
    r('종은 가까이 두고.', null),
    n('나는 종을 베개 옆에 놓았다. 초침 소리는 다시 평범했다. 한동안 그 소리를 세다가 잠이 들었다.', null)
  ], 'after-rest-0', { background: 'guestroom', music: 'memory' });
  nodes['after-rest-0'].text = '눈을 떴을 때도 종은 베개 옆에 있었다. 문틈 아래에는 종이 대신 낮의 마지막 빛이 가늘게 들어와 있었다.';
  nodes['after-rest-0'].music = 'departure';
})();
