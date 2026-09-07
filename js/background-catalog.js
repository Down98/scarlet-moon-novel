/* 배경 파일, 시간대 변형, 모바일 구도와 연출 좌표를 한곳에서 관리합니다. */
(() => {
  const plate = (file, location, extra = {}) => ({
    src: `assets/backgrounds/${file}.webp`, location,
    aspect: 16 / 9, position: [50, 50], mobilePosition: [50, 50], ...extra
  });
  window.VN_BACKGROUNDS = {
    hall: plate('hall-night', '홍마관 · 대홀', { dusk: 'hallDusk' }),
    hallDusk: plate('hall-dusk', '홍마관 · 대홀 · 해 질 무렵'),
    distant: plate('mansion-lake', '안개 낀 호수 · 홍마관을 향해', { mobilePosition: [57, 50] }),
    doorstep: plate('doorstep-night', '홍마관 · 문 앞', { dusk: 'doorstepDusk' }),
    doorstepDusk: plate('doorstep-dusk', '홍마관 · 문 앞 · 해 질 무렵'),
    guestroom: plate('guestroom-night', '홍마관 · 손님방', { dusk: 'guestroomDusk', effectAnchor: [.64, .65] }),
    guestroomDusk: plate('guestroom-dusk', '홍마관 · 손님방 · 늦은 오후', { effectAnchor: [.64, .65] }),
    corridor: plate('corridor-night', '홍마관 · 손님방 복도'),
    shrine: plate('hakurei-offertory', '하쿠레이 신사 · 세전함 앞', { position: [60, 50], mobilePosition: [71, 50] }),
    shrineSky: plate('hakurei-sky', '하쿠레이 신사 · 저녁 하늘', { mobilePosition: [70, 45] })
  };
})();
