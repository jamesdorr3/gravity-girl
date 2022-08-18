const fewDeaths = [
  'AAAAAAAAAAAAHHHHHHHHHHHH!!!!!!!!!!',
  'Initiating reincarnation',
  "Oops. Don't do that",
  'spikes = ouchie mama',
  "Tip: Don't die",
  'Ya dead',
  'You have 无穷 lives left',
  "You're supposed to stay alive",
  '🔪🔪🫖👜🫵',
];

const manyDeaths = [
  'Do you want me on your side when robots take over?',
  'Fortunately for you, you have infinite lives',
  'I tried to make this game easy',
  'Infinite lives is a gift, not a challenge',
  'Lives: 1',
  'Masochist identified',
  'Seriously, no more lives',
  '■ㄱㄱㄷㅢㅢㅢㅢ■■ ■■■■. Just kidding',
  '🤬🤬🤬🤬🤬',
];

export default (deathCount) => {
  if (deathCount < 10) {
    return fewDeaths[Math.floor(Math.random() * fewDeaths.length)];
  }
  return manyDeaths[Math.floor(Math.random() * manyDeaths.length)];
};
