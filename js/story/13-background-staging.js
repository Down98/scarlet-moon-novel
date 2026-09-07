/* 대사 ID와 분기는 유지하고, 장소와 시간대만 연출합니다. */
(() => {
  const { nodes } = window.VN_STORY;
  nodes['approach-1'].text = '나무 사이로 호수가 열렸다. 물안개 너머, 붉은 벽돌 저택의 창마다 불이 켜져 있었다. 누군가는 있을 것이다.';
  nodes['guestroom-0'].background = 'corridor';
  nodes['guestroom-0'].music = 'unease';
  nodes['after-rest-0'].period = 'dusk';
  const duskScenes = [
    'after-rest', 'thanks-plan', 'thanks-truth', 'insult-late', 'maid-departure',
    'farewell', 'employment', 'different-tomorrow', 'my-own-story', 'an-honest-goodbye',
    'name-before-leaving', 'home-ending', 'formal-farewell', 'promise-ending',
    'guest-ending', 'invitation-story', 'invitation-honesty'
  ];
  for (const node of Object.values(nodes)) {
    if (duskScenes.some(prefix => node.id.startsWith(prefix + '-'))) node.period = 'dusk';
  }
})();
