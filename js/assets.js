/* 폴더와 표시 이름은 여기서 관리합니다. 대본은 표정 키만 참조합니다. */
(() => {
  const remilia = {
    normal: '기본표정', laugh: '크게웃음', possessive: '심각한표정_눈치', shy: '깊게부끄러움',
    angry: '매우화남', backSigh: '뒷모습_한숨', backPose: '뒷모습_포즈',
    backFlustered: '뒷모습_당황', flustered: '눈치본후걸렸을때표정', embarrassed: '부끄러워서눈을피함2',
    surprised: '당황', disdain: '심각한표정', hollow: '깊은슬픔', watchful: '얕은눈치',
    reluctant: '일반고민', slightShy: '살짝부끄러움',
    hiding: '부끄러워서눈을피함', bashful: '쑥쓰러움', praised: '칭찬받은표정', afterPraise: '놀리지말라는표정',
    listening: '경청', sad: '슬픔', thinking: '심각한고민', interested: '살짝흥미',
    softSmile: '살짝웃음', talkingSmile: '살짝웃음_입을염', pouting: '살짝삐짐',
    teasing: '놀리니까재밌냐는표정', stopTeasing: '쑥쓰러움_멈춰', furious: '매우화남2',
    smallGlance: '작은눈치', bigGlance: '큰눈치', backLook: '뒷모습_보기', backThink: '뒷모습_생각'
  };
  const sakuya = {
    sakuyaNormal: '기본표정', sakuyaSmile: '옅은미소', sakuyaSerious: '진지함',
    sakuyaSuspicious: '의심', sakuyaTroubled: '곤란', sakuyaCold: '냉정',
    sakuyaSurprised: '당황', sakuyaChiding: '당황한후_그러지말라는표정', sakuyaAlarmed: '진지한_당황'
  };
  const patchouli = {
    patchouliNormal: '기본표정', patchouliSurprised: '당황', patchouliTalking: '말하는중',
    patchouliSorry: '미안', patchouliSmile: '웃음', patchouliFull: '전체모습'
  };
  const reimu = {
    reimuNormal: '기본표정', reimuThinking: '진지하게생각', reimuEyesClosed: '눈을감고진지하게생각',
    reimuStopThinking: '생각멈춤', reimuBored: '지루한표정', reimuSigh: '한숨'
  };
  const assets = {}, portraits = {};
  const squarePortraits = [...Object.keys(remilia).filter(key => !key.startsWith('back')), ...Object.keys(sakuya), ...Object.keys(patchouli).filter(key => key !== 'patchouliFull'), ...Object.keys(reimu)];
  const folders = { 레밀리아: '레밀리아_new', 사쿠야: '사쿠야_new', 파츄리: '파츄리', 레이무: '레이무' };
  for (const [character, expressions] of Object.entries({ 레밀리아: remilia, 사쿠야: sakuya, 파츄리: patchouli, 레이무: reimu })) {
    for (const [key, file] of Object.entries(expressions)) {
      assets[key] = `${folders[character]}/${file}`;
      portraits[key] = { character, label: file.replaceAll('_', ' ') };
    }
  }
  const backgrounds = window.VN_BACKGROUNDS;
  window.VN_ASSETS = { assets, portraits, squarePortraits, backgrounds };
})();
